export interface User {
  _id: string;
  active: boolean;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  usernameSlug: string;
  loginNotif: boolean;
  designs: string[];
  role?: string;
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
  loginNotif: boolean;
  username?: string;
  designs: string[];
  bio?: string;
  role?: string;
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
  resultsCount: number;
  total: number;
  data: User[];
}

export interface DeleteUserAccountResponse {
  message: string;
}

export interface HandleLoginNotifResponse {
  status: string;
  data: User;
}

export interface DeleteUsersResponse {
  status: string;
}
