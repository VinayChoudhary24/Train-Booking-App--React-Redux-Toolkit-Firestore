import React, { useState } from "react";
import {
  FaCalendarAlt,
  FaExchangeAlt,
  FaSuitcase,
  FaTrain,
} from "react-icons/fa";
import styles from "./Home.module.css";
import Tree from "../../assets/tree/Tree";
import TreeLarge from "../../assets/tree/TreeLarge";
import Train from "../../assets/train/Train";
import { useNavigate } from "react-router-dom";
// import { useAppDispatch } from "../../store/hooks/react-redux/hook";
// import { showLoader } from "../../store/loader/loaderSlice/loaderSlice";

const Home = () => {
  const navigate = useNavigate();
  // const dispatch = useAppDispatch();
  console.log("RENDER-HOME");
  // STATE
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [travelClass, setTravelClass] = useState("All Classes");
  const [quota, setQuota] = useState("General");

  const swapLocations = () => {
    setFrom(to);
    setTo(from);
  };

  // SIDE-EFFECTS
  // Handle form submission for search
  const handleSearchClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Basic validation
    if (!from || !to) {
      alert("Please enter both From and To stations");
      return;
    }

    // Navigate to search results with query parameters
    navigate(
      `/train-search?from=${encodeURIComponent(from)}&to=${encodeURIComponent(
        to
      )}&date=${date}&class=${encodeURIComponent(
        travelClass
      )}&quota=${encodeURIComponent(quota)}`
    );
  };

  // UI
  return (
    <div className={styles.container}>
      {/* Booking Form */}
      <article className={styles.bookingForm}>
        {/* <h2>BOOK TICKET</h2> */}
        {/* From & To Input Fields */}
        <div className={styles.inputGroup}>
          <div className={styles.inputWrapper}>
            <FaTrain className={styles.icon} />
            <input
              type="text"
              placeholder="From Station"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className={styles.input}
            />
          </div>
          <button className={styles.swapButton} onClick={swapLocations}>
            <FaExchangeAlt />
          </button>
          <div className={styles.inputWrapper}>
            <FaTrain className={styles.icon} />
            <input
              type="text"
              placeholder="To Station"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className={styles.input}
            />
          </div>
        </div>

        {/* Date & Class Selection */}
        <div className={styles.inputGroup}>
          <div className={styles.inputWrapper}>
            <FaCalendarAlt className={styles.icon} />
            <input
              type="date"
              className={styles.input}
              min={new Date().toISOString().split("T")[0]}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className={styles.inputWrapper}>
            <FaSuitcase className={styles.icon} />
            <select
              className={styles.select}
              value={travelClass}
              onChange={(e) => setTravelClass(e.target.value)}
            >
              <option>All Classes</option>
              <option>Sleeper</option>
              <option>AC 3 Tier</option>
              <option>AC 2 Tier</option>
              <option>AC First Class</option>
            </select>
          </div>
        </div>

        {/* Quota Selection */}
        <div className={styles.inputGroup}>
          <div className={styles.inputWrapper}>
            <FaTrain className={styles.icon} />
            <select
              className={styles.select}
              value={quota}
              onChange={(e) => setQuota(e.target.value)}
            >
              <option>General</option>
              <option>Ladies</option>
              <option>Tatkal</option>
              <option>Premium Tatkal</option>
              <option>Railway Pass</option>
            </select>
          </div>
        </div>

        {/* Checkbox Options */}
        <div className={styles.checkboxGroup}>
          <label>
            <input type="checkbox" /> Person With Disability Concession
          </label>
          <label>
            <input type="checkbox" /> Flexible With Date
          </label>
          <label>
            <input type="checkbox" /> Train with Available Berth
          </label>
          <label>
            <input type="checkbox" /> Railway Pass Concession
          </label>
        </div>

        {/* Buttons */}
        <div className={styles.buttonGroup}>
          <button className={styles.searchButton} onClick={handleSearchClick}>
            Search Trains
          </button>
          <button
            className={styles.ShowTrain}
            onClick={() => {
              navigate("/train-search");
            }}
          >
            Show All Trains
          </button>
        </div>
      </article>

      {/* Left-Section with SKY */}
      <article className={styles.background}>
        {/* Stars */}
        <div className={styles.stars}></div>
        <div className={styles.stars}></div>
        <div className={styles.stars}></div>
        {/* Clouds */}
        <div className={styles.clouds}>
          <div className={`${styles.cloud} ${styles.cloud1}`}></div>
          <div className={`${styles.cloud} ${styles.cloud2}`}></div>
          <div className={`${styles.cloud} ${styles.cloud3}`}></div>
        </div>
        {/* Train */}
        <div className={styles.trainImage}>
          <Train />
        </div>
        {/* Tree */}
        <div className={styles.treeImage1}>
          <TreeLarge />
        </div>
        <div className={styles.treeImage2}>
          <TreeLarge />
        </div>
        <div className={styles.treeImage3}>
          <Tree />
        </div>
        <div className={styles.treeImage4}>
          <Tree />
        </div>
        <div className={styles.treeImage5}>
          <TreeLarge />
        </div>
        <div className={styles.treeImage6}>
          <Tree />
        </div>
        <div className={styles.treeImage7}>
          <TreeLarge />
        </div>
      </article>
    </div>
  );
};

export default React.memo(Home);
