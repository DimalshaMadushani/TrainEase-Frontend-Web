import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Grid, Box, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ height: '80px' }}>
      <Toolbar sx={{ height: '80px' }}>
        <Grid container alignItems="center">
          <Grid item xs={6}>
            <Typography variant="h6">
              TrainEase
            </Typography>
          </Grid>
          <Grid item xs={6} style={{ textAlign: 'right' }}>
            {isMobile ? (
              <>
                <IconButton
                  edge="end"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleMenuOpen}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleMenuClose} component="a" href="/">Home</MenuItem>
                  <MenuItem onClick={handleMenuClose} component="a" href="#aboutus">About us</MenuItem>
                  {currentUser ? (
                    <MenuItem onClick={handleMenuClose} component="a" href="/profile">Profile</MenuItem>
                  ) : (
                    <MenuItem onClick={handleMenuClose} component="a" href="/login">Login</MenuItem>
                  )}
                </Menu>
              </>
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: '80px' }}>
                <Button color="inherit" href="/">Home</Button>
                <Button color="inherit" href="/about-us">About us</Button>
                {currentUser ? (
                  <Button color="inherit" href="/profile">Profile</Button>
                ) : (
                  <Button color="inherit" href="/login">Login</Button>
                )}
              </Box>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
