// pages/api/generate-pdf.js
import fs from "fs/promises";
import path from "path";
import Handlebars from "handlebars";

// Vercel/serverless: chromium + puppeteer-core
import chromium from "@sparticuz/chromium";
import puppeteerCore from "puppeteer-core";

// ───────────────────────────────────────────────────────────────────────────────
// Runtime config: оставляем Node runtime (НЕ Edge)
export const config = {
  api: { bodyParser: { sizeLimit: "2mb" } },
};

// ───────────────────────────────────────────────────────────────────────────────
// Универсальный запуск браузера: локально → puppeteer, на Vercel → chromium
async function launchBrowser() {
  const isServerless = Boolean(process.env.VERCEL || process.env.AWS_REGION);

  if (isServerless) {
    const executablePath = await chromium.executablePath();
    return puppeteerCore.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      headless: chromium.headless,
      executablePath,
    });
  }

  // Локальная разработка
  try {
    const puppeteer = (await import("puppeteer")).default;
    return puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
  } catch {
    // Если puppeteer не установлен — используем chromium как в serverless
    const executablePath = await chromium.executablePath();
    return puppeteerCore.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      headless: chromium.headless,
      executablePath,
    });
  }
}

// ───────────────────────────────────────────────────────────────────────────────
// Помощники выбора данных
function buildListByType({ type, gender, allData }) {
  // Структуры:
  // personality: { archetypes: { female: [...], male: [...] } }
  // romantic:    { female: [...], male: [...] }
  // others:      { archetypes: [...] }
  if (type === "personality") {
    if (!gender) throw new Error("Missing gender for personality");
    return allData.archetypes?.[gender] ?? [];
  }
  if (type === "romantic") {
    if (!gender) throw new Error("Missing gender for romantic");
    return allData?.[gender] ?? [];
  }
  return allData.archetypes ?? [];
}

function pickItem(list, resultId) {
  if (!Array.isArray(list) || list.length === 0) return null;

  // 1) по id (строка/число)
  if (resultId != null) {
    const byId = list.find(
      (a) => a?.id != null && String(a.id) === String(resultId)
    );
    if (byId) return byId;

    // 2) по индексу
    const idx = Number(resultId);
    if (Number.isInteger(idx) && idx >= 0 && idx < list.length) return list[idx];
  }

  // 3) fallback: первый (лучше вернуть 400, но оставим мягкий fallback)
  return list[0];
}

// ───────────────────────────────────────────────────────────────────────────────
// Основной handler
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.writeHead(405, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Method Not Allowed" }));
    return;
  }

  try {
    const { testType, resultId, gender } = req.body || {};
    const type = testType || "personality"; // совместимость со старыми ссылками

    // Карта файлов данных (важна правильная КАПИТАЛИЗАЦИЯ имён!)
    const dataMap = {
      personality: "Archetypes.json",
      romantic: "RomanticArchetypes.json",
      communication: "CommunicationArchetypes.json",
      career: "CareerArchetypes.json",
    };
    const dataFile = dataMap[type];
    if (!dataFile) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Unknown testType" }));
      return;
    }

    // Читаем данные и шаблон
    const dataPath = path.join(process.cwd(), "data", dataFile);
    const allData = JSON.parse(await fs.readFile(dataPath, "utf8"));

    const list = buildListByType({ type, gender, allData });
    let selected = pickItem(list, resultId);

    if (!selected) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({ message: "Invalid resultId for given testType/gender" })
      );
      return;
    }

    // Для romantic используем гендер-специфичное описание, если есть
    if (type === "romantic") {
      const gKey = gender === "male" ? "maleDescription" : "femaleDescription";
      if (selected[gKey]) {
        selected = { ...selected, description: selected[gKey] };
      }
    }

    const templatePath = path.join(
      process.cwd(),
      "templates",
      "heartcode_template.html"
    );
    const templateSrc = await fs.readFile(templatePath, "utf8");
    const compile = Handlebars.compile(templateSrc, { noEscape: true });

    const html = compile({ archetypes: [selected] });

    // Рендер PDF
    const browser = await launchBrowser();
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdfBytes = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "12mm", right: "12mm", bottom: "12mm", left: "12mm" },
    });
    await browser.close();

    const pdfBuffer = Buffer.isBuffer(pdfBytes) ? pdfBytes : Buffer.from(pdfBytes);
    const filename = `${type}-${gender || "result"}.pdf`;

    res.writeHead(200, {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Content-Length": String(pdfBuffer.length),
      "Cache-Control": "no-store",
    });
    res.end(pdfBuffer);
  } catch (e) {
    console.error("PDF generation failed:", e);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "PDF generation failed",
        error: String(e?.message || e),
      })
    );
  }
}