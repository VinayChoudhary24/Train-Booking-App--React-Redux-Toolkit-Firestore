import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./layouts/rootLayout/RootLayout";
import Home from "./pages/home/Home";
import TrainCarousel from "./components/carousel/TrainCarousel";
import NotFoundPage from "./components/notFound/NotFound";
import TrainSearchResults from "./pages/trainSearchResults/TrainSearchResults";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import TrainDetails from "./pages/trainDetails/TrainDetails";
import BookingConfirmation from "./pages/bookingConfirmation/BookingConfirmation";
import BookingPage from "./pages/bookingPage/BookingPage";
import MyBookings from "./pages/myBookings/MyBookings";
import ContactPage from "./pages/contactUS/contactPage";
// import { lazy, Suspense } from "react";

// const TrainSearchResults = lazy(
//   () => import("./pages/trainSearchResults/TrainSearchResults")
// );

const ROUTES = {
  HOME: {
    PATH: "/",
    CHILDREN: {
      BOOKING: "booking",
      CONTACT: "contact",
      LOGIN: "login",
      TRAIN_SEARCH: "train-search",
      TRAIN_DETAIL: "train-details/:train_number",
      BOOKING_CONFIRMATION: "booking-confirmation",
      MY_BOOKINGS: "my-bookings/:userId",
    },
  },
};

const router = createBrowserRouter([
  {
    path: ROUTES.HOME.PATH,
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: (
          <>
            <Home />
            <TrainCarousel />
          </>
        ),
      },
      {
        path: ROUTES.HOME.CHILDREN.TRAIN_SEARCH,
        element: (
          // <Suspense fallback={<div>Loading search results...</div>}>
          <TrainSearchResults />
          // </Suspense>
        ),
      },
      {
        path: ROUTES.HOME.CHILDREN.TRAIN_DETAIL,
        element: <TrainDetails />,
      },
      {
        path: ROUTES.HOME.CHILDREN.BOOKING_CONFIRMATION,
        element: <BookingConfirmation />,
      },
      {
        path: ROUTES.HOME.CHILDREN.BOOKING,
        element: (
          <ProtectedRoute>
            <BookingPage />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.HOME.CHILDREN.MY_BOOKINGS,
        element: (
          <ProtectedRoute>
            <MyBookings />
          </ProtectedRoute>
        ),
      },
      { path: ROUTES.HOME.CHILDREN.CONTACT, element: <ContactPage /> },
    ],
  },
]);

export default router;
