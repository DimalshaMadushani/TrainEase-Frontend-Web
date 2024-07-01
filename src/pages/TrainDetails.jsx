import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Box, Grid, Paper, Typography, List, ListItem, ListItemIcon, ListItemText, Divider, Button } from '@mui/material';
import TrainIcon from '@mui/icons-material/Train';
import CheckIcon from '@mui/icons-material/Check';
import ArrowIcon from '@mui/icons-material/ArrowForward';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import getTimeDiffInMins from '../utils/timeDuration';

export default function TrainDetails() {
  const location = useLocation();
  const [trainDetails, setTrainDetails] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null); // State to track selected class

  const { schedule, fromStop, toStop } = location.state.fullSchedule;

  useEffect(() => {
    const fetchTrainDetails = async () => {
      try {
        const postData = location.state.fullSchedule;
        const response = await axios.post('/api/train-details', postData);
        setTrainDetails(response.data);
      } catch (error) {
        console.error('Failed to fetch train details:', error);
      }
    };

    if (location.state && location.state.fullSchedule) {
      fetchTrainDetails();
    }
  }, [location.state]);

  if (!trainDetails) return <div>Loading...</div>;

  const calculateClassPrice = (priceFactor) => {
    return trainDetails.journeyPrice * priceFactor;
  };

  //this function is used to handle the class click and set the class
  const handleClassClick = (classOption) => {
    setSelectedClass(classOption); // Update the selected class
    console.log('Selected class:', classOption);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
        {trainDetails.fromStation}
        <ArrowIcon sx={{ marginRight: 1, marginLeft: 1, color: '#207497' }} />
        {trainDetails.toStation}
      </Typography>
      <Divider />

      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2, marginTop: 2 }}>
        <TrainIcon sx={{ marginRight: 1 }} />
        <Typography variant="h6" component="p">
          {schedule.trainRef.name}
        </Typography>
      </Box>

      <Box sx={{ marginBottom: 2, display: 'flex', alignItems: 'flex-start' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginRight: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
            <Typography variant="body1" sx={{ marginRight: 1.2 }}>{fromStop.departureTime}</Typography>
            <LocationOnIcon sx={{ color: '#207497', marginRight: 1 }} />
            <Typography variant="body1" sx={{ marginLeft: 1 }}>{trainDetails.fromStation}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '2px', height: '50px', backgroundColor: 'black', marginRight: 1, marginLeft: 7.5 }} />
            <Typography variant="body1" sx={{ marginLeft: 2.5 }}>{getTimeDiffInMins(fromStop.departureTime, toStop.arrivalTime)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
            <Typography variant="body1" sx={{ marginRight: 1.2 }}>{toStop.arrivalTime}</Typography>
            <LocationOnIcon sx={{ color: '#D32F2F', marginRight: 1 }} />
            <Typography variant="body1" sx={{ marginLeft: 1 }}>{trainDetails.toStation}</Typography>
          </Box>
        </Box>
      </Box>

      <Divider />
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        {trainDetails.priceFactors.map((classOption) => (
          <Grid item xs={12} sm={4} key={classOption._id}>
            <Paper
              elevation={3}
              sx={{
                padding: 2,
                border: selectedClass && selectedClass._id === classOption._id ? '2px solid #1976D2' : '1px solid #207497',
                '&:hover': { backgroundColor: '#DEF0F8' },
                cursor: 'pointer' // Indicate clickable card
              }}
              onClick={() => handleClassClick(classOption)} // Handle click to select class
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                <Typography variant="h6" component="h2">
                  {classOption.name}
                </Typography>
                <Typography variant="h6" component="p" sx={{ fontWeight: 'bold' }}>
                  LKR {calculateClassPrice(classOption.priceFactor)}.00
                </Typography>
              </Box>
              <List sx={{ padding: 0 }}>
                {classOption.facilities.slice(0, 3).map((facility, index) => (
                  <ListItem disableGutters sx={{ paddingY: 0 }} key={index}>
                    <ListItemIcon sx={{ minWidth: 'auto', marginRight: 1 }}>
                      <CheckIcon sx={{ color: '#207497' }} />
                    </ListItemIcon>
                    <ListItemText primary={facility} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 3 }}>
        <Button 
          variant="contained" 
          color="primary" 
          sx={{ minWidth: 150 }}
          disabled={!selectedClass} // Disable the button if no class is selected
        >
          Book Now
        </Button>
      </Box>
    </Box>
  );
}
