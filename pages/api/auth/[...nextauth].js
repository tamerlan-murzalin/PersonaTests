// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { createTransport } from "nodemailer";  // Для Email-провайдера

export default NextAuth({
  // Указываем провайдеров для аутентификации
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    // Настройка входа через email
    EmailProvider({
      server: process.env.EMAIL_SERVER,  // Настройки SMTP сервера
      from: process.env.EMAIL_FROM,      // Адрес отправителя для email-подтверждения
    }),
  ],

  // Страница для отображения UI
  pages: {
    signIn: '/login',  // Ссылка на страницу входа (измени на /login)
  },

  // Callback для хранения user_id в сессии
  callbacks: {
    async session(session, user) {
      // Добавляем id пользователя в сессию, чтобы его можно было использовать
      session.user.id = user.id;
      return session;
    },
  },

  // Конфигурация с базой данных для хранения сессий
  database: process.env.DATABASE_URL, // URL базы данных (например, Postgres, MongoDB)
  
  // Секрет для защиты сессий
  secret: process.env.NEXTAUTH_SECRET,

  // Дополнительные настройки
  session: {
    strategy: "jwt",  // Используем JWT для хранения сессий
  },

  // Настройки для отправки email-сообщений
  email: {
    sendVerificationRequest: async ({ identifier: email, url, provider }) => {
      const { server, from } = provider;
      const transport = createTransport(server);
      const result = await transport.sendMail({
        to: email,
        from,
        subject: "Your sign-in link for HeartCode",
        text: `Sign in to HeartCode by clicking the link below:\n\n${url}\n\n`,
        html: `<p>Sign in to HeartCode by clicking the link below:</p><p><a href="${url}">${url}</a></p>`,
      });
    },
  },
});