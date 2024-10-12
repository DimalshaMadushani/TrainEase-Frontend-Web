import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Dialog,
  Box,
  Paper,
} from "@mui/material";
import { useLocation } from "react-router-dom"; // For getting the data from the previous page, this is a hook
import LoginPopUp from "./LoginPopUp";
import SearchBar from "../components/SearchBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import TrainIcon from "@mui/icons-material/Train";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Schedules() {
  //this location is used to get the data from the previous page
  const location = useLocation();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [schedules, setSchedules] = useState([]);
  const [stations, setStations] = useState([]);

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  // console.log(schedules)

  //here this full schedule refers to [scheduleObj, fromStopObj, toStopObj]
  const handleOpen = (fullSchedule) => {
    if (!currentUser) {
      setOpen(true);
      return;
    }
    // You can pass the schedule ID to the TrainDetails page using the location state
    navigate("/train-details", { state: { fullSchedule, date } });
    // console.log("full schedule from schedules page ",fullSchedule);
  };

  const handleClose = () => setOpen(false);

  // Use useEffect to set the initial state from the navigation state and show the schedules
  useEffect(() => {
    if (location.state) {
      const { schedules, searchParams } = location.state;
      setSchedules(schedules);
      setFrom(searchParams.from);
      setTo(searchParams.to);
      setDate(searchParams.date);
    }
  }, [location.state]);

  // Fetch stations from the backend to show in the search bar
  useEffect(() => {
    async function fetchStations() {
      try {
        const response = await axios.get(
          "https://trainease-backend.onrender.com/api/search/stations"
        );
        if (response.status === 200) {
          const resStations = response.data.map((station) => ({
            label: station.name,
          }));
          setStations(resStations);
        } else {
          throw new Error("Failed to fetch stations");
        }
      } catch (error) {
        console.error("Failed to fetch stations:", error);
        alert(
          "Failed to load stations: " +
            (error.response && error.response.data.message
              ? error.response.data.message
              : error.message)
        );
      }
    }
    fetchStations();
  }, []);

  // console.log(schedules)

  // console.log("schedule" ,schedules, "from",from,"to", to, "date",date)
  // In Home component
  const handleSearch = async () => {
    if (!from || !to || !date) {
      alert("Please fill all fields");
      return;
    }
    try {
      const response = await axios.get(
        `https://trainease-backend.onrender.com/api/search/schedules`,
        {
          params: { fromName: from, toName: to, date: date },
        }
      );
      if (response.status === 200) {
        console.log("response.data", response.data);
        setSchedules(response.data);
      } else {
        throw new Error("Failed to fetch schedules");
      }
    } catch (error) {
      console.error("Failed to fetch schedules:", error);
      alert(
        "Failed to load schedules: " +
          (error.response && error.response.data.message
            ? error.response.data.message
            : error.message)
      );
    }
  };
  // useEffect(() => {
  //   console.log("Schedule IDs:", schedules.map(schedule => schedule.schedule._id));
  // }, [schedules]);

  const theme = useTheme();
  const isMediumOrBelow = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Container>
      <Box sx={{ my: 3 }}>
        <SearchBar
          stations={stations}
          onSearch={handleSearch} // You need to implement or adjust handleSearch for Schedules page
          setFrom={setFrom}
          setTo={setTo}
          setDate={setDate}
          initialSearchParams={{ from, to, date }}
        />
      </Box>

      <Grid container spacing={2} style={{ marginTop: "20px", mb: 2 }}>
        {schedules.length === 0 ? (
          <Box sx={{ width: "100%" }}>
            <Typography
              variant="h4"
              align="center"
              sx={{ color: "text.secondary" }}
            >
              No schedules Available
            </Typography>
          </Box>
        ) : (
          schedules.map((schedule) => (
            <Grid item xs={12} key={schedule.schedule._id}>
              <Card onClick={() => handleOpen(schedule)}>
                <CardContent>
                  <Grid container alignItems="center">
                    <Grid item xs={4}>
                      <Box display="flex" alignItems="center">
                        <TrainIcon />
                        <Typography
                          variant="h6"
                          sx={{
                            ml: 1,
                            fontSize: isMediumOrBelow ? "1rem" : "1.25rem",
                          }}
                        >
                          {schedule.schedule.trainRef.name}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={4} textAlign="center">
                      <Typography
                        variant="h6"
                        sx={{ fontSize: isMediumOrBelow ? "1rem" : "1.25rem" }}
                      >
                        {schedule.fromStop.departureTime} ➔{" "}
                        {schedule.toStop.arrivalTime}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      textAlign="right"
                      display="flex"
                      justifyContent="right"
                    >
                      <Paper
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          padding: "10px",
                          width: "fit-content",
                          backgroundColor: "#F4F6F6",
                          boxShadow: 2,
                          borderRadius: 1,
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: isMediumOrBelow ? "0.5rem" : "0.75rem",
                          }}
                        >
                          from
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{
                            fontSize: isMediumOrBelow ? "1rem" : "1.25rem",
                          }}
                        >
                          LKR {schedule.toStop.price}
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <LoginPopUp onClose={handleClose} />
      </Dialog>
    </Container>
  );
}
