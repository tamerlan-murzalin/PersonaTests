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

export default function PersonalityTest() {
  const router = useRouter();
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
    setAnswers((prev) => [...prev, value]);
    if (current + 1 < questions.length) {
      setCurrent((c) => c + 1);
    } else {
      setFinished(true);
    }
  };

  // Вычисляем лучший архетип по близости к weights
  const calculateResult = () => {
    const list = archetypesData.archetypes[gender] || [];
    let bestScore = -Infinity;
    let best = list[0];

    list.forEach((arch) => {
      let score = 0;
      for (let i = 0; i < answers.length; i++) {
        score += 5 - Math.abs(answers[i] - arch.weights[i]);
      }
      if (score > bestScore) {
        bestScore = score;
        best = arch;
      }
    });

    return best;
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
    const list = archetypesData.archetypes[gender] || [];
    // Важно: используем ИНДЕКС как resultId (в этом файле нет id в JSON)
    let idx = list.findIndex((a) => a.name === result.name);
    if (idx < 0) idx = 0;

    return (
      <div style={{ padding: '2rem', fontFamily: 'Arial', textAlign: 'center' }}>
        <h1>Ваш результат архетипа</h1>
        <h2>{result.name} {result.symbol}</h2>
        <p>{result.description}</p>

        {result.behavior && <p><strong>Поведение:</strong> {result.behavior}</p>}
        {result.attraction && <p><strong>Что привлекает:</strong> {result.attraction}</p>}
        {result.problems && <p><strong>Что может мешать:</strong> {result.problems}</p>}

        {Array.isArray(result.tips) && result.tips.length > 0 && (
          <>
            <p><strong>Советы:</strong></p>
            <ul>
              {result.tips.map((tip, i) => <li key={i}>{tip}</li>)}
            </ul>
          </>
        )}

        <button
          onClick={() =>
            router.push(`/download?testType=personality&resultId=${idx}&gender=${gender}`)
          }
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