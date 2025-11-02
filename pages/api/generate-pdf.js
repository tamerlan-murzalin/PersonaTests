// pages/api/generate-pdf.js
import fs from "fs/promises";
import path from "path";
import Handlebars from "handlebars";

// На Vercel используем puppeteer-core + @sparticuz/chromium
import chromium from "@sparticuz/chromium";
import puppeteerCore from "puppeteer-core";

// Для локалки динамически подключим обычный puppeteer (если установлен)
async function launchBrowser() {
  const isServerless = !!(process.env.AWS_REGION || process.env.VERCEL);
  if (isServerless) {
    // Vercel / AWS Lambda
    const executablePath = await chromium.executablePath();
    return puppeteerCore.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      headless: chromium.headless, // true на сервере
      executablePath,
    });
  } else {
    // Локальная разработка — обычный puppeteer удобнее
    const puppeteer = (await import("puppeteer")).default;
    return puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
  }
}

export const config = {
  api: { bodyParser: { sizeLimit: "2mb" } }, // обязательно Node runtime, не edge
};

function pickItem(list, resultId) {
  if (!Array.isArray(list) || list.length === 0) return null;
  if (resultId == null) return list[0];
  const byId = list.find(a => a?.id != null && String(a.id) === String(resultId));
  if (byId) return byId;
  const idx = Number(resultId);
  if (!Number.isNaN(idx) && list[idx]) return list[idx];
  return list[0];
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.writeHead(405, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Method Not Allowed" }));
    return;
  }

  try {
    const { testType, resultId, gender } = req.body || {};
    const type = testType || "personality"; // поддерживаем старые ссылки

    const dataMap = {
      personality: "Archetypes.json",                 // { archetypes: { female, male } }
      romantic: "RomanticArchetypes.json",            // { female: [...], male: [...] }
      communication: "CommunicationArchetypes.json",  // { archetypes: [...] }
      career: "CareerArchetypes.json",                // { archetypes: [...] }
    };
    const dataFile = dataMap[type];
    if (!dataFile) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Unknown testType" }));
      return;
    }

    // Загружаем данные
    const dataPath = path.join(process.cwd(), "data", dataFile);
    const allData = JSON.parse(await fs.readFile(dataPath, "utf8"));

    // Собираем список кандидатов по типу теста
    let list = [];
    if (type === "personality") {
      if (!gender) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Missing gender for personality" }));
        return;
      }
      list = allData.archetypes?.[gender] ?? [];
    } else if (type === "romantic") {
      if (!gender) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Missing gender for romantic" }));
        return;
      }
      list = allData?.[gender] ?? [];
    } else {
      list = allData.archetypes ?? [];
    }

    let selected = pickItem(list, resultId);

    // Для romantic берём гендер-специфичное описание, если есть
    if (selected && type === "romantic") {
      const gKey = gender === "male" ? "maleDescription" : "femaleDescription";
      if (selected[gKey]) selected = { ...selected, description: selected[gKey] };
    }

    if (!selected) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "No result found" }));
      return;
    }

    // Шаблон
    const tplPath = path.join(process.cwd(), "templates", "heartcode_template.html");
    const tplSrc = await fs.readFile(tplPath, "utf8");
    const template = Handlebars.compile(tplSrc, { noEscape: true });
    const html = template({ archetypes: [selected] });

    // Puppeteer (локально — обычный, на Vercel — chromium)
    const browser = await launchBrowser();
    const page = await browser.newPage();

    // Иногда на serverless не хватает шрифтов; если увидишь квадратики — скажи, добавим NotoSans.
    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdfBytes = await page.pdf({ format: "A4", printBackground: true });
    await browser.close();

    const pdfBuffer = Buffer.isBuffer(pdfBytes) ? pdfBytes : Buffer.from(pdfBytes);
    const fileName = `${type}-${gender || "result"}.pdf`;

    res.writeHead(200, {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${fileName}"`,
      "Content-Length": String(pdfBuffer.length),
      "Cache-Control": "no-store",
    });
    res.end(pdfBuffer);
  } catch (e) {
    console.error("PDF generation failed:", e);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "PDF generation failed", error: String(e?.message || e) }));
  }
}