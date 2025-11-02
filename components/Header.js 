// components/Header.js
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Header() {
  const [open, setOpen] = useState(false);          // мобильное меню
  const [testsOpen, setTestsOpen] = useState(false); // дропдаун "Тесты"
  const router = useRouter();

  // закрывать меню при смене маршрута
  useEffect(() => {
    const handle = () => { setOpen(false); setTestsOpen(false); };
    router.events.on("routeChangeStart", handle);
    return () => router.events.off("routeChangeStart", handle);
  }, [router.events]);

  const isActive = (href) => router.pathname === href;

  return (
    <header className="hc-header">
      <div className="hc-container hc-header__inner">
        <Link href="/" className="hc-brand" aria-label="HeartCode — на главную">
          <span className="hc-brand__logo">❤</span>
          <span className="hc-brand__text">HeartCode</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hc-nav">
          <div
            className={`hc-nav__item hc-nav__dropdown ${testsOpen ? "is-open" : ""}`}
            onMouseEnter={() => setTestsOpen(true)}
            onMouseLeave={() => setTestsOpen(false)}
          >
            <button
              className="hc-link"
              aria-haspopup="true"
              aria-expanded={testsOpen}
              onClick={() => setTestsOpen((v) => !v)}
            >
              Тесты
              <span className="hc-caret" aria-hidden>▾</span>
            </button>

            <div className="hc-dropdown" role="menu" aria-label="Список тестов">
              <Link className="hc-dropdown__link" href="/tests/romantic">Романтический 💘</Link>
              <Link className="hc-dropdown__link" href="/tests/personality">Личность 🧠</Link>
              <Link className="hc-dropdown__link" href="/tests/communication">Коммуникация 🗣️</Link>
              <Link className="hc-dropdown__link" href="/tests/career">Карьера 💼</Link>
            </div>
          </div>

          <Link className={`hc-link ${isActive("/pricing") ? "is-active" : ""}`} href="/pricing">
            Тарифы
          </Link>
          <Link className={`hc-link ${isActive("/about") ? "is-active" : ""}`} href="/about">
            О сервисе
          </Link>
        </nav>

        <div className="hc-actions">
          <Link className="hc-btn hc-btn--ghost" href="/login">Войти</Link>
          <Link className="hc-btn hc-btn--primary" href="/tests/romantic">Начать</Link>

          {/* Burger */}
          <button
            className="hc-burger"
            aria-label="Меню"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={`hc-drawer ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <div className="hc-drawer__section">
          <span className="hc-drawer__title">Тесты</span>
          <Link className="hc-drawer__link" href="/tests/romantic">Романтический 💘</Link>
          <Link className="hc-drawer__link" href="/tests/personality">Личность 🧠</Link>
          <Link className="hc-drawer__link" href="/tests/communication">Коммуникация 🗣️</Link>
          <Link className="hc-drawer__link" href="/tests/career">Карьера 💼</Link>
        </div>

        <div className="hc-drawer__section">
          <Link className="hc-drawer__link" href="/pricing">Тарифы</Link>
          <Link className="hc-drawer__link" href="/about">О сервисе</Link>
        </div>

        <div className="hc-drawer__actions">
          <Link className="hc-btn hc-btn--ghost" href="/login">Войти</Link>
          <Link className="hc-btn hc-btn--primary" href="/tests/romantic">Начать</Link>
        </div>
      </div>
    </header>
  );
}