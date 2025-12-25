export interface User {
  _id: string;
  active: boolean;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  usernameSlug: string;
  bio?: string;
  phone?: string;
  picture?: string;
  reddit?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  memberType?: "Free" | "Pro";
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateUserProfileFormInputs {
  firstName: string;
  lastName: string;
  username?: string;
  bio?: string;
  phone?: string;
  picture?: FileList | undefined;
  discord?: string;
  reddit?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
}

export interface UpdateUserPasswordFormInputs {
  password: string;
  newPassword: string;
  confirmPassword: string;
}

// Responses
export interface UpdateUserProfileResponse {
  status: string;
  data: User;
}

export interface GetAllUsersResponse {
  status: string;
  total: number;
  data: User[];
}
