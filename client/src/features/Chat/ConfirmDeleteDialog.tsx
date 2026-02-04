import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogPopup,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";

interface ConfirmDeleteDialogProps {
  showConfirmDeleteChatDialog: boolean;
  setShowConfirmDeleteChatDialog: (value: boolean) => void;
}

export default function ConfirmDeleteDialog({ showConfirmDeleteChatDialog, setShowConfirmDeleteChatDialog }: ConfirmDeleteDialogProps) {
  return (
    <AlertDialog open={showConfirmDeleteChatDialog} onOpenChange={setShowConfirmDeleteChatDialog}>
      <AlertDialogPopup>
        <AlertDialogHeader>
          <AlertDialogTitle className="leading-7">Are you absolutely sure about deleting this chat?</AlertDialogTitle>
          <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogClose render={<Button variant="ghost" />}>Cancel</AlertDialogClose>
          <AlertDialogClose render={<Button variant="destructive" />}>
            {/* {isDeletingDesign && <Spinner />} */}
            Delete Design
          </AlertDialogClose>
        </AlertDialogFooter>
      </AlertDialogPopup>
    </AlertDialog>
  );
}
