import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Dialog,
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
  Grid,
} from "@mui/material";
import VisaIcon from "../assets/visa-svgrepo-com.svg";
import MasterCardIcon from "../assets/mastercard-full-svgrepo-com.svg";
import AmericanExpressIcon from "../assets/american-express-svgrepo-com.svg";
import PadlockIcon from "../assets/icons8-lock.svg";
import SecurityLock from "../assets/icons8-security-lock-50.png";
import { useLocation } from "react-router-dom";
import axios from "axios";
import TripSummary from "../components/TripSummary";
import PaymentSuccessPopup from "../components/PaymentSuccessPopup";

export default function CheckOut() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const location = useLocation();
  const {
    selectedClass,
    fromStop,
    toStop,
    date,
    selectedSeatCount,
    trainName,
    selectedSeats,
    schedule,
    bookingId,
    expireTime,
  } = location.state;

  useEffect(() => {
    const checkExpiry = () => {
      const now = new Date();
      const expiry = new Date(expireTime);
      if (now >= expiry) {
        setIsExpired(true);
      }
    };

    const timer = setInterval(checkExpiry, 1000); // Check every second
    checkExpiry(); // Check immediately on component mount

    return () => clearInterval(timer); // Clean up on component unmount
  }, [expireTime]);

  const handleConfirmBooking = async (event) => {
    event.preventDefault(); // Prevent the default form submission
    if (!isExpired) {
      try {
        const response = await axios.get(`/api/booking/confirmBooking/${bookingId}`);
        console.log("Booking confirmation response:", response.data);
        setOpen(true); // Open the popup on successful booking
      } catch (error) {
        console.error("Failed to confirm booking:", error);
        alert("Failed to confirm booking, please try again."); // Inform the user about the error
      }
    }
  };

  const handleClose = () =>{
    setOpen(false);
    setIsSuccess(true);
    navigate('/profile');
  } 
    

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3} sx={{ mb: 2 }}>
        <Grid item xs={12}>
          <Card
            sx={{
              mb: 1,
              mt: 2,
              mx: "auto", // Center the card horizontally
              width: { xs: "100%", md: "80%", lg: "60%" }, // Adjust width based on screen size
            }}
          >
            <CardContent sx={{ textAlign: "center", pb: 0 }}>
              <Typography variant="subtitle1">
                <Box
                  component="span"
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center", // Center the content
                  }}
                >
                  <Box sx={{ mr: 1, color: "gray" }}>
                    <Box
                      component="img"
                      src={SecurityLock}
                      alt="Security Lock"
                      sx={{ height: 20,mt:0.5 }}
                    />
                  </Box>
                  <Box sx={{ fontWeight: "bold" }}>
                    Secured payment - All information is fully encrypted, secure
                    and protected.
                  </Box>
                </Box>
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid
          container
          item
          xs={12}
          md={6}
          component="form"
          onSubmit={handleConfirmBooking}
        >
          <Card sx={{ p: 2, pb: 0 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Payment method
              </Typography>
              <RadioGroup
                defaultValue="credit-card"
                sx={{ display: "flex", flexDirection: "row", gap: 2 }}
              >
                <FormControlLabel
                  value="credit-card"
                  control={<Radio />}
                  label="Credit card"
                />
                <FormControlLabel
                  value="debit-card"
                  control={<Radio />}
                  label="Debit card"
                />
              </RadioGroup>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  marginTop: 2,
                }}
              >
                <Box
                  component="img"
                  src={VisaIcon}
                  alt="Visa"
                  sx={{ height: 40 }}
                />
                <Box
                  component="img"
                  src={MasterCardIcon}
                  alt="MasterCard"
                  sx={{ height: 40 }}
                />
                <Box
                  component="img"
                  src={AmericanExpressIcon}
                  alt="American Express"
                  sx={{ height: 40 }}
                />
              </Box>

              <Typography variant="h6" gutterBottom mt={2}>
                Card details
              </Typography>
              <TextField
                fullWidth
                label="Card number"
                variant="outlined"
                sx={{ mb: 2 }}
                placeholder="**** **** **** ****"
                required
                InputProps={{
                  endAdornment: (
                    <Box
                      component="img"
                      src={PadlockIcon}
                      alt="Padlock"
                      sx={{ height: 20, color: "gray" }}
                    />
                  ),
                }}
              />
              <TextField
                fullWidth
                label="Cardholder name"
                variant="outlined"
                sx={{ mb: 2 }}
                placeholder="R.M. Rathnayake"
                required
              />
              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  fullWidth
                  label="Expiry date"
                  variant="outlined"
                  placeholder="MM/YY"
                  required
                />
                <TextField
                  fullWidth
                  label="Security code"
                  variant="outlined"
                  placeholder="CVC or CVV"
                  required
                  InputProps={{
                    endAdornment: (
                      <Box
                        component="img"
                        src={PadlockIcon}
                        alt="Padlock"
                        sx={{ height: 20, color: "gray" }}
                      />
                    ),
                  }}
                />
              </Box>
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                disabled={isExpired || isSuccess}
                sx={{ mt: 3.8 }}
              >
                Confirm Reservation
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <TripSummary
            selectedClass={selectedClass}
            fromStop={fromStop}
            toStop={toStop}
            date={date}
            selectedSeatCount={selectedSeatCount}
            trainName={trainName}
            holdTime={expireTime}
            isSuccessful={isSuccess}
          />
        </Grid>
      </Grid>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <PaymentSuccessPopup onClose={handleClose} />
      </Dialog>
    </Container>
  );
}
