import React from 'react';
import { Container, Typography, Paper, Grid, Box } from '@mui/material';

const AboutUs = () => {
  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Paper elevation={3} style={{ padding: '2rem' }}>
        <Typography variant="h4" align="center" gutterBottom>
          About Train Ease
        </Typography>
        <Typography variant="body1" paragraph>
          Train Ease is a comprehensive and user-friendly train booking system designed for seamless online
          ticket reservations. Accessible via both web and mobile platforms, our system allows users to easily view
          train schedules, book tickets, select seats, and calculate fares with ease. We’ve integrated secure
          payment processing to ensure your transactions are handled efficiently and securely.
        </Typography>
        <Typography variant="body1" paragraph>
          Our platform manages all aspects of passenger details, facilitates smooth reservations and cancellations,
          and provides instant booking confirmations and e-tickets. Train Ease offers real-time alerts for delays and
          platform changes, ensuring you stay informed at all times.
        </Typography>
        <Typography variant="body1" paragraph>
          In addition to these features, Train Ease is equipped with a robust reporting and analytics module, allowing
          for deep insights and data-driven decisions. Our system also integrates seamlessly with other systems, providing
          a comprehensive user management and authentication experience.
        </Typography>
      </Paper>

      <Box mt={4}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} style={{ padding: '1rem' }}>
              <Typography variant="h6" gutterBottom>
                Our Vision
              </Typography>
              <Typography variant="body2">
                To revolutionize the train booking experience by providing a modern, efficient, and user-friendly
                platform that meets the needs of all passengers.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} style={{ padding: '1rem' }}>
              <Typography variant="h6" gutterBottom>
                Our Mission
              </Typography>
              <Typography variant="body2">
                To make train travel booking simple, secure, and accessible to everyone through innovative technology
                and exceptional service.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AboutUs;
