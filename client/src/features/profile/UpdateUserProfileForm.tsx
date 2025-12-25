// src/components/forms/EditProfileForm.tsx
import { useForm } from "react-hook-form";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useUpdateUserProfile } from "./hooks/useUpdateUserProfile";
import type { UpdateUserProfileFormInputs } from "@/types/user";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Field, FieldLabel } from "@/components/ui/field";

// --- Component Definition ---

export function UpdateUserProfileForm() {
  const user = useAuthStore((state) => state.user);
  const { isPending: isUpdatingUser, mutate: updateUser } = useUpdateUserProfile();

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
              <Input
                id="firstName"
                {...register("firstName", { required: "This field is required" })}
                disabled={isUpdatingUser}
                className="py-1"
                placeholder="Enter First Name"
              />
              {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
            </div>

            {/* 3. Last Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Last Name</Label>
              <Input
                id="lastName"
                {...register("lastName", { required: "This field is required" })}
                disabled={isUpdatingUser}
                className="py-1"
                placeholder="Enter Last Name"
              />
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
              <Input
                id="username"
                {...register("username", { required: "This field is required" })}
                disabled={isUpdatingUser}
                className="py-1"
                placeholder="Enter Username"
              />
              {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
            </div>

            <Field>
              <FieldLabel>Reddit</FieldLabel>
              <Input {...register("reddit")} disabled={isUpdatingUser} className="py-1" placeholder="Reddit Link" />
            </Field>

            <Field>
              <FieldLabel>Linkedin</FieldLabel>
              <Input {...register("linkedin")} disabled={isUpdatingUser} className="py-1" placeholder="Linkedin Link" />
            </Field>

            <Field>
              <FieldLabel>X (Twitter)</FieldLabel>
              <Input {...register("twitter")} disabled={isUpdatingUser} className="py-1" placeholder="X (Twitter) Link" />
            </Field>

            <Field>
              <FieldLabel>Instagram</FieldLabel>
              <Input {...register("instagram")} disabled={isUpdatingUser} className="py-1" placeholder="Instagram ID" />
            </Field>

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
              {isUpdatingUser && <Spinner />}
              Save Changes
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
