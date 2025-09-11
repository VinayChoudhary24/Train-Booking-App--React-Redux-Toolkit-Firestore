import { createSlice, createSelector } from "@reduxjs/toolkit";
import type { TrainState } from "../types/train.types";
import { fetchTrainDetails, fetchTrains } from "../trainEffects/trainEffects";

const initialState: TrainState = {
  trains: [],
  filteredTrains: [],
  recentSearches: [],
  selectedTrain: null,
  searchParams: {
    from: "",
    to: "",
    date: "",
    travelClass: "",
    quota: "",
  },
  filters: {
    travelClass: {
      "1A": false,
      "2A": false,
      "3A": false,
      SL: false,
      "2S": false,
      CC: false,
    },
    trainType: {
      Rajdhani: false,
      Shatabdi: false,
      Vaishali: false,
    },
    departureTime: {
      "00:00 - 06:00": false,
      "06:00 - 12:00": false,
      "12:00 - 18:00": false,
      "18:00 - 24:00": false,
    },
  },
  loading: false,
  error: null,
};

//
// --- Slice
//
export const trainSlice = createSlice({
  name: "train",
  initialState,
  reducers: {
    setSearchParams: (state, action) => {
      state.searchParams = { ...state.searchParams, ...action.payload };
    },
    clearSearchParams: (state) => {
      state.searchParams = {
        from: "",
        to: "",
        date: "",
        travelClass: "",
        quota: "",
      };
    },
    toggleFilter: (state, action) => {
      const { category, value } = action.payload;
      if (
        state.filters[category] &&
        state.filters[category][value] !== undefined
      ) {
        state.filters[category][value] = !state.filters[category][value];
      }
    },
    clearFilters: (state) => {
      Object.keys(state.filters).forEach((category) => {
        Object.keys(state.filters[category]).forEach((key) => {
          state.filters[category][key] = false;
        });
      });
    },
    clearAllFiltersAndSearch: (state) => {
      // Clear search params
      state.searchParams = {
        from: "",
        to: "",
        date: "",
        travelClass: "",
        quota: "",
      };

      // Clear filters
      Object.keys(state.filters).forEach((category) => {
        Object.keys(state.filters[category]).forEach((key) => {
          state.filters[category][key] = false;
        });
      });

      // Reset filtered trains to show all trains
      state.filteredTrains = state.trains;
    },
    // Apply filters to trains
    applyFilters: (state) => {
      let filtered = [...state.trains];

      // Filter by search parameters
      if (state.searchParams.from && state.searchParams.to) {
        filtered = filtered.filter(
          (train) =>
            train.source
              .toLowerCase()
              .includes(state.searchParams.from.toLowerCase()) &&
            train.destination
              .toLowerCase()
              .includes(state.searchParams.to.toLowerCase())
        );
      }

      // Filter by date (check day of week)
      if (state.searchParams.date) {
        const selectedDate = new Date(state.searchParams.date);
        const dayIndex = selectedDate.getDay(); // 0 = Sunday, 1 = Monday ...
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const selectedDay = days[dayIndex];

        filtered = filtered.filter((train) =>
          train.days_of_operation.includes(selectedDay)
        );
      }

      // Filter by travel class from search params
      if (
        state.searchParams.travelClass &&
        state.searchParams.travelClass !== "All Classes"
      ) {
        filtered = filtered.filter((train) => {
          if (!train.price) return false;
          return Object.keys(train.price).includes(
            state.searchParams.travelClass
          );
        });
      }

      // Filter by travel class checkboxes
      const activeClassFilters = Object.keys(state.filters.travelClass).filter(
        (key) => state.filters.travelClass[key]
      );
      if (activeClassFilters.length > 0) {
        filtered = filtered.filter((train) => {
          if (!train.price) return false;
          return activeClassFilters.some((cls) =>
            Object.keys(train.price).includes(cls)
          );
        });
      }

      // Filter by train type checkboxes
      const activeTypeFilters = Object.keys(state.filters.trainType).filter(
        (key) => state.filters.trainType[key]
      );
      if (activeTypeFilters.length > 0) {
        filtered = filtered.filter((train) =>
          activeTypeFilters.some((type) => train.train_name.includes(type))
        );
      }

      // // Filter by departure time checkboxes
      // const activeTimeFilters = Object.keys(state.filters.departureTime).filter(
      //   (key) => state.filters.departureTime[key]
      // );
      // if (activeTimeFilters.length > 0) {
      //   filtered = filtered.filter((train) => {
      //     const departureHour = parseInt(train.departure_time.split(":")[0]);
      //     return activeTimeFilters.some((timeRange) => {
      //       if (timeRange === "00:00 - 06:00") {
      //         return departureHour >= 0 && departureHour < 6;
      //       } else if (timeRange === "06:00 - 12:00") {
      //         return departureHour >= 6 && departureHour < 12;
      //       } else if (timeRange === "12:00 - 18:00") {
      //         return departureHour >= 12 && departureHour < 18;
      //       } else if (timeRange === "18:00 - 24:00") {
      //         return departureHour >= 18 && departureHour < 24;
      //       }
      //       return false;
      //     });
      //   });
      // }

      state.filteredTrains = filtered;
    },

    // Clear errors
    clearError: (state) => {
      state.error = null;
    },

    // Clear selected train
    clearSelectedTrain: (state) => {
      state.selectedTrain = null;
    },

    // Add to recent searches
    addRecentSearch: (state, action) => {
      const train = action.payload;
      // Avoid duplicates
      if (
        !state.recentSearches.find((t) => t.train_number === train.train_number)
      ) {
        state.recentSearches.push(train);
      }
      // Keep only last 5 searches
      if (state.recentSearches.length > 5) {
        state.recentSearches.shift();
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrains.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTrains.fulfilled, (state, action) => {
        console.log("FETCH TRAINS SUCCESS");
        state.trains = action.payload;
        state.loading = false;
      })
      .addCase(fetchTrains.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch trains";
      })
      .addCase(fetchTrainDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTrainDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedTrain = action.payload;
      })
      .addCase(fetchTrainDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch train details";
      });
  },
});

export const {
  setSearchParams,
  clearSearchParams,
  toggleFilter,
  clearFilters,
  clearAllFiltersAndSearch,
  applyFilters,
  clearError,
  clearSelectedTrain,
  addRecentSearch,
} = trainSlice.actions;

export const trainReducer = trainSlice.reducer;

const selectTrainState = (state: { trains: TrainState }) => state.trains;

export const selectAllTrains = createSelector(
  selectTrainState,
  (train) => train.trains
);

export const selectFilteredTrains = createSelector(
  selectTrainState,
  (train) => train.filteredTrains
);

export const selectRecentSearches = createSelector(
  selectTrainState,
  (train) => train.recentSearches
);

export const selectSelectedTrain = createSelector(
  selectTrainState,
  (train) => train.selectedTrain
);

export const selectSearchParams = createSelector(
  selectTrainState,
  (train) => train.searchParams
);

export const selectTrainFilters = createSelector(
  selectTrainState,
  (train) => train.filters
);

export const selectTrainLoading = createSelector(
  selectTrainState,
  (train) => train.loading
);

export const selectTrainError = createSelector(
  selectTrainState,
  (train) => train.error
);
