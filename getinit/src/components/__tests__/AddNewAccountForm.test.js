import React from 'react';
import { render } from '@testing-library/react';
import AddNewAccountForm from '../companyPanel/AddNewAccountForm';

describe('AddNewAccountForm', () => {
    
  test('renders form fields', () => {
    const { getByRole } = render(<AddNewAccountForm />);

    expect(getByRole('name')).toBeInTheDocument();
    expect(getByRole('lastname')).toBeInTheDocument();
    expect(getByRole('email')).toBeInTheDocument();
    expect(getByRole('password')).toBeInTheDocument();
    expect(getByRole('confirm')).toBeInTheDocument();
  });

  test('renders the Add button', () => {
    const { getByText } = render(<AddNewAccountForm />);
    const addButton = getByText('Add');
  
    expect(addButton).toBeInTheDocument();
  });

});

