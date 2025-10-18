// pages/communication.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import archetypesData from '../data/CommunicationArchetypes.json';

const questions = [
  { id: 1, text: 'Вы говорите прямо и честно?' },
  { id: 2, text: 'Вам важно слушать собеседника и понимать его?' },
  { id: 3, text: 'Вы выражаете свои эмоции в общении?' },
  { id: 4, text: 'Вы предпочитаете логические и структурированные разговоры?' },
  { id: 5, text: 'Стараетесь избегать конфликтов?' },
  { id: 6, text: 'Любите рассказывать истории и использовать примеры?' },
  { id: 7, text: 'Легко убеждаете других и отстаиваете свои взгляды?' },
  { id: 8, text: 'Сначала наблюдаете, прежде чем говорить?' },
  { id: 9, text: 'Учитываете эмоции других при общении?' },
  { id: 10, text: 'Стараетесь быть кратким и по существу?' }
];

export default function CommunicationTest() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (value) => {
    setAnswers([...answers, value]);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
    }
  };

  const calculateResult = () => {
    const archetypes = archetypesData.archetypes;
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

  if (finished) {
    const result = calculateResult();
    return (
      <div style={{ padding: '2rem', fontFamily: 'Arial', textAlign: 'center' }}>
        <h1>Ваш стиль общения</h1>
        <h2>{result.name}</h2>
        <p>{result.description}</p>
        <p><strong>Поведение:</strong> {result.behavior}</p>
        <p><strong>Проблемы:</strong> {result.problems}</p>
        <p><strong>Советы:</strong></p>
        <ul>
          {result.tips.map((tip, idx) => <li key={idx}>{tip}</li>)}
        </ul>

        <button
          onClick={() => router.push(`/download?testType=communication&resultId=${result.id}`)}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            backgroundColor: '#4ECDC4',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            marginTop: '20px'
          }}
        >
          Скачать PDF с результатом
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