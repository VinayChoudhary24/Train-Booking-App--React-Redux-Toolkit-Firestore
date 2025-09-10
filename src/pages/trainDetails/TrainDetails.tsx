/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useMemo, useState } from "react";
import { FaTrain } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./TrainDetails.module.css";
import {
  useAppDispatch,
  useAppSelector,
} from "../../store/hooks/react-redux/hook";
import {
  clearError,
  clearSelectedTrain,
  selectSelectedTrain,
  selectTrainError,
} from "../../store/train/trainSlice/trainSlice";
import { fetchTrainDetails } from "../../store/train/trainEffects/trainEffects";

const TrainDetails = () => {
  const { train_number } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [selectedClass, setSelectedClass] = useState<string | null>(null);

  // Redux state
  //   const loading = useAppSelector(selectTrainLoading);
  const error = useAppSelector(selectTrainError);
  const trainDetails = useAppSelector(selectSelectedTrain);

  useEffect(() => {
    // dispatch(showLoader());
    // Fetch train details using Redux
    if (train_number) {
      dispatch(fetchTrainDetails(train_number));
    }

    // Cleanup on unmount
    return () => {
      dispatch(clearSelectedTrain());
    };
  }, [train_number, dispatch]);

  // Set default selected class when train details are loaded
  useEffect(() => {
    if (
      trainDetails &&
      trainDetails.price &&
      Object.keys(trainDetails.price).length > 0 &&
      !selectedClass
    ) {
      setSelectedClass(Object.keys(trainDetails.price)[0]);
    }
  }, [trainDetails, selectedClass]);

  // Memoize source and destination
  const { source, destination } = useMemo(() => {
    if (!trainDetails || !trainDetails.route?.length) {
      return { source: null, destination: null };
    }
    return {
      source: trainDetails.route[0],
      destination: trainDetails.route[trainDetails.route.length - 1],
    };
  }, [trainDetails]);

  // Memoize fare calculations
  const { baseFare, serviceCharge, totalFare } = useMemo(() => {
    if (!trainDetails?.price || !selectedClass) {
      return { baseFare: 0, serviceCharge: 0, totalFare: 0 };
    }
    const base = trainDetails.price[selectedClass];
    const service = Math.floor(base * 0.05);
    return {
      baseFare: base,
      serviceCharge: service,
      totalFare: base + service,
    };
  }, [trainDetails, selectedClass]);

  // Memoize class selection handler
  const handleClassSelection = useCallback((classType: string) => {
    setSelectedClass(classType);
  }, []);

  // Memoize booking handler
  const handleBooking = useCallback(() => {
    if (!trainDetails || !selectedClass || !source || !destination) return;

    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];

    const trainData = {
      trainNumber: trainDetails.train_number,
      trainName: trainDetails.train_name,
      from: source.station_name,
      to: destination.station_name,
      date: formattedDate,
      departureTime: trainDetails.departure_time,
      arrivalTime: trainDetails.arrival_time,
      duration: trainDetails.duration,
      travelClass: selectedClass,
      quota: "General",
    };

    navigate("/booking", {
      state: {
        ...trainData,
        price: trainDetails.price,
      },
    });
  }, [trainDetails, selectedClass, source, destination, navigate]);

  //   if (loading) {
  //     return (
  //       <div className={styles.container}>
  //         <p className={styles.loading}>Loading train details...</p>
  //       </div>
  //     );
  //   }

  if (error) {
    return (
      <div className={styles.container}>
        <p className={styles.error}>Error: {error}</p>
        <button
          className={styles.backButton}
          onClick={() => {
            dispatch(clearError());
            navigate(-1);
          }}
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!trainDetails) {
    return (
      <div className={styles.container}>
        <p className={styles.error}>Train not found</p>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2>
        <FaTrain /> {trainDetails.train_name} ({trainDetails.train_number})
      </h2>
      <div className={styles.operationDays}>
        <h3>Days of Operation</h3>
        <div className={styles.daysContainer}>
          {trainDetails.days_of_operation.map((day: any) => (
            <span key={day} className={styles.dayBadge}>
              {day}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.journeyInfo}>
        <div className={styles.journeyDetail}>
          <span>Departure</span>
          <strong>{trainDetails.departure_time}</strong>
        </div>
        <div className={styles.journeyDetail}>
          <span>Duration</span>
          <strong>{trainDetails.duration}</strong>
        </div>
        <div className={styles.journeyDetail}>
          <span>Arrival</span>
          <strong>{trainDetails.arrival_time}</strong>
        </div>
      </div>

      <div className={styles.progressBar}>
        <div className={`${styles.station} ${styles.source}`}>
          <span className={styles.stationName}>{source.station_name}</span>
          <div className={styles.timeInfo}>
            <div>Arrival: {source.arrival_time}</div> <FaTrain />
            <div>Departure: {source.departure_time}</div>
          </div>
        </div>

        {trainDetails.route.slice(1, -1).map((station: any, index: any) => (
          <div
            key={index}
            className={`${styles.station} ${
              index % 2 === 0 ? styles.right : styles.left
            }`}
          >
            <span className={styles.stationName}>{station.station_name}</span>
            <div className={styles.timeInfo}>
              <div>Arrival: {station.arrival_time}</div>
              <FaTrain />

              <div>Departure: {station.departure_time}</div>
            </div>
          </div>
        ))}

        <div className={`${styles.station} ${styles.destination}`}>
          <span className={styles.stationName}>{destination.station_name}</span>
          <div className={styles.timeInfo}>
            <div>Arrival: {destination.arrival_time}</div>
            <div>Departure: {destination.departure_time}</div>
          </div>
        </div>
      </div>

      {trainDetails.price && (
        <div className={styles.priceCard}>
          <h3>Fare Information</h3>

          <div className={styles.classSelector}>
            {Object.keys(trainDetails.price).map((classType: any) => (
              <button
                key={classType}
                className={`${styles.classButton} ${
                  selectedClass === classType ? styles.active : ""
                }`}
                onClick={() => handleClassSelection(classType)}
              >
                {classType}
              </button>
            ))}
          </div>

          <div className={styles.priceDetails}>
            <span>Base Fare:</span>
            <span className={styles.price}>₹{baseFare}</span>
          </div>
          <div className={styles.priceDetails}>
            <span>Service Charges:</span>
            <span className={styles.price}>₹{serviceCharge}</span>
          </div>
          <div className={styles.priceDetails}>
            <span>
              <strong>Total:</strong>
            </span>
            <span className={styles.price}>
              <strong>₹{totalFare}</strong>
            </span>
          </div>
          <button className={styles.bookButton} onClick={handleBooking}>
            Book Now - {selectedClass}
          </button>
        </div>
      )}
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  );
};

export default TrainDetails;
