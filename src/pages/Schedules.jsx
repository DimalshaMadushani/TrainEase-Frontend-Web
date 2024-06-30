

import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, Typography, Dialog } from '@mui/material';
import { useLocation } from 'react-router-dom';
import LoginPopUp from './LoginPopUp';
import SearchBar from '../components/SearchBar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';


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
export default function Schedules()  {

  const location = useLocation();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [schedules, setSchedules] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const {currentUser} = useSelector((state) => state.user);

  const handleOpen = () => {
    if (!currentUser) {
      setOpen(true);
      return;
    }
    navigate('/train-details');
  };
  const handleClose = () => setOpen(false);

  // Use useEffect to set the initial state from the navigation state
  useEffect(() => {
    if (location.state) {
      const { schedules, searchParams } = location.state;
      setSchedules(schedules);
      setFrom(searchParams.from);
      setTo(searchParams.to);
      setDate(searchParams.date);
    }
  }, [location.state]);

  // console.log("schedule" ,schedules, "from",from,"to", to, "date",date)
  // In Home component
const handleSearch = async () => {
  if (!from || !to || !date) {
    alert("Please fill all fields");
    return;
  }
  try {
    const response = await axios.get(`/api/schedules`, {
      params: { fromName: from, toName: to, date: date }
    });
    if (response.status === 200) {
      navigate('/schedules', { state: { schedules: response.data, searchParams: { from, to, date } } });
    } else {
      throw new Error("Failed to fetch schedules");
    }
  } catch (error) {
    console.error("Failed to fetch schedules:", error);
    alert("Failed to load schedules: " + (error.response && error.response.data.message ? error.response.data.message : error.message));
  }
};


  return (
    <Container>
      <SearchBar
        stations={stations}
        onSearch={handleSearch} // You need to implement or adjust handleSearch for Schedules page
        setFrom={setFrom}
        setTo={setTo}
        setDate={setDate}
        initialSearchParams={{ from, to, date }}
      />
      <Grid container spacing={2} style={{ marginTop: '20px' }}>
        {schedules.map((schedule, index) => (
          <Grid item xs={12} key={index}>
            <Card onClick={handleOpen}>
              <CardContent>
                <Typography variant="h6">{schedule.fromStop.departureTime} ➔ {schedule.toStop.arrivalTime}</Typography>
                <Typography variant="body2">{schedule.schedule.trainRef.name}</Typography>
                <Typography variant="body2">Price: Rs{schedule.toStop.price}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
        {/* {
          !currentUser ? (
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
              <Login onClose={handleClose} />
            </Dialog>
          ) : (
            <Navigate to="/train-details" />
          )
        } */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <LoginPopUp onClose={handleClose} />
      </Dialog>
    </Container>
  );
};


