import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
export default function SubCustomerDetails({ index }) {
  return (
    <>
      <Typography variant="h7" sx={{ marginRight: "auto",paddingBottom:3, marginLeft:3}}>
        {`Passenger ${index + 2}`}
      </Typography>
      <Container sx={{ display: "flex", gap: 2,flexDirection: { xs: "column", sm: "row" }, }}>
        <TextField label="Name" name="name" required sx={{ flex: 2 }} size="small"/>
        <TextField
        size="small"
          label="Age"
          name="age"
          type="number"
          required
          inputProps={{min:1}}
          sx={{ flex: 1 }}
        />
        <FormControl sx={{ flex: 1 }}>
          <InputLabel id="gender" size="small">Gender</InputLabel>
          <Select labelId="gender" name="gender" label="Gender" required size="small">
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>

          
        </FormControl>
      </Container>
    </>
  );
}
