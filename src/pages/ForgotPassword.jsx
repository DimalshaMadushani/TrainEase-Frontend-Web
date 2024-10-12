import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Link,
} from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgotPasswordSchema } from "../validationSchemas"; // Adjust the path based on your structure

export default function ForgotPassword() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
  });

  const handleForgotPassword = async (data) => {
    setError("");
    setMessage("");
    try {
      const response = await axios.post(
        "https://trainease-backend.onrender.com/api/user/forgotPassword",
        data, 
        { withCredentials: true }
      );
      setMessage(
        response.data.message || "A reset link has been sent to your email."
      );
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "10%",
        }}
      >
        <Typography component="h1" variant="h5">
          Forgot Password
        </Typography>
        {message && <Alert severity="success">{message}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(handleForgotPassword)}
          sx={{ width: "100%", mt: 1 }}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            autoFocus
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Send Reset Link
          </Button>
          <Box display="flex" justifyContent="center">
            <Link href="/login" variant="body2">
              Back to Login
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
