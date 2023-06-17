import React from 'react';
import { render, screen } from '@testing-library/react';
import AccountInfo from '../companyPanel/AccountInfo';

describe('AccountInfo', () => {
  test('renders user information correctly', () => {
    const userInfo = {
      firstName: 'John',
      lastName: 'Doe',
      role: 'ManagerCompanyAccount',
      mail: 'example@example.com',
    };

    render(<AccountInfo userInfo={userInfo} />);
    
    expect(screen.getByText(`Hi ${userInfo.firstName} ${userInfo.lastName}!`)).toBeInTheDocument();
    expect(screen.getByText(`Your mail: ${userInfo.mail}`)).toBeInTheDocument();
    expect(screen.getByTestId('stars-icon')).toBeInTheDocument();
  });

  test('renders appropriate icon based on user role', () => {
    const userInfo = {
      firstName: 'Jane',
      lastName: 'Smith',
      role: 'EmployeeAccount',
      mail: 'jane.smith@example.com',
    };

    render(<AccountInfo userInfo={userInfo} />);
    expect(screen.getByTestId('badge-icon')).toBeInTheDocument();
  });

});
