import { render, screen } from '@testing-library/react';
import Login from '../pages/Login';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import {store} from '../redux/store';



describe('Login Component', () => {
    test('renders login component with all the content', () => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Login />
          </BrowserRouter>
        </Provider>
      );
    });
  });
