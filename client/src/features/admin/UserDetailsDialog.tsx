import { Dialog, DialogContent, DialogHeader, DialogPanel, DialogPopup } from "@/components/ui/dialog";

interface UserDetailsDialogPropTypes {
  showUserDetailsDialog: boolean;
  setShowUserDetailsDialog: (value: boolean) => void;
}

export default function UserDetailsDialog({ showUserDetailsDialog, setShowUserDetailsDialog }: UserDetailsDialogPropTypes) {
  return (
    <Dialog open={showUserDetailsDialog} onOpenChange={setShowUserDetailsDialog}>
      <DialogContent>
        <DialogPopup>
          <DialogHeader>User details</DialogHeader>
          <DialogPanel>User details</DialogPanel>
        </DialogPopup>
      </DialogContent>
    </Dialog>
  );
}
