import React from 'react';
import { Button, TextField, Typography, Container, Grid } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google'; // Ensure you have @mui/icons-material installed

function SignUp() {
  return (
    <Container component="main" maxWidth="xs">
      <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form style={{ width: '100%', marginTop: 3 }} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ margin: '24px 0px 16px' }}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item xs>
              <Button
                startIcon={<GoogleIcon />}
                fullWidth
                variant="outlined"
                style={{ marginTop: 20 }}
                onClick={() => console.log('Google Sign-In')}
              >
                Continue with Google
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default SignUp;
