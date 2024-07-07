
import React, { useState, useEffect } from 'react';
import { Grid, TextField, Button, Autocomplete,Box } from '@mui/material';

const SearchBar = ({ stations, onSearch, setFrom, setTo, setDate, initialSearchParams }) => {
  // Local state in SearchBar to handle form values
  const [localFrom, setLocalFrom] = useState('');
  const [localTo, setLocalTo] = useState('');
  const [localDate, setLocalDate] = useState('');

  // Effect to initialize values from props
  useEffect(() => {
    if (initialSearchParams) {
      setLocalFrom(initialSearchParams.from);
      setLocalTo(initialSearchParams.to);
      setLocalDate(initialSearchParams.date);
    }
  }, [initialSearchParams]);

  // Handling changes in inputs
  const handleFromChange = (newValue) => {
    setLocalFrom(newValue.label);
    setFrom(newValue.label);
  };

  const handleToChange = (newValue) => {
    setLocalTo(newValue.label);
    setTo(newValue.label);
  };

  const handleDateChange = (e) => {
    setLocalDate(e.target.value);
    setDate(e.target.value);
  };

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} md={3}>
        <Box sx={{backgroundColor:'white', borderRadius: 1}}>
        <Autocomplete
          options={stations}
          getOptionLabel={(option) => option.label}
          value={stations.find(station => station.label === localFrom) || null}
          onChange={(event, newValue) => handleFromChange(newValue)}
          renderInput={(params) => <TextField {...params} label="From" variant="outlined" />}
        />
        </Box>
      </Grid>
      <Grid item xs={12} md={3}>
        <Box sx={{backgroundColor:'white',borderRadius: 1}}>
        <Autocomplete
          options={stations}
          getOptionLabel={(option) => option.label}
          value={stations.find(station => station.label === localTo) || null}
          onChange={(event, newValue) => handleToChange(newValue)}
          renderInput={(params) => <TextField {...params} label="To" variant="outlined" />}
        />
        </Box>
      </Grid>
      <Grid item xs={12} md={3} >
        <Box sx={{backgroundColor:'white',borderRadius: 1}}>
        <TextField
          type="date"
          variant="outlined"
          fullWidth
          value={localDate}
          onChange={handleDateChange}
          InputProps={{
            inputProps: {
              min: today
            }
          }}
          
        />
        </Box>
      </Grid>
      <Grid item xs={12} md={3}>
        <Button variant="contained" color="secondary" fullWidth onClick={onSearch} sx={{py:1.7}}>
          Search
        </Button>
      </Grid>
    </Grid>
  );
};

export default SearchBar;
