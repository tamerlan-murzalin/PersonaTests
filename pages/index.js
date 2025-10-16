import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  const tests = [
    {
      title: "Personality Test",
      description: "Узнайте, какой вы архетип личности. Этот тест поможет понять ваши сильные стороны, привычки и стиль общения.",
      page: "/personality",
      color: "#FF6B6B"
    },
    {
      title: "Career Test",
      description: "Определите свой карьерный архетип. Узнайте, какая работа и среда максимально раскрывают ваш потенциал.",
      page: "/career",
      color: "#4ECDC4"
    }
  ];

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center', padding: '2rem' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Welcome to Quiz Hub!</h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
        Выберите тест, чтобы лучше узнать себя или свой профессиональный путь. Каждый тест тщательно разработан для точной оценки.
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '2rem' }}>
        {tests.map((test, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: test.color,
              color: "#fff",
              borderRadius: '12px',
              padding: '2rem',
              width: '300px',
              cursor: 'pointer',
              boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
            onClick={() => router.push(test.page)}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.3)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';
            }}
          >
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{test.title}</h2>
            <p style={{ fontSize: '1rem' }}>{test.description}</p>
            <button
              style={{
                marginTop: '1.5rem',
                padding: '0.7rem 1.5rem',
                fontSize: '1rem',
                border: 'none',
                borderRadius: '8px',
                backgroundColor: 'rgba(255,255,255,0.9)',
                color: test.color,
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Начать тест
            </button>
          </div>
        ))}
      </div>

      <footer style={{ marginTop: '3rem', fontSize: '0.9rem', color: '#555' }}>
        © 2025 Quiz Hub. Все права защищены.
      </footer>
    </div>
  );
}