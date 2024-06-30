import React from 'react';
import { Button, TextField, Typography, Container, Grid, Radio, RadioGroup, FormControlLabel, FormLabel } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {registerStart , registerSuccess, registerFailure} from '../redux/user/userSlice';
import {useState} from 'react';

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    username: '',
    email: '',
    password: '',
    gender: 'male',
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Registering...');
    dispatch(registerStart());
    try {
      const response = await axios.post('/api/register', formData);
      console.log('Response:', response);
      dispatch(registerSuccess(response.data));
      navigate('/home');
    } catch (error) {
      console.error('Error during registration:', error);
      dispatch(registerFailure(error.response.data.message));
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form style={{ width: '100%', marginTop: 3 }} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
               
                autoFocus
                value={formData.firstName}
                onChange={(e) => {setFormData({ ...formData, firstName: e.target.value });}}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
  
                value={formData.lastName}
                onChange={(e) => {setFormData({ ...formData, lastName: e.target.value });}}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="phone"
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={(e) => {setFormData({ ...formData, phone: e.target.value });}}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                value={formData.username}
                onChange={(e) => {setFormData({ ...formData, username: e.target.value });}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={formData.email}
                onChange={(e) => {setFormData({ ...formData, email: e.target.value });}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) => {setFormData({ ...formData, password: e.target.value });}}
              />
            </Grid>
            <Grid item xs={12}>
              <FormLabel component="legend" style={{ marginTop: 20 }}>Gender</FormLabel>
              <RadioGroup row aria-label="gender" name="gender" style={{ marginBottom: 20 }}
                value={formData.gender}
                onChange={(e) => {setFormData({ ...formData, gender: e.target.value });}}
              >
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
              </RadioGroup>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ margin: '24px 0px 16px' }}
            
          >
            Register
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default Register;
