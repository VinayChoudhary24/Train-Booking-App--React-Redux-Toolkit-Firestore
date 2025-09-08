import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/authSlice/authSlice";
import { loggerMiddleware } from "./middlewares/loggerMiddleware";
import { loaderReducer } from "./loader/loaderSlice/loaderSlice";
import { trainReducer } from "./train/trainSlice/trainSlice";
import { bookingReducer } from "./bookings/bookingSlice/bookingSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    loader: loaderReducer,
    trains: trainReducer,
    bookings: bookingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([loggerMiddleware]),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
