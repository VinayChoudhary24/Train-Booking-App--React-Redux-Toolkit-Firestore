/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLocation, useNavigate } from "react-router-dom";
import {
  useAppDispatch,
  useAppSelector,
} from "../../store/hooks/react-redux/hook";
import {
  clearError,
  selectAllTrains,
  selectFilteredTrains,
  selectSearchParams,
  selectTrainError,
  selectTrainFilters,
  selectTrainLoading,
  toggleFilter,
} from "../../store/train/trainSlice/trainSlice";
import { useCallback, useEffect, useMemo } from "react";
import styles from "./TrainSearchResults.module.css";
import {
  applyFilters,
  setSearchParams,
} from "../../store/train/trainSlice/trainSlice";
import ModifySearch from "../../components/modifySearch/ModifySearch";
import { fetchTrains } from "../../store/train/trainEffects/trainEffects";
import {
  hideLoader,
  showLoader,
} from "../../store/loader/loaderSlice/loaderSlice";

const TrainSearchResults = () => {
  console.log("TRAIN_RESULTS");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const trains = useAppSelector(selectAllTrains);
  const filteredTrains = useAppSelector(selectFilteredTrains);
  const searchParams = useAppSelector(selectSearchParams);
  const filters = useAppSelector(selectTrainFilters);
  const loading = useAppSelector(selectTrainLoading);
  const error = useAppSelector(selectTrainError);

  // STATE

  // Handler for checkbox changes
  const handleFilterChange = useCallback(
    (category: any, value: any) => {
      dispatch(toggleFilter({ category, value }));
      dispatch(applyFilters());
    },
    [dispatch]
  );

  // Memoized search parameters parsing
  const parsedSearchParams = useMemo(() => {
    const query = new URLSearchParams(location.search);
    return {
      from: query.get("from") || "",
      to: query.get("to") || "",
      date: query.get("date") || "",
      travelClass: query.get("class") || "",
      quota: query.get("quota") || "",
    };
  }, [location.search]);

  // Parse query parameters and fetch trains
  useEffect(() => {
    dispatch(setSearchParams(parsedSearchParams));

    // Fetch trains if not already loaded
    if (trains.length === 0) {
      dispatch(showLoader());
      console.log("FETCHING-TRAIN-1111");
      dispatch(fetchTrains());
    }
  }, [dispatch, parsedSearchParams, trains.length]);

  const handleDetailsClick = useCallback(
    (train: any) => {
      navigate(`/train-details/${train}`);
    },
    [navigate]
  );

  const handleBookNowClick = useCallback(
    (train: any) => {
      // Extract current date in YYYY-MM-DD format
      const today = new Date();
      const formattedDate = today.toISOString().split("T")[0];

      // Get the first available class as default
      const defaultClass = Object.keys(train.price)[0] || "AC Chair Car";

      // Navigate to booking page with complete train details
      navigate("/booking", {
        state: {
          trainNumber: train.train_number,
          trainName: train.train_name,
          from: train.source,
          to: train.destination,
          date: formattedDate,
          departureTime: train.departure_time,
          arrivalTime: train.arrival_time,
          duration: train.duration,
          travelClass: defaultClass,
          quota: "General",
          price: train.price,
          days_of_operation: train.days_of_operation,
        },
      });
    },
    [navigate]
  );

  // Apply filters when trains, search params, or filters change
  useEffect(() => {
    if (trains.length > 0) {
      // console.log("FETCHING-TRAIN-2222");
      dispatch(showLoader());
      dispatch(applyFilters());
    }
    // console.log("LOADING", loading);
    // console.log("TRAINS", trains);
    dispatch(hideLoader());
  }, [loading, trains, searchParams, filters, dispatch]);

  // Clear error when component unmounts
  useEffect(() => {
    return () => {
      if (error) {
        dispatch(clearError());
      }
    };
  }, [error, dispatch]);

  const displayTrains = useMemo(() => {
    return searchParams.from ||
      searchParams.to ||
      searchParams.travelClass ||
      Object.values(filters).some((category: any) =>
        Object.values(category).some((value) => value)
      )
      ? filteredTrains
      : trains;
  }, [trains, filteredTrains, searchParams, filters]);

  // Show loading state
  // if (loading) {
  //   // dispatch(showLoader());
  //   return (
  //     <>
  //       <ModifySearch />
  //       <div className={styles.container}>
  //         <div className={styles.loading}>Loading trains...</div>
  //       </div>
  //     </>
  //   );
  // }

  // Show error state
  if (error) {
    return (
      <>
        <ModifySearch />
        <div className={styles.container}>
          <div className={styles.error}>Error: {error}</div>
        </div>
      </>
    );
  }

  return (
    <>
      <ModifySearch />
      <div className={styles.container}>
        <div className={styles.filterSection}>
          <div className={styles.filterColumn}>
            <h3>Travel Classes</h3>
            {/* Travel class filter checkboxes */}
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={filters.travelClass["1A"]}
                onChange={() => handleFilterChange("travelClass", "1A")}
              />
              AC First Class (1A)
            </label>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={filters.travelClass["2A"]}
                onChange={() => handleFilterChange("travelClass", "2A")}
              />
              AC 2 Tier (2A)
            </label>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={filters.travelClass["3A"]}
                onChange={() => handleFilterChange("travelClass", "3A")}
              />
              AC 3 Tier (3A)
            </label>
          </div>
          <div className={styles.filterColumn}>
            <h3>Train Type</h3>
            {/* Train type filter checkboxes */}
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={filters.trainType["Rajdhani"]}
                onChange={() => handleFilterChange("trainType", "Rajdhani")}
              />
              Rajdhani
            </label>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={filters.trainType["Shatabdi"]}
                onChange={() => handleFilterChange("trainType", "Shatabdi")}
              />
              Shatabdi
            </label>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={filters.trainType["Vaishali"]}
                onChange={() => handleFilterChange("trainType", "Vaishali")}
              />
              Vaishali
            </label>
          </div>
          <div className={styles.filterColumn}>
            <h3>Departure Time</h3>
            {/* Departure time filter checkboxes */}
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={filters.departureTime["00:00 - 06:00"]}
                onChange={() =>
                  handleFilterChange("departureTime", "00:00 - 06:00")
                }
              />
              00:00 - 06:00
            </label>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={filters.departureTime["06:00 - 12:00"]}
                onChange={() =>
                  handleFilterChange("departureTime", "06:00 - 12:00")
                }
              />
              06:00 - 12:00
            </label>
          </div>
        </div>
        <div className={styles.trainList}>
          {displayTrains.length === 0 ? (
            <div className={styles.noTrains}>
              No trains found for this route.
            </div>
          ) : (
            displayTrains.map((train: any) => (
              <div key={train.train_number} className={styles.trainCard}>
                <div className={styles.trainHeader}>
                  <span className={styles.trainName}>
                    {train.train_name} ({train.train_number})
                  </span>
                  <span className={styles.trainSchedule}>Train Schedule</span>
                </div>
                <div className={styles.trainDetails}>
                  <div className={styles.timeInfo}>
                    <span>{train.departure_time}</span>
                    <span>{train.source}</span>
                  </div>
                  <span className={styles.durationInfo}>
                    {train.duration} •{" "}
                    {Array.isArray(train.days_of_operation)
                      ? train.days_of_operation.join(", ")
                      : train.days_of_operation}
                  </span>
                  <div className={styles.timeInfo}>
                    <span>{train.arrival_time}</span>
                    <span>{train.destination}</span>
                  </div>
                </div>
                <div className={styles.classInfo}>
                  {/* Use the price object keys as available classes */}
                  {train.price ? (
                    Object.keys(train.price).map((cls) => (
                      <span key={cls}>
                        {cls} (₹{train.price[cls]})
                      </span>
                    ))
                  ) : (
                    <span>No class information available</span>
                  )}
                </div>
                <div className={styles.actionButtons}>
                  {train.price && Object.keys(train.price).length > 0 ? (
                    <div className={styles.bookingOptions}>
                      <button
                        className={styles.bookNowButton}
                        onClick={() => handleBookNowClick(train)}
                      >
                        Book Now
                      </button>
                      <button
                        className={styles.otherDatesButton}
                        onClick={() => handleDetailsClick(train.train_number)}
                      >
                        Other Details
                      </button>
                    </div>
                  ) : (
                    <div className={styles.bookingOptions}>
                      <button className={styles.disabledButton} disabled>
                        No Seats Available
                      </button>
                      <button
                        className={styles.otherDatesButton}
                        onClick={() => handleDetailsClick(train.train_number)}
                      >
                        Other Dates
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default TrainSearchResults;
