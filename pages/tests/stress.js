// pages/tests/stress.js
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";

// ── Архетипы со weights (совместимо с твоей логикой под "романтик")
const STRESS_PROFILES = [
  {
    id: 1,
    key: "anchor",
    name: "Спокойный Якорь",
    symbol: "⚓",
    weights: [1, 1, 2, 1, 1, 2, 2, 1, 1, 1],
    description:
      "Вы в целом хорошо распознаёте сигналы усталости и умеете возвращать себе баланс. Ваши ритуалы — сон, движение, короткие паузы — работают как система стабилизации.\n\nИногда вы можете недооценивать накопление микростресса: внешне всё спокойно, но внутри постепенно накапливается напряжение. Регулярный «аудит энергии» помогает поймать момент раньше, чем он перейдёт в перегруз.",
    behavior:
      "Соблюдаете базовую гигиену нагрузки: планируете день, защищаете фокус-времена, умеете говорить «нет» лишнему. В стрессовые периоды сохраняете рутину, а не бросаетесь в компенсаторные рывки.",
    attraction:
      "Стабильность, предсказуемость, спокойная коммуникация, способность быть опорой в команде и отношениях.",
    problems:
      "Склонность «переоценивать свою устойчивость»: переносить отдых, откладывать диагностику симптомов, не замечать растущую цену маленьких уступок режиму.",
    tips: [
      "Раз в неделю — длинное восстановление: +1 час сна, прогулка без гаджетов, лёгкая растяжка.",
      "Правило 50/10: 50 минут фокуса, 10 минут переключения (движение, вода, взгляд вдаль).",
      "Ежедневный «чекап энергии»: что дало/забрало силы (по 3 пункта).",
      "Уведомления пакетами: проверка 3–4 раза в день, а не по событию.",
      "Оставляйте 15% буфера в плане дня — на непредвиденное.",
      "Раз в квартал — мини-ретрит на полдня: пересоберите цели и рутину.",
      "Сон как якорь: стабилизируйте подъём/отбой в пределах ±30 минут.",
      "Лёгкая нагрузка каждый день: 6–8 тысяч шагов или 20–30 минут прогулки."
    ]
  },
  {
    id: 2,
    key: "balancer",
    name: "Балансир",
    symbol: "⚖️",
    weights: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    description:
      "Ваш ритм волнообразный: периоды хорошего фокуса сменяются всплесками стресса. Режим и границы есть, но их «сносит» дедлайнами и внешним давлением.\n\nКлючевая задача — выровнять базовые якоря (сон, еда, движение) и стабилизировать переключения, чтобы снизить амплитуду колебаний.",
    behavior:
      "Работаете рывками, берёте на себя чуть больше нормы, затем откатываетесь в прокрастинацию. В быстрой фазе пренебрегаете перерывами, в фазе спада — ругаете себя и теряете тонус.",
    attraction:
      "Гибкость, адаптивность, скорость в спринтах, умение поддерживать темп команды в сложные периоды.",
    problems:
      "Скачки режима → дробный сон, хаотичное питание, чувство вины, которое дополнительно отнимает энергию.",
    tips: [
      "Фикс-якоря: подъём/сон/еда в коридоре ±30 минут ежедневно.",
      "Два слота «без уведомлений» по 90 минут для глубокой работы.",
      "Ритм 90/15: 90 минут фокуса + 15 минут восстановления (движение/дыхание).",
      "План «минимума» на дни спада: 3 приоритета, всё остальное — бонус.",
      "Еженедельный разбор: где сорвало режим и как поставить «упор» на след. неделе.",
      "Заранее готовьте «еду-буфер»: полезные перекусы и воду под рукой.",
      "Соцсети по расписанию: 2 окна по 10–15 минут, не «по чувству».",
      "Микрорадости каждый день: 10–20 минут на хобби/общение оффлайн."
    ]
  },
  {
    id: 3,
    key: "achiever",
    name: "Перегруженный Достигатор",
    symbol: "🔥",
    weights: [4, 4, 4, 3, 4, 5, 4, 4, 3, 4],
    description:
      "Высокая планка и ответственность делают вас драйвером результатов — но цена перегруза растёт. Ресурсы восстанавливаются медленнее, чем тратятся, и мозг всё чаще работает «на красной зоне».\n\nСтратегия — целенаправленно урезать лишнее, делегировать и нормализовать отдых, чтобы производительность стала устойчивой, а не «за счёт себя будущего».",
    behavior:
      "Тянете много параллелей, держите контроль, отдых вызывает чувство вины. Часто повышаете обороты вместо пересборки плана.",
    attraction:
      "Драйв, системность, лидерство, способность доводить сложные вещи до результата.",
    problems:
      "Хроническая усталость, раздражительность, ухудшение сна/внимания, растущее «вечно мало».",
    tips: [
      "Правило «минус 20%»: урежьте дневной план на 1–2 задачи — ежедневно.",
      "Список делегирования: 3 пункта, которые можно отдать в течение недели.",
      "Жёсткие окна фокуса: 2×90 минут без чатов, потом пакетная обработка входящих.",
      "Ежедневный «санитайзер экрана»: 30–40 минут без устройств перед сном.",
      "Три уровня дня: максимум (амбиции), базовый (реальность), минимум (на случай форс-мажора).",
      "Еженедельный «день без созвонов» или хотя бы полдня — для глубокой работы/восстановления.",
      "Нормализуйте питание/воду: держите бутылку на столе, перекусы — спланированы.",
      "Физическая разгрузка 3×в неделю: прогулка/йога/силовая 20–40 минут."
    ]
  },
  {
    id: 4,
    key: "edge",
    name: "На Грани",
    symbol: "🚨",
    weights: [5, 5, 5, 4, 4, 5, 5, 5, 4, 5],
    description:
      "Есть признаки истощения: тяжело просыпаться, снижается мотивация и интерес к привычным делам, тело реагирует стрессом. Важно перейти в режим щадящего восстановления и подключить поддержку.\n\nЦель на ближайшие недели — стабилизировать базовые функции (сон, питание, движение), снизить требования к себе и мягко вернуть ощущение ресурса.",
    behavior:
      "Избегаете сложных задач и разговоров, тянетесь к бесконечному скроллингу или «залипанию». Становится трудно планировать и удерживать внимание.",
    attraction:
      "Глубина, эмпатия, творческий взгляд — всё это вернётся по мере восстановления и снижения стресса.",
    problems:
      "Риск «заморозки», самокритики и социального избегания; ухудшение сна/аппетита, соматические симптомы.",
    tips: [
      "Минимальный режим на 14 дней: сон 7–8 ч, 2 прогулки по 15 минут, вода.",
      "Список «3 приоритета в день» — не больше; остальное — завтра.",
      "Экран-детокс за 2 часа до сна: бумажная книга, тёплый душ, мягкая растяжка.",
      "Опора-люди: договоритесь о нейтральной поддержке (друг/ментор).",
      "Тёплая еда и регулярность приёмов пищи — даже небольшими порциями.",
      "Лёгкая физическая активность вместо нулевой: 5–10 минут достаточно.",
      "Отслеживайте улучшения: даже +5% — это прогресс, а не «всё или ничего».",
      "Если симптомы сохраняются или усиливаются — обратитесь к специалисту (психолог/врач)."
    ]
  }
];

// ── 10 вопросов Лайкерта (1–5)
const QUESTIONS = [
  "После работы/учёбы мне трудно расслабиться.",
  "Я часто просыпаюсь уставшим/уставшей или никак не могу выспаться.",
  "Часто раздражаюсь по мелочам.",
  "Прокрастинирую из-за перегруза и не знаю, с чего начать.",
  "Постоянно проверяю уведомления, даже когда это мешает фокусу.",
  "У меня ощущение, что задач больше, чем я успеваю сделать.",
  "Трудно держать режим сна/еды/перерывов стабильно.",
  "Замечаю напряжение в теле (шея/плечи/челюсть) или головные боли.",
  "Стал(а) избегать сложных разговоров/встреч из-за усталости.",
  "За последние 2 недели часто чувствовал(а) истощение/апатию."
];

const SCALE = [
  { value: 1, label: "Никогда" },
  { value: 2, label: "Редко" },
  { value: 3, label: "Иногда" },
  { value: 4, label: "Часто" },
  { value: 5, label: "Почти всегда" }
];

// ── Подбор профиля по близости к векторам weights
function pickProfileByWeights(answers, profiles) {
  let best = null;
  let bestScore = Infinity; // минимальная дистанция — лучший матч

  for (const p of profiles) {
    if (!p.weights || p.weights.length !== answers.length) continue;
    const dist = answers.reduce(
      (acc, val, idx) => acc + Math.abs(Number(val) - Number(p.weights[idx])),
      0
    );
    if (dist < bestScore) {
      bestScore = dist;
      best = p;
    }
  }
  return best;
}

export default function StressTestPage() {
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);

  const answeredCount = answers.filter((v) => v !== null).length;

  const handleChange = (qIndex, value) => {
    const next = [...answers];
    next[qIndex] = value;
    setAnswers(next);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answers.some((v) => v === null)) return;
    const total = answers.reduce((s, v) => s + Number(v), 0); // просто инфо-показатель
    const profile = pickProfileByWeights(answers, STRESS_PROFILES);
    setResult({ total, profile });
    setSubmitted(true);
    // TODO: сюда позже можно добавить сохранение в БД / оплату / генерацию PDF
  };

  const resetForm = () => {
    setAnswers(Array(QUESTIONS.length).fill(null));
    setSubmitted(false);
    setResult(null);
  };

  return (
    <>
      <Head>
        <title>Тест «Стресс и риск выгорания» — HeartCode</title>
        <meta
          name="description"
          content="Короткий скрининг на 10 вопросов: уровень стресса, типичные реакции и рекомендации на 7 дней."
        />
      </Head>

      {/* Hero секция */}
      <section className="landing__hero">
        <div className="hc-container">
          <span className="badge">Новый тест</span>
          <h1 className="hero__title">Тест «Стресс и риск выгорания»</h1>
          <p className="lead">
            10 вопросов — и вы узнаете свой текущий стресс-профиль. Получите
            простые шаги, чтобы снизить перегрузку и вернуть энергию.
          </p>
          <div className="hero__cta">
            <a href="#quiz" className="btn btn--primary">Начать (3–4 мин)</a>
            <Link href="/pricing" className="btn btn--ghost">Цены</Link>
          </div>
          <p className="hc-trust">Не является медицинской диагностикой.</p>
        </div>
      </section>

      {/* Основной блок с тестом */}
      <main id="quiz" className="section">
        <div className="hc-container">
          {!submitted && (
            <form className="card" onSubmit={handleSubmit}>
              <h2 className="card__title" style={{ marginBottom: 6 }}>
                Ответьте на вопросы
              </h2>
              <p className="card__text" style={{ marginBottom: 14 }}>
                Пожалуйста, отметьте, как часто это было про вас за последние 2 недели.
              </p>

              <div className="hc-grid" style={{ gap: 16 }}>
                {QUESTIONS.map((q, qi) => (
                  <div key={qi} className="hc-feature" style={{ padding: 14 }}>
                    <p style={{ margin: "0 0 10px" }}>
                      <strong>{qi + 1}. </strong>{q}
                    </p>
                    <div style={{ display: "grid", gap: 8 }}>
                      {SCALE.map(({ value, label }) => (
                        <label
                          key={value}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            cursor: "pointer"
                          }}
                        >
                          <input
                            required
                            type="radio"
                            name={`q${qi}`}
                            value={value}
                            checked={answers[qi] === value}
                            onChange={() => handleChange(qi, value)}
                          />
                          <span>{label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 16,
                  gap: 10
                }}
              >
                <span className="badge">
                  Прогресс: {answeredCount}/{QUESTIONS.length}
                </span>
                <div style={{ display: "flex", gap: 10 }}>
                  <button type="button" className="btn" onClick={resetForm}>
                    Сбросить
                  </button>
                  <button
                    type="submit"
                    className="btn btn--primary"
                    disabled={answeredCount !== QUESTIONS.length}
                    title={
                      answeredCount !== QUESTIONS.length
                        ? "Ответьте на все вопросы"
                        : "Показать результат"
                    }
                  >
                    Показать результат
                  </button>
                </div>
              </div>
            </form>
          )}

          {submitted && result && (
            <article className="card" style={{ marginTop: 12 }}>
              <header style={{ marginBottom: 10 }}>
                <span className="badge">Ваш балл (сумма ответов): {result.total} из 50</span>
                <h2 className="card__title" style={{ marginTop: 10 }}>
                  Ваш профиль: {result.profile.symbol} {result.profile.name}
                </h2>
              </header>

              <section className="hc-grid" style={{ gap: 16 }}>
                <div className="hc-feature">
                  <h3 className="hc-feature__title">Описание</h3>
                  <p className="hc-feature__text" style={{ whiteSpace: "pre-line" }}>
                    {result.profile.description}
                  </p>
                </div>
                <div className="hc-feature">
                  <h3 className="hc-feature__title">Поведение</h3>
                  <p className="hc-feature__text">{result.profile.behavior}</p>
                </div>
                <div className="hc-feature">
                  <h3 className="hc-feature__title">Сильные стороны</h3>
                  <p className="hc-feature__text">{result.profile.attraction}</p>
                </div>
                <div className="hc-feature">
                  <h3 className="hc-feature__title">Что может мешать</h3>
                  <p className="hc-feature__text">{result.profile.problems}</p>
                </div>
              </section>

              <section className="hc-section">
                <h3 className="hc-h2">Советы на 7 дней</h3>
                <ul className="list">
                  {result.profile.tips.map((t, i) => (
                    <li key={i} style={{ marginBottom: 6 }}>{t}</li>
                  ))}
                </ul>
              </section>

              <footer style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button className="btn" onClick={resetForm}>Пройти заново</button>
                <Link href="/pricing" className="btn btn--primary">
                  Получить полный PDF
                </Link>
              </footer>
            </article>
          )}
        </div>

        <div className="hc-container" style={{ marginTop: 18 }}>
          <p className="hc-quote">
            <strong>Важно:</strong> этот тест — скрининг. Он не заменяет консультацию
            специалиста. Если симптомы затяжные или ухудшаются — обратитесь к врачу/психологу.
          </p>
        </div>
      </main>
    </>
  );
}