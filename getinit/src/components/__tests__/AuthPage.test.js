import React from 'react';
import { render, screen, fireEvent} from '@testing-library/react';
import {  MemoryRouter } from 'react-router-dom';
import  configureMockStore  from 'redux-mock-store';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import AuthPage from '../../pages/AuthPage';

describe("AuthPage", ()=> {
    test('displays sign in form by default', () => {
        const mockStore = configureMockStore();

        const initialState = {
            offerModal: {
              isSnackbarOpen: false,
            },
        };
        
        const store = mockStore(initialState);
        
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <AuthPage />
                </MemoryRouter>
            </Provider>
            
        );

        expect(screen.getByLabelText('E-mail*')).toBeInTheDocument();
        expect(screen.getByLabelText('Password*')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
    });

    test('displays sign up form after clicking the "Sign Up!" link', () => {
        const mockStore = configureMockStore();
        const initialState = {
            offerModal: {
              isSnackbarOpen: false,
            },
        };
        const store = mockStore(initialState); 
        render(
          <Provider store={store}> 
            <MemoryRouter>
              <AuthPage />
            </MemoryRouter>
          </Provider>
        );
        const signUpLink = screen.getByTestId("auth-mode-text");
        fireEvent.click(signUpLink);
        expect(screen.getByLabelText('E-mail*')).toBeInTheDocument();
        expect(screen.getByLabelText('Password*')).toBeInTheDocument();
        expect(screen.getByLabelText('First name*')).toBeInTheDocument();
        expect(screen.getByLabelText('Last name*')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Sign Up' })).toBeInTheDocument();
      });

      test('should switch between authentication modes', () => {
        const mockStore = configureMockStore();
        const initialState = {
            offerModal: {
              isSnackbarOpen: false,
            },
        };
        const store = mockStore(initialState); 
        render(
            <MemoryRouter>
                <Provider store={store}>
                    <AuthPage />
                </Provider>
            </MemoryRouter>
        );
        //sign in mode
        const signInForm = screen.getByLabelText('E-mail*');
        expect(signInForm).toBeInTheDocument();
        //change
        const changeAuthMode = screen.getByTestId('auth-mode-text');
        userEvent.click(changeAuthMode);
        //signup mode
        const signUpForm = screen.getByLabelText('First name*');
        expect(signUpForm).toBeInTheDocument();
        //change
        userEvent.click(changeAuthMode);
        expect(signInForm).toBeInTheDocument();
      });
})