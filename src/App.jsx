//App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {CssBaseline} from "@mui/material";
import { Box } from "@mui/system";
import Schedules from "./pages/Schedules";
import TrainDetails from "./pages/TrainDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SearchBar from "./components/SearchBar";
import Home from "./pages/Home";

function App() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />
      <BrowserRouter>
        {/* <Header /> */}
        <Box sx={{ flex: "1 0 auto", backgroundColor: "#f5f5f5" }}>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/schedules" element={<Schedules />} />
            <Route path="/train-details" element={<TrainDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Box>
        {/* <Footer /> */}
      </BrowserRouter>
    </Box>
  );
}

export default App;
