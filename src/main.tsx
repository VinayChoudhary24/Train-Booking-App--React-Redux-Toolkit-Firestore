import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";

createRoot(document.getElementById("root")!).render(
  // GLOBAL STATE
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>
);
