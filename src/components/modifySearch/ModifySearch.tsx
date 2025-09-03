import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./ModifySearch.module.css";
import { FaExchangeAlt } from "react-icons/fa";
import {
  useAppDispatch,
  useAppSelector,
} from "../../store/hooks/react-redux/hook";
import {
  applyFilters,
  selectSearchParams,
  setSearchParams,
} from "../../store/train/trainSlice/trainSlice";

const ModifySearch = () => {
  console.log("MODIFYING_SERACH");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  // Get search params from Redux store
  const searchParams = useAppSelector(selectSearchParams);

  // Local state for form inputs
  const [localSearchParams, setLocalSearchParams] = useState({
    from: "",
    to: "",
    date: "",
    travelClass: "",
    quota: "General",
  });

  // Memoized URL parameters parsing
  const parsedUrlParams = useMemo(() => {
    const query = new URLSearchParams(location.search);
    return {
      from: query.get("from") || "",
      to: query.get("to") || "",
      date: query.get("date") || "",
      travelClass: query.get("class") || "",
      quota: query.get("quota") || "General",
    };
  }, [location.search]);

  // Sync local state with Redux store and URL params
  useEffect(() => {
    // Update local form state
    setLocalSearchParams(parsedUrlParams);

    // Update Redux store if URL params are different
    if (JSON.stringify(parsedUrlParams) !== JSON.stringify(searchParams)) {
      dispatch(setSearchParams(parsedUrlParams));
    }
  }, [parsedUrlParams, searchParams, dispatch]);

  // Function to handle search form submission
  const handleSearch = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!localSearchParams.from || !localSearchParams.to) {
        alert("Please enter both From and To stations");
        return;
      }

      // Update Redux store with new search parameters
      dispatch(setSearchParams(localSearchParams));

      // Apply filters to update the filtered trains
      dispatch(applyFilters());

      // Navigate to search results with updated query parameters
      navigate(
        `/train-search?from=${encodeURIComponent(
          localSearchParams.from
        )}&to=${encodeURIComponent(localSearchParams.to)}&date=${
          localSearchParams.date
        }&class=${encodeURIComponent(
          localSearchParams.travelClass
        )}&quota=${encodeURIComponent(localSearchParams.quota)}`
      );
    },
    [dispatch, navigate, localSearchParams]
  );

  // Function to swap From and To stations
  const handleSwapStations = useCallback(() => {
    setLocalSearchParams((prev) => ({
      ...prev,
      from: prev.to,
      to: prev.from,
    }));
  }, []);

  return (
    <div className={styles.searchForm}>
      <form onSubmit={handleSearch}>
        <div className={styles.stationInputs}>
          <input
            type="text"
            placeholder="From"
            value={localSearchParams.from}
            onChange={(e) =>
              setLocalSearchParams({
                ...localSearchParams,
                from: e.target.value,
              })
            }
          />
          <button
            type="button"
            className={styles.swapButton}
            onClick={handleSwapStations}
          >
            <FaExchangeAlt />
          </button>
          <input
            type="text"
            placeholder="To"
            value={localSearchParams.to}
            onChange={(e) =>
              setLocalSearchParams({ ...localSearchParams, to: e.target.value })
            }
          />
        </div>

        <input
          type="date"
          min={new Date().toISOString().split("T")[0]}
          value={localSearchParams.date}
          onChange={(e) =>
            setLocalSearchParams({ ...localSearchParams, date: e.target.value })
          }
        />

        <select
          value={localSearchParams.travelClass}
          onChange={(e) =>
            setLocalSearchParams({
              ...localSearchParams,
              travelClass: e.target.value,
            })
          }
        >
          <option value="">Select Class</option>
          <option value="1A">AC First Class (1A)</option>
          <option value="2A">AC 2 Tier (2A)</option>
          <option value="3A">AC 3 Tier (3A)</option>
          <option value="SL">Sleeper (SL)</option>
        </select>

        <select
          value={localSearchParams.quota}
          onChange={(e) =>
            setLocalSearchParams({
              ...localSearchParams,
              quota: e.target.value,
            })
          }
        >
          <option value="General">General</option>
          <option value="Ladies">Ladies</option>
          <option value="Tatkal">Tatkal</option>
          <option value="Premium Tatkal">Premium Tatkal</option>
        </select>

        <button type="submit">Modify Search</button>
      </form>
    </div>
  );
};

export default React.memo(ModifySearch);
