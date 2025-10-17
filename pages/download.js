import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Download() {
  const router = useRouter();
  const { testType, resultId, gender } = router.query; 
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (testType && resultId) {
      setReady(true);
    }
  }, [testType, resultId]);

  const handleDownload = async () => {
    if (!testType || !resultId) {
      alert("Невозможно скачать PDF: нет данных о тесте или результате");
      return;
    }

    try {
      const res = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ testType, resultId, gender })
      });

      if (!res.ok) {
        const text = await res.text();
        alert("Ошибка при генерации PDF: " + text);
        return;
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${testType}-result.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      alert("Ошибка сети: " + err.message);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px", fontFamily: "Arial, sans-serif" }}>
      <h1>Ваш результат готов</h1>
      <p>
        {ready 
          ? "Нажмите кнопку ниже, чтобы скачать PDF с результатом вашего теста" 
          : "Подождите, данные загружаются..."}
      </p>

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
          marginTop: "20px"
        }}
      >
        Скачать PDF
      </button>
    </div>
  );
}