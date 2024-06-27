import React from 'react';
import { Container, TextField, Button, Grid, Typography, Autocomplete } from '@mui/material';
import { makeStyles } from '@mui/material/styles';





const Data = () => {
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

  return (
    // <div className={classes.root}>
      <Container>
        <Typography variant="h4" gutterBottom>Home</Typography>
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
      </Container>
    // </div>
  );
};

export default Data;
