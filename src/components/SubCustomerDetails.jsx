import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
export default function SubCustomerDetails() {
  return (
    <>
      <Container sx={{ display: "flex", gap: 2 }}>
        <TextField label="Name" name="name" required />
        <TextField label="Age" name="age" type="number" required  inputProps={{ min: 0 }}/>
        <FormControl sx={{width:'33%'}}>
          <InputLabel>Gender</InputLabel>
          <Select name="gender" required>
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
