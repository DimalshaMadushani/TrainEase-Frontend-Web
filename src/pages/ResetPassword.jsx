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
import { useParams } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPasswordSchema } from "../validationSchemas"; // Adjust the path based on your structure

export default function ResetPassword() {
  const { token } = useParams();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
  });

  const handleResetPassword = async (data) => {
    setError("");
    setMessage("");
    try {
      const response = await axios.put(
        `https://trainease-backend.onrender.com/api/user/resetPassword`,
        {
          resetToken: token,
          newPassword: data.password,
        },
        { withCredentials: true }
      );
      setMessage("Password has been successfully reset.");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to reset password.");
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
          Reset Password
        </Typography>
        {message && <Alert severity="success">{message}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(handleResetPassword)}
          sx={{ width: "100%", mt: 1 }}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            label="New Password"
            type="password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="confirmPassword"
            label="Confirm New Password"
            type="password"
            {...register("confirmPassword")}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Reset Password
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
