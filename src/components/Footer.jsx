import React from "react";
import Container from "@mui/material/Container";
import { Grid, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import PhoneIcon from "@mui/icons-material/Phone";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const theme = useTheme();
  const isMediumOrBelow = useMediaQuery(theme.breakpoints.down('md'));

  const styles = {
    footer: {
      padding: "24px 0",
      backgroundColor: '#1C2938',
      color: "white",
      height: isMediumOrBelow ? 'auto' : '80px',
      // marginTop: "auto",
      // position: "fixed",
      // bottom: 0
    },
  };

  return (
    <footer style={styles.footer}>
      <Container maxWidth="lg">
        <Grid
          container
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={12} sm={4}>
            <Box
              sx={{
                display: { xs: "flex", md: "block" },
                justifyContent: { xs: "center", md: "start" },
              }}
            >
              {/* <Logo /> */}
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="body2" sx={{ mb: 1, opacity: "0.7" }}>
                Copyright &copy; {currentYear}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                All rights reserved
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{
              display: "flex",
              justifyContent: { xs: "center", md: "end" },
            }}
          >
            <Box>
              <IconButton color="inherit" href="#">
                <PhoneIcon />
              </IconButton>
              <IconButton color="inherit" href="#">
                <FacebookIcon />
              </IconButton>
              <IconButton color="inherit" href="#">
                <InstagramIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
