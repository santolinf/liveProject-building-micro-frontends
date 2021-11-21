import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Placeholder for music single-page app/i);
  expect(linkElement).toBeInTheDocument();
});
