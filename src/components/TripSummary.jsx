// //trip summary

// import React from 'react';
// import { Box, Typography, Divider, Button, Grid, Paper } from '@mui/material';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import getTimeDiffInMins from '../utils/timeDuration';

// const TripSummary = ({ selectedClass, fromStop, toStop, date, selectedSeatCount,trainName,holdTime }) => {
//   return (
//     <Paper elevation={3} sx={{ width: '500px', margin: '40px auto', padding: '20px' }}>
//       <Typography variant="h5" align="center" gutterBottom>
//         Trip Summary
//       </Typography>
//       <Divider style={{ margin: '20px 0' }} />
      
//       <Grid container spacing={2} justifyContent="center" alignItems="center">
//         <Grid item xs={12} textAlign="center">
//             <Typography variant="h6" gutterBottom>
//                 {trainName}
//             </Typography>
//         </Grid>
//         <Grid item xs={4} textAlign="center">
//           <Typography variant="body1" gutterBottom>
//             {fromStop.departureTime}
//           </Typography>
//           <LocationOnIcon sx={{ color: '#207497', marginTop: '5px' }} />
//           <Typography variant="body2">{fromStop.stationRef.name}</Typography>
//         </Grid>
//         <Grid item xs={4} textAlign="center">
//           <Divider orientation="vertical" sx={{ height: '2px', backgroundColor: 'black' }} />
//         </Grid>
//         <Grid item xs={4} textAlign="center">
//           <Typography variant="body1" gutterBottom>
//             {toStop.arrivalTime}
//           </Typography>
//           <LocationOnIcon sx={{ color: '#D32F2F', marginTop: '5px' }} />
//           <Typography variant="body2">{toStop.stationRef.name}</Typography>
//         </Grid>
//         {holdTime && (
//           <Grid item xs={12} textAlign="center">
//             <Typography variant="body1" gutterBottom>
//               Your booking will be held for {holdTime} minutes.
//             </Typography>
//           </Grid>
//         )}
//       </Grid>

//       <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
//         <Typography variant="body1" gutterBottom>
//           <strong>Date:</strong> {date}
//         </Typography>
//         <Typography variant="body1" gutterBottom>
//           <strong>Time Duration:</strong> {getTimeDiffInMins(fromStop.departureTime, toStop.arrivalTime)}
//         </Typography>
//         {/* <Typography variant="body1" gutterBottom>
//           <strong>Seats Booked:</strong> {selectedSeats.join(', ')}
//         </Typography> */}
//         <Divider style={{ margin: '20px 0' }} />
//         <Box>
//           <Typography variant="body1" gutterBottom>
//             <strong>Class: </strong>
//             <span style={{ color: '#207497', fontWeight: 'bold' }}>{selectedClass.name}</span>
//           </Typography>
//           <Typography variant="body1" gutterBottom>
//             <strong>Total Seats: </strong>
//             <span style={{ color: '#207497', fontWeight: 'bold' }}>{selectedSeatCount}</span>
//           </Typography>
//           <Typography variant="body1" gutterBottom>
//             <strong>Fare Calculation: </strong>
//             <span style={{ color: '#207497', fontWeight: 'bold' }}>{toStop.price - fromStop.price} x {selectedSeatCount}</span>
//           </Typography>
//           <Typography variant="body1" gutterBottom>
//             <strong>Total: </strong>
//             <span style={{ color: '#207497', fontWeight: 'bold' }}>{selectedSeatCount * selectedClass.priceFactor * (toStop.price - fromStop.price)} LKR</span>
//           </Typography>
//         </Box>
//       </Box>
      
//     </Paper>
//   );
// };

// export default TripSummary;


import React, { useState, useEffect } from 'react';
import { Box, Typography, Divider, Grid, Paper } from '@mui/material';
import { red } from '@mui/material/colors';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import getTimeDiffInMins from '../utils/timeDuration';

const TripSummary = ({ selectedClass, fromStop, toStop, date, selectedSeatCount, trainName, holdTime }) => {
  const [remainingTime, setRemainingTime] = useState('');

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
        setRemainingTime('Expired');
      }
    };

    const interval = setInterval(countdown, 1000);
    countdown(); // Initialize countdown to avoid delay on the first tick
    return () => clearInterval(interval);
  }, [holdTime]);

  return (
    <Paper elevation={3} sx={{ width: '500px', margin: '40px auto', padding: '20px' }}>
      <Typography variant="h5" align="center" gutterBottom>
        Trip Summary
      </Typography>
      <Divider style={{ margin: '20px 0' }} />
      
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12} textAlign="center">
            <Typography variant="h6" gutterBottom>
                {trainName}
            </Typography>
        </Grid>
        <Grid item xs={4} textAlign="center">
          <Typography variant="body1" gutterBottom>
            {fromStop.departureTime}
          </Typography>
          <LocationOnIcon sx={{ color: '#207497', marginTop: '5px' }} />
          <Typography variant="body2">{fromStop.stationRef.name}</Typography>
        </Grid>
        <Grid item xs={4} textAlign="center">
          <Divider orientation="vertical" sx={{ height: '2px', backgroundColor: 'black' }} />
        </Grid>
        <Grid item xs={4} textAlign="center">
          <Typography variant="body1" gutterBottom>
            {toStop.arrivalTime}
          </Typography>
          <LocationOnIcon sx={{ color: '#D32F2F', marginTop: '5px' }} />
          <Typography variant="body2">{toStop.stationRef.name}</Typography>
        </Grid>
        {holdTime && (
          <Grid item xs={12} textAlign="center">
            <Typography variant="body1" gutterBottom color={red[400]}>
            {remainingTime !== 'Expired' ? `Your booking will be held for ${remainingTime}.` : 'Your booking has expired.'}
            </Typography>
          </Grid>
        )}
      </Grid>

      <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
        <Typography variant="body1" gutterBottom>
          <strong>Date:</strong> {date}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Time Duration:</strong> {getTimeDiffInMins(fromStop.departureTime, toStop.arrivalTime)}
        </Typography>
        <Divider style={{ margin: '20px 0' }} />
        <Box>
          <Typography variant="body1" gutterBottom>
            <strong>Class: </strong>
            <span style={{ color: '#207497', fontWeight: 'bold' }}>{selectedClass.name}</span>
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Total Seats: </strong>
            <span style={{ color: '#207497', fontWeight: 'bold' }}>{selectedSeatCount}</span>
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Fare Calculation: </strong>
            <span style={{ color: '#207497', fontWeight: 'bold' }}>{toStop.price - fromStop.price} x {selectedSeatCount}</span>
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Total: </strong>
            <span style={{ color: '#207497', fontWeight: 'bold' }}>{selectedSeatCount * selectedClass.priceFactor * (toStop.price - fromStop.price)} LKR</span>
          </Typography>
        </Box>
      </Box>
      
    </Paper>
  );
};

export default TripSummary;

