import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogPopup,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import useDeleteDesign from "./hooks/useDeleteDesign";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";

interface ConfirmDeleteDesignPropTypes {
  designID: string;
  showConfirmDeleteDesign: boolean;
  setShowConfirmDeleteDesign: (value: boolean) => void;
}

export default function ConfirmDeleteDesignDialog({ designID, showConfirmDeleteDesign, setShowConfirmDeleteDesign }: ConfirmDeleteDesignPropTypes) {
  const { mutate: deleteDesign, isPending: isDeletingDesign } = useDeleteDesign(designID);

  return (
    <AlertDialog open={showConfirmDeleteDesign} onOpenChange={setShowConfirmDeleteDesign}>
      <AlertDialogPopup>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure about deleting this design?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogClose render={<Button variant="ghost" disabled={isDeletingDesign} />}>Cancel</AlertDialogClose>
          <AlertDialogClose render={<Button variant="destructive" onClick={() => deleteDesign()} disabled={isDeletingDesign} />}>
            {isDeletingDesign && <Spinner />}
            Delete Account
          </AlertDialogClose>
        </AlertDialogFooter>
      </AlertDialogPopup>
    </AlertDialog>
  );
}
