import React from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import SeatLayout from "../components/SeatLayout";
import TripSummary from "../components/TripSummary";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function SeatSelection() {
  const [coaches, setCoaches] = useState([]);
  const location = useLocation();
  const [selectedSeatIds, setSelectedSeatIds] = useState([]);
  const { selectedClass, fromStop, toStop, date, schedule } = location.state;
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  console.log("selected Seats:", selectedSeatIds);

  //this function will be called when a seat is selected, it will add or remove the seat from the selectedSeatIds array
  //basically it will toggle the seat selection
  //since we have a onClick event on the seat component, this function will be called when a seat is clicked
  const handleSeatSelection = (seatId) => {
    if (selectedSeatIds.includes(seatId)) {
      setSelectedSeatIds(selectedSeatIds.filter((seat) => seat !== seatId));
    } else {
      setSelectedSeatIds([...selectedSeatIds, seatId]);
    }
  };
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

  // this function will call api call for holding the seats
  const goToCheckOut = async () => {
    if (selectedSeatIds.length === 0) {
      alert("Please select at least one seat");
      return;
    } else {
      const response = await axios.post("/api/holdSeats", {
        userId: currentUser._id,
        scheduleId: schedule._id,
        fromStopId: fromStop._id,
        toStopId: toStop._id,
        selectedSeatIds,
        selectedClassId: selectedClass._id,
        date,
      });
      console.log("response:", response.data);
      if (response.status === 200) {
        navigate("/checkout", {
          state: {
            selectedSeatIds,
            selectedClass,
            fromStop,
            toStop,
            date,
            schedule,
            selectedSeatCount: selectedSeatIds.length,
            trainName: schedule.trainRef.name,
            bookingId: response.data.bookingId,
            expireTime: response.data.expireTime,
          },
        });
      }
    }
  };

  // selectedClass, fromStop, toStop, date, selectedSeatCount,trainName

  return (
    <>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        marginTop="20px"
      >
        <Grid item xs={12} md={6}>
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
                    Coach Number {coach.coachNumber}
                  </Typography>
                  <SeatLayout
                    seats={coach.seats}
                    bookedSeats={coach.alreadyBookedSeats}
                    selectedSeats={selectedSeatIds}
                    onSeatSelection={handleSeatSelection}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <TripSummary
            selectedClass={selectedClass}
            fromStop={fromStop}
            toStop={toStop}
            date={date}
            selectedSeatCount={selectedSeatIds.length}
            trainName={schedule.trainRef.name}
          />
        </Grid>
      </Grid>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{ my: "5px", mx: "70px" }} // adjusted marginLeft to marginRight
          onClick={goToCheckOut}
        >
          CheckOut
        </Button>
      </Box>
    </>
  );
}
