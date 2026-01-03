import { render } from "@react-email/render";
import { Resend } from "resend";
import React from "react";

import { emailCatchAsync } from "./emailCatchAsync.ts";
import { User } from "../types/user.ts";
import AppError from "./appError.js";

import LoginNotificationEmail from "../emails/LoginNotif.tsx";
import ResetPassword from "../emails/ResetPassword.tsx";
import Welcome from "../emails/Welcome.tsx";

if (!process.env.RESEND_API_KEY) throw new AppError("RESEND_API_KEY is not defined in environment variables", 500);
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendWelcomeEmail = emailCatchAsync(async (user: User, url: string) => {
  const renderWelcome = await render(React.createElement(Welcome, { firstName: user.firstName, url }));

  if (!user.email || !process.env.EMAIL_FROM) return;

  const { data, error } = await resend.emails.send({
    from: `Resend <${process.env.EMAIL_FROM}>`,
    to: [user.email],
    subject: "Welcome to Vespera!",
    html: renderWelcome,
  });

  if (error) {
    throw new AppError("Failed to send welcome email", 500);
  }

  console.log("Email sent: ", data);
});

export const sendResetPasswordEmail = emailCatchAsync(async (user: User, url: string) => {
  const renderResetPassword = await render(React.createElement(ResetPassword, { firstName: user.firstName, url }));

  if (!user.email || !process.env.EMAIL_FROM) return;

  const { data, error } = await resend.emails.send({
    from: `Resend <${process.env.EMAIL_FROM}>`,
    to: [user.email],
    subject: "Reset your password",
    html: renderResetPassword,
  });

  if (error) {
    throw new AppError("Failed to send reset password email", 500);
  }

  console.log("Email sent: ", data);
});

export const loginNotifEmail = emailCatchAsync(async (user: User, loginDate: string, device: string) => {
  const renderLoginNotif = await render(React.createElement(LoginNotificationEmail, { username: user.username, loginDate, device }));

  if (!user.email || !process.env.EMAIL_FROM) return;

  const { data, error } = await resend.emails.send({
    from: `Resend <${process.env.EMAIL_FROM}>`,
    to: [user.email],
    subject: "New login detected",
    html: renderLoginNotif,
  });

  if (error) {
    throw new AppError("Failed to send login notification email", 500);
  }

  console.log("Email sent: ", data);
});
