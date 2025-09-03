import React, { useEffect, useState } from "react";
import styles from "../AuthModal.module.css";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../store/hooks/react-redux/hook";
import {
  clearError,
  selectAuthError,
  selectAuthLoadingStatus,
} from "../../../../store/auth/authSlice/authSlice";
import { FcGoogle } from "react-icons/fc";
import {
  loginWithEmailAsync,
  loginWithGoogleAsync,
} from "../../../../store/auth/authEffects/authEffects";

// INTEFACE
interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  // onLogin?: () => void;
  switchToRegister: () => void;
}

const LoginModal = ({ isOpen, onClose, switchToRegister }: LoginModalProps) => {
  console.log("RENDER-LOGIN-MODAL");
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectAuthLoadingStatus);
  const error = useAppSelector(selectAuthError);

  // STATE
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // SIDE EFFECTS
  // useEffect Hook to clear the Error
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        // Clear Error after 2 seconds
        dispatch(clearError());
      }, 2500);
    }
  }, [error, dispatch]);

  if (!isOpen) return null;

  const handleEmailLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // dispatch(clearError());
    const result = await dispatch(loginWithEmailAsync({ email, password }));
    if (loginWithEmailAsync.fulfilled.match(result)) {
      setEmail("");
      setPassword("");
      onClose();
    }
  };

  const handleGoogleLogin = async () => {
    // dispatch(clearError());

    const result = await dispatch(loginWithGoogleAsync());
    if (loginWithGoogleAsync.fulfilled.match(result)) {
      setEmail("");
      setPassword("");
      onClose();
    }
  };

  return (
    <div
      className={`${styles.overlay} ${isOpen ? styles.show : ""}`}
      onClick={onClose}
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          X
        </button>
        <h2 className={styles.heading}>Login</h2>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleEmailLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className={styles.loginBtn} type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <button
          className={styles.googleBtn}
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          <FcGoogle /> Google
        </button>

        <p onClick={switchToRegister}>Don't have an account? Register</p>
      </div>
    </div>
  );
};

export default React.memo(LoginModal);
