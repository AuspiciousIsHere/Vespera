import { useState } from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useGetUserTags } from "@/features/tags/hooks/useGetUserTags";
import ConfirmDeleteAccountModal from "./ConfirmDeleteAccountModal";
import ManageTagsDialog from "../tags/ManageTagsDialog";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore } from "@/store/authStore";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

export default function AccountSettings() {
  const [showManageTagsDialog, setShowManageTagsDialog] = useState(false);
  const user = useAuthStore((state) => state.user);
  const { isPending: isGettingUserTags, data: tags } = useGetUserTags(user?._id || "");

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>Manage your account preferences and subscription.</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Account status */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-base">Account Status</Label>
              <p className="text-muted-foreground text-sm">Your account is currently active</p>
            </div>
            <Badge variant="outline" className={user?.active ? "bg-green-400/20 text-green-400" : "bg-red-300/20 text-red-500"}>
              {user?.active ? "Active" : "Deactive"}
            </Badge>
          </div>

          <Separator />

          {/* Subscription Plans  */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-base">Subscription Plan</Label>
              <p className="text-muted-foreground text-sm">Pro Plan - $29/month</p>
            </div>
            <Button variant="outline">Manage Subscription</Button>
          </div>

          <Separator />

          {/* Account Visibility  */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-base">Account Visibility</Label>
              <p className="text-muted-foreground text-sm">Make your profile visible to other users</p>
            </div>
            <Switch defaultChecked />
          </div>

          <Separator />

          {/* Manage Tags  */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-base">Manage Tags</Label>

              {isGettingUserTags ? (
                <div className="flex items-center gap-2">
                  <Skeleton className="" />
                </div>
              ) : tags && tags?.data.length > 0 ? (
                <div className="flex items-center gap-2">
                  {tags.data.slice(0, 3).map((tag) => (
                    <Badge className="bg-purple-500/20 text-purple-500 text-sm px-3">{tag.name}</Badge>
                  ))}
                  {tags.data.length > 3 && "..."}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">No tag created yet</p>
              )}
            </div>

            <Button onClick={() => setShowManageTagsDialog(true)}>Manage Tags</Button>
          </div>

          <Separator />

          {/* Data Export  */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-base">Data Export</Label>
              <p className="text-muted-foreground text-sm">Download a copy of your data</p>
            </div>
            <Button variant="outline">Export Data</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
          <CardDescription>Irreversible and destructive actions</CardDescription>
        </CardHeader>

        <CardContent>
          <AlertDialog>
            <div className="w-full flex justify-end">
              <AlertDialogTrigger render={<Button variant="destructive-outline" />}>Delete Account</AlertDialogTrigger>
            </div>
            <ConfirmDeleteAccountModal />
          </AlertDialog>
        </CardContent>
      </Card>

      <ManageTagsDialog showManageTagsDialog={showManageTagsDialog} setShowManageTagsDialog={setShowManageTagsDialog} tags={tags?.data} />
    </>
  );
}
