import React from 'react';
import { Grid, TextField, Button, Autocomplete } from '@mui/material';

const SearchBar = ({ stations, onSearch }) => {
  return (
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
        <Button variant="contained" color="primary" fullWidth onClick={onSearch}>
          Search
        </Button>
      </Grid>
    </Grid>
  );
};

export default SearchBar;
