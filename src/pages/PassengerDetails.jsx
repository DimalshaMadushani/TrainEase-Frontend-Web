import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Container,
  Typography,
  Card,
  CardContent
  
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
    <Container
      sx={{
        display: "flex",
        position: "relative",
        justifyContent: "center",
        alignContent: "center",
        minHeight: "100vh",
        marginLeft: 0
      }}
    ><Card sx={{ width: '80%', maxWidth: 600, mt: 4 }}>
        <CardContent sx={{ padding: 0 }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{  position: "absolute", marginBottom: 4 ,marginLeft:5,marginTop:4}}
       
      >
        Passenger Details
      </Typography>
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
          padding: 2,
          width: "100%",
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            marginRight: "auto",
            marginTop: 10,
            marginBottom: -1,
            marginLeft: 3
            
          }}
        >
          Passenger 1
        </Typography>
        <Container
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            marginLeft:0
          }}
        >
          <TextField
          size="small"
            sx={{ flex: 2}}
            label="First Name"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            required
          />
          <TextField
          size="small"
            sx={{ flex: 2 }}
            label="Last Name"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            required
          />
          <TextField
          size="small"
            sx={{ flex: 1 }}
            inputProps={{min:1}}
            label="Age"
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </Container>
        
        <Box sx={{width:'100%',marginTop:2}}>
          {Array.from({ length: 3 }).map((_, index) => (
            <SubCustomerDetails key={index} index={index} />
          ))}
        </Box>

        <Button type="submit" variant="contained" color="primary"  sx={{ width: { xs: '50%', sm: '25%' }, marginTop: 2 }}>
          Save
        </Button>
        <Button color="success" size="small" width= '50%' variant="contained" sx={{ marginLeft: "auto" }}>
          Checkout
        </Button>
        
      </Box>
      </CardContent>
      </Card>
    </Container>
  );
}
