import React from 'react';
import { Box, Typography, Divider, Button, Grid, Paper } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const TripSummary = ({ bookedSeats }) => {
  return (
    <Paper elevation={3} sx={{ width: '500px', margin: '40px auto', padding: '20px' }}>
      <Typography variant="h5" align="center" gutterBottom>
        Trip Summary
      </Typography>
      <Divider style={{ margin: '20px 0' }} />
      
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={4} textAlign="center">
          <Typography variant="body1" gutterBottom>
            05:35
          </Typography>
          <LocationOnIcon sx={{ color: '#207497', marginTop: '5px' }} />
          <Typography variant="body2">Beliatta</Typography>
        </Grid>
        <Grid item xs={4} textAlign="center">
          <Divider orientation="vertical" sx={{ height: '2px', backgroundColor: 'black' }} />
        </Grid>
        <Grid item xs={4} textAlign="center">
          <Typography variant="body1" gutterBottom>
            09:34
          </Typography>
          <LocationOnIcon sx={{ color: '#D32F2F', marginTop: '5px' }} />
          <Typography variant="body2">Galle</Typography>
        </Grid>
      </Grid>

      <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
        <Typography variant="body1" gutterBottom>
          <strong>Date:</strong> 2024-07-01
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Time:</strong> 10:00 AM
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Seats Booked:</strong> {bookedSeats.join(', ')}
        </Typography>
        <Divider style={{ margin: '20px 0' }} />
        <Box>
          <Typography variant="body1" gutterBottom>
            <strong>Class:</strong>{' '}
            <span style={{ color: '#207497', fontWeight: 'bold' }}>1st</span>
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Total Seats:</strong>{' '}
            <span style={{ color: '#207497', fontWeight: 'bold' }}>5</span>
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Total:</strong>{' '}
            <span style={{ color: '#207497', fontWeight: 'bold' }}>Rs 500.00</span>
          </Typography>
        </Box>
      </Box>
      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: '20px', marginLeft: '200px' }}
      >
        Next
      </Button>
    </Paper>
  );
};

export default TripSummary;
