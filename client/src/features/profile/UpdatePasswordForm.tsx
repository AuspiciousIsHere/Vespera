import { useForm } from "react-hook-form";

import { DialogClose, DialogFooter, DialogHeader, DialogPanel, DialogPopup, DialogTitle } from "@/components/ui/dialog";
import useUpdateUserPassword from "./hooks/useUpdateUserPassword";
import type { UpdatePasswordFormInputs } from "@/types/auth";
import { Field, FieldLabel } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";

interface UpdatePasswordFormProps {
  showUpdatePasswordDialog: boolean;
  setShowUpdatePasswordDialog: (value: boolean) => void;
}

export default function UpdatePasswordForm({ showUpdatePasswordDialog, setShowUpdatePasswordDialog }: UpdatePasswordFormProps) {
  const { register, handleSubmit } = useForm<UpdatePasswordFormInputs>();
  const { isPending: isUpdatingPassword, mutate: updateUserPassword } = useUpdateUserPassword();

  return (
    <DialogPopup>
      <DialogHeader>
        <DialogTitle>Update Your Password</DialogTitle>
      </DialogHeader>

      <Form onSubmit={handleSubmit((data) => updateUserPassword(data, { onSuccess: () => setShowUpdatePasswordDialog(false) }))}>
        <DialogPanel>
          <div className="flex flex-col gap-6 mt-5">
            {/* User Password */}
            <Field className="flex flex-col gap-3">
              <FieldLabel>Enter Your Password</FieldLabel>
              <Input
                className="py-1"
                type="password"
                placeholder="Your Password"
                {...register("currentPassword", { required: "Current password is required" })}
              />
            </Field>

            {/* New Password */}
            <Field className="flex flex-col gap-3">
              <FieldLabel>Enter New Password</FieldLabel>
              <Input
                className="py-1"
                type="password"
                placeholder="New Password"
                {...register("newPassword", { required: "New password is required" })}
              />
            </Field>

            {/* Confirm New Password */}
            <Field className="flex flex-col gap-3">
              <FieldLabel>Confirm New Password</FieldLabel>
              <Input
                className="py-1"
                type="password"
                placeholder="Confirm New Password"
                {...register("confirmPassword", { required: "Confirm password is required" })}
              />
            </Field>
          </div>
        </DialogPanel>

        <DialogFooter>
          <DialogClose render={<Button variant="ghost" disabled={isUpdatingPassword} />}>Cancel</DialogClose>

          <Button type="submit" disabled={isUpdatingPassword}>
            {isUpdatingPassword && <Spinner />}
            Send
          </Button>
        </DialogFooter>
      </Form>
    </DialogPopup>
  );
}
