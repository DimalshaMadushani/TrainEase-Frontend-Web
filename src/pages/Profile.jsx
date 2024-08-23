import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Paper,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BookingHistory from "../components/BookingHistory";

export default function Profile() {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [showBooking, setShowBooking] = useState(false);
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  const handleSignout = async () => {
    try {
      await axios.get("/api/user/logout");
      navigate("/login");
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  const handleShowBooking = () => {
    setShowBooking((prev) => !prev);
  };

  return (
    <Container>
      <Box sx={{ alignItems: "center", my: 2 }}>
        <Typography variant="h4" align="center">
          Profile
        </Typography>
      </Box>
      <Grid container spacing={2} sx={{mb:4}}>
            <Grid item xs={12} md={4}>
            <TextField
                label="Username"
                value={currentUser.username}
                variant="outlined"
                fullWidth
                InputProps={{
                readOnly: true,
                }}
            />
            </Grid>
            <Grid item xs={12} md={4}>
            <TextField
                label="Email"
                value={currentUser.email}
                variant="outlined"
                fullWidth
                InputProps={{
                readOnly: true,
                }}
            />
            </Grid>
            <Grid item xs={12} md={4}>
            <TextField
                label="Phone"
                value={currentUser.phone}
                variant="outlined"
                fullWidth
                InputProps={{
                readOnly: true,
                }}
            />
            </Grid>
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
        <Button variant="contained" color="primary" onClick={handleEditProfile} sx={{mr:3}}>
          Edit Profile
        </Button>
        <Button
          variant="contained"
          color="secondary"
          sx={{ ml: 2 }}
          onClick={handleSignout}
        >
          Sign out
        </Button>
      </Box>
      <Box sx={{ my: 2 }}>
        <Button variant="outlined" fullWidth onClick={handleShowBooking}>
          show booking history
        </Button>
      </Box>
      {showBooking && <BookingHistory />}
    </Container>
  );
}
