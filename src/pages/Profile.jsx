import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    TextField,
    RadioGroup,
    FormControlLabel,
    Radio,
    Button,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    CardActions,
    Paper,
    Box,
    Snackbar,
    Alert
} from '@mui/material';
import { useSelector } from 'react-redux';

const Profile = () => {
    const { currentUser, error, loading } = useSelector((state) => state.user);

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        phoneNumber: '',
        gender: '',
        bookingHistory: []
    });

    const [showBookingHistory, setShowBookingHistory] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    // Use effect to set form data from currentUser
    useEffect(() => {
        if (currentUser) {
            console.log("Setting form data with currentUser:", currentUser); // Debugging log
            setFormData({
                username: currentUser.username || '',
                email: currentUser.email || '',
                firstName: currentUser.firstName || '',
                lastName: currentUser.lastName || '',
                phoneNumber: currentUser.phone || '',
                gender: currentUser.gender || '',
                bookingHistory: currentUser.bookingHistory || [] // Ensure bookingHistory is provided
            });
        }
    }, [currentUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleEditProfile = () => {
        axios.put(`http://localhost:5000/profile/${formData.username}`, formData)
            .then(response => {
                setSnackbar({ open: true, message: 'Profile updated successfully', severity: 'success' });
                console.log(response.data);
            })
            .catch(error => {
                setSnackbar({ open: true, message: 'Error updating profile', severity: 'error' });
                console.log(error);
            });
    };

    const handleShowBookingHistory = () => {
        setShowBookingHistory(!showBookingHistory);
    };

    const handleCancelBooking = (bookingName) => {
        const updatedBookingHistory = formData.bookingHistory.filter(booking => booking.name !== bookingName);
        setFormData({ ...formData, bookingHistory: updatedBookingHistory });
        axios.put(`http://localhost:5000/profile/${formData.username}`, { ...formData, bookingHistory: updatedBookingHistory })
            .then(response => console.log(response.data))
            .catch(error => console.log(error));
    };

    const isBeforeToday = (dateString) => {
        const today = new Date();
        const bookingDate = new Date(dateString);
        return bookingDate < today;
    };

    const sortedBookingHistory = formData.bookingHistory.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA; // Sort in descending order
    });

    // Log the form data for debugging
    console.log("Form data state:", formData);

    return (
        <Container>
            <Box display="flex" justifyContent="space-between" alignItems="center" marginTop="50px">
                <Typography variant="h4" component="h1" gutterBottom>
                    Profile
                </Typography>
                <Button variant="contained" color="primary">
                    Sign out
                </Button>
            </Box>
            <Card sx={{ maxWidth: 600, margin: 'auto', marginLeft: "8px" }}>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="First Name"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Last Name"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Password"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Phone Number"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} display="flex">
                            <Typography variant="body1" marginTop="10px">Gender:</Typography>
                            <RadioGroup
                                row
                                sx={{ marginLeft: '10px' }}
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                            >
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                            </RadioGroup>
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleEditProfile}
                    >
                        Edit Profile
                    </Button>
                </CardActions>
            </Card>
            <Box mt={4}>
                <Button
                    variant="outlined"
                    fullWidth
                    onClick={handleShowBookingHistory}
                >
                    {showBookingHistory ? 'Hide Booking History' : 'Show Booking History'}
                </Button>
            </Box>
            {showBookingHistory && (
                <Box mt={2}>
                    {sortedBookingHistory.map((booking, index) => (
                        <Paper key={index} elevation={3} sx={{ display: 'flex', justifyContent: 'space-between', padding: '16px', mb: 2 }}>
                            <Box>
                                <Typography variant="body1">{booking.name}</Typography>
                                <Typography variant="body2">{new Date(booking.date).toLocaleString()}</Typography>
                            </Box>
                            <Box>
                                {isBeforeToday(booking.date) ? (
                                    <Typography variant="body2" color="textSecondary">Completed</Typography>
                                ) : (
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleCancelBooking(booking.name)}
                                    >
                                        Cancel
                                    </Button>
                                )}
                            </Box>
                        </Paper>
                    ))}
                </Box>
            )}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            >
                <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Profile;
