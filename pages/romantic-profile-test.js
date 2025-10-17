import { useState } from 'react';
import archetypesData from '../data/RomanticArchetypes.json';

const questions = [
  { id: 1, text: 'Вы романтичны и любите мечтать?' },
  { id: 2, text: 'Вам важны страсть и эмоции в отношениях?' },
  { id: 3, text: 'Вы цените стабильность и надежность партнера?' },
  { id: 4, text: 'Вам нравится исследовать свои эмоции?' },
  { id: 5, text: 'Вы цените личную свободу в отношениях?' },
  { id: 6, text: 'Любите заботиться о партнере и поддерживать его?' },
  { id: 7, text: 'Вам важен интеллект и умение партнера поддерживать беседу?' },
  { id: 8, text: 'Вам важна физическая и эмоциональная близость?' },
  { id: 9, text: 'Вы склонны видеть идеальные отношения?' },
  { id: 10, text: 'Любите изучать свои чувства и границы в отношениях?' }
];

export default function RomanticProfileTest() {
  const [gender, setGender] = useState(null);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);

  const selectGender = (g) => {
    setGender(g);
    setCurrent(0);
    setAnswers([]);
    setFinished(false);
  };

  const handleAnswer = (value) => {
    setAnswers([...answers, value]);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
    }
  };

  const calculateResult = () => {
    const archetypes = archetypesData[gender];
    let bestScore = -Infinity;
    let bestArchetype = archetypes[0];

    archetypes.forEach((arch) => {
      let score = 0;
      for (let i = 0; i < answers.length; i++) {
        score += 5 - Math.abs(answers[i] - arch.weights[i]);
      }
      if (score > bestScore) {
        bestScore = score;
        bestArchetype = arch;
      }
    });

    return bestArchetype;
  };

  if (!gender) {
    return (
      <div style={{ padding: '2rem', fontFamily: 'Arial', textAlign: 'center' }}>
        <h2>Выберите свой пол для теста</h2>
        <button
          style={{ margin: '0.5rem', padding: '0.5rem 1rem' }}
          onClick={() => selectGender('female')}
        >
          Женщина
        </button>
        <button
          style={{ margin: '0.5rem', padding: '0.5rem 1rem' }}
          onClick={() => selectGender('male')}
        >
          Мужчина
        </button>
      </div>
    );
  }

  if (finished) {
    const result = calculateResult();
    return (
      <div style={{ padding: '2rem', fontFamily: 'Arial', textAlign: 'center' }}>
        <h1>Ваш романтический архетип</h1>
        <h2>{result.name} {result.symbol}</h2>
        <p>{result.description}</p>
        <p><strong>Поведение:</strong> {result.behavior}</p>
        <p><strong>Что привлекает:</strong> {result.attraction}</p>
        <p><strong>Проблемы:</strong> {result.problems}</p>
        <p><strong>Советы:</strong></p>
        <ul>
          {result.tips.map((tip, idx) => <li key={idx}>{tip}</li>)}
        </ul>

        <button
          onClick={async () => {
            try {
              const res = await fetch('/api/generate-pdf', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ testType: 'romantic', resultId: result.id })
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
              a.download = `romantic-${result.id}.pdf`;
              document.body.appendChild(a);
              a.click();
              a.remove();
            } catch (err) {
              alert("Ошибка сети: " + err.message);
            }
          }}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            backgroundColor: '#FF6B6B',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            marginTop: '20px'
          }}
        >
          Скачать PDF
        </button>
      </div>
    );
  }

  const question = questions[current];
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial', textAlign: 'center' }}>
      <h2>{question.text}</h2>
      {[1, 2, 3, 4, 5].map((opt) => (
        <button
          key={opt}
          onClick={() => handleAnswer(opt)}
          style={{ margin: '0.5rem', padding: '0.5rem 1rem' }}
        >
          {opt}
        </button>
      ))}
      <p style={{ marginTop: '1rem' }}>Выберите оценку от 1 (совсем не подходит) до 5 (полностью подходит)</p>
    </div>
  );
}