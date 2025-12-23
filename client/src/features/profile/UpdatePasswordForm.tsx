import { useForm } from "react-hook-form";

import { DialogClose, DialogFooter, DialogHeader, DialogPanel, DialogPopup, DialogTitle } from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function UpdatePasswordForm() {
  const { register, handleSubmit } = useForm();

  return (
    <DialogPopup showCloseButton={false}>
      <DialogHeader>
        <DialogTitle>Update Your Password</DialogTitle>
      </DialogHeader>
      <DialogPanel>
        <form onSubmit={handleSubmit(() => {})}>
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
                {...register("confirmNewPassword", { required: "Confirm password is required" })}
              />
            </Field>
          </div>
        </form>
      </DialogPanel>
      <DialogFooter>
        <DialogClose render={<Button variant="ghost" />}>Cancel</DialogClose>
        <Button>Send</Button>
      </DialogFooter>
    </DialogPopup>
  );
}
