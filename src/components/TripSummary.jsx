import React, { useState, useEffect } from "react";
import { Box, Typography, Divider, Grid, Paper } from "@mui/material";
import { red } from "@mui/material/colors";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TrainIcon from "@mui/icons-material/Train";
import getTimeDiffInMins from "../utils/timeDuration";
import axios from "axios";

export default function TripSummary({
  selectedClass,
  fromStop,
  toStop,
  date,
  selectedSeatCount,
  trainName,
  holdTime,
  isSuccessful,
}) {
  const [remainingTime, setRemainingTime] = useState("");
  const [fromStopName, setFromStopName] = useState("");
  const [toStopName, setToStopName] = useState("");

  useEffect(() => {
    const fetchStops = async () => {
      try {
        const fromStopResponse = await axios.get(
          `https://trainease-backend.onrender.com/api/stationName/${fromStop.stationRef}`,
          { withCredentials: true }
        );
        const toStopResponse = await axios.get(
          `https://trainease-backend.onrender.com/api/stationName/${toStop.stationRef}`,
          { withCredentials: true }
        );
        setFromStopName(fromStopResponse.data.name);
        setToStopName(toStopResponse.data.name);
      } catch (error) {
        console.error("Failed to fetch stops:", error);
      }
    };
    fetchStops();
  }, [fromStop.stationRef, toStop.stationRef]);

  // Countdown timer for booking hold time
  useEffect(() => {
    const countdown = () => {
      const endTime = new Date(holdTime).getTime();
      const now = new Date().getTime();
      const timeLeft = endTime - now;
      const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
      const seconds = Math.floor((timeLeft / 1000) % 60);
      setRemainingTime(`${minutes} minutes ${seconds} seconds`);
      if (timeLeft < 0) {
        clearInterval(interval);
        setRemainingTime("Expired");
      }
    };

    const interval = setInterval(countdown, 1000);
    countdown(); // Initialize countdown to avoid delay on the first tick
    return () => clearInterval(interval);
  }, [holdTime]);

  return (
    <Paper
      elevation={3}
      sx={{
        width: { xs: "100%", md: "500px" },
        padding: "20px",
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Trip Summary
      </Typography>
      <Divider style={{ margin: "20px 0" }} />

      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} textAlign="center">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 2,
              justifyContent: "center",
            }}
          >
            <TrainIcon sx={{ fontSize: 35, mr: 0.5 }} />
            <Typography variant="h6">{trainName}</Typography>
          </Box>
        </Grid>
        <Grid item xs={4} textAlign="center" sx={{ alignItems: "flex-end" }}>
          <Box sx={{ justifyContent: "flex-end" }}>
            <Typography variant="body1" gutterBottom>
              {fromStop.departureTime}
            </Typography>
            <LocationOnIcon sx={{ color: "#207497" }} />
            <Typography variant="body2">{fromStopName}</Typography>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Divider
            // orientation="vertical"
            sx={{ height: "2px", backgroundColor: "black" }}
          />
        </Grid>
        <Grid item xs={4} textAlign="center">
          <Typography variant="body1" gutterBottom>
            {toStop.arrivalTime}
          </Typography>
          <LocationOnIcon sx={{ color: "#D32F2F", marginTop: "5px" }} />
          <Typography variant="body2">{toStopName}</Typography>
        </Grid>
        {!isSuccessful && holdTime && (
          <Grid item xs={12} textAlign="center">
            <Typography variant="body1" gutterBottom color={red[400]}>
              {remainingTime !== "Expired"
                ? `Your booking will be held for ${remainingTime}.`
                : "Your booking has expired."}
            </Typography>
          </Grid>
        )}
      </Grid>

      <Box sx={{ textAlign: "center", marginTop: "20px" }}>
        <Typography variant="body1" sx={{ mb: 0.7 }}>
          <strong>Date:</strong> {date}
        </Typography>
        <Typography variant="body1">
          <strong>Journey Duration:</strong>{" "}
          {getTimeDiffInMins(fromStop.departureTime, toStop.arrivalTime)}
        </Typography>
        <Divider style={{ margin: "20px 0" }} />
        <Box>
          <Typography variant="body1" sx={{ mb: 0.7 }}>
            <strong>Class: </strong>
            <span style={{ color: "#207497", fontWeight: "bold" }}>
              {selectedClass.name}
            </span>
          </Typography>
          <Typography variant="body1" sx={{ mb: 0.7 }}>
            <strong>Total Seats: </strong>
            <span style={{ color: "#207497", fontWeight: "bold" }}>
              {selectedSeatCount}
            </span>
          </Typography>
          <Typography variant="body1" sx={{ mb: 0.7 }}>
            <strong>Fare Calculation: </strong>
            <span style={{ color: "#207497", fontWeight: "bold" }}>
              {selectedClass.priceFactor * (toStop.price - fromStop.price)} x{" "}
              {selectedSeatCount}
            </span>
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Total: </strong>
            <span style={{ color: "#207497", fontWeight: "bold" }}>
              LKR{" "}
              {selectedSeatCount *
                selectedClass.priceFactor *
                (toStop.price - fromStop.price)}
            </span>
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}
