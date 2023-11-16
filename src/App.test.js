import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';

test('renders calculator app', () => {
  render(<App />);
  const linkElement = screen.getByText(/Operand 1:/i);
  expect(linkElement).toBeInTheDocument();
});
