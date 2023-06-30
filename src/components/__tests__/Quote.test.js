import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Quote from '../Quote';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

beforeEach(() => {
  fetch.mockResponseOnce(JSON.stringify({ quote: 'test quote' }));
});

afterEach(() => {
  fetchMock.resetMocks();
});

test('should render quote component', async () => {
  render(<Quote />);

  await waitFor(() => {
    expect(screen.getByTestId('quote')).toHaveTextContent('test quote');
  });
});
