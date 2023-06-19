import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useNavigate } from 'react-router-dom';
import ButtonsContainer from '../companyPanel/ButtonsContainer';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

describe('Buttons Container', () => {
  test('renders "Add manual payment" button for Admin role', () => {
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);

    const userInfo = {
      role: 'Admin',
    };

    render(<ButtonsContainer userInfo={userInfo} />);
    const addPaymentButton = screen.getByRole('button-add');

    expect(addPaymentButton).toBeInTheDocument();

    userEvent.click(addPaymentButton);
    expect(mockNavigate).toHaveBeenCalledWith('/manualPayment', {
      state: {
        userRole: 'Admin',
      },
    });
  });
  
  test('renders "You Job Applications" button', () => {
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);

    const userInfo = {
      role: 'UserAccount',
    };

    render(<ButtonsContainer userInfo={userInfo} />);
    const viewApplicationsButton = screen.getByRole('button-applications');

    expect(viewApplicationsButton).toBeInTheDocument();

    userEvent.click(viewApplicationsButton);
    expect(mockNavigate).toHaveBeenCalledWith('/userApplications', {
        state: {
            userRole: 'UserAccount',
        }
    });
  });

  test('renders "Manage Your Offers(employee)" button', () => {
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);

    const userInfo = {
      role: 'EmployeeAccount',
    };

    render(<ButtonsContainer userInfo={userInfo} />);
    const manageYourOffersEmployeeButton = screen.getByRole('button-offers-employee');

    expect(manageYourOffersEmployeeButton).toBeInTheDocument();

    userEvent.click(manageYourOffersEmployeeButton);
    expect(mockNavigate).toHaveBeenCalledWith('/userOffers', {
        state: {
            userRole: 'EmployeeAccount',
        }
    });
  });

  test('renders "Manage Your Offers(manager)" button', () => {
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);

    const userInfo = {
      role: 'ManagerCompanyAccount',
    };

    render(<ButtonsContainer userInfo={userInfo} />);
    const manageYourOffersManagerButton = screen.getByRole('button-offers-manager');

    expect(manageYourOffersManagerButton).toBeInTheDocument();

    userEvent.click(manageYourOffersManagerButton);
    expect(mockNavigate).toHaveBeenCalledWith('/userOffers', {
        state: {
            userRole: 'ManagerCompanyAccount',
        }
    });
  });
  test('renders "Manage Your Company Accounts" button', () => {
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);

    const userInfo = {
      role: 'ManagerCompanyAccount',
    };

    render(<ButtonsContainer userInfo={userInfo} />);
    const manageYourAccountsButton = screen.getByRole('button-accounts');

    expect(manageYourAccountsButton).toBeInTheDocument();

    userEvent.click(manageYourAccountsButton);
    expect(mockNavigate).toHaveBeenCalledWith('/companyAccounts');
  });

  test('renders "Edit account info" button', () => {
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);

    const userInfo = {
      role: 'UserAccount',
    };

    render(<ButtonsContainer userInfo={userInfo} />);
    const editInfoButton = screen.getByRole('button-edit');

    expect(editInfoButton).toBeInTheDocument();

    userEvent.click(editInfoButton);
    expect(mockNavigate).toHaveBeenCalledWith('/editInfo');
  });

  

  test('renders "Delete your account" button', () => {
    render(<ButtonsContainer userInfo={{}} />);
    const deleteAccountButton = screen.getByRole('button-delete');

    expect(deleteAccountButton).toBeInTheDocument();
  });
});
