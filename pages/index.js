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
          content="4 быстрых теста → понятные результаты → персональный PDF. Романтический профиль, стиль личности, коммуникация и карьера."
        />
      </Head>

      <main className="hc-home">
        {/* HERO */}
        <section className="hc-hero">
          <div className="hc-hero__bg" />
          <div className="hc-container hc-hero__inner">
            <div className="hc-hero__left">
              <span className="hc-badge">Быстро • 10 вопросов • PDF</span>
              <h1 className="hc-hero__title">
                Раскройте <span className="hc-gradient">свой код личности</span>
              </h1>
              <p className="hc-hero__subtitle">
                Получите ясный профиль и персональные советы.
                Всего за несколько минут — с красивым PDF-отчётом.
              </p>
              <div className="hc-hero__cta">
                <Link className="hc-btn hc-btn--primary" href="/tests/romantic">
                  Пройти романтический тест
                </Link>
                <Link className="hc-btn hc-btn--ghost" href="#tests">
                  Выбрать другой тест
                </Link>
              </div>
              <div className="hc-trust">
                <span>Без воды • Понятные советы • Готовый PDF</span>
              </div>
            </div>

            <div className="hc-hero__right">
              {/* Превью PDF (макет) */}
              <div className="hc-preview">
                <div className="hc-preview__header">
                  <div className="hc-dot" /><div className="hc-dot" /><div className="hc-dot" />
                </div>
                <div className="hc-preview__body">
                  <div className="hc-skeleton hc-skeleton--title" />
                  <div className="hc-skeleton hc-skeleton--line" />
                  <div className="hc-skeleton hc-skeleton--line" />
                  <div className="hc-skeleton hc-skeleton--line" />
                  <div className="hc-skeleton hc-skeleton--subtitle" />
                  <div className="hc-skeleton hc-skeleton--bullets">
                    <span /><span /><span />
                  </div>
                </div>
                <div className="hc-preview__footer">PDF • Пример отчёта</div>
              </div>
            </div>
          </div>
        </section>

        {/* BENEFITS */}
        <section className="hc-section">
          <div className="hc-container">
            <div className="hc-grid hc-grid--3">
              <div className="hc-feature">
                <div className="hc-feature__icon">⚡</div>
                <h3 className="hc-feature__title">Быстро</h3>
                <p className="hc-feature__text">10 вопросов и готово — результат на экране.</p>
              </div>
              <div className="hc-feature">
                <div className="hc-feature__icon">📄</div>
                <h3 className="hc-feature__title">Красивый PDF</h3>
                <p className="hc-feature__text">Отчёт с описанием, рисками и советами.</p>
              </div>
              <div className="hc-feature">
                <div className="hc-feature__icon">🧭</div>
                <h3 className="hc-feature__title">Полезно</h3>
                <p className="hc-feature__text">Чёткие рекомендации без «воды».</p>
              </div>
            </div>
          </div>
        </section>

        {/* TEST CARDS */}
        <section id="tests" className="hc-section">
          <div className="hc-container">
            <h2 className="hc-h2">Выберите тест</h2>
            <div className="hc-grid hc-grid--4">
              <article className="hc-card">
                <div className="hc-card__icon">💘</div>
                <h3 className="hc-card__title">Романтический профиль</h3>
                <p className="hc-card__text">Стиль в любви: сильные стороны, риски и советы.</p>
                <Link className="hc-btn hc-btn--block" href="/tests/romantic">Открыть страницу теста</Link>
              </article>

              <article className="hc-card">
                <div className="hc-card__icon">🧠</div>
                <h3 className="hc-card__title">Стиль личности</h3>
                <p className="hc-card__text">Как вы принимаете решения и что вас заряжает.</p>
                <Link className="hc-btn hc-btn--block" href="/tests/personality">Открыть страницу теста</Link>
              </article>

              <article className="hc-card">
                <div className="hc-card__icon">🗣️</div>
                <h3 className="hc-card__title">Коммуникация</h3>
                <p className="hc-card__text">Сильные/слабые стороны общения и подсказки.</p>
                <Link className="hc-btn hc-btn--block" href="/tests/communication">Открыть страницу теста</Link>
              </article>

              <article className="hc-card">
                <div className="hc-card__icon">💼</div>
                <h3 className="hc-card__title">Карьера</h3>
                <p className="hc-card__text">Рабочие предпочтения и как расти быстрее.</p>
                <Link className="hc-btn hc-btn--block" href="/tests/career">Открыть страницу теста</Link>
              </article>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="hc-section">
          <div className="hc-container">
            <h2 className="hc-h2">Как это работает</h2>
            <div className="hc-steps">
              <div className="hc-step"><span>1</span><p>Выбираете тест</p></div>
              <div className="hc-step"><span>2</span><p>Отвечаете на вопросы</p></div>
              <div className="hc-step"><span>3</span><p>Смотрите результат</p></div>
              <div className="hc-step"><span>4</span><p>Оплачиваете и получаете PDF</p></div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="hc-section">
          <div className="hc-container">
            <h2 className="hc-h2">Отзывы</h2>
            <div className="hc-grid hc-grid--3">
              <blockquote className="hc-quote">
                <p>«Точно описало, где мы спотыкаемся. Советы — в точку!»</p>
                <footer>— Е., 27 лет</footer>
              </blockquote>
              <blockquote className="hc-quote">
                <p>«PDF аккуратный, отправила партнёру — начали обсуждать без споров.»</p>
                <footer>— А., 31 год</footer>
              </blockquote>
              <blockquote className="hc-quote">
                <p>«Прошёл все 4 теста — реально помогает понять себя и задачи на работе.»</p>
                <footer>— Т., 24 года</footer>
              </blockquote>
            </div>
          </div>
        </section>

        {/* FAQ + CTA */}
        <section className="hc-section">
          <div className="hc-container hc-faq">
            <div className="hc-faq__list">
              <h2 className="hc-h2">FAQ</h2>
              <details open>
                <summary>Сколько это занимает времени?</summary>
                <p>Обычно 3–5 минут на тест. Сразу после — результат на экране.</p>
              </details>
              <details>
                <summary>PDF можно сохранить и переслать?</summary>
                <p>Да, это ваш персональный файл: сохраняйте и делитесь.</p>
              </details>
              <details>
                <summary>Нужна регистрация?</summary>
                <p>Пока нет. Позже добавим аккаунты и историю результатов.</p>
              </details>
            </div>

            <div className="hc-cta">
              <h3>Готовы попробовать?</h3>
              <p>Начните с романтического профиля — самый популярный.</p>
              <Link className="hc-btn hc-btn--primary hc-btn--block" href="/tests/romantic">
                Пройти романтический тест
              </Link>
              <Link className="hc-btn hc-btn--ghost hc-btn--block" href="#tests">
                Смотреть все тесты
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}