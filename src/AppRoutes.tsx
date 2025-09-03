import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./layouts/rootLayout/RootLayout";
import Home from "./pages/home/Home";
import TrainCarousel from "./components/carousel/TrainCarousel";
import NotFoundPage from "./components/notFound/NotFound";
import TrainSearchResults from "./pages/trainSearchResults/TrainSearchResults";
// import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";

const ROUTES = {
  HOME: {
    PATH: "/",
    CHILDREN: {
      BOOKING: "booking",
      CONTACT: "contact",
      LOGIN: "login",
      TRAIN_SEARCH: "train-search",
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
        element: <TrainSearchResults />,
      },
      {
        path: ROUTES.HOME.CHILDREN.BOOKING,
        // element: (
        //   <ProtectedRoute>
        //     <BookingPage />
        //   </ProtectedRoute>
        // ),
      },
      //   { path: ROUTES.HOME.CHILDREN.CONTACT, element: <ContactPage /> },
      //   { path: ROUTES.HOME.CHILDREN.LOGIN, element: <LoginPage /> },
    ],
  },
]);

export default router;
