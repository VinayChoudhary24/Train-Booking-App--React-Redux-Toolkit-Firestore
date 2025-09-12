/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../../configs/firebase/firebaseConfig";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { loadAuth } from "../../auth/service/localStorage";

// Create booking
export const createBooking = createAsyncThunk<
  any,
  any,
  { rejectValue: string }
>("bookings/createBooking", async (bookingData, { rejectWithValue }) => {
  try {
    const bookingsRef = collection(db, "bookings");
    const docRef = await addDoc(bookingsRef, {
      ...bookingData,
      createdAt: serverTimestamp(),
    });

    return {
      id: docRef.id,
      ...bookingData,
    };
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to create booking");
  }
});

// Fetch user bookings
export const fetchUserBookings = createAsyncThunk<
  any[],
  void,
  { rejectValue: string }
>("bookings/fetchUserBookings", async (_, { rejectWithValue }) => {
  try {
    // Load user from localStorage
    const auth = loadAuth();
    if (!auth || !auth.user?.uid) {
      return rejectWithValue("No user found in localStorage");
    }

    const userId = auth.user.uid;
    const bookingsRef = collection(db, "bookings");
    const q = query(bookingsRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    const bookings = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt
          ? data.createdAt.toDate().toISOString()
          : null,
      };
    });

    return bookings;
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to fetch bookings");
  }
});
