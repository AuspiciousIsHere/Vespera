import ResetPasswordForm from "@/features/auth/ResetPasswordForm";
import { useParams } from "react-router";

export default function ResetPasswordPage() {
  const { token } = useParams();

  console.log(token);

  return (
    <div className="flex h-[calc(100svh-56px)] flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <ResetPasswordForm />
      </div>
    </div>
  );
}
