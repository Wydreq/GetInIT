import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddNewOfferForm from '../companyPanel/AddNewOfferForm';

describe('AddNewOfferForm', () => {
    test('should render AddNewOfferForm correctly', () => {
        render(<AddNewOfferForm />);

        expect(screen.getByLabelText('Offer title*')).toBeInTheDocument();
        expect(screen.getByLabelText('Primary language*')).toBeInTheDocument();
        expect(screen.getByLabelText('Contact phone number*')).toBeInTheDocument();
      });

    test('should display errors when submitting form without required fields', () => {
        // Mock console.log to not print anything during tests
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
      
        render(<AddNewOfferForm />);
        
        const addButton = screen.getByRole('add');
        
        fireEvent.click(addButton);
        
        expect(screen.getByText('Please insert correct offer title (length > 0)')).toBeInTheDocument();
        expect(screen.getByText('Please insert correct primary language')).toBeInTheDocument();

        consoleSpy.mockRestore();
    });
    test('should add technology to the list when clicking "Add technology" button', () => {
        render(<AddNewOfferForm />);
        
        const technologyInput = screen.getByRole('technology');
        const addButton = screen.getByRole('addTechnology');
        
        fireEvent.change(technologyInput, { target: { value: 'React' } });
        fireEvent.click(addButton);
        
        expect(screen.getByText('React - 1')).toBeInTheDocument();
      });

    test('should clear the technologies list when clicking the "Clear" button', () => {
        render(<AddNewOfferForm />);
        
        const technologyInput = screen.getByRole('technology');
        const addButton = screen.getByRole('addTechnology');
        const clearButton = screen.getByRole('clear');
        
        fireEvent.change(technologyInput, { target: { value: 'React' } });
        fireEvent.click(addButton);
        
        expect(screen.getByText('React - 1')).toBeInTheDocument();
        
        fireEvent.click(clearButton);
        
        expect(screen.queryByText('React - 1')).not.toBeInTheDocument();
      });
      
});