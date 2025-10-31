// pages/api/generate-pdf.js
import fs from "fs/promises";
import path from "path";
import Handlebars from "handlebars";
import puppeteer from "puppeteer";

export const config = {
  api: { bodyParser: { sizeLimit: "2mb" } }, // keep Node runtime (NOT edge)
};

function pickItem(list, resultId) {
  if (!Array.isArray(list) || list.length === 0) return null;
  if (resultId == null) return list[0];
  // Try by id (string/number), then index
  const foundById = list.find(a => a?.id != null && String(a.id) === String(resultId));
  if (foundById) return foundById;
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

    // Support current + old flows: default to personality when testType missing
    const type = testType || "personality";

    // Map data file names (watch casing on Linux/Vercel)
    const dataMap = {
      personality: "Archetypes.json",             // { archetypes: { female, male } }
      romantic: "RomanticArchetypes.json",        // { female: [...], male: [...] }
      communication: "CommunicationArchetypes.json", // { archetypes: [...] }
      career: "CareerArchetypes.json",            // { archetypes: [...] }
    };
    const dataFile = dataMap[type];
    if (!dataFile) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Unknown testType" }));
      return;
    }

    // Load data JSON
    const dataPath = path.join(process.cwd(), "data", dataFile);
    const allData = JSON.parse(await fs.readFile(dataPath, "utf8"));

    // Build list to pick from based on type
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

    // Pick result
    let selected = pickItem(list, resultId);

    // For romantic: use gender-specific description if present
    if (selected && type === "romantic") {
      const gKey = gender === "male" ? "maleDescription" : "femaleDescription";
      if (selected[gKey]) selected = { ...selected, description: selected[gKey] };
    }

    if (!selected) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "No result found" }));
      return;
    }

    // Load Handlebars template
    const tplPath = path.join(process.cwd(), "templates", "heartcode_template.html");
    const tplSrc = await fs.readFile(tplPath, "utf8");
    const template = Handlebars.compile(tplSrc, { noEscape: true });

    const html = template({ archetypes: [selected] });

    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

    // IMPORTANT: ensure we return a Node Buffer
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