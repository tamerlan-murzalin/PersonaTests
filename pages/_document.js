// pages/_document.js
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ru">
      <Head>
        {/* Base SEO */}
        <meta name="theme-color" content="#0b0d10" />
        <meta name="color-scheme" content="dark" />
        <meta
          name="description"
          content="HeartCode — короткие психологические тесты и персональные PDF-отчёты: романтика, личность, коммуникация, карьера."
        />

        {/* Open Graph / Social */}
        <meta property="og:site_name" content="HeartCode" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="HeartCode — Раскройте свой код личности" />
        <meta
          property="og:description"
          content="4 быстрых теста → понятные результаты → персональный PDF."
        />
        <meta property="og:image" content="/og-default.png" />
        <meta property="og:url" content="https://your-domain.example" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="HeartCode — Раскройте свой код личности" />
        <meta
          name="twitter:description"
          content="4 быстрых теста → понятные результаты → персональный PDF."
        />
        <meta name="twitter:image" content="/og-default.png" />

        {/* Icons / Manifest */}
        {/* Use ICO as primary to avoid 404 if favicon.svg is missing */}
        <link rel="icon" href="/favicon.ico" />
        {/* If you later add /public/favicon.svg, you can enable this line:
            <link rel="icon" href="/favicon.svg" type="image/svg+xml" /> */}
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="canonical" href="https://your-domain.example" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}