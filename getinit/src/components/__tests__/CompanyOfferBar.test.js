import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CompanyOfferBar from '../CompanyOfferBar';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('CompanyOfferBar', () => {
  const mockDispatch = jest.fn();
  const mockNavigate = jest.fn();
  
  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);
    useNavigate.mockReturnValue(mockNavigate);
  });

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

  test('should dispatch the correct action and call onModalOpen and onEditSet when edit button is clicked', () => {
    const onModalOpenMock = jest.fn();
    const onEditSetMock = jest.fn();
    const { getByTestId } = render(
      <CompanyOfferBar
        offer={offer}
        onModalOpen={onModalOpenMock}
        onEditSet={onEditSetMock}
      />
    );
    const editButton = getByTestId('edit-button');

    fireEvent.click(editButton);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'offerModal/setModalContent',
      payload: {
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
      },
    });
    expect(onModalOpenMock).toHaveBeenCalled();
    expect(onEditSetMock).toHaveBeenCalled();
  });

});
