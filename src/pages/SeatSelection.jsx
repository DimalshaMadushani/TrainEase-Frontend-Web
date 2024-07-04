import React from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import SeatLayout from "../components/SeatLayout";

// const coaches = [
//   {
//     id: 1,
//     seats: [
//       { id: "1A", x: 20, y: 20 },
//       { id: "1B", x: 90, y: 20 },
//       { id: "1C", x: 250, y: 20 },
//       { id: "1D", x: 320, y: 20 },
//       { id: "2A", x: 20, y: 90 },
//       { id: "2B", x: 90, y: 90 },
//       { id: "2C", x: 250, y: 90 },
//       { id: "2D", x: 320, y: 90 },
//       { id: "3A", x: 20, y: 160 },
//       { id: "3B", x: 90, y: 160 },
//       { id: "3C", x: 250, y: 160 },
//       { id: "3D", x: 320, y: 160 },
//       { id: "4A", x: 20, y: 230 },
//       { id: "4B", x: 90, y: 230 },
//       { id: "4C", x: 250, y: 230 },
//       { id: "4D", x: 320, y: 230 },
//       { id: "5A", x: 20, y: 300 },
//       { id: "5B", x: 90, y: 300 },
//       { id: "5C", x: 250, y: 300 },
//       { id: "5D", x: 320, y: 300 },
//     ],
//     bookedSeats: ["1A", "2B", "3C", "4D", "5A"],
//   },
//   {
//     id: 2,
//     seats: [
//       { id: "6A", x: 20, y: 20 },
//       { id: "6B", x: 90, y: 20 },
//       { id: "6C", x: 250, y: 20 },
//       { id: "6D", x: 320, y: 20 },
//       { id: "7A", x: 20, y: 90 },
//       { id: "7B", x: 90, y: 90 },
//       { id: "7C", x: 250, y: 90 },
//       { id: "7D", x: 320, y: 90 },
//       { id: "8A", x: 20, y: 160 },
//       { id: "8B", x: 90, y: 160 },
//       { id: "8C", x: 250, y: 160 },
//       { id: "8D", x: 320, y: 160 },
//       { id: "9A", x: 20, y: 230 },
//       { id: "9B", x: 90, y: 230 },
//       { id: "9C", x: 250, y: 230 },
//       { id: "9D", x: 320, y: 230 },
//       { id: "10A", x: 20, y: 300 },
//       { id: "10B", x: 90, y: 300 },
//       { id: "10C", x: 250, y: 300 },
//       { id: "10D", x: 320, y: 300 },
//     ],
//     bookedSeats: ["1A", "2B", "3C", "4D", "5A"],
//   },
// ];

export default function SeatSelection() {
  const [coaches, setCoaches] = useState([]);
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
        setCoaches(response.data.requestedClassCoaches);
      } catch (error) {
        console.error("Failed to fetch seats:", error);
      }
    };
    fetchSeats();
  }, [location.state]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      height="100vh"
      padding="20px"
      bgcolor="#f5f5f5"
      overflow="auto"
      marginLeft="200px"
    >
      <Typography variant="h5" marginBottom="20px" marginTop="100px">
        First Class Coaches
      </Typography>
      <Box
        display="flex"
        flexDirection="column"
        overflow="auto"
        height="80vh"
        alignItems="flex-start"
      >
        {coaches.map((coach) => (
          <Box key={coach._id} marginBottom={4}>
            <Typography variant="h6" marginBottom="10px">
              Coach {coach.id}
            </Typography>
            <SeatLayout seats={coach.seats} bookedSeats={coach.alreadyBookedSeats} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
