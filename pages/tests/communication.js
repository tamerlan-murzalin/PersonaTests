import Head from "next/head";
import Link from "next/link";

export default function CommunicationLanding() {
  return (
    <>
      <Head>
        <title>Коммуникация — HeartCode</title>
      </Head>
      <main className="landing">
        <section className="landing__hero">
          <div className="container">
            <span className="badge">Тест • 3–5 минут</span>
            <h1>Коммуникация 🗣️</h1>
            <p className="lead">
              Сильные и слабые стороны в общении: где вы убеждаете, а где вас
              не слышат. Получите практические подсказки.
            </p>
            <Link href="/communication" className="btn btn--primary">
              Начать тест
            </Link>
          </div>
        </section>

        <section className="section">
          <div className="container grid grid--2">
            <div>
              <h2>Что внутри результата</h2>
              <ul className="list">
                <li>🎯 Краткий профиль общения</li>
                <li>🚧 Типичные ошибки и как их обходить</li>
                <li>🤝 Советы для переговоров и командной работы</li>
                <li>📝 PDF-резюме</li>
              </ul>
            </div>
            <div>
              <h2>Как пройти</h2>
              <ol className="list list--ol">
                <li>Ответьте на вопросы</li>
                <li>Увидьте результат</li>
                <li>Оформите PDF</li>
              </ol>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}