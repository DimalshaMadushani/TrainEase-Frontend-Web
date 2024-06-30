import React from 'react';
import { AppBar, Toolbar, Typography, Button, Grid } from '@mui/material';
import { useSelector } from 'react-redux';

function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container alignItems="center">
          <Grid item xs={6}>
            <Typography variant="h6">
              TrainEase
            </Typography>
          </Grid>
          <Grid item xs={6} style={{ textAlign: 'right' }}>
            <Button color="inherit" href="/home">Home</Button>
            <Button color="inherit" href="#aboutus">About us</Button>
            {
              currentUser ? <Button color="inherit" href="/profile">Profile</Button>
              : <Button color="inherit" href="/login">Login</Button>
            }
            {/* <Button color="inherit" href="/login">Login</Button> */}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
