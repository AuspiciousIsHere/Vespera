import { useForm } from "react-hook-form";
import { Link } from "react-router";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import type { SingupFormInputs } from "@/types/auth";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { useSignup } from "./hooks/useSignup";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function SignupForm({ className, ...props }: React.ComponentProps<"div">) {
  const { handleSubmit, register } = useForm<SingupFormInputs>();
  const { isSigningUp, signup } = useSignup();

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-xl text-start">Create your account</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit((credentials: SingupFormInputs) => signup(credentials))} className="grid grid-cols-2 gap-10">
            <Field>
              <FieldLabel htmlFor="firstName">First Name</FieldLabel>
              <Input id="firstName" type="text" placeholder="John" {...register("firstName", { required: true })} />
            </Field>

            <Field>
              <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
              <Input id="lastName" type="text" placeholder="Doe" {...register("lastName", { required: true })} />
            </Field>

            <Field>
              <FieldLabel htmlFor="name">Username</FieldLabel>
              <Input id="name" type="text" placeholder="John" {...register("username", { required: true })} />
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input id="email" type="email" placeholder="m@example.com" {...register("email", { required: true })} />
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input id="password" type="password" placeholder="Password" {...register("password", { required: true })} />
            </Field>

            <Field>
              <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
              <Input id="confirm-password" type="password" placeholder="Confirm Password" {...register("confirmPassword", { required: true })} />
            </Field>

            <Field className="col-span-2">
              <Button type="submit" disabled={isSigningUp} className="w-full">
                {isSigningUp && <Spinner />}
                Create Account
              </Button>
              <FieldDescription className="text-center">
                Already have an account?{" "}
                <Link to="/login" className="underline">
                  Sign in
                </Link>
              </FieldDescription>
            </Field>
          </form>
        </CardContent>
      </Card>
      <p className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
      </p>
    </div>
  );
}
