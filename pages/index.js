// pages/index.js
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>HeartCode — Тесты личности и отношений</title>
        <meta
          name="description"
          content="4 быстрых теста с персональными PDF-отчётами: романтический профиль, стиль личности, коммуникация и карьера."
        />
      </Head>

      <main className="site">
        <section className="hero">
          <div className="container">
            <h1 className="hero__title">Раскройте свой код личности</h1>
            <p className="hero__subtitle">
              4 коротких теста → понятные результаты → персональный PDF.
            </p>
            <div className="hero__cta">
              <Link className="btn btn--primary" href="#tests">
                Выбрать тест
              </Link>
              <Link className="btn btn--ghost" href="/tests/romantic">
                Попробовать романтический 💘
              </Link>
            </div>
          </div>
        </section>

        <section id="tests" className="section">
          <div className="container">
            <h2 className="section__title">Выберите тест</h2>
            <div className="grid">
              <article className="card">
                <div className="card__icon">💘</div>
                <h3 className="card__title">Романтический профиль</h3>
                <p className="card__text">
                  Узнайте свой стиль в любви: сильные стороны, риски и советы
                  для гармоничных отношений.
                </p>
                <Link className="btn btn--block" href="/tests/romantic">
                  Открыть страницу теста
                </Link>
              </article>

              <article className="card">
                <div className="card__icon">🧠</div>
                <h3 className="card__title">Стиль личности</h3>
                <p className="card__text">
                  Узнайте, как вы принимаете решения, взаимодействуете с миром и
                  что вас заряжает.
                </p>
                <Link className="btn btn--block" href="/tests/personality">
                  Открыть страницу теста
                </Link>
              </article>

              <article className="card">
                <div className="card__icon">🗣️</div>
                <h3 className="card__title">Коммуникация</h3>
                <p className="card__text">
                  Сильные и слабые стороны в общении, типичные паттерны и
                  практические рекомендации.
                </p>
                <Link className="btn btn--block" href="/tests/communication">
                  Открыть страницу теста
                </Link>
              </article>

              <article className="card">
                <div className="card__icon">💼</div>
                <h3 className="card__title">Карьера</h3>
                <p className="card__text">
                  Ваши рабочие предпочтения, роли в команде и подсказки для роста.
                </p>
                <Link className="btn btn--block" href="/tests/career">
                  Открыть страницу теста
                </Link>
              </article>
            </div>
          </div>
        </section>

        <footer className="footer">
          <div className="container footer__inner">
            <span>© {new Date().getFullYear()} HeartCode</span>
            <nav className="footer__nav">
              <Link href="/tests/romantic">Романтический</Link>
              <Link href="/tests/personality">Личность</Link>
              <Link href="/tests/communication">Коммуникация</Link>
              <Link href="/tests/career">Карьера</Link>
            </nav>
          </div>
        </footer>
      </main>
    </>
  );
}