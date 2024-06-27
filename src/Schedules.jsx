import React from 'react';
import { Container, TextField, Button, Grid, Card, CardContent, Typography, Autocomplete, Box } from '@mui/material';
import { makeStyles } from '@mui/material/styles';
import trainImage from '../public/pexels-chathura-anuradha-subasinghe-599124-12781427.jpg';


// const useStyles = makeStyles({
//   root: {
//     backgroundImage: `url(${trainImage})`,
//     backgroundSize: 'contain',
//     backgroundPosition: 'center',
//     filter: 'blur(8px)',
//     position: 'absolute',
//     width: '100%',
//     minHeight: '400px',
//   },
// });

const Schedules = () => {
//   const classes = useStyles();

  const stations = [
    { label: 'Beliatta' },
    { label: 'Tangalle' },
    { label: 'Matara' },
    { label: 'Galle' },
    { label: 'Kalutara' },
    { label: 'Colombo Fort' },
    { label: 'Negombo' },
    { label: 'Chilaw' },
    { label: 'Puttalam' },
    { label: 'Anuradhapura' },
    { label: 'Vavuniya' },
    { label: 'Jaffna' },
    { label: 'Badulla' },
    { label: 'Nanu Oya' },
    { label: 'Hatton' },
    { label: 'Kandy' },
    { label: 'Peradeniya' },
    { label: 'Polgahawela' },
    { label: 'Kurunegala' },
    { label: 'Mahawa' },
    { label: 'Galgamuwa' },
    { label: 'Rambukkana' },
    { label: 'Kadugannawa' },
    { label: 'Peradeniya Junction' },
    { label: 'Gampola' },
    { label: 'Nawalapitiya' },
    { label: 'Hatton' },
    { label: 'Idalgashinna' },
    { label: 'Ohiya' },
    { label: 'Haputale' },
    { label: 'Bandarawela' },
    { label: 'Ella' },
    { label: 'Demodara' },
    { label: 'Badulla' },
    { label: 'Nanu Oya' },
    { label: 'Hatton' },
    { label: 'Kandy' },
    { label: 'Peradeniya' },
    { label: 'Polgahawela' },
    { label: 'Kurunegala' },
    { label: 'Mahawa' },
    { label: 'Galgamuwa' },
    { label: 'Rambukkana' },
    { label: 'Kadugannawa' },
    { label: 'Peradeniya Junction' },
    { label: 'Gampola' },
    { label: 'Nawalapitiya' },
    { label: 'Hatton' },
    { label: 'Idalgashinna' },
    { label: 'Ohiya' },
    { label: 'Haputale' },
    { label: 'Bandarawela' },
    { label: 'Ella' },
    { label: 'Demodara' },
    { label: 'Badulla' },
    { label: 'Nanu Oya' },
    { label: 'Hatton' },
    { label: 'Kandy' },
    { label: 'Peradeniya' },
    { label: 'Polgahawela' },
    { label: 'Kurunegala' },
    { label: 'Mahawa' },
    { label: 'Galgamuwa' }
  ];

  const schedules = [
    { time: '05:35 ➔ 09:34', duration: '3h 59m', type: 'Direct', price: 'Rs200.00' },
    { time: '06:35 ➔ 10:34', duration: '3h 59m', type: 'Direct', price: 'Rs100.00' },
    { time: '07:35 ➔ 11:34', duration: '3h 59m', type: 'Direct', price: 'Rs250.00' },
    { time: '07:50 ➔ 12:20', duration: '4h 30m', type: '1 change', price: 'Rs100.00' },
    { time: '08:35 ➔ 12:34', duration: '3h 59m', type: 'Direct', price: 'Rs50.00' },
    { time: '09:35 ➔ 13:34', duration: '3h 59m', type: 'Direct', price: 'Rs150.00' },
    { time: '10:35 ➔ 14:34', duration: '3h 59m', type: 'Direct', price: 'Rs200.00' },
  ];

  return (
    // <div className={classes.root}>
      <Container>
        <Typography variant="h4" gutterBottom>Schedules</Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={3}>
            <Autocomplete
              options={stations}
              renderInput={(params) => <TextField {...params} label="From" variant="outlined" />}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Autocomplete
              options={stations}
              renderInput={(params) => <TextField {...params} label="To" variant="outlined" />}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              type="date"
              variant="outlined"
              fullWidth
              defaultValue="2024-06-27"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Button variant="contained" color="primary" fullWidth>Search</Button>
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{ marginTop: '20px' }}>
          {schedules.map((schedule, index) => (
            <Grid item xs={8} key={index}>
              <Card>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">{schedule.time}</Typography>
                    <Typography variant="body2">{schedule.duration} - {schedule.type}</Typography>
                    <Box alignItems="center" p={0.5} border={1} borderRadius={2} bgcolor="grey.200">
                      <Typography variant="body2">From</Typography>
                      <Typography variant="h8">{schedule.price}</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    // </div>
  );
};

export default Schedules;
