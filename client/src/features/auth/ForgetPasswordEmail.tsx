import { useForm } from "react-hook-form";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useSendEmailForgetPassword from "./hooks/useSendEmailForgetPassword";
import type { SendEmailForgetPasswordFormInputs } from "@/types/auth";
import { Field, FieldLabel } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function ForgetPasswordEmail({ className, ...props }: React.ComponentProps<"div">) {
  const { register, handleSubmit } = useForm<SendEmailForgetPasswordFormInputs>();
  const { isPending: isSendingEmail, mutate: sendEmail } = useSendEmailForgetPassword();

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Link to="/login" className="flex items-center gap-1">
        <ArrowLeft />
        Back
      </Link>

      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Forget Password</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit((data: SendEmailForgetPasswordFormInputs) => sendEmail(data))} className="flex flex-col gap-7">
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input id="email" type="email" placeholder="m@example.com" {...register("email", { required: true })} />
            </Field>

            <Field>
              <Button type="submit" disabled={isSendingEmail} className="w-full">
                {isSendingEmail && <Spinner />}
                Send
              </Button>
            </Field>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
