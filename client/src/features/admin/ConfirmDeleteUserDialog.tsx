import { Dialog, DialogContent, DialogHeader, DialogPanel, DialogPopup } from "@/components/ui/dialog";

interface ConfirmDeleteUserPropTypes {
  showConfirmDeleteUserDialog: boolean;
  setShowConfirmDeleteUserDialog: (value: boolean) => void;
}

export default function ConfirmDeleteUserDialog({ showConfirmDeleteUserDialog, setShowConfirmDeleteUserDialog }: ConfirmDeleteUserPropTypes) {
  return (
    <Dialog open={showConfirmDeleteUserDialog} onOpenChange={setShowConfirmDeleteUserDialog}>
      <DialogContent>
        <DialogPopup>
          <DialogHeader>Delete User</DialogHeader>
          <DialogPanel>Are your sure you want to delete this user</DialogPanel>
        </DialogPopup>
      </DialogContent>
    </Dialog>
  );
}
