import { apiRefresh } from "@/libs/axios";
import { setAccessToken } from "@/libs/token-store";
import type { RefreshResponse } from "@/types/auth";

// REFRESH TOKEN
let refreshPromise: Promise<string> | null = null;

export const refresh = (): Promise<string> => {
  if (typeof window === "undefined") {
    return Promise.reject(
      new Error("Refresh access token hanya digunakan di browser."),
    );
  }

  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = apiRefresh
    .post<RefreshResponse>("/auth/refresh")
    .then((response) => {
      const token = response.data.data.access_token;

      if (
        !response.data.success ||
        typeof token !== "string" ||
        token.length === 0
      ) {
        throw new Error(
          response.data.message || "Respons refresh token tidak valid.",
        );
      }

      setAccessToken(token);

      return token;
    })
    .finally(() => {
      refreshPromise = null;
    });

  return refreshPromise;
};
