import type { Menu } from "./menu";
import type { Store } from "./store";

export interface MenuCategory {
  id: number;
  store_id: number;
  name: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  store?: Store;
  menus?: Menu;
}

export interface MenuCategoryOption {
  id: number;
  store_id: number;
  name: string;
}
