import { useState } from "react";
import {
  AlertDialogClose,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogPopup,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDeleteAccount } from "./hooks/useDeleteAccount";
import { Field, FieldLabel } from "@/components/ui/field";
import { DialogPanel } from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function ConfirmDeleteAccountModal() {
  const { isPending: isDeletingAccount, mutate: deleteAccount } = useDeleteAccount();
  const user = useAuthStore((state) => state.user);
  const [userFullName, setUserFullName] = useState("");

  return (
    <AlertDialogPopup>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription className="my-2">
          Please note that this action cannot be undone. By accepting this, your account and all associated data will be permanently deleted from our
          servers.
        </AlertDialogDescription>
      </AlertDialogHeader>

      <DialogPanel>
        <Field>
          <FieldLabel>
            Please type{" "}
            <Label className="bg-secondary px-2 py-1 rounded">
              {user?.firstName} {user?.lastName}
            </Label>{" "}
            in the box below
          </FieldLabel>

          <Input onChange={(e) => setUserFullName(e.target.value)} value={userFullName} className="mt-2" />
        </Field>
      </DialogPanel>

      <AlertDialogFooter>
        <AlertDialogClose render={<Button variant="ghost" />}>Cancel</AlertDialogClose>
        <AlertDialogClose
          render={
            <Button
              variant="destructive"
              onClick={() => deleteAccount()}
              disabled={isDeletingAccount || userFullName !== `${user?.firstName} ${user?.lastName}`}
            />
          }
        >
          {isDeletingAccount && <Spinner />}
          Delete Account
        </AlertDialogClose>
      </AlertDialogFooter>
    </AlertDialogPopup>
  );
}
