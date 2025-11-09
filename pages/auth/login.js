// pages/auth/signin.js
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signIn("email", { email });
  };

  return (
    <div>
      <h1>Войти в систему</h1>
      <button onClick={() => signIn("google")}>Войти через Google</button>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Введите ваш email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Войти через Email</button>
      </form>
    </div>
  );
}