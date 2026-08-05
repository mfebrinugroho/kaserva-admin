export interface ApiResponse<T> {
  success: boolean;
  message: string;
  token: string;
  data: T;
}

export interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface PaginationLinks {
  next: string | null;
  prev: string | null;
}

export interface ApiPaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  meta: PaginationMeta;
  links: PaginationLinks;
}
