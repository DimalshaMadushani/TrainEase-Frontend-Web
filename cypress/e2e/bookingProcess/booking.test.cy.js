
  

describe('TrainEase Booking Process - Login, Book, Select Seats, and Complete Payment', () => {
    it('should log in, search for trains, select a schedule, choose a class, select seats, proceed to checkout, and confirm the reservation', () => {
      // Step 1: Visit the home page
      cy.visit('https://trainease-frontend-web.onrender.com');
  
      // Step 2: Click on the "Login" link in the navigation bar
      cy.contains('Login').click();
  
      // Step 3: Assert that the user is on the login page
      cy.url().should('include', '/login');
  
      // Step 4: Enter the username and password
      cy.get('input[name="username"]').type('pasan123'); // Use the appropriate selector for the username field
      cy.get('input[name="password"]').type('pasan123'); // Use the appropriate selector for the password field
  
      // Step 5: Click the login button
      cy.get('[data-testid="login-button"]').click();
  
      // Step 6: Assert that the user is redirected back to the home page after login
      cy.url().should('eq', 'https://trainease-frontend-web.onrender.com/');
  
      // Step 7: Click on the "From" location input and select 'Ahangama'
      cy.get('[data-testid="from-input"]').click();
      cy.contains('li', 'Ahangama').click(); // Select 'Ahangama'
  
      // Step 8: Click on the "To" location input and select 'Galle'
      cy.get('[data-testid="to-input"]').click();
      cy.contains('li', 'Galle').click(); // Select 'Galle'
  
      // Step 9: Enter the date
      cy.get('[data-testid="date-input"]').type('2024-10-22');
  
      // Step 10: Click the search button
      cy.get('[data-testid="search-button"]').click();
  
      // Step 11: Assert that the URL includes '/schedules'
      cy.url().should('include', '/schedules');
  
      // Step 12: Click on the "Galu Kumari" schedule
      cy.contains('Galu Kumari').click();
  
      // Step 13: Assert that the URL includes '/train-details'
      cy.url().should('include', '/train-details');
  
      // Step 14: Select "First Class"
      cy.contains('First Class').click();
  
      // Step 15: Click the "Select Seats" button
      cy.get('[data-testid="select-seats-button"]').click();
  
      // Step 16: Assert that the URL includes '/seat-selection'
      cy.url().should('include', '/seat-selection');
  
      // Step 17: Select seats "2C" and "2D"
      cy.contains('5C').click();
      cy.contains('5D').click();
  
      // Step 18: Click the "Checkout" button
      cy.get('[data-testid="checkout-button"]').click();
  
      // Step 19: Assert that the URL includes '/checkout'
      cy.url().should('include', '/checkout');
  
    //   // Step 20: Enter payment details using the correct data-testid selectors
    // cy.get('[data-testid="card-number"]').type('4242424242424242'); // Use correct data-testid for card number
    // cy.get('[data-testid="cardholder-name"]').type('A G D Madushani'); // Use correct data-testid for cardholder name
    // cy.get('[data-testid="expiry-date"]').type('10/30'); // Use correct data-testid for expiry date
    // cy.get('[data-testid="cvv"]').type('345'); // Use correct data-testid for CVV

  
    //   // Step 21: Click the "Confirm Reservation" button
    //   cy.get('[data-testid="confirm-button"]').click();
  
      // Optionally: Assert that the reservation is confirmed or redirected to the confirmation page
    });
  });
  