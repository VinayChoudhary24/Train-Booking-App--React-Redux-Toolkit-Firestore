import { useEffect } from "react";
import { useAppDispatch } from "./store/hooks/react-redux/hook";
import { observeAuthState } from "./store/auth/service/authService";
import { setAuthState } from "./store/auth/authSlice/authSlice";
import { loadAuth } from "./store/auth/service/localStorage";
import { hideLoader, showLoader } from "./store/loader/loaderSlice/loaderSlice";

export default function AuthInitializer() {
  console.log("RENDER-AUTH-INITIALIZER");
  const dispatch = useAppDispatch();
  dispatch(showLoader());
  useEffect(() => {
    // 1. Restore from localStorage instantly
    const storedAuth = loadAuth();
    if (storedAuth?.user) {
      console.log("LOCALSTORAGE_USER", storedAuth.user);
      dispatch(setAuthState(storedAuth.user));
      //##HIDE_LOADER Update the Global Loader state to false
    }

    // 2. Start Firebase observer to stay in sync
    const unsubscribe = observeAuthState((user) => {
      if (user && user?.uid && user.email && user?.displayName) {
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL || null,
        };
        console.log("FIREBASE_OBSERVER_USER", userData);
        dispatch(setAuthState(userData));
      } else {
        console.log("FIREBASE_OBSERVER_USER_ELSE");
        // if user logs out in another tab → clear auth
        dispatch(setAuthState(null));
      }
      dispatch(hideLoader());
    });

    return () => unsubscribe();
  }, [dispatch]);

  return null;
}
