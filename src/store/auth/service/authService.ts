import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  onAuthStateChanged,
  updateProfile,
  type User,
} from "firebase/auth";
import { auth, googleProvider } from "../../../configs/firebase/firebaseConfig";
import type { FirebaseError } from "firebase/app";

// Register with email/password
export const registerWithEmail = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    // Update profile with the user's name
    await updateProfile(userCredential.user, {
      displayName: `${firstName} ${lastName}`,
    }); //later use for user dashboard
    return userCredential.user;
  } catch (error) {
    const errorMessage = handleFirebaseAuthError(error as FirebaseError);
    throw new Error(errorMessage);
  }
};

// Login with email/password
export const loginWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    const errorMessage = handleFirebaseAuthError(error as FirebaseError);
    throw new Error(errorMessage);
  }
};

// Login with Google
export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    const errorMessage = handleFirebaseAuthError(error as FirebaseError);
    throw new Error(errorMessage);
  }
};

// Logout
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    const errorMessage = handleFirebaseAuthError(error as FirebaseError);
    throw new Error(errorMessage);
  }
};

// Auth state observer
export const observeAuthState = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Helper function to handle and interpret Firebase authentication errors
const handleFirebaseAuthError = (error: FirebaseError): string => {
  let errorMessage = "An unknown error occurred!";

  if (!error.message) {
    return errorMessage;
  }

  console.log("firebase-err-msg", error.message);
  switch (error.message) {
    case "Firebase: Error (auth/email-already-in-use).":
      errorMessage = "This email is already registered. Please login instead.";
      break;
    case "Firebase: Error (auth/invalid-credential).":
      errorMessage = "The email or password is invalid. Please try again.";
      break;
    case "Firebase: Error (auth/user-not-found).":
      errorMessage = "No account found with this email. Please sign up first.";
      break;
    default:
      errorMessage = error.message;
  }

  return errorMessage;
};
