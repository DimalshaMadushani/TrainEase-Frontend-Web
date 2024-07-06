import React from "react";
import { Box, Button, Paper, Typography, Grid } from "@mui/material";
import ArrowIcon from "@mui/icons-material/ArrowForward";
import TrainIcon from '@mui/icons-material/Train';
import axios from "axios";

export default function BookingCard({ booking }) {
  const isBeforeToday = (dateString) => {
    const today = new Date();
    const bookingDate = new Date(dateString);
    return bookingDate < today;
  };

  const handleCancelBooking = async (bookingId) => {
    try{
        const response = await axios.delete(`/api/user/cancelBooking/${bookingId}`);
        console.log(response.data);
    }catch(error){
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
        <Grid item xs={4}>
          <Typography variant="body1">Booking ID: {booking._id}</Typography>
          <Typography variant="body2">
            Date: {new Date(booking.date).toLocaleDateString()}
          </Typography>
          <Typography variant="body2">
            Pax: {booking.seats.length}{" "}
            {booking.seats.length > 1 ? "seats" : "seat"}
          </Typography>
          <Typography variant="body2">
            Total Amount: {booking.totalAmount} LKR
          </Typography>
        </Grid>
        <Grid item xs={4} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <Box display="flex">
                <TrainIcon sx={{ marginRight: 1, color: "#207497" }} />
                <Typography variant="h6" gutterBottom>
                    {booking.scheduleRef.trainRef.name}
                </Typography>
            </Box>
            <Box display="flex">
                <Typography variant="body1" gutterBottom>
                    {booking.from.stationRef.name}
                </Typography>
                <ArrowIcon sx={{ marginRight: 1, marginLeft: 1, color: "#207497" }} />
                <Typography variant="body1" gutterBottom>
                    {booking.to.stationRef.name}
                </Typography>
            </Box>
          
        </Grid>
        <Grid item xs={4}>
          {(
            <Box sx={{display:'flex',justifyContent:'flex-end'}}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleCancelBooking(booking._id)}
                disabled={isBeforeToday(booking.date)}
              >
                Cancel
              </Button>
            </Box>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
}
