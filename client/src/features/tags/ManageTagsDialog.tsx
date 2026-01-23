import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";

import { Dialog, DialogClose, DialogFooter, DialogHeader, DialogPanel, DialogPopup, DialogTitle } from "@/components/ui/dialog";
import { useCreateTag } from "@/features/tags/hooks/useCreateTag";
import { Field, FieldLabel } from "@/components/ui/field";
import type { CreateTagInputs, Tag } from "@/types/tag";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import { useAuthStore } from "@/store/authStore";
import { useDeleteTag } from "./hooks/useDeleteTag";

interface ManageTagsDialogProps {
  showManageTagsDialog: boolean;
  setShowManageTagsDialog: (value: boolean) => void;
  tags: Tag[] | undefined;
}

export default function ManageTagsDialog({ showManageTagsDialog, setShowManageTagsDialog, tags }: ManageTagsDialogProps) {
  const user = useAuthStore((state) => state.user);
  const { isPending: isCreatingTag, mutate: createTag } = useCreateTag(user?._id);
  const { register, handleSubmit } = useForm<CreateTagInputs>();
  const { isPending: isDeletingTag, mutate: deleteTag } = useDeleteTag(user?._id);

  return (
    <Dialog open={showManageTagsDialog} onOpenChange={setShowManageTagsDialog}>
      <DialogPopup>
        <Form onSubmit={handleSubmit((data) => createTag(data))}>
          <DialogHeader>
            <DialogTitle>Manage Your Tags</DialogTitle>
          </DialogHeader>

          <DialogPanel className="flex flex-col gap-5">
            <Field>
              <FieldLabel>Tag Name</FieldLabel>
              <Input placeholder="Enter tag name" {...register("name", { required: "This Field is required" })} />
            </Field>

            <div className="flex items-start gap-2 flex-wrap">
              {tags &&
                tags.map((tag) => (
                  <Badge className="bg-purple-500/20 text-purple-500 text-sm pr-5">
                    <Button variant="ghost" size="icon-xs" onClick={() => deleteTag(tag._id)} disabled={isDeletingTag}>
                      {isDeletingTag ? <Spinner /> : <IoClose />}
                    </Button>
                    {tag.name}
                  </Badge>
                ))}
            </div>
          </DialogPanel>

          <DialogFooter>
            <DialogClose render={<Button variant="ghost" disabled={isCreatingTag} />}>Cancel</DialogClose>
            <Button type="submit" disabled={isCreatingTag}>
              {isCreatingTag && <Spinner />}
              Create
            </Button>
          </DialogFooter>
        </Form>
      </DialogPopup>
    </Dialog>
  );
}
