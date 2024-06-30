import React, { useState } from 'react';
import { Container, TextField, Button, Link, Typography, Box, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For navigation
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure,clearError } from '../redux/user/userSlice';
import { useEffect } from 'react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook for navigation
  const dispatch = useDispatch();
  const { currentUser, error, loading } = useSelector((state) => state.user);

   //this use to avoid displaying old errors even after refrehsing the page
   useEffect(() => {
    dispatch(clearError()); // Clear error state when the component mounts
  }, [dispatch]);


  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent default form submission
    console.log('Logging in...');
    dispatch(loginStart());
    try {
      const response = await axios.post('/api/login', {
        username,
        password,
      });
      console.log('Response:', response);
      dispatch(loginSuccess(response.data));
      navigate('/home'); // Redirect to home page after successful login
    } catch (error) {
      console.error('Error during login:', error);
      dispatch(loginFailure(error.response?.data?.message || 'Unknown error'));
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '10%',
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box
          component="form"
          sx={{ width: '100%', mt: 1 }}
          noValidate
          onSubmit={handleLogin}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            value={username}
            autoFocus
            onChange={(e) => setUsername(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <Alert severity="error">{error}</Alert>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Box display="flex" justifyContent="center">
            <Link href="/register" variant="body2">
              {"Don't have an account? Register here"}
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
