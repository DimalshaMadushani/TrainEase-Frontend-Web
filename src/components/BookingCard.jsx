import React from "react";
import { Box, Button, Paper, Typography, Grid } from "@mui/material";
import ArrowIcon from "@mui/icons-material/ArrowForward";
import TrainIcon from "@mui/icons-material/Train";
import axios from "axios";

export default function BookingCard({ booking }) {
  const isBeforeToday = (dateString) => {
    const today = new Date();
    const bookingDate = new Date(dateString);
    return bookingDate < today;
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      const response = await axios.delete(
        `https://trainease-backend.onrender.com/api/user/cancelBooking/${bookingId}`
      );
      if (response.status === 200) {
        alert("Booking cancelled successfully");
        window.location.reload();
      }
    } catch (error) {
      console.error("Failed to cancel booking:", error);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: "16px",
        mb: 2,
      }}
    >
      <Grid container>
        <Grid item xs={12} md={4}>
          <Typography variant="body1">
            {" "}
            <b>Booking ID:</b> {booking._id}
          </Typography>
          <Typography variant="body1">
            <b>Date: </b>
            {new Date(booking.date).toLocaleDateString()}
          </Typography>
          <Typography variant="body1">
            <b>Pax: </b> {booking.seats.length}{" "}
            {booking.seats.length > 1 ? "seats" : "seat"}
          </Typography>
          <Typography variant="body1">
            <b>Total Amount: </b>
            {booking.totalAmount} LKR
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: { md: "center" },
            alignItems: { md: "center" },
          }}
        >
          <Box display="flex" alignItems="center" mb={1}>
            <TrainIcon sx={{ marginRight: 1, color: "#207497" }} />
            <Typography variant="h6">
              {booking.scheduleRef.trainRef.name}
            </Typography>
          </Box>
          <Box display="flex">
            <Typography variant="body1" gutterBottom>
              {booking.from.stationRef.name}
            </Typography>
            <ArrowIcon
              sx={{ marginRight: 1, marginLeft: 1, color: "#207497" }}
            />
            <Typography variant="body1" gutterBottom>
              {booking.to.stationRef.name}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          {
            <Box sx={{ display: "flex", justifyContent: { md: "flex-end" } }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleCancelBooking(booking._id)}
                disabled={isBeforeToday(booking.date)}
              >
                Cancel
              </Button>
            </Box>
          }
        </Grid>
      </Grid>
    </Paper>
  );
}
