import React from 'react';
import { Box, Container, Typography, Card, CardContent, TextField, Button, RadioGroup, FormControlLabel, Radio, Divider } from '@mui/material';
import VisaIcon from '../assets/visa-svgrepo-com.svg';
import MasterCardIcon from '../assets/mastercard-full-svgrepo-com.svg';
import AmericanExpressIcon from '../assets/american-express-svgrepo-com.svg';
import PadlockIcon from '../assets/icons8-lock.svg';
import SecurityLock from '../assets/icons8-security-lock-50.png';

const Checkout = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4, marginLeft:"50px" }}>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>
      <Divider />
      <Card sx={{ p: 0.2, mb: 2}}>
        <CardContent>
          <Typography variant="subtitle1" gutterBottom>
            <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center' ,padding:"0.5px"}}>
              <Box component="span" sx={{ mr: 1, color: 'gray' }}>
                <Box component="img" src={SecurityLock} alt="Security Lock" sx={{ height: 20 }} />
              </Box>
              <Box component="span" sx={{ fontWeight: 'bold' }}>Secured payment </Box> - All information is fully encrypted, secure and protected.
            </Box>
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ p: 2, mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Payment method
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
            <RadioGroup defaultValue="credit-card" sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
              <FormControlLabel value="credit-card" control={<Radio />} label="Credit card" />
              <FormControlLabel value="debit-card" control={<Radio />} label="Debit card" />
            </RadioGroup>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 2, marginLeft: 'auto' }}>
              <Box component="img" src={VisaIcon} alt="Visa" sx={{ height: 40 }} />
              <Box component="img" src={MasterCardIcon} alt="MasterCard" sx={{ height: 40 }} />
              <Box component="img" src={AmericanExpressIcon} alt="American Express" sx={{ height: 40 }} />
            </Box>
          </Box>
          <Typography variant="h6" gutterBottom>
            Card details
          </Typography>
          <TextField
            fullWidth
            label="Card number"
            variant="outlined"
            sx={{ mb: 2 }}
            InputProps={{
              endAdornment: (
                <Box component="span" sx={{ color: 'gray' }}>
                  <Box component="img" src={PadlockIcon} alt="Padlock" sx={{ height: 20 }} />
                </Box>
              ),
            }}
            placeholder="**** **** **** ****"
          />
          <TextField
            fullWidth
            label="Cardholder name"
            variant="outlined"
            sx={{ mb: 2 }}
            placeholder="R.M. Rathnayake"
          />
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              fullWidth
              label="Expiry date"
              variant="outlined"
              placeholder="MM/YY"
            />
            <TextField
              fullWidth
              label="Security code"
              variant="outlined"
              placeholder="CVC or CVV"
              InputProps={{
                endAdornment: (
                  <Box component="span" sx={{ color: 'gray' }}>
                    <Box component="img" src={PadlockIcon} alt="Padlock" sx={{ height: 20 }} />
                  </Box>
                ),
              }}
            />
          </Box>
          <Button variant="contained" color="primary">
            Confirm Reservation
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Checkout;
