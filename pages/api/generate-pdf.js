import fs from "fs";
import path from "path";
import Handlebars from "handlebars";
import puppeteer from "puppeteer";

export const config = {
    api: {
        bodyParser: {
            sizeLimit: "2mb",
        },
    },
};

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Метод не поддерживается" });
    }

    try {
        const { gender } = req.body;

        const dataPath = path.join(process.cwd(), "data", "archetypes.json");
        const archetypesJson = JSON.parse(fs.readFileSync(dataPath, "utf8"));
        const archetypesData = archetypesJson.archetypes[gender];

        if (!archetypesData || archetypesData.length === 0) {
            return res.status(400).json({ message: "Неверные данные" });
        }

        const selectedArchetype = [archetypesData[0]];
        const templatePath = path.join(
            process.cwd(),
            "templates",
            "heartcode_template.html"
        );
        const templateHtml = fs.readFileSync(templatePath, "utf8");
        const template = Handlebars.compile(templateHtml);
        const html = template({ archetypes: selectedArchetype });

        const browser = await puppeteer.launch({
            headless: true,
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
        });
        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: "networkidle0" });

        const pdfBuffer = await page.pdf({
            format: "A4",
            printBackground: true,
        });

        await browser.close();

        // ✅ Простое и безопасное имя файла
        const safeName = `heartcode-${gender}`;

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
            "Content-Disposition",
            `attachment; filename="${safeName}.pdf"`
        );
        res.status(200).send(pdfBuffer);
    } catch (error) {
        console.error("Ошибка генерации PDF:", error);
        res.status(500).json({ message: "Ошибка сервера: " + error.message });
    }
}