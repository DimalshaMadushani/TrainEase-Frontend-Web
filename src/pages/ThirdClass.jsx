import React from 'react';
import { Box, Typography } from '@mui/material';
import SeatLayout2 from './SeatLayout2';

const coaches = [
  {
    id: 1,
    seats: [
      { id: '1A', x: 20, y: 20 },
      { id: '1B', x: 90, y: 20 },
      { id: '1C', x: 160, y: 20 },
      { id: '1D', x: 320, y: 20 },
      { id: '1E', x: 390, y: 20 },
      { id: '2A', x: 20, y: 90 },
      { id: '2B', x: 90, y: 90 },
      { id: '2C', x: 160, y: 90 },
      { id: '2D', x: 320, y: 90 },
      { id: '2E', x: 390, y: 90 },
      { id: '3A', x: 20, y: 160 },
      { id: '3B', x: 90, y: 160 },
      { id: '3C', x: 160, y: 160 },
      { id: '3D', x: 320, y: 160 },
      { id: '3E', x: 390, y: 160 },
      { id: '4A', x: 20, y: 230 },
      { id: '4B', x: 90, y: 230 },
      { id: '4C', x: 160, y: 230 },
      { id: '4D', x: 320, y: 230 },
      { id: '4E', x: 390, y: 230 },
    ],
    bookedSeats: ['1A', '2B', '3C', '4D'],
  },
  {
    id: 2,
    seats: [
      { id: '5A', x: 20, y: 20 },
      { id: '5B', x: 90, y: 20 },
      { id: '5C', x: 160, y: 20 },
      { id: '5D', x: 320, y: 20 },
      { id: '5E', x: 390, y: 20 },
      { id: '6A', x: 20, y: 90 },
      { id: '6B', x: 90, y: 90 },
      { id: '6C', x: 160, y: 90 },
      { id: '6D', x: 320, y: 90 },
      { id: '6E', x: 390, y: 90 },
      { id: '7A', x: 20, y: 160 },
      { id: '7B', x: 90, y: 160 },
      { id: '7C', x: 160, y: 160 },
      { id: '7D', x: 320, y: 160 },
      { id: '7E', x: 390, y: 160 },
      { id: '8A', x: 20, y: 230 },
      { id: '8B', x: 90, y: 230 },
      { id: '8C', x: 160, y: 230 },
      { id: '8D', x: 320, y: 230 },
      { id: '8E', x: 390, y: 230 },
    ],
    bookedSeats: ['5A', '6B', '7C', '8D'],
  },
  {
    id: 3,
    seats: [
      { id: '9A', x: 20, y: 20 },
      { id: '9B', x: 90, y: 20 },
      { id: '9C', x: 160, y: 20 },
      { id: '9D', x: 320, y: 20 },
      { id: '9E', x: 390, y: 20 },
      { id: '10A', x: 20, y: 90 },
      { id: '10B', x: 90, y: 90 },
      { id: '10C', x: 160, y: 90 },
      { id: '10D', x: 320, y: 90 },
      { id: '10E', x: 390, y: 90 },
      { id: '11A', x: 20, y: 160 },
      { id: '11B', x: 90, y: 160 },
      { id: '11C', x: 160, y: 160 },
      { id: '11D', x: 320, y: 160 },
      { id: '11E', x: 390, y: 160 },
      { id: '12A', x: 20, y: 230 },
      { id: '12B', x: 90, y: 230 },
      { id: '12C', x: 160, y: 230 },
      { id: '12D', x: 320, y: 230 },
      { id: '12E', x: 390, y: 230 },
    ],
    bookedSeats: ['9A', '10B', '11C', '12D'],
  },
];

const ThirdClass = () => {
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
        Third Class Coaches
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
            <SeatLayout2 seats={coach.seats} bookedSeats={coach.bookedSeats} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ThirdClass;
