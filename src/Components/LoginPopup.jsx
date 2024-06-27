import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import SignupPopup from './SignupPopup'; 

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const LoginPopup = ({ open, handleClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [openSignup, setOpenSignup] = useState(false); // State for SignupPopup

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleOpenSignup = () => {
    setOpenSignup(true);
  };

  const handleCloseSignup = () => {
    setOpenSignup(false);
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            Login
          </Typography>
          <TextField label="User Name" variant="outlined" fullWidth margin="normal" />
          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            fullWidth
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button variant="contained" color="primary" fullWidth>
            Login
          </Button>
          <Typography variant="body2" align="center" style={{ marginTop: '8px' }}>
            Don't have an account?{' '}
            <a href="#" onClick={handleOpenSignup}>Sign Up</a> 
          </Typography>
        </Box>
      </Modal>
      <SignupPopup open={openSignup} handleClose={handleCloseSignup} /> {/* Render SignupPopup */}
    </>
  );
};

export default LoginPopup;
