import * as React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Button from './AddToCartButton';

describe('Button', () => {
  test('handles onClick', async () => {
    const mockOnClick = jest.fn();
    render(<Button onClick={mockOnClick}>Ok</Button>);
    fireEvent.click(screen.getByText('Ok'));

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});