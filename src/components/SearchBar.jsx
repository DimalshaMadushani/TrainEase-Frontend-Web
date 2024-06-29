// // import React from 'react';
// import { Grid, TextField, Button, Autocomplete } from '@mui/material';

// const SearchBar = ({ stations, onSearch, setFrom, setTo, setDate }) => {
//   return (
//     <Grid container spacing={2} alignItems="center">
//       <Grid item xs={12} md={3}>
//         <Autocomplete
//           options={stations}
//           getOptionLabel={(option) => option.label}
//           renderInput={(params) => <TextField {...params} label="From" variant="outlined" />}
//           onChange={(event, newValue) => setFrom(newValue ? newValue.label : '')}
//         />
//       </Grid>
//       <Grid item xs={12} md={3}>
//         <Autocomplete
//           options={stations}
//           getOptionLabel={(option) => option.label}
//           renderInput={(params) => <TextField {...params} label="To" variant="outlined" />}
//           onChange={(event, newValue) => setTo(newValue ? newValue.label : '')}
//         />
//       </Grid>
//       <Grid item xs={12} md={3}>
//         <TextField
//           type="date"
//           variant="outlined"
//           fullWidth
//           defaultValue={new Date().toISOString().split('T')[0]}
//           onChange={(e) => setDate(e.target.value)}
//         />
//       </Grid>
//       <Grid item xs={12} md={3}>
//         <Button variant="contained" color="primary" fullWidth onClick={onSearch}>
//           Search
//         </Button>
//       </Grid>
//     </Grid>
//   );
// };

// export default SearchBar;


import React, { useState, useEffect } from 'react';
import { Grid, TextField, Button, Autocomplete } from '@mui/material';

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

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} md={3}>
        <Autocomplete
          options={stations}
          getOptionLabel={(option) => option.label}
          value={stations.find(station => station.label === localFrom) || null}
          onChange={(event, newValue) => handleFromChange(newValue)}
          renderInput={(params) => <TextField {...params} label="From" variant="outlined" />}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <Autocomplete
          options={stations}
          getOptionLabel={(option) => option.label}
          value={stations.find(station => station.label === localTo) || null}
          onChange={(event, newValue) => handleToChange(newValue)}
          renderInput={(params) => <TextField {...params} label="To" variant="outlined" />}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <TextField
          type="date"
          variant="outlined"
          fullWidth
          value={localDate}
          onChange={handleDateChange}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <Button variant="contained" color="primary" fullWidth onClick={onSearch}>
          Search
        </Button>
      </Grid>
    </Grid>
  );
};

export default SearchBar;
