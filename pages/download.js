// pages/download.js
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import Link from "next/link";

const LABELS = {
  romantic: "Романтический профиль",
  personality: "Стиль личности",
  communication: "Коммуникация",
  career: "Карьера",
  stress: "Стресс и выгорание",
};

// Пол нужен только этим тестам
const NEEDS_GENDER = new Set(["romantic", "personality"]);
const GENDERS = [
  { value: "male", label: "Мужской" },
  { value: "female", label: "Женский" },
];

export default function DownloadPage() {
  const router = useRouter();

  const [testType, setTestType] = useState("");
  const [resultId, setResultId] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  // Подхватываем параметры из URL
  useEffect(() => {
    if (!router.isReady) return;
    const q = router.query || {};
    const t = String(q.testType || "").toLowerCase();
    const r = q.resultId != null ? String(q.resultId) : "";
    const g = q.gender ? String(q.gender).toLowerCase() : "";

    setTestType(t);
    setResultId(r);
    setGender(g);
  }, [router.isReady, router.query]);

  const title = useMemo(() => LABELS[testType] || "Скачать PDF", [testType]);
  const needGender = NEEDS_GENDER.has(testType);
  const ready = Boolean(testType) && Boolean(resultId) && (!needGender || Boolean(gender));

  async function handleDownload() {
    setErr("");

    if (!testType) return setErr("Не указан тип теста (testType).");
    if (!resultId) return setErr("Не указан результат (resultId).");
    if (needGender && !gender) return setErr("Выберите пол, чтобы продолжить.");

    try {
      setLoading(true);

      const payload = {
        testType,
        resultId,
        ...(needGender ? { gender } : {}),
      };

      const res = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const contentType = res.headers.get("content-type") || "";

      if (!res.ok || !contentType.includes("application/pdf")) {
        // читаем тело для удобной диагностики
        const txt = await res.text();
        throw new Error(txt || `HTTP ${res.status}`);
      }

      // Имя файла из Content-Disposition
      const disp = res.headers.get("content-disposition") || "";
      let filename = `${testType}-${needGender ? gender : "result"}.pdf`;
      const m = /filename="(.+?)"/i.exec(disp);
      if (m && m[1]) filename = m[1];

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (e) {
      setErr(String(e.message || e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>Скачать PDF — {title}</title>
        <meta
          name="description"
          content="Скачайте персональный PDF-отчёт: описание профиля и практические советы."
        />
      </Head>

      <main className="hc-home">
        {/* HERO */}
        <section className="landing__hero">
          <div className="hc-container">
            <span className="badge">PDF-отчёт</span>
            <h1 className="hero__title">{title}</h1>
            <p className="lead">
              Готовим ваш персональный файл с описанием профиля и рекомендациями.
            </p>
          </div>
        </section>

        {/* CARD */}
        <section className="hc-section">
          <div className="hc-container">
            <div className="card" style={{ maxWidth: 640, margin: "0 auto" }}>
              <div className="hc-grid" style={{ gap: 12 }}>
                <div className="hc-feature">
                  <h3 className="hc-feature__title">Параметры</h3>
                  <p className="hc-feature__text">
                    <strong>Тест:</strong> {title}<br />
                    <strong>Результат (id):</strong> {resultId || "—"}<br />
                  </p>

                  {NEEDS_GENDER.has(testType) && (
                    <div style={{ marginTop: 8 }}>
                      <label style={{ display: "block", marginBottom: 6 }}>
                        <strong>Пол:</strong>
                      </label>
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        style={{
                          background: "#0f1319",
                          color: "#e8edf3",
                          border: "1px solid #283248",
                          borderRadius: 8,
                          padding: "8px 12px",
                        }}
                      >
                        <option value="">— выбрать —</option>
                        {GENDERS.map((g) => (
                          <option key={g.value} value={g.value}>
                            {g.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                {err && (
                  <div className="hc-quote" style={{ borderColor: "#a44" }}>
                    <strong>Ошибка:</strong> {err}
                  </div>
                )}

                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <button
                    onClick={handleDownload}
                    disabled={!ready || loading}
                    className="hc-btn hc-btn--primary"
                    title={!ready ? "Заполните недостающие параметры" : "Скачать PDF"}
                  >
                    {loading ? "Формируем PDF…" : "Скачать PDF"}
                  </button>

                  <Link href="/pricing" className="hc-btn hc-btn--ghost">
                    Тарифы
                  </Link>
                  <Link href="/#tests" className="hc-btn">
                    К другим тестам
                  </Link>
                </div>
              </div>

              <p className="card__text" style={{ marginTop: 12, color: "#9aa4b2" }}>
                Советы в отчёте — ориентиры к действию. Это не медицинская диагностика.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}