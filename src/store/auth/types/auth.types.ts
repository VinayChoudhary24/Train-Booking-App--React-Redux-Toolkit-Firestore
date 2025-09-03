export type User = {
  uid: string | null;
  firstName?: string | null;
  lastName?: string | null;
  email: string | null;
  displayName: string | null;
  photoURL?: string | null;
};

export type UserResponse = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
};

export type RegisterPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type SocialProvider = "google" | "facebook";

export type SocialLoginPayload = {
  provider: SocialProvider;
  idToken?: string; // e.g., Google ID token (if applicable)
  accessToken?: string; // e.g., FB access token (if applicable)
};

export type AuthTokens = {
  accessToken: string;
  refreshToken?: string;
};

// export type AuthResponse = {
//   user: User;
//   tokens: AuthTokens;
// };

export type AuthState = {
  user: User | null;
  //   tokens: AuthTokens | null;
  // refreshToken: string | null;
  // Access Loader in Component for showing Loader
  isLoggedIn: boolean;
  loading: boolean;
  // Access Error in Component for showing Error Messages
  error: string | null;
  //   hydrated: boolean; // true after reading from storage once
};
