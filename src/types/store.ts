import type { User } from "./user";

export interface Store {
  id: number;
  slug: string;
  name: string;
  description: string;
  image_url: string;
  banner_url: string;
  address: string;
  phone: string;
  latitude: string;
  longitude: string;
  is_open: boolean;
  closed_reason: string;
  is_accept_order: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  owner?: User;
}

export interface StoreAuth {
  id: number;
  slug: string;
  name: string;
  image_url: string;
}

export interface StoreOption {
  id: number;
  name: string;
}

export interface StoreOperatingHour {
  id: number;
  store_id: number;
  day_of_week: number;
  day_name: string;
  open_time: string;
  close_time: string;
  is_open: boolean;
  created_at: string;
  updated_at: string;
  store?: Store;
}
