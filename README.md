
# TrainEase - Train Booking Web Application

The TrainEase web application allows users to effortlessly search for trains, book tickets, manage their profiles, and receive real-time notifications, ensuring a smooth and reliable train travel experience.


<div style="display: flex; flex-wrap: wrap; justify-content: space-around;">
    <img src="./src/assets/Home.png" alt="Home Screen"/>
</div>

## Features

- **Train Search**: Search for trains by selecting the source and destination stations, along with the desired date and time.
- **Seat Booking**: Select and book seats in different coach classes on user's preference.
- **Booking History**: View past and upcoming bookings, with options to cancel.
- **Notifications**: Receive push notifications for booking confirmations, cancellations, and updates.
- **Profile Management**: Update user profile.
- **Payment Gateway**: The app's payment gateway is implemented using Stripe, ensuring secure and seamless transactions for bookings.


## Tech Stack

- **React**: This application is built using React for efficient rendering through its virtual DOM ensuring a fast, scalable, and user-friendly experience.
- **Vite**: To improve the development experience and performance of the web application.
- **Redux**: For state management.
- **Axios**: For API calls.


## Prerequisites

- Node.js (v14 or above)

## Installation
1. Clone the repository:

    ```bash
   git clone https://github.com/DimalshaMadushani/TrainEase-Frontend-Web.git

   cd TrainEase-Frontend-Web
2. Install the dependencies:

    ```bash
    yarn install
    OR
   npm install
3. Create an .env file to store environment variables:

    ```bash
   VITE_HOST="your-ipv4-address"
4. Start the development server:

    ```
    npm run dev
    ```



## Testing

We use Cypress for User Interface testing. You can run tests using:

```
npx cypress run
```
<!-- We use K6 for load testing the app's functionality. You can run tests using:
```
k6 run script.js
``` -->

## Deployment

We built our web application on render plaform:

<!-- ```
eas build --platform ios/android
``` -->
<!-- ## Contribution

Contributions are welcome! If you find a bug or want to suggest a feature, feel free to open an issue or submit a pull request. -->

