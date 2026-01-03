import appError from "./appError";

export type EmailSendResult = { success: true } | { success: false; error: unknown };

export function emailCatchAsync<T extends any[]>(fn: (...args: T) => Promise<void>) {
  return async (...args: T): Promise<EmailSendResult> => {
    try {
      await fn(...args);
      return { success: true };
    } catch (err) {
      console.error("Error sending email:", err);
      throw new appError("Failed to send email", 500);
    }
  };
}
