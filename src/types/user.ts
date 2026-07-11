import type { Role } from "@/types/role";

export interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
  role_id: number;
  role: Role;
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
