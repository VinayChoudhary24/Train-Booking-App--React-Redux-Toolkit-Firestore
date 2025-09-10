import Navbar from "../../components/header/Navbar";
import styles from "../../styles/app/App.module.css";
import Footer from "../../components/footer/Footer";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../../store/hooks/react-redux/hook";
import { selectIsLoading } from "../../store/loader/loaderSlice/loaderSlice";
import React from "react";
import Loader from "../../components/loader/Loader";

// const RootLayout = ({ children }: { children?: React.ReactNode }) => {
const RootLayout = () => {
  const isLoading = useAppSelector(selectIsLoading);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.app}>
      <Navbar />
      <div className={styles.mainContent}>
        {/* {children} */}
        <Outlet /> {/* Child routes will render here */}
      </div>
      <Footer />
    </div>
  );
};

export default React.memo(RootLayout);
