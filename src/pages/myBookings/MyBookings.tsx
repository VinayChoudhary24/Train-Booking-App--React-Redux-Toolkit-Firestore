/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import styles from "./MyBookings.module.css";
import { db } from "../../configs/firebase/firebaseConfig";
// import { useAppDispatch } from "../../store/hooks/react-redux/hook";
// import {
//   hideLoader,
//   showLoader,
// } from "../../store/loader/loaderSlice/loaderSlice";

const MyBookings = () => {
  const { userId } = useParams();
  const [userBookings, setUserBookings] = useState<any[]>([]);
  // const dispatch = useAppDispatch();
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // dispatch(showLoader());
        const bookingsRef = collection(db, "bookings");
        const q = query(bookingsRef, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);

        const bookings = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt
              ? data.createdAt.toDate().toISOString()
              : null,
          };
        });

        setUserBookings(bookings);
      } catch (err: any) {
        setError(err.message || "Failed to fetch bookings");
      }
    };

    fetchBookings();
  }, [userId]);

  // if (loading) {
  //   const message =
  //     userBookings.length === 0
  //       ? "There are no bookings"
  //       : "Updating your bookings, please wait...";

  //   return (
  //     <div className={styles.loaderContainer}>
  //       <h2>{message}</h2>
  //     </div>
  //   );
  // }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h2>Error loading bookings</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (userBookings.length === 0) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>My Bookings</h2>
        <div className={styles.noBookings}>
          <p>You haven't made any bookings yet.</p>
          <Link to="/" className={styles.primaryButton}>
            Book a Train Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>MY BOOKINGS</h2>
      <div className={styles.tableContainer}>
        <table className={styles.bookingsTable}>
          <thead>
            <tr>
              <th>Booking Id</th>
              <th>Train</th>
              <th>From</th>
              <th>To</th>
              <th>Date</th>
              <th>Class</th>
              <th>Passengers</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {userBookings.map((booking) => (
              <tr key={booking.id} className={styles.bookingRow}>
                <td>{booking.id || "-"}</td>
                <td>
                  <div className={styles.trainName}>
                    {booking.trainDetails?.trainName || "N/A"}
                  </div>
                  <div className={styles.trainNumber}>
                    {booking.trainDetails?.trainNumber || ""}
                  </div>
                </td>
                <td>
                  <div className={styles.stationName}>
                    {booking.trainDetails?.from || "N/A"}
                  </div>
                  <div className={styles.departureTime}>
                    {booking.trainDetails?.departureTime || "N/A"}
                  </div>
                </td>
                <td>
                  <div className={styles.stationName}>
                    {booking.trainDetails?.to || "N/A"}
                  </div>
                  <div className={styles.arrivalTime}>
                    {booking.trainDetails?.arrivalTime || "N/A"}
                  </div>
                </td>
                <td>{booking.trainDetails?.date || "N/A"}</td>
                <td>{booking.trainDetails?.travelClass || "N/A"}</td>
                <td>{booking.passengers?.length || 0}</td>
                <td>
                  <span
                    className={`${styles.statusBadge} ${
                      booking.status === "confirmed"
                        ? styles.statusConfirmed
                        : styles.statusPending
                    }`}
                  >
                    {booking.status || "Processing"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBookings;
