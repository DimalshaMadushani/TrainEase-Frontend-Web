

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Box, Grid, Paper, Typography, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import TrainIcon from '@mui/icons-material/Train';
import CheckIcon from '@mui/icons-material/Check';
import ArrowIcon from '@mui/icons-material/ArrowForward';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import getTimeDiffInMins from '../utils/timeDuration';

export default function TrainDetails() {
  const location = useLocation();
  const [trainDetails, setTrainDetails] = useState(null);
  const {schedule, fromStop, toStop} = location.state.fullSchedule;
  useEffect(() => {

    // const fetchTrainDetails = async () => {
    //   try {
    //     const response = await axios.post(`/api/train-details`, { params: { scheduleId: location.state.scheduleId } });
    //     console.log('Response:', response);
    //     setTrainDetails(response.data);
    //     console.log('Train details:', response.data);
    //   } catch (error) {
    //     console.error('Failed to fetch train details:', error);
    //   }
    // };
    const fetchTrainDetails = async () => {
      try {
        const postData = location.state.fullSchedule;
        console.log('Post data:', postData);
        const response = await axios.post('/api/train-details', postData);
        // console.log('Response:', response);
        setTrainDetails(response.data);
      } catch (error) {
        console.error('Failed to fetch train details:', error);
      }
    };
    
    console.log("Location state:", location.state);
    if (location.state && location.state.fullSchedule) {
      fetchTrainDetails();
    }
  }, [location.state]);

  if (!trainDetails) return <div>Loading...</div>;
  
  const calculateClassPrice = (priceFactor) => {
    return trainDetails.journeyPrice * priceFactor;
  };

  console.log('Train details:', trainDetails);

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
        {trainDetails.fromStation}
        <ArrowIcon sx={{ marginRight: 1, marginLeft: 1, color: '#207497' }} />
        {trainDetails.toStation}
      </Typography>
      <Divider/>

      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2, marginTop: 2 }}>
        <TrainIcon sx={{ marginRight: 1 }} />
        <Typography variant="h6" component="p">
          {trainDetails.train.name}
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
            <Typography variant="body1" sx={{ marginLeft: 2.5 }}>{getTimeDiffInMins(fromStop.departureTime,toStop.arrivalTime)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
            <Typography variant="body1" sx={{ marginRight: 1.2 }}>{toStop.arrivalTime}</Typography>
            <LocationOnIcon sx={{ color: '#D32F2F', marginRight: 1 }} />
            <Typography variant="body1" sx={{ marginLeft: 1 }}>{trainDetails.toStation}</Typography>
          </Box>
        </Box>
      </Box>

    <Divider/>
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        {trainDetails.priceFactors.map((classOption) => (
          <Grid item xs={12} sm={4} key={classOption._id}>
            <Paper 
              elevation={3} 
              sx={{ 
                padding: 2, 
                border: '1px solid #207497', 
                '&:hover': { backgroundColor: '#DEF0F8' } 
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' , marginBottom:2}}>
                <Typography variant="h6" component="h2">
                  {classOption.name}
                </Typography>
                <Typography variant="h6" component="p" sx={{ fontWeight: 'bold' }}>
                  Rs {calculateClassPrice(classOption.priceFactor)}.00
                </Typography>
              </Box>
              <List sx={{ padding: 0 }}>
                {/* You can add or modify features here depending on availability and data structure */}
                <ListItem disableGutters sx={{ paddingY: 0 }}>
                  <ListItemIcon sx={{ minWidth: 'auto', marginRight: 1 }}>
                    <CheckIcon sx={{ color: '#207497' }} />
                  </ListItemIcon>
                  <ListItemText primary={`Additional details to be populated`} />
                </ListItem>
              </List>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Divider/>
    </Box>
  );
};

