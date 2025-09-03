import { RouterProvider } from "react-router-dom";
import router from "./AppRoutes";
import AuthInitializer from "./AuthInitializer";
import React from "react";

function App() {
  // return <RouterProvider router={router} />;
  return (
    <>
      <AuthInitializer />
      <RouterProvider router={router} />
    </>
  );
}

export default React.memo(App);
