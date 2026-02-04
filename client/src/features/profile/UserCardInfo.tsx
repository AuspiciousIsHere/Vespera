import { Calendar, Camera, Mail, Phone, UserRound } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useRef, useState, type ChangeEvent } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

import { useUpdateUserProfile } from "./hooks/useUpdateUserProfile";
import type { UpdateUserProfileFormInputs } from "@/types/user";
import { USER_IMAGE_URL } from "@/constant/constants";
import { Spinner } from "@/components/ui/spinner";
import { useAuthStore } from "@/store/authStore";
import { Input } from "@/components/ui/input";

export default function UserCardInfo() {
  const [userPicture, setUserPicture] = useState<string | undefined>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const user = useAuthStore((state) => state.user);
  const { isPending: isUpdatingUser, mutate: updateUser } = useUpdateUserProfile();
  const { register } = useForm<UpdateUserProfileFormInputs>();

  function handleUserImageChnage(e: ChangeEvent<HTMLInputElement>): void {
    if (!e.target.files?.[0]) return;

    setUserPicture(URL.createObjectURL(e.target.files[0]));

    onSubmit(e.target.files[0]);
  }

  function onSubmit(file: File) {
    const formData = new FormData();
    formData.append("picture", file);
    updateUser(formData);
  }

  return (
    <Card className="mb-10 p-6 shadow-xl relative">
      <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-12">
        <div className="relative size-24">
          <Avatar className="size-full">
            {(user?.picture && user.picture !== "default-user.png") || userPicture ? (
              <Card className="rounded-full overflow-hidden size-full flex items-center justify-center bg-muted p-0">
                <AvatarImage src={userPicture || `${USER_IMAGE_URL}/${user?.picture}`} alt={`@${user?.username}`} className="size-full" />
                {isUpdatingUser && (
                  <div
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-full h-full bg-neutral-500/50`}
                  >
                    <Spinner className="size-10" />
                  </div>
                )}
              </Card>
            ) : (
              <Card className="rounded-full size-full flex items-center justify-center bg-muted">
                <UserRound className="size-10" />
              </Card>
            )}
          </Avatar>

          <Input
            type="file"
            id="picture"
            className="hidden"
            {...register("picture")}
            onChange={handleUserImageChnage}
            accept="image/*"
            ref={fileInputRef}
          />

          <Button size="icon" className="absolute -right-2 -bottom-2 h-8 w-8 rounded-full" onClick={() => fileInputRef.current?.click()}>
            <Camera />
          </Button>
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex flex-col gap-2 md:flex-row md:items-center">
            <h1 className="text-2xl font-bold">
              {user?.firstName} {user?.lastName}
            </h1>
            <Badge variant="secondary">Pro Member</Badge>
          </div>

          <p className="text-muted-foreground">{user?.bio}</p>

          <div className="text-muted-foreground flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Mail className="size-4" />
              {user?.email}
            </div>

            {user?.phone && (
              <div className="flex items-center gap-1">
                <Phone className="size-4" />
                {user?.phone}
              </div>
            )}

            <div className="flex items-center gap-1">
              <Calendar className="size-4" />
              Joined at {new Date(user?.createdAt || "").toDateString()}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
