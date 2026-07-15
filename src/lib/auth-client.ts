"use client";

import { createAuthClient } from "better-auth/react";
import { adminClient, jwtClient } from "better-auth/client/plugins";

const JWT_KEY = "ba_jwt";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL,

  plugins: [adminClient(), jwtClient()],

  fetchOptions: {
    auth: {
      type: "Bearer",
      token: () =>
        typeof window !== "undefined"
          ? localStorage.getItem(JWT_KEY) ?? undefined
          : undefined,
    },

    onSuccess({ response }) {
      const jwt = response.headers.get("set-auth-jwt");

      if (jwt && typeof window !== "undefined") {
        localStorage.setItem(JWT_KEY, jwt);
      }
    },
  },
});

export const { useSession, signIn, signOut, signUp } = authClient;