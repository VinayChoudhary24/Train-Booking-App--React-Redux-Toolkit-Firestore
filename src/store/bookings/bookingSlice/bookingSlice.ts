import {
  createSelector,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type {
  BookingState,
  ContactInfo,
  Passenger,
} from "../types/booking.types";
import {
  createBooking,
  fetchUserBookings,
} from "../bookingEffects/bookingEffects";

const initialState: BookingState = {
  currentBooking: {
    trainDetails: null,
    passengers: [{ name: "", age: "", gender: "Male", berth: "No Preference" }],
    contactInfo: {
      email: "",
      phone: "",
    },
    selectedClass: "",
    availableClasses: [],
    classPrice: {},
  },
  userBookings: [],
  loading: false,
  error: null,
  bookingCreated: false,
  lastBookingId: null,
};

// -------------------- Slice --------------------

const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    initializeBooking: (state, action) => {
      const { trainDetails, classPrice, userEmail } = action.payload;
      const availableClasses = Object.keys(classPrice);

      state.currentBooking = {
        trainDetails,
        passengers: [
          { name: "", age: "", gender: "Male", berth: "No Preference" },
        ],
        contactInfo: {
          email: userEmail || "",
          phone: "",
        },
        selectedClass:
          trainDetails.travelClass ||
          (availableClasses.length > 0 ? availableClasses[0] : ""),
        availableClasses,
        classPrice,
      };
      state.bookingCreated = false;
      state.error = null;
    },

    updateTrainDetails: (state, action) => {
      state.currentBooking.trainDetails = {
        ...state.currentBooking.trainDetails,
        ...action.payload,
      };
    },

    updateSelectedClass: (state, action: PayloadAction<string>) => {
      state.currentBooking.selectedClass = action.payload;
    },

    addPassenger: (state) => {
      state.currentBooking.passengers.push({
        name: "",
        age: "",
        gender: "Male",
        berth: "No Preference",
      });
    },

    removePassenger: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (state.currentBooking.passengers.length > 1) {
        state.currentBooking.passengers.splice(index, 1);
      }
    },

    updatePassenger: <K extends keyof Passenger>(
      state: BookingState,
      action: PayloadAction<{ index: number; field: K; value: Passenger[K] }>
    ) => {
      const { index, field, value } = action.payload;
      if (state.currentBooking.passengers[index]) {
        state.currentBooking.passengers[index][field] = value;
      }
    },

    updateContactInfo: <K extends keyof ContactInfo>(
      state: BookingState,
      action: PayloadAction<{ field: K; value: ContactInfo[K] }>
    ) => {
      const { field, value } = action.payload;
      state.currentBooking.contactInfo[field] = value;
    },

    clearCurrentBooking: (state) => {
      state.currentBooking = {
        trainDetails: null,
        passengers: [
          { name: "", age: "", gender: "Male", berth: "No Preference" },
        ],
        contactInfo: {
          email: "",
          phone: "",
        },
        selectedClass: "",
        availableClasses: [],
        classPrice: {},
      };
      state.bookingCreated = false;
      state.lastBookingId = null;
    },

    clearError: (state) => {
      state.error = null;
    },

    resetBookingCreated: (state) => {
      state.bookingCreated = false;
      state.lastBookingId = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.bookingCreated = true;
        state.lastBookingId = action.payload.id;
        state.error = null;

        const existingBooking = state.userBookings.find(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (b: any) => b.id === action.payload.id
        );
        if (!existingBooking) {
          state.userBookings.unshift(action.payload);
        }
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to create booking";
      })

    .addCase(fetchUserBookings.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchUserBookings.fulfilled, (state, action) => {
      state.loading = false;
      state.userBookings = action.payload;
      state.error = null;
    })
    .addCase(fetchUserBookings.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? "Failed to fetch bookings";
    });
  },
});

export const {
  initializeBooking,
  updateTrainDetails,
  updateSelectedClass,
  addPassenger,
  removePassenger,
  updatePassenger,
  updateContactInfo,
  clearCurrentBooking,
  clearError,
  resetBookingCreated,
} = bookingsSlice.actions;

export const bookingReducer = bookingsSlice.reducer;

const selectBookingsState = (state: { bookings: BookingState }) =>
  state.bookings;

export const selectCurrentBooking = createSelector(
  selectBookingsState,
  (s) => s.currentBooking
);

export const selectUserBookings = createSelector(
  selectBookingsState,
  (s) => s.userBookings
);

export const selectBookingsLoadingStatus = createSelector(
  selectBookingsState,
  (s) => s.loading
);

export const selectBookingsError = createSelector(
  selectBookingsState,
  (s) => s.error
);

export const selectBookingCreated = createSelector(
  selectBookingsState,
  (s) => s.bookingCreated
);

export const selectLastBookingId = createSelector(
  selectBookingsState,
  (s) => s.lastBookingId
);
