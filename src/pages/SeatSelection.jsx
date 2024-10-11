import React from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Container,
  Snackbar,
  IconButton,
  Alert,
} from "@mui/material";
import SeatLayout from "../components/SeatLayout";
import TripSummary from "../components/TripSummary";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import TrainTwoToneIcon from "@mui/icons-material/TrainTwoTone";
import CloseIcon from "@mui/icons-material/Close";

export default function SeatSelection() {
  const [coaches, setCoaches] = useState([]);
  const location = useLocation();
  const [selectedSeatIds, setSelectedSeatIds] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { selectedClass, fromStop, toStop, date, schedule } = location.state;
  // console.log(location.state)
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  console.log("selected Seats:", selectedSeatIds);

  //this function will be called when a seat is selected, it will add or remove the seat from the selectedSeatIds array
  //basically it will toggle the seat selection
  //since we have a onClick event on the seat component, this function will be called when a seat is clicked
  const handleSeatSelection = (seatId) => {
    if (selectedSeatIds.includes(seatId)) {
      setSelectedSeatIds(selectedSeatIds.filter((seat) => seat !== seatId));
    } else {
      setSelectedSeatIds([...selectedSeatIds, seatId]);
    }
  };
  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const response = await axios.get("/api/search/coach-details", {
          params: {
            date,
            fromStopId: fromStop._id,
            toStopId: toStop._id,
            scheduleId: schedule._id,
            selectedClassId: selectedClass._id,
          },
        });
        console.log("response:", response.data);
        setCoaches(response.data.requestedClassCoaches);
      } catch (error) {
        console.error("Failed to fetch seats:", error);
      }
    };
    fetchSeats();
  }, [location.state]);

  // this function will call api call for holding the seats
  const goToCheckOut = async () => {
    if (selectedSeatIds.length === 0) {
      setOpenSnackbar(true);
      return;
    } else {
      const response = await axios.post("/api/booking/holdSeats", {
        userId: currentUser._id,
        scheduleId: schedule._id,
        fromStopId: fromStop._id,
        toStopId: toStop._id,
        selectedSeatIds,
        selectedClassId: selectedClass._id,
        date,
      });
      console.log("response:", response.data);
      if (response.status === 200) {
        navigate("/checkout", {
          state: {
            selectedSeatIds,
            selectedClass,
            fromStop,
            toStop,
            date,
            schedule,
            selectedSeatCount: selectedSeatIds.length,
            trainName: schedule.trainRef.name,
            bookingId: response.data.bookingId,
            expireTime: response.data.expireTime,
          },
          replace: true,
        });
      }
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Container>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity="secondary"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Please select at least one seat
        </Alert>
      </Snackbar>
      <Box>
        <Typography variant="h4" textAlign="center" marginTop="20px">
          Select Your Seats
        </Typography>
      </Box>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="flex-start"
        my={2}
      >
        <Grid item xs={12} md={6}>
          {/* <Box
            display="flex"
            flexDirection="column"
            height="600px"
            padding="20px"
            bgcolor="#f5f5f5"
            alignItems={{ xs: "center", lg: "flex-start" }}
          > */}
            <Box
              display="flex"
              flexDirection="column"
              overflow="scroll"
              height="500px"
              maxWidth={470}
              border="1px solid #1C2938"
              padding={3}
              borderRadius="8px"
            >
              {coaches.map((coach) => (
                <Box key={coach._id} marginBottom={4}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <TrainTwoToneIcon sx={{ fontSize: 40 }} />
                    <Typography variant="h6">
                      {" "}
                      Coach No: {coach.coachNumber}
                    </Typography>
                  </Box>
                  <SeatLayout
                    seats={coach.seats}
                    bookedSeats={coach.alreadyBookedSeats}
                    selectedSeats={selectedSeatIds}
                    onSeatSelection={handleSeatSelection}
                  />
                </Box>
              ))}
            </Box>
          {/* </Box> */}
        </Grid>
        <Grid item xs={12} lg={6} mx={{ xs: 0, sm: 10, md: 0 }}>
          <TripSummary
            selectedClass={selectedClass}
            fromStop={fromStop}
            toStop={toStop}
            date={date}
            selectedSeatCount={selectedSeatIds.length}
            trainName={schedule.trainRef.name}
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: { xs: "center", lg: "flex-end" },
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              // sx={{ my: "5px", mx: "40px" }} // adjusted marginLeft to marginRight
              onClick={goToCheckOut}
              sx={{ mt: 2 , mx:8 }}
              data-testid="checkout-button"
            >
              CheckOut
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
