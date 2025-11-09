// pages/login.js
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signIn("email", { email });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Добро пожаловать</h1>

        <button className="login-btn google" onClick={() => signIn("google")}>
          Войти через Google
        </button>

        <form className="email-form" onSubmit={handleSubmit}>
          <input
            className="email-input"
            type="email"
            placeholder="Введите ваш email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="login-btn email">
            Войти через Email
          </button>
        </form>

        <p className="info-text">Нет аккаунта? Зарегистрируйтесь через Google.</p>
      </div>
    </div>
  );
}