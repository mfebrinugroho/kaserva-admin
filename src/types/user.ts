import type { Role } from "@/types/role";
import type { Store } from "./store";

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  role_id: number;
  store_id: number | null;
  created_at: string;
  updated_at: string;
  role?: Role;
  store?: Store[];
}

export interface UserForm {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  role_id: number;
}

export interface Owner {
  id: number;
  name: string;
  email: string;
}
