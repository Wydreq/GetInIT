import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FilterBar from '../FilterBar';


describe("FilterBar", ()=> {
    test('renders FilterBar component', () => {
        render(<FilterBar />);
        const filterBarElement = screen.getByLabelText('Offer name');
        expect(filterBarElement).toBeInTheDocument();
    });
      
    test('calls handleFilter function when Filter button is clicked', () => {
        const mockOnFilterSave = jest.fn();
        render(<FilterBar onFilterSave={mockOnFilterSave} />);
        const filterButton = screen.getByRole('button', { name: 'Filter' });
      
        fireEvent.click(filterButton);
      
        expect(mockOnFilterSave).toHaveBeenCalledTimes(1);
    });

    test('updates level state when Primary skill field value changes', () => {
        render(<FilterBar />);
        const primarySkillField = screen.getByLabelText('Primary skill');
      
        fireEvent.change(primarySkillField, { target: { value: 'JavaScript' } });
      
        expect(screen.getByLabelText('Primary skill')).toHaveValue('JavaScript');
        expect(screen.getByTestId('level')).toHaveValue('0');
      });

    test('calls onFilterSave prop when Filter button is clicked', () => {
        const mockOnFilterSave = jest.fn();
        render(<FilterBar onFilterSave={mockOnFilterSave} />);
        const filterButton = screen.getByRole('button', { name: 'Filter' });
      
        fireEvent.click(filterButton);
      
        expect(mockOnFilterSave).toHaveBeenCalledTimes(1);
    });
})
    
