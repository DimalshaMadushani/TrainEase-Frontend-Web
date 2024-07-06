import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { Box } from "@mui/system";
import Schedules from "./pages/Schedules";
import TrainDetails from "./pages/TrainDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SearchBar from "./components/SearchBar";
import Home from "./pages/Home";
import SeatLayout1 from "./pages/SeatLayout1";
import SeatLayout2 from "./pages/SeatLayout2";
import FirstClass from "./pages/FirstClass";
import SecondClass from "./pages/SecondClass";
import ThirdClass from "./pages/ThirdClass";
import Checkout from "./pages/Checkout";
import SuccessPopup from "./Popups/PaymentSuccessfull";
import Profile from "./pages/Profile";
//import SeatSelection from "./pages/SeatSelection";
//import EditProfile from "./pages/EditProfile";
//import BookingHistory from "./components/BookingHistory";

function App() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />
  
        <Box sx={{ flex: "1 0 auto", backgroundColor: "#f5f5f5" }}>
        
            
          {/* <Checkout /> */}
          <Login />
        </Box>
    </Box>
  );
}

export default App;
