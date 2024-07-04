import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, Card, CardContent, Typography, Box, Dialog } from '@mui/material';
import SearchBar from '../components/SearchBar';
import Login from './Login';

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
];

const Schedules = () => {
  const [schedules, setSchedules] = useState([]);
  const [open, setOpen] = useState(false);
  const [searchParams, setSearchParams] = useState({ from: '', to: '', date: '' });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSearch = (from, to, date) => {
    setSearchParams({ from, to, date });
  };

  useEffect(() => {
    if (searchParams.from && searchParams.to && searchParams.date) {
      axios.get(`/api/schedules`, { params: searchParams })
        .then(response => setSchedules(response.data))
        .catch(error => console.error('Error fetching schedules:', error));
    }
  }, [searchParams]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Schedules</Typography>
      <SearchBar stations={stations} onSearch={handleSearch} />
      <Grid container spacing={2} style={{ marginTop: '20px' }}>
        {schedules.map((schedule, index) => (
          <Grid item xs={8} key={index}>
            <Card onClick={handleOpen}>
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
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <Login />
      </Dialog>
    </Container>
  );
};

export default Schedules;
