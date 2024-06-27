import React from 'react';
import { Box, Grid, Paper, Typography, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import TrainIcon from '@mui/icons-material/Train';
import CheckIcon from '@mui/icons-material/Check';
import ArrowIcon from '@mui/icons-material/ArrowForward';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const RouteandClass = () => {
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
        Colombo Fort 
        <ArrowIcon sx={{ marginRight: 1, marginLeft: 1, color: '#207497' }} />
        Galle
      </Typography>
      <Divider/>

      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2, marginTop: 2 }}>
        <TrainIcon sx={{ marginRight: 1 }} />
        <Typography variant="h6" component="p">
          Mount Lavinia  ·0022
        </Typography>
      </Box>

      <Box sx={{ marginBottom: 2, display: 'flex', alignItems: 'flex-start' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginRight: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
            <Typography variant="body1" sx={{ marginRight: 1.2 }}>05:35</Typography>
            <LocationOnIcon sx={{ color: '#207497', marginRight: 1 }} />
            <Typography variant="body1" sx={{ marginLeft: 1 }}>Beliatta</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '2px', height: '50px', backgroundColor: 'black', marginRight: 1, marginLeft:7.5 }} />
            <Typography variant="body1" sx={{ marginLeft: 2.5 }}>3h 59m</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
            <Typography variant="body1" sx={{ marginRight: 1.2 }}>09:34</Typography>
            <LocationOnIcon sx={{ color: '#D32F2F', marginRight: 1 }} />
            <Typography variant="body1" sx={{ marginLeft: 1 }}>Galle</Typography>
          </Box>
        </Box>
      </Box>

      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        {[
          { title: '1st Class - Quiet car', price: 1000, features: ['Free WiFi', 'Power outlets', 'Free drinks', 'Wide seats'] },
          { title: '2nd class', price: 500, features: ['Free WiFi', 'Power outlets', 'Free drinks', 'Wide seats'] },
          { title: '3rd class', price: 250, features: ['Quiet Area', 'Power outlets', 'Free drinks', 'Wide seats'] },
        ].map((classOption) => (
          <Grid item xs={12} sm={4} key={classOption.title}>
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
                  {classOption.title}
                </Typography>
                <Typography variant="h6" component="p" sx={{ fontWeight: 'bold' }}>
                  Rs {classOption.price}.00
                </Typography>
              </Box>
              <List sx={{ padding: 0 }}>
                {classOption.features.map((feature, index) => (
                  <ListItem key={index} disableGutters sx={{ paddingY: 0 }}>
                    <ListItemIcon sx={{ minWidth: 'auto', marginRight: 1 }}>
                      <CheckIcon sx={{ color: '#207497' }} />
                    </ListItemIcon>
                    <ListItemText primary={feature} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RouteandClass;
