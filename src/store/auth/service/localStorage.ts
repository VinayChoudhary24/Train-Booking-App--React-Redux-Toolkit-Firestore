import type { User } from "../types/auth.types";

// const AUTH_KEY = "auth_data";

export interface StoredAuth {
  user: User; // You can define a stricter type if needed
  token?: string | null;
}

export const saveAuth = (auth: StoredAuth) => {
  try {
    localStorage.setItem("user", JSON.stringify(auth.user));
    if (auth.token) {
      localStorage.setItem("token", JSON.stringify(auth.token));
    }
  } catch (err) {
    console.error("Error saving auth in localStorage:", err);
  }
};

export const loadAuth = (): StoredAuth | null => {
  try {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    return user
      ? { user: JSON.parse(user), token: token ? JSON.parse(token) : null }
      : null;
  } catch (err) {
    console.error("Error loading auth from localStorage:", err);
    return null;
  }
};

export const clearAuth = () => {
  try {
    localStorage.removeItem("user");
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
    }
  } catch (err) {
    console.error("Error clearing auth from localStorage:", err);
  }
};
