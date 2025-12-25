import { Calendar, Camera, Mail, MapPin, UserRound } from "lucide-react";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Input } from "@/components/ui/input";

import { useAuthStore } from "@/store/authStore";
import { useEffect, useRef, useState, type ChangeEvent } from "react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

import { useForm } from "react-hook-form";
import type { UpdateUserProfileFormInputs } from "@/types/user";
import { useUpdateUserProfile } from "./hooks/useUpdateUserProfile";
import { Spinner } from "@/components/ui/spinner";
import { USER_IMAGE_URL } from "@/constant/constants";

export default function UserCardInfo() {
  const [userPicture, setUserPicture] = useState<string | undefined>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const user = useAuthStore((state) => state.user);
  const { isPending: isUpdatingUser, mutate: updateUser } = useUpdateUserProfile();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserProfileFormInputs>();

  function onSubmit(file: File) {
    const formData = new FormData();
    formData.append("picture", file);
    updateUser(formData);
  }

  function handleUserImageChnage(e: ChangeEvent<HTMLInputElement>): void {
    if (!e.target.files?.[0]) return;

    setUserPicture(URL.createObjectURL(e.target.files[0]));

    onSubmit(e.target.files[0]);
  }

  return (
    <Card className="mb-10 p-6 shadow-xl relative">
      <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-12">
        <div className="relative w-24 h-24">
          <Avatar className="h-24 w-24">
            {(user?.picture && user.picture !== "default-user.png") || userPicture ? (
              <Card className="rounded-full overflow-hidden h-full flex items-center justify-center bg-muted">
                <AvatarImage src={userPicture || `${USER_IMAGE_URL}/${user?.picture}`} alt={`@${user?.username}`} />
                {isUpdatingUser && (
                  <div
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-full h-full bg-neutral-500/50`}
                  >
                    <Spinner className="size-10" />
                  </div>
                )}
              </Card>
            ) : (
              <Card className="rounded-full h-full flex items-center justify-center bg-muted">
                <UserRound className="w-10 h-10" />
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
                <MapPin className="size-4" />
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
