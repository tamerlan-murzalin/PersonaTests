import Head from "next/head";
import Link from "next/link";

export default function PersonalityLanding() {
  return (
    <>
      <Head>
        <title>Стиль личности — HeartCode</title>
      </Head>
      <main className="landing">
        <section className="landing__hero">
          <div className="container">
            <span className="badge">Тест • 3–5 минут</span>
            <h1>Стиль личности 🧠</h1>
            <p className="lead">
              Поймите, как вы принимаете решения, на что опираетесь и что вас
              заряжает. Результат поможет точнее выбирать задачи и роли.
            </p>
            <Link href="/personality" className="btn btn--primary">
              Начать тест
            </Link>
          </div>
        </section>

        <section className="section">
          <div className="container grid grid--2">
            <div>
              <h2>Вы узнаете</h2>
              <ul className="list">
                <li>🧩 Ваш преобладающий стиль и его сильные стороны</li>
                <li>⚠️ Типичные «слепые зоны»</li>
                <li>🤝 Советы для совместной работы</li>
                <li>📝 PDF с кратким разбором</li>
              </ul>
            </div>
            <div>
              <h2>Шаги</h2>
              <ol className="list list--ol">
                <li>Ответы на 10 вопросов</li>
                <li>Итоговый архетип</li>
                <li>PDF-отчёт после оплаты</li>
              </ol>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}