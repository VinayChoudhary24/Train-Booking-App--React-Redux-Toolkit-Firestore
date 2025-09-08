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
  string,
  { rejectValue: string }
>("bookings/fetchUserBookings", async (userId, { rejectWithValue }) => {
  try {
    const bookingsRef = collection(db, "bookings");
    const q = query(bookingsRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    const bookings: any = [];
    querySnapshot.forEach((doc) => {
      bookings.push({
        id: doc.id,
        ...doc.data,
      });
    });

    return bookings;
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to fetch bookings");
  }
});
