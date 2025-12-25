import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ResetPasswordFormInputs } from "@/types/auth";
import { Field, FieldLabel } from "@/components/ui/field";
import useResetPassword from "./hooks/useResetPassword";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function ResetPasswordForm({ className, ...props }: React.ComponentProps<"div">) {
  const { register, handleSubmit } = useForm<ResetPasswordFormInputs>();
  const { isPending: isResetingPassword, mutate: resetPassword } = useResetPassword();
  const { token } = useParams();
  const navigate = useNavigate();

  if (!token) {
    navigate("/404");
    return;
  }

  return (
    <div className={cn("flex flex-col items-center gap-6", className)} {...props}>
      <Card className="w-86">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Reset Your Password</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit((data: ResetPasswordFormInputs) => resetPassword({ ...data, token }))} className="flex flex-col gap-7">
            <Field>
              <FieldLabel htmlFor="new-password">New Password</FieldLabel>
              <Input id="new-password" type="password" placeholder="New Password" {...register("password", { required: "This field is required" })} />
            </Field>

            <Field>
              <FieldLabel htmlFor="confirm-password">Confirm New Password</FieldLabel>
              <Input
                id="confirm-password"
                type="password"
                placeholder="Confirm New Password"
                {...register("confirmPassword", { required: "This field is required" })}
              />
            </Field>

            <Field>
              <Button type="submit" disabled={isResetingPassword} className="w-full">
                {isResetingPassword && <Spinner />}
                reset
              </Button>
            </Field>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
