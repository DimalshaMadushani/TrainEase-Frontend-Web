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
import { useDispatch } from "react-redux";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  clearError,
} from "../redux/user/userSlice";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function EditProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phone: "",
    username: "",
    email: "",
    oldPassword: "",
    newPassword: "",
  });
  const { currentUser, error, loading } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/api/user/getProfile");
        setFormData({
          phone: response.data.phone,
          username: response.data.username,
          email: response.data.email,
        });
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };
    fetchProfile();
    console.log("Profile fetched", formData);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Updating...");
    dispatch(updateUserStart());
    try {
      const response = await axios.post("/api/user/editProfile", formData);
      dispatch(updateUserSuccess(response.data));
      navigate("/profile");
    } catch (error) {
      console.error("Error during updating profile:", error);
      dispatch(updateUserFailure(error.response.data.message));
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
          Edit Profile
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
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
            name="oldPassword"
            label="Old Password"
            type="password"
            id="oldPassword"
            placeholder="Enter your old password to confirm changes"
            value={formData.oldPassword}
            onChange={(e) => {
              setFormData({ ...formData, oldPassword: e.target.value });
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="newPassword"
            label="New Password"
            type="password"
            id="newPassword"
            placeholder="Leave blank to keep the same password"
            value={formData.newPassword}
            onChange={(e) => {
              setFormData({ ...formData, newPassword: e.target.value });
            }}
          />
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
          <Button type="submit" variant="contained" color="primary">
            save changes
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
