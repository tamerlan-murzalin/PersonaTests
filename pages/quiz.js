import { useState } from 'react';
import archetypesData from '../data/Archetypes.json';

const questions = [
  { id: 1, text: 'Вы любите рисковать?', options: [1, 2, 3] },
  { id: 2, text: 'Вы предпочитаете планировать вместо импровизации?', options: [1, 2, 3] },
  { id: 3, text: 'Вам нравится работать в команде?', options: [1, 2, 3] }
];

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);

  // Укажи здесь нужный пол: 'female' или 'male'
  const gender = 'female';

  const handleAnswer = (value) => {
    setAnswers([...answers, value]);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
    }
  };

  const calculateResult = () => {
    const archetypes = archetypesData.archetypes[gender];
    const sum = answers.reduce((acc, val) => acc + val, 0);
    const index = sum % archetypes.length;
    return archetypes[index];
  };

  if (finished) {
    const result = calculateResult();
    return (
      <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
        <h1>Ваш результат архетипа</h1>
        <h2>{result.name} {result.symbol}</h2>
        <p>{result.description}</p>
        {/* Можно добавить подробнее: behavior, attraction, tips */}
      </div>
    );
  }

  const question = questions[current];

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h2>{question.text}</h2>
      {question.options.map((opt, i) => (
        <button
          key={i}
          onClick={() => handleAnswer(opt)}
          style={{ margin: '0.5rem', padding: '0.5rem 1rem' }}
        >
          Option {opt}
        </button>
      ))}
    </div>
  );
}