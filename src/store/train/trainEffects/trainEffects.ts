import { createAsyncThunk } from "@reduxjs/toolkit";
import { enrichTrainDataWithRoute } from "../../../utils/train/trainHelper";
import type { Train } from "../types/train.types";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../configs/firebase/firebaseConfig";
// import data from "../../../../trains_data";

const trainsRef = collection(db, "trains");

// export const seedTrainsData = createAsyncThunk(
//   "trains/seed",
//   async (_, { rejectWithValue }) => {
//     try {
//       // const trainsRef = collection(db, "trains");
//       // const snapshot = await getDocs(trainsRef);
//       // if (snapshot.empty) {
//       for (const item of data) {
//         await addDoc(trainsRef, item);
//       }
//       // }
//       return true;
//     } catch (error: unknown) {
//       console.error("Error seeding trains data:", error);
//       return rejectWithValue(
//         (error as Error).message || "Failed to seed trains data"
//       );
//     }
//   }
// );

/**
 * Fetch all trains
 */
export const fetchTrains = createAsyncThunk(
  "trains/fetchTrains",
  async (_, { rejectWithValue }) => {
    try {
      const q = query(trainsRef);
      const snapshot = await getDocs(q);

      const trains: Train[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Train),
      }));

      return trains;
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to fetch trains";
      return rejectWithValue(message);
    }
  }
);

/**
 * Fetch details for a single train
 */
export const fetchTrainDetails = createAsyncThunk<
  Train,
  string,
  { rejectValue: string }
>("trains/fetchTrainDetails", async (trainNumber, { rejectWithValue }) => {
  try {
    const q = query(trainsRef, where("train_number", "==", trainNumber));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return rejectWithValue("Train not found");
    }

    const trainDoc = snapshot.docs[0];
    const train = trainDoc.data() as Train;

    return enrichTrainDataWithRoute({
      id: trainDoc.id,
      ...train,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch train details";
    return rejectWithValue(message);
  }
});
