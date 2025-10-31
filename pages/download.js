// pages/download.js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Download() {
  const router = useRouter();
  const { testType, resultId, gender } = router.query;
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;
    // Enable if we have gender OR (testType & resultId)
    setReady(Boolean(gender) || (Boolean(testType) && Boolean(resultId)));
  }, [router.isReady, testType, resultId, gender]);

  const handleDownload = async () => {
    const payload =
      (testType && resultId)
        ? { testType, resultId, gender }
        : { testType: "personality", resultId: 0, gender }; // safe fallback

    try {
      const res = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const contentType = res.headers.get("content-type") || "";
      if (!res.ok || !contentType.includes("application/pdf")) {
        // Read the server message for easier debugging
        const errText = await res.text();
        alert("PDF not returned. Server said:\n" + errText);
        return;
        // (This prevents saving HTML/JSON as .pdf, which macOS Preview can't open)
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      const name = `${payload.testType}-${payload.gender || "result"}.pdf`;
      a.href = url;
      a.download = name;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert("Network error: " + err.message);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px", fontFamily: "Arial, sans-serif" }}>
      <h1>Ваш результат готов</h1>
      <p>{ready ? "Нажмите, чтобы скачать PDF" : "Подождите, данные загружаются..."}</p>

      <button
        onClick={handleDownload}
        disabled={!ready}
        style={{
          padding: "12px 24px",
          fontSize: "16px",
          backgroundColor: ready ? "#4ECDC4" : "#ccc",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: ready ? "pointer" : "not-allowed",
          marginTop: "20px",
        }}
      >
        Скачать PDF
      </button>
    </div>
  );
}