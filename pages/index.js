import { useState } from "react";

export default function Home() {
  const [gender, setGender] = useState("male");

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
      <h1>Выберите пол:</h1>

      <div style={{ margin: "20px" }}>
        <label>
          <input
            type="radio"
            name="gender"
            value="male"
            checked={gender === "male"}
            onChange={() => setGender("male")}
          />{" "}
          Мужчина
        </label>

        <label style={{ marginLeft: "20px" }}>
          <input
            type="radio"
            name="gender"
            value="female"
            checked={gender === "female"}
            onChange={() => setGender("female")}
          />{" "}
          Женщина
        </label>
      </div>

      <button
        onClick={handleDownload}
        style={{ padding: "10px 20px", fontSize: "16px" }}
      >
        Скачать PDF
      </button>
    </div>
  );
}