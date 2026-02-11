export interface IMeta {
  limit: number;
  page: number;
  total: number;
}

export interface LoginResponse {
  success: boolean;
  data: {
    accessToken: string;
    user: object;
  };
}

export interface LoginData {
  email?: string;
  password?: string;
  [key: string]: unknown;
}




export type UserRole = 'Admin' | 'Seller' | 'User';

export interface ICreateUser {
  name: string;
  email: string;
  password: string;
  contactNumber: string;
  role: UserRole;
  shopName?: string | null;
  shopSlug?: string | null;
  file?: File;
}


export interface IUserResponse {
  id: string;
  name: string;
  email: string;
  contactNumber: string;
  role: UserRole;
  admin?: {
    id: string;
    profilePhoto: string | null;
  };
  seller?: {
    id: string;
    profilePhoto: string | null;
    shopName: string | null;
    shopSlug: string | null;
  };
}

export interface IUserProfileResponse {
  success: boolean;
  message: string;
  data: IUserResponse; 
}