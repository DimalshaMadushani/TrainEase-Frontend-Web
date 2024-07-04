import React, { useState } from 'react';
import { Grid, TextField, Button, Autocomplete } from '@mui/material';

const SearchBar = ({ stations, onSearch }) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} md={3}>
        <Autocomplete
          options={stations}
          getOptionLabel={(option) => option.label}
          onChange={(event, newValue) => setFrom(newValue ? newValue.label : '')}
          renderInput={(params) => <TextField {...params} label="From" variant="outlined" />}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <Autocomplete
          options={stations}
          getOptionLabel={(option) => option.label}
          onChange={(event, newValue) => setTo(newValue ? newValue.label : '')}
          renderInput={(params) => <TextField {...params} label="To" variant="outlined" />}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <TextField
          type="date"
          variant="outlined"
          fullWidth
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => onSearch(from, to, date)}
        >
          Search
        </Button>
      </Grid>
    </Grid>
  );
};

export default SearchBar;
