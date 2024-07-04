import React from "react";
import { Box } from "@mui/material";
import Seat from "./Seat";

export default function SeatLayout({ seats, bookedSeats, selectedSeats, onSeatSelection }) {
  return (
    <Box
      position="relative"
      width={400}
      height={450}
      bgcolor="white"
      boxShadow={3}
      borderRadius="8px"
      // backgroundColor="#15f5f5"
    >
      {seats.map((seat) => (
        <Seat key={seat._id} seat={seat} onSeatSelection={onSeatSelection} isBooked={bookedSeats.includes(seat._id)} isSelected={selectedSeats.includes(seat._id)} />
      ))}
    </Box>
  );
}
