import React, { useCallback, useState } from "react";
// import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { FaBell, FaHome, FaQuestionCircle } from "react-icons/fa";
import Button from "../button/Button";
import { Link, useNavigate } from "react-router-dom";
import {
  useAppDispatch,
  useAppSelector,
} from "../../store/hooks/react-redux/hook";
import { selectIsUserLoggedIn } from "../../store/auth/authSlice/authSlice";
import { logoutAsync } from "../../store/auth/authEffects/authEffects";
import LoginModal from "../../pages/modals/auth/login/LoginModal";
import RegisterModal from "../../pages/modals/auth/register/RegisterModal";
import TimeDisplay from "../time/TimeDisplay";

const Navbar = () => {
  console.log("RENDER-NAVBAR");
  const navigate = useNavigate();
  // REDUX DISPATCH and SELECTOR
  const dispatch = useAppDispatch();
  // const user = useAppSelector(selectUserDetails);
  const isUserLoggedIn = useAppSelector(selectIsUserLoggedIn);
  // const status = useAppSelector(selectAuthLoadingStatus);
  // const error = useAppSelector(selectAuthError);
  // const isAuthed = useAppSelector(selectIsAuthenticated);

  // STATE
  // const [currentTime, setCurrentTime] = useState(new Date()); //shows current Date and Time
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); //Login Modal
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false); //Register Modal

  // SIDE-EFFECTS
  // Setting Date and Time
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentTime(new Date());
  //     //   console.log("currentTime", currentTime);
  //   }, 1000);
  //   // Clean-up code
  //   return () => clearInterval(interval);
  // }, []);

  const handleBookingClick = () => {
    if (isUserLoggedIn) {
      navigate("/booking");
    } else {
      setIsLoginModalOpen(true);
      setIsRegisterModalOpen(false);
    }
  };

  const handleLogin = useCallback(() => {
    setIsLoginModalOpen(true);
    setIsRegisterModalOpen(false);
  }, [setIsLoginModalOpen, setIsRegisterModalOpen]);

  const handleRegister = useCallback(() => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
  }, [setIsLoginModalOpen, setIsRegisterModalOpen]);

  const closeModals = useCallback(() => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(false);
  }, [setIsLoginModalOpen, setIsRegisterModalOpen]);

  // UI
  return (
    <>
      <nav className={styles.navbar}>
        {/* Logo/Home icon */}
        <div className={styles.logoContainer} onClick={() => navigate("/")}>
          <FaHome className={styles.homeIcon} title="Home" />
          <div className={styles.logo}>
            <i>DEFI</i>
          </div>
        </div>

        {/* Navigation Links */}
        <div className={styles.navLinks}>
          <span className={styles.navLink} onClick={handleBookingClick}>
            My Booings
          </span>
          <Link to="/contact" className={styles.navLink}>
            Contact Us
          </Link>
          {/* <span className={styles.navinfo}>
            {currentTime.getDate()}/
            {currentTime
              .toLocaleString("en-US", { month: "short" })
              .toUpperCase()}{" "}
            (
            {currentTime.toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })}
            )
          </span> */}
          <TimeDisplay />
          <FaQuestionCircle className={styles.icon} title="Help & Support" />

          {/* Authentication Buttons */}
          {isUserLoggedIn ? (
            <>
              <FaBell className={styles.icon} title="Notifications" />
              <Button
                className="logout"
                onClick={() => dispatch(logoutAsync())}
              >
                LOGOUT
              </Button>
            </>
          ) : (
            <>
              <Button className="login" onClick={handleLogin}>
                LOGIN
              </Button>
              <Button className="register" onClick={handleRegister}>
                REGISTER
              </Button>
            </>
          )}
        </div>
      </nav>

      {/* Login & Register Modals */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={closeModals}
        // onLogin={() => {}} // Login handled by async thunk
        switchToRegister={handleRegister}
      />

      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={closeModals}
        switchToLogin={handleLogin}
      />
    </>
  );
};

export default React.memo(Navbar);
