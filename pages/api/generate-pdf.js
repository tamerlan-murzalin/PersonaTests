// pages/api/generate-pdf.js
import fs from "fs/promises";
import path from "path";
import Handlebars from "handlebars";
import puppeteer from "puppeteer";

export const config = { api: { bodyParser: { sizeLimit: "2mb" } } };

// Choose the right JSON + pick the right item
function buildContext({ testType, resultId, gender, allData }) {
  let list = [];

  // Data shapes differ:
  // - personality/Archetypes.json: { archetypes: { female: [...], male: [...] } }
  // - romantic/RomanticArchetypes.json: { female: [...], male: [...] }
  // - communication/Career: { archetypes: [...] }
  if (testType === "personality") {
    list = allData.archetypes?.[gender] ?? [];
  } else if (testType === "romantic") {
    list = allData?.[gender] ?? [];
  } else {
    list = allData.archetypes ?? [];
  }

  // Pick by id if provided; fall back to first
  let selected = list[0];
  if (resultId != null) {
    const idStr = String(resultId);
    selected = list.find(a => String(a.id) === idStr) || selected;
  }

  // Use gender-specific description if present
  if (selected) {
    const gKey = gender === "male" ? "maleDescription" : "femaleDescription";
    if (selected[gKey]) {
      selected = { ...selected, description: selected[gKey] };
    }
  }

  return { archetypes: selected ? [selected] : [] };
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method Not Allowed" });

  try {
    const { testType, resultId, gender } = req.body || {};
    if (!testType) return res.status(400).json({ message: "Missing testType" });

    const map = {
      personality: "Archetypes.json",        // { archetypes: { female, male } }
      romantic: "RomanticArchetypes.json",   // { female, male }
      communication: "CommunicationArchetypes.json", // { archetypes: [...] }
      career: "CareerArchetypes.json"        // { archetypes: [...] }
    };
    const dataFile = map[testType];
    if (!dataFile) return res.status(400).json({ message: "Unknown testType" });

    const dataPath = path.join(process.cwd(), "data", dataFile);
    const allRaw = await fs.readFile(dataPath, "utf-8");
    const allData = JSON.parse(allRaw);

    const tplPath = path.join(process.cwd(), "templates", "heartcode_template.html");
    const tplSrc = await fs.readFile(tplPath, "utf-8");
    const template = Handlebars.compile(tplSrc, { noEscape: true });

    const context = buildContext({ testType, resultId, gender, allData });
    if (!context.archetypes.length) return res.status(400).json({ message: "No result found" });

    const html = template(context);

    const browser = await puppeteer.launch({ args: ["--no-sandbox", "--disable-setuid-sandbox"] });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });
    const pdf = await page.pdf({ format: "A4", printBackground: true });
    await browser.close();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${testType}-result.pdf"`);
    res.status(200).send(pdf);
  } catch (e) {
    res.status(500).json({ message: "PDF generation failed: " + e.message });
  }
}