import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  DialogActions,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; // For navigation
import { useDispatch, useSelector } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../redux/user/userSlice";

const LoginPopUp = ({ onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false); // State to store login status
  const navigate = useNavigate(); // Hook for navigation
  const dispatch = useDispatch();
  const { currentUser, error, loading } = useSelector((state) => state.user);

  const handleLogin = async () => {
    console.log("Logging in...");
    dispatch(loginStart());
    try {
      const response = await axios.post(
        "https://trainease-backend.onrender.com/api/user/login",
        {
          username,
          password,
        },
        { withCredentials: true }
      );
      console.log("Response:", response);
      dispatch(loginSuccess(response.data));
      onClose();
      navigate("/schedules"); // Redirect to home page after successful login
    } catch (error) {
      console.error("Error during login:", error);
      dispatch(loginFailure(error.response?.data?.message || "Unknown error"));
    }
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Username"
          type="text"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <Alert severity="error">{error}</Alert>}
        <Box textAlign="center" marginTop="20px" display="flex">
          <Typography variant="body1" mr={1}>
            Don't you have an account?
          </Typography>
          <Link to="/register" style={{ textDecoration: "none" }}>
            Register
          </Link>
        </Box>
        <Box display="flex" justifyContent="center">
          <Link href="/forgot-password" variant="body2">
            Forgot Password?
          </Link>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleLogin}>Login</Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginPopUp;
