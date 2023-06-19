import React from 'react';
import { render} from '@testing-library/react';
import OfferBar from '../OfferBar';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

describe('OfferBar', () => {

  const offer = {
    id: 1,
    companyName: 'Company',
    description: 'Job description',
    name: 'Job title',
    phoneNumber: '123456789',
    email: 'example@example.com',
    city: 'City',
    level: 2,
    place: 2,
    primarySkill: 'Primary skill',
    salaryFrom: 1000,
    salaryTo: 2000,
    technologies: ['Tech 1', 'Tech 2'],
  };

  test('should display the correct level name', () => {
    const { getByText } = render(<OfferBar offer={offer} />);
    const levelName = getByText('Mid Job title');

    expect(levelName).toBeInTheDocument();
  });

  test('should display the correct place icon', () => {
    const { getByTestId } = render(<OfferBar offer={offer} />);
    const apartmentIcon = getByTestId('apartment-icon');

    expect(apartmentIcon).toBeInTheDocument();
  });

  test('should display the correct salary range', () => {
    const { getByText } = render(<OfferBar offer={offer} />);
    const salaryRange = getByText('1000$ - 2000$');

    expect(salaryRange).toBeInTheDocument();
  });
});
