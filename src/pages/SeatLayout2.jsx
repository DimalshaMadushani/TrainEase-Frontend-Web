import React, { useState } from 'react';
import { SvgIcon, Box, Button } from '@mui/material';
import { ChairOutlined } from '@mui/icons-material';
import TripSummary from './TripSummary';

const seats = [
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
];

const fixedBookedSeats = ['1A', '2B', '3C', '4D', '1E']; // Fixed list of booked seats

const SeatLayout = () => {
  const [bookedSeats, setBookedSeats] = useState(fixedBookedSeats);

  return (
    <Box
      display="flex"
      justifyContent="flex-start"
      alignItems="center"
      height="100vh"
      padding="20px"
      bgcolor="#f5f5f5"
      paddingLeft="150px"
    >
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
        <Button variant="contained" color="primary" style={{ marginTop: '20px' , marginLeft:'180px'}}>
        Save
      </Button>
      </Box>
      <TripSummary bookedSeats={bookedSeats} />
    </Box>
  );
};

export default SeatLayout;
