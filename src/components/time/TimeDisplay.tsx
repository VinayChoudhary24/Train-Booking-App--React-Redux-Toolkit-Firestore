import React, { useState, useEffect, useMemo, memo } from "react";
import styles from "./TimeDisplay.module.css";

// Isolated TimeDisplay Component - This prevents parent re-renders
const TimeDisplay = memo(() => {
  console.log("RENDER-TIME");
  const [currentTime, setCurrentTime] = useState(new Date());

  // Memoized formatting to prevent repeated calculations
  const formattedTime = useMemo(() => {
    const date = currentTime.getDate();
    const month = currentTime
      .toLocaleString("en-US", { month: "short" })
      .toUpperCase();
    const time = currentTime.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    return `${date}/${month} (${time})`;
  }, [currentTime]);

  // Optimized useEffect - only updates when minute changes
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime((prevTime) => {
        // Only update if minute has changed (reduces from 60 updates/min to 1)
        if (
          prevTime.getMinutes() !== now.getMinutes() ||
          prevTime.getHours() !== now.getHours() ||
          prevTime.getDate() !== now.getDate()
        ) {
          return now;
        }
        return prevTime; // No state update = no re-render
      });
    };

    // Update immediately on mount
    updateTime();

    // Check every second, but only update state when needed
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return <span className={styles.navInfo}>{formattedTime}</span>;
});

export default React.memo(TimeDisplay);
