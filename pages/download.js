import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Download() {
  const router = useRouter();
  const { gender } = router.query; // получаем пол из query-параметра
  const [selectedGender, setSelectedGender] = useState(gender || "male");

  const handleDownload = async () => {
    try {
      const res = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gender: selectedGender })
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
      a.download = `heartcode-${selectedGender}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      alert("Ошибка сети: " + err.message);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Скачать PDF с результатами</h1>

      <div style={{ margin: "20px" }}>
        <label>
          <input
            type="radio"
            name="gender"
            value="male"
            checked={selectedGender === "male"}
            onChange={() => setSelectedGender("male")}
          />{" "}
          Мужчина
        </label>

        <label style={{ marginLeft: "20px" }}>
          <input
            type="radio"
            name="gender"
            value="female"
            checked={selectedGender === "female"}
            onChange={() => setSelectedGender("female")}
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