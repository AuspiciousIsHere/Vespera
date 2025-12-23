// src/components/forms/EditProfileForm.tsx
import { useForm } from "react-hook-form";

import { useUpdateUserProfile } from "./hooks/useUpdateUserProfile";
import type { UpdateUserProfileFormInputs } from "@/types/user";
import { Textarea } from "@/components/ui/textarea";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// --- Component Definition ---

export function UpdateUserProfileForm() {
  const user = useAuthStore((state) => state.user);
  const { isUpdatingUser, updateUser } = useUpdateUserProfile();

  const defaultValues: UpdateUserProfileFormInputs = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    username: user?.username || "",
    bio: user?.bio || "",
    phone: user?.phone || "",
    reddit: user?.reddit || "",
    twitter: user?.twitter || "",
    instagram: user?.instagram || "",
    linkedin: user?.linkedin || "",
    picture: undefined,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserProfileFormInputs>({
    defaultValues,
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>Update your personal details and profile information.</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit((data: UpdateUserProfileFormInputs) => updateUser(data))} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* 2. First Name */}
            <div className="space-y-2">
              <Label htmlFor="name">First Name</Label>
              <Input id="firstName" {...register("firstName")} disabled={isUpdatingUser} className="py-1" placeholder="Enter First Name" />
              {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
            </div>

            {/* 3. Last Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Last Name</Label>
              <Input id="lastName" {...register("lastName")} disabled={isUpdatingUser} className="py-1" placeholder="Enter Last Name" />
              {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
            </div>

            {/* 4. Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" {...register("phone")} disabled={isUpdatingUser} className="py-1" placeholder="Enter Phone" />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
            </div>

            {/* 5. Username */}
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" {...register("username")} disabled={isUpdatingUser} className="py-1" placeholder="Enter Username" />
              {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
            </div>

            {/* 6. Bio */}
            <div className="space-y-2 col-span-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" {...register("bio")} rows={3} disabled={isUpdatingUser} className="py-1" placeholder="Enter Bio" />
              {errors.bio && <p className="text-red-500 text-sm">{errors.bio.message}</p>}
            </div>
          </div>

          {/* Form Footer */}
          <div className="flex justify-end gap-2 pt-4">
            <Button type="submit" disabled={isUpdatingUser}>
              {isUpdatingUser ? "Saving..." : "Save Changes"}
            </Button>
          </div>

          {/* {isError && (
        <p className="text-red-500 text-sm text-center">Error updating profile: {(error as any).response?.data?.message || error.message}</p>
        )} */}
        </form>
      </CardContent>
    </Card>
  );
}
