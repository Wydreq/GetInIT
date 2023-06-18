import React from 'react';
import { render, screen} from '@testing-library/react';
import ChangeEmailForm from '../companyPanel/editInfo/ChangeEmailForm';

describe('ChangeEmailForm', () => {
  test('renders the form with input fields', () => {
    render(<ChangeEmailForm />);

    expect(screen.getByLabelText('New e-mail*')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm new e-mail*')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
