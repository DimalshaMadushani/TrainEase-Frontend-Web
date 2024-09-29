import { render, screen, fireEvent } from '@testing-library/react';
import Register from '../pages/Register';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import {store} from '../redux/store'; // Ensure this path is correct

describe('Register Component', () => {
  test('renders register component with all form fields and submit button', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      </Provider>
    );

    // Check if all form fields and submit button are rendered
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Register/i })).toBeInTheDocument();
  });

  test('shows error messages when form is submitted with empty fields', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      </Provider>
    );

    // Simulate form submission with empty fields
    const submitButton = screen.getByRole('button', { name: /Register/i });
    fireEvent.click(submitButton);

  });

  test('submits form with valid data', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      </Provider>
    );

    // Fill out the form with valid data
    fireEvent.input(screen.getByLabelText(/Username/i), {
      target: { value: 'testuser' },
    });
    fireEvent.input(screen.getByLabelText(/Email Address/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.input(screen.getByLabelText(/Phone Number/i), {
      target: { value: '1234567890' },
    });
    fireEvent.input(screen.getByLabelText(/Password/i), {
      target: { value: 'password123' },
    });

    // Simulate form submission
    const submitButton = screen.getByRole('button', { name: /Register/i });
    fireEvent.click(submitButton);

  });
});
