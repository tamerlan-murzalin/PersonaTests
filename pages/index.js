import { useState } from 'react';
import archetypesData from '../data/Archetypes.json';

const questions = [
  { id: 1, text: 'Вы любите рисковать?', options: [1, 2, 3] },
  { id: 2, text: 'Вы предпочитаете планировать вместо импровизации?', options: [1, 2, 3] },
  { id: 3, text: 'Вам нравится работать в команде?', options: [1, 2, 3] }
];

export default function Home() {
  const [gender, setGender] = useState(null); // null пока пол не выбран
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
    const archetypes = archetypesData.archetypes[gender];
    const sum = answers.reduce((acc, val) => acc + val, 0);
    const index = sum % archetypes.length;
    return archetypes[index];
  };

  // Экран выбора пола
  if (!gender) {
    return (
      <div style={{ padding: '2rem', fontFamily: 'Arial', textAlign: 'center' }}>
        <h2>Выберите свой пол для теста</h2>
        <button
          style={{ margin: '0.5rem', padding: '0.5rem 1rem' }}
          onClick={() => setGender('female')}
        >
          Женщина
        </button>
        <button
          style={{ margin: '0.5rem', padding: '0.5rem 1rem' }}
          onClick={() => setGender('male')}
        >
          Мужчина
        </button>
      </div>
    );
  }

  // Экран результата
  if (finished) {
    const result = calculateResult();
    return (
      <div style={{ padding: '2rem', fontFamily: 'Arial', textAlign: 'center' }}>
        <h1>Ваш результат архетипа</h1>
        <h2>{result.name} {result.symbol}</h2>
        <p>{result.description}</p>
      </div>
    );
  }

  // Экран текущего вопроса
  const question = questions[current];
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial', textAlign: 'center' }}>
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