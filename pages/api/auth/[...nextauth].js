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
    EmailProvider({
      server: process.env.EMAIL_SERVER,   // Настройки SMTP сервера
      from: process.env.EMAIL_FROM,       // Адрес отправителя для email-подтверждения
    }),
  ],
  
  // Страницы для отображения в процессе аутентификации (настраиваемый UI)
  pages: {
    signIn: '/auth/signin',  // Ссылка на страницу входа
  },

  // Callback для хранения user_id в сессии
  callbacks: {
    async session(session, user) {
      // Добавляем id пользователя в сессию
      session.user.id = user.id;
      return session;
    },
  },

  // Конфигурация с базой данных (если необходимо для хранения сессий)
  database: process.env.DATABASE_URL,  // Если используешь базу данных (например, MongoDB)
  secret: process.env.NEXTAUTH_SECRET, // Секрет для защиты сессий
});