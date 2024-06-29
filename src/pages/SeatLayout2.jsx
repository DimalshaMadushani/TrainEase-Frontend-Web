import React, { useState } from 'react';
import { SvgIcon, Box, Button } from '@mui/material';
import { ChairOutlined } from '@mui/icons-material';
import TripSummary from './TripSummary';

const SeatLayout2 = ({ seats, bookedSeats }) => {
  return (
    <Box position="relative" width={480} height={300} bgcolor="white" boxShadow={3} borderRadius="8px">
        <SvgIcon viewBox="0 0 500 300" style={{ width: 500, height: 300, position: 'relative' }}></SvgIcon>
      {seats.map((seat) => (
        <React.Fragment key={seat.id}>
          <Button
            style={{
              position: 'absolute',
              left: seat.x,
              top: seat.y,
              width: '60px',
              height: '60px',
              minWidth: '60px',
              minHeight: '60px',
              backgroundColor: bookedSeats.includes(seat.id) ? '#ff9999' : 'white',
              border: '1px solid black',
              borderRadius: '4px',
              transition: 'background-color 0.3s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = bookedSeats.includes(seat.id) ? '#ff6666' : '#ddd')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = bookedSeats.includes(seat.id) ? '#ff9999' : 'white')}
            disabled={bookedSeats.includes(seat.id)}
          >
            <ChairOutlined
              style={{ color: 'black', fontSize: '32px' }}
              sx={{
                '& path': {
                  stroke: 'black',
                  strokeWidth: '0.02', // Make the chair outline thinner
                },
              }}
            />
          </Button>
          <Box
            position="absolute"
            left={seat.x + 30}
            top={seat.y + 40}
            fontSize="12px"
            textAlign="center"
            width="60px"
            color="black"
            style={{ transform: 'translateX(-50%)' }}
          >
            {seat.id}
          </Box>
        </React.Fragment>
      ))}
    </Box>
  );
};

export default SeatLayout2;
