import React from 'react';
import { SvgIcon, Box, Button, Typography } from '@mui/material';
import { ChairOutlined } from '@mui/icons-material';

export default function SeatLayout({ seats, bookedSeats }){
  return (
    <Box position="relative" width={400} height={370} bgcolor="white" boxShadow={3} borderRadius="8px">
      <SvgIcon viewBox="0 0 400 370" style={{ width: 400, height: 370, position: 'relative' }}></SvgIcon>
      {seats.map((seat) => (
        <React.Fragment key={seat._id}>
          <Button
            style={{
              position: 'absolute',
              left: seat.position[0],
              top: seat.position[1],
              width: '60px',
              height: '60px',
              minWidth: '60px',
              minHeight: '60px',
              backgroundColor: bookedSeats.includes(seat._id) ? '#ff9999' : 'white',
              border: '1px solid black',
              borderRadius: '4px',
              transition: 'background-color 0.3s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#ddd')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
            disabled={bookedSeats.includes(seat._id)}
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
            left={seat.position[0] + 30}
            top={seat.position[1] + 40}
            fontSize="12px"
            textAlign="center"
            width="60px"
            color="black"
            style={{ transform: 'translateX(-50%)' }}
          >
            {seat.name}
          </Box>
        </React.Fragment>
      ))}
    </Box>
  );
};