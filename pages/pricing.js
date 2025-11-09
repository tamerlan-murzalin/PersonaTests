// pages/pricing.js
export default function Pricing() {
  return (
    <div className="pricing-container">
      <div className="pricing-card">
        <h1>Тарифы HeartCode</h1>
        <p className="pricing-subtitle">
          Получите доступ к тестам по доступной цене и получите
          подробные PDF-отчёты, которые помогут вам узнать себя и улучшить жизнь!
        </p>

        <div className="pricing-table">
          <div className="pricing-option">
            <h2>Один тест</h2>
            <p>Выберите один тест из списка</p>
            <span className="pricing-price">99₽</span>
            <p className="pricing-description">
              Пройдите любой из 4 доступных тестов: Романтический, Личность, Коммуникация, Карьера.
            </p>
            <button className="pricing-btn">Оплатить и пройти тест</button>
          </div>

          <div className="pricing-option">
            <h2>Подписка на все тесты</h2>
            <p>Неограниченный доступ к всем тестам за месяц</p>
            <span className="pricing-price">299₽ / месяц</span>
            <p className="pricing-description">
              Получите полный доступ ко всем 4 тестам и дополнительным бонусам. Пройдите неограниченное количество тестов в течение месяца.
            </p>
            <button className="pricing-btn">Подписаться</button>
          </div>

          <div className="pricing-option">
            <h2>Годовая подписка</h2>
            <p>Неограниченный доступ на год</p>
            <span className="pricing-price">1999₽ / год</span>
            <p className="pricing-description">
              Оплата на год с большими скидками и доступом ко всем текущим и новым тестам.
            </p>
            <button className="pricing-btn">Подписаться</button>
          </div>
        </div>
      </div>
    </div>
  );
}