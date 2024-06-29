

// import React, { useState } from 'react';
// import { Container, TextField, Button, Grid, Card, CardContent, Typography, Autocomplete, Box, Dialog } from '@mui/material';
// import Login from './Login';
// import SearchBar from '../components/SearchBar';
// import axios from 'axios';

// // const stations = [/* your stations array */];
// // const schedules = [/* your schedules array */];



// // const schedules = [
// //   { time: '05:35 ➔ 09:34', duration: '3h 59m', type: 'Direct', price: 'Rs200.00' },
// //   { time: '06:35 ➔ 10:34', duration: '3h 59m', type: 'Direct', price: 'Rs100.00' },
// //   { time: '07:35 ➔ 11:34', duration: '3h 59m', type: 'Direct', price: 'Rs250.00' },
// //   { time: '07:50 ➔ 12:20', duration: '4h 30m', type: '1 change', price: 'Rs100.00' },
// //   { time: '08:35 ➔ 12:34', duration: '3h 59m', type: 'Direct', price: 'Rs50.00' },
// //   { time: '09:35 ➔ 13:34', duration: '3h 59m', type: 'Direct', price: 'Rs150.00' },
// //   { time: '10:35 ➔ 14:34', duration: '3h 59m', type: 'Direct', price: 'Rs200.00' },
// // ];
// const Schedules = () => {
//   const [from, setFrom] = useState('');
//   const [to, setTo] = useState('');
//   const [date, setDate] = useState('');
//   const [schedules, setSchedules] = useState([]);
//   const [open, setOpen] = useState(false);
 

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   // const handleSearch = async () => {
//   //   if (!from || !to || !date) {
//   //     alert("Please fill all fields");
//   //     return;
//   //   }
//   //   try {
//   //     const response = await fetch(`http://localhost:3000/api/schedules?fromName=${from}&toName=${to}&date=${date}`);
//   //     const data = await response.json();
//   //     if (response.ok) {
//   //       setSchedules(data);
//   //     } else {
//   //       throw new Error(data.message || "Failed to fetch schedules");
//   //     }
//   //   } catch (error) {
//   //     console.error("Failed to fetch schedules:", error);
//   //     alert("Failed to load schedules: " + error.message);
//   //   }
//   // };
  
  

//   const handleSearch = async () => {
//     if (!from || !to || !date) {
//       alert("Please fill all fields");
//       return;
//     }
//     try {
//       const response = await axios.get(`http://localhost:3000/api/schedules`, {
//         params: {
//           fromName: from,
//           toName: to,
//           date: date
//         }
//       });
//       // Axios automatically parses the JSON response, so no need to call `.json()`
//       if (response.status === 200) {
//         setSchedules(response.data);
//       } else {
//         throw new Error("Failed to fetch schedules");
//       }
//     } catch (error) {
//       console.error("Failed to fetch schedules:", error);
//       // Check if error.response exists and use error.response.data.message if available
//       alert("Failed to load schedules: " + (error.response && error.response.data.message ? error.response.data.message : error.message));
//     }
//   };
  

//   return (
    
//       <Container>
//         <Typography variant="h4" gutterBottom>Schedules</Typography>
       
//         <SearchBar stations={stations} onSearch={handleSearch} setFrom={setFrom} setTo={setTo} setDate={setDate} />
//         <Grid container spacing={2} style={{ marginTop: '20px' }}>
//           {schedules.map((schedule, index) => (
//             <Grid item xs={12}  key={index}>
//               <Card onClick={handleOpen}>
//                 <CardContent>
//                   <Typography variant="h6">{schedule.fromStop.departureTime} ➔ {schedule.toStop.arrivalTime}</Typography>
//                   <Typography variant="body2">{schedule.schedule.trainRef.name}</Typography>
//                   <Typography variant="body2">Price: Rs{schedule.toStop.price}</Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//         <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
//           <Login />
//         </Dialog>
//       </Container>
//     );
    
  
// };

// export default Schedules;

import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, Typography, Dialog } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Login from './Login';
import SearchBar from '../components/SearchBar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


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
  const location = useLocation();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [schedules, setSchedules] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
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
    const response = await axios.get(`http://localhost:3000/api/schedules`, {
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
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <Login />
      </Dialog>
    </Container>
  );
};

export default Schedules;
