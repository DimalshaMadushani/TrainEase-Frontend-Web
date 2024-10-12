import React, { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Grid,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  registerStart,
  registerSuccess,
  registerFailure,
  clearError,
} from "../redux/user/userSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../validationSchemas"; // Ensure this path is correct

function Register() {
  const { error, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState(null); // State to track email validation error

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  useEffect(() => {
    dispatch(clearError()); // Clear error state when the component mounts
  }, [dispatch]);

  // Email validation function using Abstract API
  const validateEmail = async (email) => {
    try {
      const apiKey = import.meta.env.VITE_EMAIL_VALIDATION_API_KEY;
      const response = await axios.get(
        `https://emailvalidation.abstractapi.com/v1/?api_key=${apiKey}&email=${email}`
      );
      const { deliverability, is_valid_format } = response.data;
      if (deliverability === "DELIVERABLE" && is_valid_format.value) {
        return true; // Email is valid
      } else {
        setEmailError("Invalid or undeliverable email address");
        return false; // Email is invalid
      }
    } catch (error) {
      setEmailError("Invalid email address");
      return false;
    }
  };

  const onSubmit = async (data) => {
    setEmailError(null); // Reset email error

    // Validate email using Abstract API
    const isEmailValid = await validateEmail(data.email);
    if (!isEmailValid) {
      return; // Stop form submission if email is invalid
    }

    dispatch(registerStart());
    try {
      const response = await axios.post(
        "https://trainease-backend.onrender.com/api/user/register",
        data,
        { withCredentials: true }
      );
      dispatch(registerSuccess(response.data));
      navigate("/"); // Navigate to home after successful registration
    } catch (error) {
      dispatch(
        registerFailure(error.response?.data?.message || "Unknown error")
      );
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                autoFocus
                {...register("username")}
                error={!!errors.username}
                helperText={errors.username?.message}
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
                {...register("email")}
                error={!!errors.email || !!emailError}
                helperText={errors.email?.message || emailError}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="phone"
                label="Phone Number"
                {...register("phone")}
                error={!!errors.phone}
                helperText={errors.phone?.message}
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
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
          </Grid>
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Register;
