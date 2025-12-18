import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router";
import { cn } from "@/lib/utils";

import { useLogin } from "./hooks/useLogin";
import type { LoginFormInputs } from "@/types/auth";
import { Spinner } from "@/components/ui/spinner";

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const { handleSubmit, register } = useForm<LoginFormInputs>();
  const { isLoggingIn, login } = useLogin();

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          {/* <CardDescription>Login with your Apple or Google account</CardDescription> */}
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit((credentials: LoginFormInputs) => login(credentials))}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input id="email" type="email" placeholder="m@example.com" {...register("email", { required: true })} />
              </Field>

              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required {...register("password", { required: true })} />
              </Field>

              <Field>
                <Button type="submit" disabled={isLoggingIn}>
                  {isLoggingIn && <Spinner />}
                  Login
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <Link to="/sign-up">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <Link to="#">Terms of Service</Link> and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
