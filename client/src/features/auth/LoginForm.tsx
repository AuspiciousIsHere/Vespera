import { useForm } from "react-hook-form";
import { Link } from "react-router";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import type { LoginFormInputs } from "@/types/auth";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLogin } from "./hooks/useLogin";
import { cn } from "@/lib/utils";

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const { handleSubmit, register } = useForm<LoginFormInputs>();
  const { isLoggingIn, login } = useLogin();

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit((credentials: LoginFormInputs) => login(credentials))} className="flex flex-col gap-7">
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input id="email" type="email" placeholder="m@example.com" {...register("email", { required: true })} />
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input id="password" type="password" placeholder="passwrod" required {...register("password", { required: true })} />
              <Link to="/forget-password" className="text-sm underline-offset-4 hover:underline">
                Forgot your password?
              </Link>
            </Field>

            <Field>
              <Button type="submit" disabled={isLoggingIn} className="w-full">
                {isLoggingIn && <Spinner />}
                Login
              </Button>
              <FieldDescription className="text-center">
                Don&apos;t have an account?{" "}
                <Link to="/sign-up" className="underline">
                  Sign up
                </Link>
              </FieldDescription>
            </Field>
          </form>
        </CardContent>
      </Card>

      <p className="px-6 text-center">
        By clicking continue, you agree to our <Link to="#">Terms of Service</Link> and <a href="#">Privacy Policy</a>.
      </p>
    </div>
  );
}
