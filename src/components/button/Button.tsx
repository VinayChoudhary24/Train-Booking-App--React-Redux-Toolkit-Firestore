import React from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  children: React.ReactNode; // button label (LOGIN, REGISTER, LOGOUT etc.)
  className?: string; // custom CSS class
  onClick?: () => void; // click handler
  type?: "button" | "submit" | "reset"; // optional (defaults to "button")
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  onClick,
  type = "button",
}) => {
  console.log("RENDER-BUTTON");
  const appliedClass = className ? styles[className] : "";
  return (
    <button
      type={type}
      className={`${styles.baseButton} ${appliedClass}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default React.memo(Button);
