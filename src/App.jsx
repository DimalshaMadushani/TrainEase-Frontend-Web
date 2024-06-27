import React, { useState } from 'react';
import { Button } from '@mui/material';
import { Schedule } from "@mui/icons-material";
import Schedules from "./Components/Schedules";
import RouteandClass from "./Components/RouteandClass";
import LoginPopup from "./Components/LoginPopup";
import SignupPopup from "./Components/SignupPopup";

function App() {
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);

  const handleOpenLogin = () => setOpenLogin(true);
  const handleCloseLogin = () => setOpenLogin(false);

  const handleOpenSignup = () => setOpenSignup(true);
  const handleCloseSignup = () => setOpenSignup(false);

  return (
    <>
      <h1>TrainEase</h1>
      {/* <Schedules />
      <RouteandClass/> */}
      <Button variant="contained" color="primary" onClick={handleOpenLogin}>
        Login
      </Button>
      <Button variant="contained" color="secondary" onClick={handleOpenSignup}>
        Sign Up
      </Button>
      <LoginPopup open={openLogin} handleClose={handleCloseLogin} />
      <SignupPopup open={openSignup} handleClose={handleCloseSignup} />
    </>
  );
}

export default App;
