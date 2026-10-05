import type { Role } from "@/types/role";
import type { Permission } from "@/types/permission";
import type { StoreAuth } from "./store";

export interface Me {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string | null;
  role_id?: number;
  store_id?: number | null;
  created_at: string;
  updated_at: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  user: Me;
}

export interface MeResponse extends Me {
  role: Role;
  permissions: Permission[];
  stores: StoreAuth[];
}

export interface RefreshResponse {
  success: boolean;
  message: string;
  data: {
    access_token: string;
  };
}

export interface Register {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}
