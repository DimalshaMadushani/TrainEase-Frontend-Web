import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Dialog,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { checkoutSchema } from "../validationSchemas";
import axios from "axios";
import VisaIcon from "../assets/visa-svgrepo-com.svg";
import MasterCardIcon from "../assets/mastercard-full-svgrepo-com.svg";
import AmericanExpressIcon from "../assets/american-express-svgrepo-com.svg";

import TripSummary from "../components/TripSummary";
import PaymentSuccessPopup from "../components/PaymentSuccessPopup";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

export default function CheckOut() {
  const navigate = useNavigate();
  const location = useLocation();
  const stripe = useStripe();
  const elements = useElements();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
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
  const [isProcessing, setIsProcessing] = React.useState(false);

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

  const handleConfirmBooking = async () => {
    if (!isExpired && stripe && elements) {
      const cardElement = elements.getElement(CardElement);
      setIsProcessing(true);
      try {
        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
        });

        if (error) {
          console.error("Payment method creation failed:", error);
          alert(
            "Failed to create payment method. Please check your card details."
          );
          setIsProcessing(false);
        } else {
          const response = await axios.post(
            `https://trainease-backend.onrender.com/api/booking/confirmBooking/${bookingId}`,
            { paymentMethodId: paymentMethod.id }
          );
          setOpen(true);
          setIsProcessing(false);
        }
      } catch (error) {
        console.error("Payment failed:", error);
        alert("Failed to confirm booking, please try again.");
        setIsProcessing(false);
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
    setIsSuccess(true);
    navigate("/profile");
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 3 }}>
      <Grid container spacing={3} sx={{ mb: 2 }}>
        {/* Payment Method Card */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2, pb: 0 }}>
            <CardContent>
              {/* Stripe's CardElement */}
              <Typography variant="h4" gutterBottom mt={3} mb={2}>
                Enter Card details
              </Typography>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 3, my: 2 }}
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

              {/* Custom styling for CardElement */}
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#424770",
                      "::placeholder": {
                        color: "#aab7c4",
                      },
                      fontFamily: "Arial, sans-serif",
                      fontSmoothing: "antialiased",
                    },
                    invalid: {
                      color: "#fa755a",
                      iconColor: "#fa755a",
                    },
                  },
                }}
              />

              <Button
                variant="contained"
                color="secondary"
                onClick={handleConfirmBooking}
                disabled={isExpired || isSuccess || isProcessing}
                sx={{ mt: 3.8 }}
                data-testid="confirm-button"
              >
                {isProcessing
                  ? "Payment is Processing..."
                  : "Confirm Reservation"}
              </Button>

              {/* "Powered by Stripe" text */}
              <Typography
                variant="body2"
                color="textSecondary"
                align="center"
                sx={{ mt: 3 }}
              >
                Powered by Stripe
              </Typography>
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
