import React from "react";
import {
  Button,
  TextField,
  Typography,
  Container,
  Grid,
  Box,
  Alert,
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
import { useState,useEffect } from "react";

function Register() {
  const { error, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phone: "",
    username: "",
    email: "",
    password: "",
  });

  //this use to avoid displaying old errors even after refrehsing the page
  useEffect(() => {
    dispatch(clearError()); // Clear error state when the component mounts
  }, [dispatch]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Registering...");
    dispatch(registerStart());
    try {
      const response = await axios.post("/api/register", formData);
      console.log("Response:", response);
      dispatch(registerSuccess(response.data));
      navigate("/home");
    } catch (error) {
      console.error("Error during registration:", error);
      dispatch(registerFailure(error.response.data.message));
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
      </Box>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            value={formData.username}
            onChange={(e) => {
              setFormData({ ...formData, username: e.target.value });
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="phone"
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={(e) => {
              setFormData({ ...formData, phone: e.target.value });
            }}
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
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
            }}
          />
        </Grid>
        {error && (
          <Box sx={{ mt: 2 }}>
            <Alert severity="error">{error}</Alert>
          </Box>
        )}
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
          <Button type="submit" variant="contained" color="primary">
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Register;
