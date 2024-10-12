//App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { Box } from "@mui/system";
import Schedules from "./pages/Schedules";
import TrainDetails from "./pages/TrainDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Header from "./components/Header";
import Profile from "./pages/Profile";
import SeatSelection from "./pages/SeatSelection";
import CheckOut from "./pages/CheckOut";
import EditProfile from "./pages/EditProfile";
import Footer from "./components/Footer";
import AboutUs from "./pages/AboutUs";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import PrivateRoute from "./components/PrivateRoute";
import theme from "./utils/theme";
import { ThemeProvider } from "@mui/material/styles";
import TrainEase from "./pages/TrainEase";

// Import Stripe Elements
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Initialize Stripe with public key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <CssBaseline />
        <BrowserRouter>
          <Header />
          <Box sx={{ flex: "1 0 auto", backgroundColor: "#F4F6F6" }}>
            <Routes>
              {/* <Route path="/" element={<TrainEase/>} /> */}
              <Route path="/" element={<Home />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/schedules" element={<Schedules />} />

              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />
              
              {/* <Route element={<PrivateRoute />} > */}
                <Route path="/train-details" element={<TrainDetails />} />
                <Route path="/seat-selection" element={<SeatSelection />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/edit-profile" element={<EditProfile />} />
                
                {/* Wrap Checkout component in the Elements provider */}
                <Route 
                  path="/checkout" 
                  element={
                    <Elements stripe={stripePromise}>
                      <CheckOut />
                    </Elements>
                  } 
                />
              {/* </Route> */}
            </Routes>
          </Box>
          <Footer />
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
}

export default App;
