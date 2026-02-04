import { LoginForm } from "@/features/auth/LoginForm";

export default function Login() {
  return (
    <div className="relative flex h-[calc(100svh-56px)] flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="absolute top-20 left-1/2 -translate-x-10 size-90 bg-red-500 rounded-full opacity-20 blur-3xl red-light-turn-on"></div>
      <div className="absolute bottom-50 right-1/2 -translate-x-10 size-60 bg-blue-500 rounded-full opacity-20 blur-3xl blue-light-turn-on"></div>

      <div className="flex w-full max-w-sm flex-col gap-6">
        <LoginForm />
      </div>
    </div>
  );
}
