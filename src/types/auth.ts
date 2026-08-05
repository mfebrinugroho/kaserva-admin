import type { Role } from "@/types/role";
import type { Permission } from "@/types/permission";
import type { StoreAuth } from "./store";

export interface Login {
  email: string;
  password: string;
}

export interface Register {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface UserDetail extends User {
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserAuth extends User {
  store_id: number;
  role: Role;
  permissions: Permission[];
  stores: StoreAuth[];
}

export interface AuthResponse {
  user: User;
  token: string;
}
