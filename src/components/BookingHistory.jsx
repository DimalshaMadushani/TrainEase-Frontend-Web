import axios from "axios";
import { useEffect, useState } from "react";
import BookingCard from "./BookingCard";

export default function BookingHistory() {
  const [bookingHistory, setBookingHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("Booking History:", bookingHistory);

  useEffect(() => {
    async function fetchBookingHistory() {
      try {
        const response = await axios.get(
          "https://trainease-backend.onrender.com/api/user/history",
          { withCredentials: true }
        );
        setBookingHistory(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }
    fetchBookingHistory();
  }, []);
  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {bookingHistory.length === 0 && <p>No booking history</p>}
      {bookingHistory.map((booking) => (
        <BookingCard key={booking._id} booking={booking} />
      ))}
    </div>
  );
}
