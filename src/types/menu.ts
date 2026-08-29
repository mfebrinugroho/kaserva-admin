import type { MenuCategory } from "./menuCategory";
import type { Store } from "./store";

export interface Menu {
  id: number;
  store_id: number;
  menu_category_id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  sort_order: number;
  is_available: true;
  created_at: string;
  updated_at: string;
  category?: MenuCategory;
  store?: Store;
}
