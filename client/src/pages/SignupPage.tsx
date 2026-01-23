import { SignupForm } from "@/features/auth/SignupForm";

export default function Signup() {
  return (
    <div className="flex h-[calc(100svh-56px)] flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="absolute top-40 right-1/2 -translate-x-10 size-100 bg-amber-500 rounded-full opacity-10 blur-3xl amber-light-turn-on"></div>
      <div className="absolute bottom-40 left-1/2 translate-x-30 size-80 bg-emerald-500 rounded-full opacity-20 blur-3xl emerald-light-turn-on"></div>

      <div className="flex w-full max-w-sm flex-col items-center justify-center gap-6">
        <SignupForm />
      </div>
    </div>
  );
}
