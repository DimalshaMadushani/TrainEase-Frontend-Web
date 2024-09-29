

import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Dialog, Container, Typography, Card, CardContent, TextField, Button, RadioGroup, FormControlLabel, Radio, Grid } from "@mui/material";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { checkoutSchema } from '../validationSchemas';
import axios from "axios";
import TripSummary from "../components/TripSummary";
import PaymentSuccessPopup from "../components/PaymentSuccessPopup";
import VisaIcon from "../assets/visa-svgrepo-com.svg";
import MasterCardIcon from "../assets/mastercard-full-svgrepo-com.svg";
import AmericanExpressIcon from "../assets/american-express-svgrepo-com.svg";


export default function CheckOut() {
  const navigate = useNavigate();
  const location = useLocation();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(checkoutSchema),
  });

  const {
    selectedClass,
    fromStop,
    toStop,
    date,
    selectedSeatCount,
    trainName,
    schedule,
    bookingId,
    expireTime,
  } = location.state;

  const [open, setOpen] = React.useState(false);
  const [isExpired, setIsExpired] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  useEffect(() => {
    const checkExpiry = () => {
      const now = new Date();
      const expiry = new Date(expireTime);
      if (now >= expiry) {
        setIsExpired(true);
      }
    };

    const timer = setInterval(checkExpiry, 1000);
    checkExpiry();

    return () => clearInterval(timer);
  }, [expireTime]);

  const handleConfirmBooking = async (data) => {
    if (!isExpired) {
      try {
        const response = await axios.post(`/api/booking/confirmBooking/${bookingId}`, data);
        console.log("Booking confirmation response:", response.data);
        setOpen(true);
      } catch (error) {
        console.error("Failed to confirm booking:", error);
        alert("Failed to confirm booking, please try again.");
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
    setIsSuccess(true);
    navigate('/profile');
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 3 }}>
      <Grid container spacing={3} sx={{ mb: 2 }}>
        {/* Payment Method Card */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2, pb: 0 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Payment method</Typography>
              <RadioGroup defaultValue="credit-card" sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
                <FormControlLabel value="credit-card" control={<Radio />} label="Credit card" />
                <FormControlLabel value="debit-card" control={<Radio />} label="Debit card" />
              </RadioGroup>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, marginTop: 2 }}>
                <Box component="img" src={VisaIcon} alt="Visa" sx={{ height: 40 }} />
                <Box component="img" src={MasterCardIcon} alt="MasterCard" sx={{ height: 40 }} />
                <Box component="img" src={AmericanExpressIcon} alt="American Express" sx={{ height: 40 }} />
              </Box>
              <Typography variant="h6" gutterBottom mt={2}>Card details</Typography>
              <form onSubmit={handleSubmit(handleConfirmBooking)}>
                <TextField fullWidth label="Card number" variant="outlined" sx={{ mb: 2 }} placeholder="**** **** **** ****" required {...register('cardNumber')} error={!!errors.cardNumber} helperText={errors.cardNumber?.message} />
                <TextField fullWidth label="Cardholder name" variant="outlined" sx={{ mb: 2 }} placeholder="R.M. Rathnayake" required {...register('cardholderName')} error={!!errors.cardholderName} helperText={errors.cardholderName?.message} />
                <Box sx={{ display: "flex", gap: 2 }}>
                  <TextField fullWidth label="Expiry date" variant="outlined" placeholder="MM/YY" required {...register('expiryDate')} error={!!errors.expiryDate} helperText={errors.expiryDate?.message} />
                  <TextField fullWidth label="Security code" variant="outlined" placeholder="CVC or CVV" required {...register('securityCode')} error={!!errors.securityCode} helperText={errors.securityCode?.message} />
                </Box>
                <Button variant="contained" color="secondary" type="submit" disabled={isExpired || isSuccess} sx={{ mt: 3.8 }}>Confirm Reservation</Button>
              </form>
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
