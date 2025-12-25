import { LoginForm } from "@/features/auth/LoginForm";

export default function Login() {
  return (
    <div className="flex h-[calc(100svh-56px)] flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <LoginForm />
      </div>
    </div>
  );
}
