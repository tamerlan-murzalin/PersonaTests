// components/Footer.js
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="hc-footer">
      <div className="hc-container hc-footer__inner">
        <span>© {new Date().getFullYear()} HeartCode</span>
        <nav className="hc-footer__nav">
          <Link href="/tests/romantic">Романтический</Link>
          <Link href="/tests/personality">Личность</Link>
          <Link href="/tests/communication">Коммуникация</Link>
          <Link href="/tests/career">Карьера</Link>
          <Link href="/pricing">Тарифы</Link>
          <Link href="/about">О сервисе</Link>
          <Link href="/privacy">Политика</Link>
          <Link href="/terms">Оферта</Link>
        </nav>
      </div>
    </footer>
  );
}