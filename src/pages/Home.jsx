import React from 'react'
import SearchBar from '../components/SearchBar'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const stations = [
    { label: 'Beliatta' },
    { label: 'Tangalle' },
    { label: 'Matara' },
    { label: 'Galle' },
    { label: 'Kalutara' },
    { label: 'Colombo Fort' },
    { label: 'Negombo' },
    { label: 'Chilaw' },]

   
    
export default function Home() {

  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [schedules, setSchedules] = useState([]);
  //define navigate
  const navigate = useNavigate();

  // const handleSearch = async () => {
  //   if (!from || !to || !date) {
  //     alert("Please fill all fields");
  //     return;
  //   }
  //   try {
  //     const response = await axios.get(`http://localhost:3000/api/schedules`, {
  //       params: {
  //         fromName: from,
  //         toName: to,
  //         date: date
  //       }
  //     });
  //     // Axios automatically parses the JSON response, so no need to call `.json()`
  //     if (response.status === 200) {
  //       setSchedules(response.data);
  //       navigate('/schedules');

  //     } else {
  //       throw new Error("Failed to fetch schedules");
  //     }
  //   } catch (error) {
  //     console.error("Failed to fetch schedules:", error);
  //     // Check if error.response exists and use error.response.data.message if available
  //     alert("Failed to load schedules: " + (error.response && error.response.data.message ? error.response.data.message : error.message));
  //   }
  // };
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
    <div>
        <SearchBar stations={stations} onSearch={handleSearch} setFrom={setFrom} setTo={setTo} setDate={setDate} />
      Home
    </div>
  )
}
