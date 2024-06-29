import React from 'react';
import { Box, Typography } from '@mui/material';
import SeatLayout1 from './SeatLayout1';

const coaches = [
  {
    id: 1,
    seats: [
      { id: '1A', x: 20, y: 20 },
      { id: '1B', x: 90, y: 20 },
      { id: '1C', x: 250, y: 20 },
      { id: '1D', x: 320, y: 20 },
      { id: '2A', x: 20, y: 90 },
      { id: '2B', x: 90, y: 90 },
      { id: '2C', x: 250, y: 90 },
      { id: '2D', x: 320, y: 90 },
      { id: '3A', x: 20, y: 160 },
      { id: '3B', x: 90, y: 160 },
      { id: '3C', x: 250, y: 160 },
      { id: '3D', x: 320, y: 160 },
      { id: '4A', x: 20, y: 230 },
      { id: '4B', x: 90, y: 230 },
      { id: '4C', x: 250, y: 230 },
      { id: '4D', x: 320, y: 230 },
      { id: '5A', x: 20, y: 300 },
      { id: '5B', x: 90, y: 300 },
      { id: '5C', x: 250, y: 300 },
      { id: '5D', x: 320, y: 300 },
    ],
    bookedSeats: ['1A', '2B', '3C', '4D', '5A'],
  },
  {
    id: 2,
    seats: [
      { id: '6A', x: 20, y: 20 },
      { id: '6B', x: 90, y: 20 },
      { id: '6C', x: 250, y: 20 },
      { id: '6D', x: 320, y: 20 },
      { id: '7A', x: 20, y: 90 },
      { id: '7B', x: 90, y: 90 },
      { id: '7C', x: 250, y: 90 },
      { id: '7D', x: 320, y: 90 },
      { id: '8A', x: 20, y: 160 },
      { id: '8B', x: 90, y: 160 },
      { id: '8C', x: 250, y: 160 },
      { id: '8D', x: 320, y: 160 },
      { id: '9A', x: 20, y: 230 },
      { id: '9B', x: 90, y: 230 },
      { id: '9C', x: 250, y: 230 },
      { id: '9D', x: 320, y: 230 },
      { id: '10A', x: 20, y: 300 },
      { id: '10B', x: 90, y: 300 },
      { id: '10C', x: 250, y: 300 },
      { id: '10D', x: 320, y: 300 },
    ],
    bookedSeats: ['1A', '2B', '3C', '4D', '5A'],
  },
  {
    id: 3,
    seats: [
      { id: '11A', x: 20, y: 20 },
      { id: '11B', x: 90, y: 20 },
      { id: '11C', x: 250, y: 20 },
      { id: '11D', x: 320, y: 20 },
      { id: '12A', x: 20, y: 90 },
      { id: '12B', x: 90, y: 90 },
      { id: '12C', x: 250, y: 90 },
      { id: '12D', x: 320, y: 90 },
      { id: '13A', x: 20, y: 160 },
      { id: '13B', x: 90, y: 160 },
      { id: '13C', x: 250, y: 160 },
      { id: '13D', x: 320, y: 160 },
      { id: '14A', x: 20, y: 230 },
      { id: '14B', x: 90, y: 230 },
      { id: '14C', x: 250, y: 230 },
      { id: '14D', x: 320, y: 230 },
      { id: '15A', x: 20, y: 300 },
      { id: '15B', x: 90, y: 300 },
      { id: '15C', x: 250, y: 300 },
      { id: '15D', x: 320, y: 300 },
    ],
    bookedSeats: ['11A', '12B', '13C', '14D', '15A'],
  },
];

const SecondClass = () => {
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
        Second Class Coaches
      </Typography>
      <Box
        display="flex"
        flexDirection="column"
        overflow="auto"
        height="80vh"
        alignItems="flex-start"
      >
        {coaches.map((coach, index) => (
          <Box key={index} marginBottom={4}>
            <Typography variant="h6" marginBottom="10px">
              Coach {coach.id}
            </Typography>
            <SeatLayout1 seats={coach.seats} bookedSeats={coach.bookedSeats} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SecondClass;
