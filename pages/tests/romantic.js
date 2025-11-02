import Head from "next/head";
import Link from "next/link";

export default function RomanticLanding() {
  return (
    <>
      <Head>
        <title>Романтический профиль — HeartCode</title>
      </Head>
      <main className="landing">
        <section className="landing__hero">
          <div className="container">
            <span className="badge">Тест • 3–5 минут</span>
            <h1>Романтический профиль 💘</h1>
            <p className="lead">
              Узнайте свой стиль в любви: поведение в отношениях, что вас
              притягивает, что мешает и как сделать союз стабильнее.
            </p>
            <Link href="/romantic-profile-test" className="btn btn--primary">
              Начать тест
            </Link>
          </div>
        </section>

        <section className="section">
          <div className="container grid grid--2">
            <div>
              <h2>Что вы получите</h2>
              <ul className="list">
                <li>🧭 Название архетипа и краткое объяснение</li>
                <li>❤️ Поведение в отношениях и «триггеры»</li>
                <li>⚖️ Что помогает и препятствует близости</li>
                <li>📝 Персональные советы + PDF</li>
              </ul>
            </div>
            <div>
              <h2>Как это работает</h2>
              <ol className="list list--ol">
                <li>Ответьте на 10 простых вопросов</li>
                <li>Посмотрите результат на экране</li>
                <li>Оплатите и скачайте подробный PDF-отчёт</li>
              </ol>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}