

import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, Typography, Dialog } from '@mui/material';
import { useLocation } from 'react-router-dom'; // For getting the data from the previous page, this is a hook
import LoginPopUp from './LoginPopUp';
import SearchBar from '../components/SearchBar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


export default function Schedules()  {

  //this location is used to get the data from the previous page
  const location = useLocation();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [schedules, setSchedules] = useState([]);
  const [stations, setStations] = useState([]);

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const {currentUser} = useSelector((state) => state.user);
  // console.log(schedules)

  
  //here this full schedule refers to [scheduleObj, fromStopObj, toStopObj]
  const handleOpen = (fullSchedule) => {
    if (!currentUser) {
      setOpen(true);
      return;
    }
    // You can pass the schedule ID to the TrainDetails page using the location state
    navigate('/train-details', { state: { fullSchedule } });
    // console.log("full schedule from schedules page ",fullSchedule);
  };
  
  const handleClose = () => setOpen(false);

  // Use useEffect to set the initial state from the navigation state and show the schedules
  useEffect(() => {
    if (location.state) {
      const { schedules, searchParams } = location.state;
      setSchedules(schedules);
      setFrom(searchParams.from);
      setTo(searchParams.to);
      setDate(searchParams.date);
    }
  }, [location.state]);

  // Fetch stations from the backend to show in the search bar
  useEffect(() => {
    async function fetchStations() {
      try {
        const response = await axios.get('/api/stations');
        if (response.status === 200) {
          const resStations = response.data.map(station => ({
            label: station.name
          }));
          setStations(resStations);
        } else {
          throw new Error('Failed to fetch stations');
        }
      } catch (error) {
        console.error('Failed to fetch stations:', error);
        alert('Failed to load stations: ' + (error.response && error.response.data.message ? error.response.data.message : error.message));
      }
    }
    fetchStations();
  }, []);

  // console.log(schedules)

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
      console.log("response.data", response.data)
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
            {/* <Card onClick={handleOpen}> */}
            <Card onClick={() => handleOpen(schedule)} key={index}>
              <CardContent>
                <Typography variant="h6">{schedule.fromStop.departureTime} ➔ {schedule.toStop.arrivalTime}</Typography>
                <Typography variant="body2" sx={{my:2}}>{schedule.schedule.trainRef.name}</Typography>
                <Typography variant="body2">Price: Rs{schedule.toStop.price}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
       
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <LoginPopUp onClose={handleClose} />
      </Dialog>
    </Container>
  );
};


