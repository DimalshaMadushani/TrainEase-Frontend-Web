
# TrainEase - Train Booking Web Application

TrainEase is a user-friendly web application that simplifies train travel. It allows users to effortlessly search for trains, book tickets, and manage their profiles. With customizable options for class and seat selection, TrainEase ensures a comfortable journey. Real-time notifications keep users informed about booking confirmations, cancellations, and shedule updates, providing a smooth and reliable travel experience.


<div style="display: flex; flex-wrap: wrap; justify-content: space-around;">
    <img src="./src/assets/Home.PNG" alt="Home Screen"/>
</div>

## Features

- **User Authentication**
  - Secure login and registration.
  - Password recovery via email.

- **Ticket Booking**
  - Select starting point, destination, and travel date.
  - View and select available trains.

- **Class and Seat Selection**
  - Choose travel class (First, Second, Third).
  - Interactive seat layout with available and booked seats.

- **Payment Processing**
  - Secure payment options.
  - E-ticket confirmation via email.

- **Profile Management**
  - Edit personal profile details.

- **Booking History**
  - Access past bookings.

- **Booking Cancellations**
  - Cancel bookings before travel date.

- **Real-Time Notifications:**
  - Receive timely updates regarding booking confirmations, cancellations, and shedule updates.

- **Logout Option**
  - Securely sign out to protect user data.


## Tech Stack

- **Frontend:** 
  - [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
  - [Vite](https://vitejs.dev/) - A build tool that improves development experience and performance.

- **Backend:** 
  - [Node.js](https://nodejs.org/) - JavaScript runtime built on Chrome's V8 JavaScript engine.
  - [Express](https://expressjs.com/) - A minimal and flexible Node.js web application framework.

- **Database:** 
  - [MongoDB](https://www.mongodb.com/) - A NoSQL database for flexible document storage.

- **State Management:** 
  - [Redux](https://redux.js.org/) - A predictable state container for JavaScript apps.


## Prerequisites

- **Node.js:** [Download Node.js](https://nodejs.org/) and install it on your machine.
- **npm:** Node Package Manager (npm) is included with Node.js.
- **MongoDB:** Ensure you have MongoDB is installed and running.

## Installation
1. Clone the repository

    ```bash
   git clone https://github.com/DimalshaMadushani/TrainEase-Frontend-Web.git

   cd TrainEase-Frontend-Web
2. Install the dependencies

    ```bash
    yarn install
    OR
   npm install
3. Create an .env file to store environment variables

    ```bash
   VITE_HOST="your-ipv4-address"
   VITE_EMAIL_VALIDATION_API_KEY="5cdac20be06e417397bd927015ae8448"
   VITE_STRIPE_PUBLIC_KEY="pk_test_51Q8k6WIqn2MGjXIL8XDtenhDIaTCstp6lNwrY1qtyU79fcmeKcyxvzI7CUKz3ge4CLakDeuXEYo5QuUmIXkmn9FO00xPqC56kW"

4. Start the development server

    ```
    npm run dev
    ```



## Testing

We use Cypress for User Interface testing. You can run tests using

```
npx cypress open
```

## Deployment

We built our web application on [Render](https://render.com/) plaform. You can access the live application at [TrainEase](https://trainease-frontend-web.onrender.com).

<!-- ```
eas build --platform ios/android
``` -->
<!-- ## Contribution

Contributions are welcome! If you find a bug or want to suggest a feature, feel free to open an issue or submit a pull request. -->

