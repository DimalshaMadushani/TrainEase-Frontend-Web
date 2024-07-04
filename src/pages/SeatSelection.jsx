import React from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

export default function SeatSelection() {
  const location = useLocation();
  const { selectedClass, fromStop, toStop, date, schedule } = location.state;
  console.log(location.state);
  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const response = await axios.get("/api/coach-details", {
          params: {
            date,
            fromStopId: fromStop._id,
            toStopId: toStop._id,
            scheduleId: schedule._id,
            selectedClassId: selectedClass._id,
          },
        });
        console.log("response:", response.data);
      } catch (error) {
        console.error("Failed to fetch seats:", error);
      }
    };
    fetchSeats();
  }, [location.state]);

  return (
    <div>
      <h1>select seats</h1>
    </div>
  );
}
