import { createAsyncThunk } from "@reduxjs/toolkit";
import { enrichTrainDataWithRoute } from "../../../utils/train/trainHelper";
import type { Train } from "../types/train.types";

const API_URL = "https://mocki.io/v1/4099cc1c-9657-47c3-bb3f-10c34275e817";

/**
 * Fetch all trains
 */
export const fetchTrains = createAsyncThunk(
  "trains/fetchTrains",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        return rejectWithValue(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.data as Train[];
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
    const response = await fetch(API_URL);
    if (!response.ok) {
      return rejectWithValue(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const train = (data.data as Train[]).find(
      (t) => t.train_number === trainNumber
    );

    if (!train) {
      return rejectWithValue("Train not found");
    }
    return enrichTrainDataWithRoute(train);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch train details";
    return rejectWithValue(message);
  }
});
