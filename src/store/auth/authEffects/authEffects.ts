import { createAsyncThunk } from "@reduxjs/toolkit";
// import { axiosInstance } from "../../../utils/axios/axiosInstance";
// import { toHttpErrorPayload } from "../../../utils/error/api/httpError";
import {
  loginWithEmail,
  loginWithGoogle,
  logout,
  registerWithEmail,
} from "../service/authService";
import type {
  LoginPayload,
  RegisterPayload,
  UserResponse,
} from "../types/auth.types";

// export const registerUser = createAsyncThunk(
//   "auth/registerUser",
//   async (payload, { rejectWithValue }) => {
//     try {
//       const res = await axiosInstance.post("/auth/registerUser", payload);
//       // Return the data object (Promise resolves to data)
//       return res.data;
//     } catch (err) {
//       const e = toHttpErrorPayload(err);
//       return rejectWithValue({ status: e.status, message: e.message });
//     }
//   }
// );
export const registerWithEmailAsync = createAsyncThunk<
  UserResponse,
  RegisterPayload,
  { rejectValue: string }
>(
  "auth/registerWithEmail",
  async (
    { firstName, lastName, email, password }: RegisterPayload,
    { rejectWithValue }
  ) => {
    try {
      const user = await registerWithEmail(
        firstName,
        lastName,
        email,
        password
      );
      // console.log("USER", user);
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      };
    } catch (error: unknown) {
      console.log("Registration error:", error);
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred during registration.");
    }
  }
);

// export const loginUser = createAsyncThunk(
//   "auth/loginUser",
//   async (payload, { rejectWithValue }) => {
//     try {
//       const res = await axiosInstance.post("/auth/loginUser", payload);
//       return res.data;
//     } catch (err) {
//       const e = toHttpErrorPayload(err);
//       return rejectWithValue({ status: e.status, message: e.message });
//     }
//   }
// );
export const loginWithEmailAsync = createAsyncThunk<
  UserResponse,
  LoginPayload,
  { rejectValue: string }
>(
  "auth/loginWithEmail",
  async ({ email, password }: LoginPayload, { rejectWithValue }) => {
    try {
      const user = await loginWithEmail(email, password);
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      };
    } catch (error: unknown) {
      console.log("Login error:", error);
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred during login.");
    }
  }
);

// export const socialLogin = createAsyncThunk(
//   "auth/socialLogin",
//   async (payload, { rejectWithValue }) => {
//     try {
//       const res = await axiosInstance.post("/auth/socialLogin", payload);
//       return res.data;
//     } catch (err) {
//       const e = toHttpErrorPayload(err);
//       return rejectWithValue({ status: e.status, message: e.message });
//     }
//   }
// );
export const loginWithGoogleAsync = createAsyncThunk<
  UserResponse,
  void,
  { rejectValue: string }
>("auth/loginWithGoogle", async (_, { rejectWithValue }) => {
  try {
    const user = await loginWithGoogle();
    
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };
  } catch (error: unknown) {
    console.log("Google Login error:", error);
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("An unknown error occurred during google login.");
  }
});

export const logoutAsync = createAsyncThunk<
  null,
  void,
  { rejectValue: string }
>("auth/logout", async (_, { rejectWithValue }) => {
  try {
    await logout();
    return null;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("An unknown error occurred during logout.");
  }
});

/**
 * Refresh Token Async Thunk
 * Refreshes authentication token when it's about to expire
 */
// export const refreshToken = createAsyncThunk(
//   "auth/refreshToken",
//   async (payload: { refreshToken: string }, { rejectWithValue }) => {
//     try {
//       const res = await BASE_API.post("/auth/refresh", payload);
//       return res.data;
//     } catch (err) {
//       const e = toHttpErrorPayload(err);
//       return rejectWithValue({
//         status: e.status,
//         message: e.message
//       });
//     }
//   }
// );
