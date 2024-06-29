import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Container,
} from "@mui/material";
import { useState } from "react";
import SubCustomerDetails from "../components/SubCustomerDetails";

export default function PassengerDetails() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };

  return (
    <div>
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        width: '100vw',
        height: "100vh",
        padding: 0,
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          margin: "auto",
          padding: 4,
          // boxShadow: 3,
        }}
      >
        <Container sx={{ display: "flex", gap: 2 }}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            label="Age"
            name="age"
            type="number"
            inputProps={{ min: 0 }}
            value={formData.age}
            onChange={handleChange}
            required
          />
        </Container>
        <SubCustomerDetails />
        <SubCustomerDetails />
        <SubCustomerDetails />
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
        <Button color="success" variant="contained" sx={{marginLeft:'auto'}}>Checkout</Button>
      </Box>
      
    </Container>
    </div>
  );

}