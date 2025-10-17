import { useState } from 'react';
import { useRouter } from 'next/router';
import archetypesData from '../data/RomanticArchetypes.json';

const questions = [
  { id: 1, text: 'В отношениях ты предпочитаешь стабильность или приключения?' },
  { id: 2, text: 'Тебе важно, чтобы партнёр уделял много времени совместным активностям?' },
  { id: 3, text: 'Ты выражаешь любовь больше через поступки, чем словами?' },
  { id: 4, text: 'Тебе легко принимать спонтанные решения вместе с партнёром?' },
  { id: 5, text: 'Ты стремишься брать на себя ответственность и заботиться о бытовых вопросах?' },
  { id: 6, text: 'Как часто ты действуешь, а не долго думаешь в решениях о паре?' },
  { id: 7, text: 'Тебе важно эмоциональное тепло и поддержка в отношениях?' },
  { id: 8, text: 'Нравится ли тебе быть источником вдохновения и драйва для партнёра?' },
  { id: 9, text: 'Ты склонен анализировать поведение партнёра и строить планы?' },
  { id: 10, text: 'Ты готов меняться ради долгосрочных целей пары?' }
];

export default function RomanticProfileTest() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (value) => {
    setAnswers(prev => [...prev, value]);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
    }
  };

  const calculateResult = () => {
    const archetypes = archetypesData.archetypes;
    let bestScore = -Infinity;
    let best = archetypes[0];

    archetypes.forEach((arch) => {
      let score = 0;
      for (let i = 0; i < answers.length; i++) {
        const w = (arch.weights && arch.weights[i]) ? arch.weights[i] : 3;
        score += (5 - Math.abs(answers[i] - w));
      }
      if (score > bestScore) {
        bestScore = score;
        best = arch;
      }
    });

    return best;
  };

  if (finished) {
    const result = calculateResult();
    return (
      <div style={{ padding: '2rem', fontFamily: 'Arial', textAlign: 'center' }}>
        <h1>Ваш Romantic Profile</h1>
        <h2>{result.name} {result.symbol}</h2>
        <p>{result.description}</p>

        <p><strong>Поведение:</strong> {result.behavior}</p>
        <p><strong>Проблемы:</strong> {result.problems}</p>

        <h3>Советы</h3>
        <ul style={{ textAlign: 'left', display: 'inline-block', marginTop: '0.5rem' }}>
          {result.tips.map((t, i) => <li key={i}>{t}</li>)}
        </ul>

        <div style={{ marginTop: '20px' }}>
          <button
            onClick={() => router.push(`/download?type=romantic&result=${encodeURIComponent(result.name)}`)}
            style={{ marginRight: '10px', padding: '10px 16px' }}
          >
            Скачать PDF с результатом
          </button>

          <button
            onClick={() => {
              setCurrent(0);
              setAnswers([]);
              setFinished(false);
            }}
            style={{ padding: '10px 16px' }}
          >
            Пройти снова
          </button>
        </div>
      </div>
    );
  }

  const q = questions[current];

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial', textAlign: 'center' }}>
      <h2>Вопрос {current + 1} / {questions.length}</h2>
      <h3 style={{ marginTop: '0.5rem' }}>{q.text}</h3>

      <div style={{ marginTop: '1rem' }}>
        {[1,2,3,4,5].map((n) => (
          <button
            key={n}
            onClick={() => handleAnswer(n)}
            style={{ margin: '0.4rem', padding: '0.6rem 1rem' }}
          >
            {n}
          </button>
        ))}
      </div>

      <div style={{ marginTop: '1rem', color: '#666' }}>
        <small>1 — совсем не подходит, 3 — нейтрально, 5 — полностью подходит</small>
      </div>
    </div>
  );
}