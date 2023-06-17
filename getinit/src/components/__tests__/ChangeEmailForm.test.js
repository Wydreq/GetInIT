import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ChangeEmailForm from '../companyPanel/editInfo/ChangeEmailForm';

describe('ChangeEmailForm', () => {
  test('renders the form with input fields', () => {
    render(<ChangeEmailForm />);

    expect(screen.getByLabelText('New e-mail*')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm new e-mail*')).toBeInTheDocument();
  });
});
