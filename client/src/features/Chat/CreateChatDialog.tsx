import { Dialog, DialogHeader, DialogPanel, DialogPopup, DialogTitle } from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface CreateChatDialogProps {
  showCreateChatDialog: boolean;
  setShowCreateChatDialog: (value: boolean) => void;
}

export default function CreateChatDialog({ showCreateChatDialog, setShowCreateChatDialog }: CreateChatDialogProps) {
  return (
    <Dialog open={showCreateChatDialog} onOpenChange={setShowCreateChatDialog}>
      <DialogPopup>
        <Form>
          <DialogHeader>
            <DialogTitle>Create New Chat</DialogTitle>
          </DialogHeader>

          <DialogPanel>
            <Field>
              <FieldLabel>Name</FieldLabel>
              <Input placeholder="Enter Chat name" />
            </Field>
          </DialogPanel>
        </Form>
      </DialogPopup>
    </Dialog>
  );
}
