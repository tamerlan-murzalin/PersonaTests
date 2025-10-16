import { useState } from 'react';
import { useRouter } from 'next/router';
import archetypesData from '../data/Archetypes.json';

const questions = [
  { id: 1, text: 'Вы любите рисковать?' },
  { id: 2, text: 'Вы предпочитаете планировать вместо импровизации?' },
  { id: 3, text: 'Вам нравится работать в команде?' },
  { id: 4, text: 'Вы легко адаптируетесь к изменениям?' },
  { id: 5, text: 'Вы стремитесь к лидерству?' },
  { id: 6, text: 'Вы часто принимаете решения быстро?' },
  { id: 7, text: 'Вы предпочитаете спокойствие вместо хаоса?' },
  { id: 8, text: 'Вам нравится внимание со стороны других?' },
  { id: 9, text: 'Вы считаете себя эмоциональным человеком?' },
  { id: 10, text: 'Вы чаще действуете, чем долго думаете?' }
];

export default function Home() {
  const router = useRouter();
  const [gender, setGender] = useState(null);
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
    const avg = answers.reduce((acc, val) => acc + val, 0) / answers.length;

    let index = 0;
    if (archetypes.length === 1) {
      index = 0;
    } else if (archetypes.length === 2) {
      index = avg >= 3 ? 1 : 0;
    } else {
      if (avg < 2.5) index = 0;
      else if (avg < 3.5) index = 1;
      else index = 2;
    }

    return archetypes[index];
  };

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

  if (finished) {
    const result = calculateResult();
    return (
      <div style={{ padding: '2rem', fontFamily: 'Arial', textAlign: 'center' }}>
        <h1>Ваш результат архетипа</h1>
        <h2>{result.name} {result.symbol}</h2>
        <p>{result.description}</p>

        <button
          onClick={() => router.push(`/download?gender=${gender}`)}
          style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px' }}
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
    </div>
  );
}