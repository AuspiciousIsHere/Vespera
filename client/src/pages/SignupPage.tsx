import { SignupForm } from "@/features/auth/SignupForm";

export default function Signup() {
  return (
    <div className="flex h-[calc(100svh-56px)] flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col items-center justify-center gap-6">
        <SignupForm />
      </div>
    </div>
  );
}
