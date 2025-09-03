import React, { useEffect, useState } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../store/hooks/react-redux/hook";
import {
  clearError,
  selectAuthError,
  selectAuthLoadingStatus,
} from "../../../../store/auth/authSlice/authSlice";
import styles from "../AuthModal.module.css";
import { FcGoogle } from "react-icons/fc";
import {
  loginWithGoogleAsync,
  registerWithEmailAsync,
} from "../../../../store/auth/authEffects/authEffects";

// INTEFACE
interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  // onLogin?: () => void;
  switchToLogin: () => void;
}

const RegisterModal = ({
  isOpen,
  onClose,
  switchToLogin,
}: RegisterModalProps) => {
  console.log("RENDER-REGISTER-MODAL");
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectAuthLoadingStatus);
  const error = useAppSelector(selectAuthError);

  // STATE
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // dispatch(clearError());

    const result = await dispatch(
      registerWithEmailAsync({ firstName, lastName, email, password })
    );
    if (registerWithEmailAsync.fulfilled.match(result)) {
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      onClose();
    }
  };

  const handleGoogleRegister = async () => {
    // dispatch(clearError());

    const result = await dispatch(loginWithGoogleAsync());
    if (loginWithGoogleAsync.fulfilled.match(result)) {
      setFirstName("");
      setLastName("");
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
        <h2 className={styles.heading}>Register</h2>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
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
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <button
          className={styles.googleBtn}
          onClick={handleGoogleRegister}
          disabled={loading}
        >
          <FcGoogle /> Google
        </button>

        <p onClick={switchToLogin}>Already have an account? Login</p>
      </div>
    </div>
  );
};

export default React.memo(RegisterModal);
