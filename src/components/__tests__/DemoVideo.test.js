import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DemoVideo from '../DemoVideo';

test('should render DemoVideo component', () => {
  render(<DemoVideo />);

  const video = screen.getByTestId('video');
  expect(video).toBeInTheDocument();
  expect(video).toHaveAttribute('controls');
});
