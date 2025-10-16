import { useRouter } from "next/router";

export default function Download() {
  const router = useRouter();
  const { gender } = router.query;   // gender должен прийти с index.js

  const handleDownload = async () => {
    try {
      const res = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gender })
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
      a.download = `heartcode-${gender}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      alert("Ошибка сети: " + err.message);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Ваш результат готов</h1>
      <p>Нажмите кнопку ниже, чтобы скачать PDF</p>

      <button
        onClick={handleDownload}
        style={{ padding: "10px 20px", fontSize: "16px" }}
      >
        Скачать PDF
      </button>
    </div>
  );
}