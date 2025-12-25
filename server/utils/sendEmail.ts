import { render } from "@react-email/render";
import { Resend } from "resend";
import React from "react";

import { emailCatchAsync } from "./emailCatchAsync.ts";
import ResetPassword from "../emails/ResetPassword.tsx";
import Welcome from "../emails/Welcome.tsx";
import { User } from "../types/user.ts";
import AppError from "./appError.js";

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

export async function sendResetPasswordEmail(user: User, url: string) {
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
}
