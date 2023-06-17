import { getByTestId, render, screen } from '@testing-library/react';
import OffersList from '../OffersList';

describe('OffersList', () => {
    test('renders loading spinner when loading is true', () => {
        render(<OffersList filterSettings={{}} />);
        const loadingSpinner = screen.getByRole('status', { name: 'tail-spin-loading' });

        expect(loadingSpinner).toBeInTheDocument();
    });
    test('renders "Offers not found!" message when offersList is empty', () => {
        const emptyOffersList = [];
    
        const { getByTestId } = render(<OffersList offersList={emptyOffersList} loading={false} />);
    
        const messageElement = getByTestId('not-found');
        expect(messageElement).toBeInTheDocument();
    });
});
