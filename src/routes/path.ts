export const PATH = {
  LOGIN: "/login",
  DASHBOARD: "/",

  USERS: "/users",
  USERS_CREATE: "/users/create",
  USERS_EDIT_PATTERN: "/users/:id/edit",
  USERS_EDIT: (id: number | string) => `/users/${id}/edit`,

  STORES: "/stores",
  STORES_CREATE: "/stores/create",
  STORES_EDIT_PATTERN: "/stores/:id/edit",
  STORES_EDIT: (id: number | string) => `/stores/${id}/edit`,

  MENUS: "/menus",
  MENUS_CREATE: "/menus/create",
  // MENUS_EDIT_PATTERN: "/menus/:id/edit",
  // MENUS_EDIT: (id: number | string) => `/menus/${id}/edit`,

  FORBIDDEN: "/403",
};
