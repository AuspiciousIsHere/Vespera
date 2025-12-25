import ForgetPasswordEmail from "@/features/auth/ForgetPasswordEmail";

export default function ForgetPasswordPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <ForgetPasswordEmail />
      </div>
    </div>
  );
}
