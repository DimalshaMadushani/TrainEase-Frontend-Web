import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, IconButton, InputAdornment, Link } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LoginPopup from './LoginPopup';

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

const SignupPopup = ({ open, handleClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleOpenLogin = () => {
    setOpenLogin(true);
  };

  const handleCloseLogin = () => {
    setOpenLogin(false);
  };

  return (
    <>
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          Sign Up
        </Typography>
        <TextField label="User Name" variant="outlined" fullWidth margin="normal" />
        <TextField label="Email" variant="outlined" fullWidth margin="normal" />
        <TextField label="Gender" variant="outlined" fullWidth margin="normal" />
        <TextField label="Phone Number" variant="outlined" fullWidth margin="normal" />
        <TextField
          label="Date of Birth"
          type="date"
          variant="outlined"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField label="Address" variant="outlined" fullWidth margin="normal" />
        <TextField
          label="Password"
          type={showPassword ? 'text' : 'password'}
          variant="outlined"
          fullWidth
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePasswordVisibility}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Confirm Password"
          type={showConfirmPassword ? 'text' : 'password'}
          variant="outlined"
          fullWidth
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleToggleConfirmPasswordVisibility}>
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button variant="contained" color="primary" fullWidth>
          Sign Up
        </Button>
        <Typography variant="body2" align="center" style={{ marginTop: '8px' }}>
            Already have an account?{' '}
            <Link component="button" variant="body2" onClick={handleOpenLogin}>
              Login
            </Link>
          </Typography>
      </Box>
    </Modal>
    
    </>
  );
};

export default SignupPopup;
