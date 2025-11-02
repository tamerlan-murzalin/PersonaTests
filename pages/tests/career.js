import Head from "next/head";
import Link from "next/link";

export default function CareerLanding() {
  return (
    <>
      <Head>
        <title>Карьера — HeartCode</title>
      </Head>
      <main className="landing">
        <section className="landing__hero">
          <div className="container">
            <span className="badge">Тест • 3–5 минут</span>
            <h1>Карьера 💼</h1>
            <p className="lead">
              Какие роли и типы задач вам подходят, как работать эффективнее
              и куда расти.
            </p>
            <Link href="/career" className="btn btn--primary">
              Начать тест
            </Link>
          </div>
        </section>

        <section className="section">
          <div className="container grid grid--2">
            <div>
              <h2>Результат даст</h2>
              <ul className="list">
                <li>🧭 Профиль рабочего стиля</li>
                <li>🪜 Подсказки для развития</li>
                <li>🤝 Как дополнять себя в команде</li>
                <li>📝 PDF-выжимку</li>
              </ul>
            </div>
            <div>
              <h2>Формат</h2>
              <ol className="list list--ol">
                <li>10 вопросов</li>
                <li>Итоговый профиль</li>
                <li>PDF после оплаты</li>
              </ol>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}