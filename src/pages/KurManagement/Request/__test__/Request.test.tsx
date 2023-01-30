import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import { expect } from 'vitest';
import { CssBaseline, ThemeProvider } from '@mui/material';
import RequestKUR from '../index';
import theme from '../../../../theme/index';

function MockTheme({ children }: any) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

const showFilter = () => {
  const buttonElement = screen.getByRole('button', { name: 'Filter' });
  fireEvent.click(buttonElement);
};

describe('Request KUR page', async () => {
  beforeEach(() => {
    vi.clearAllMocks();
    render(
      <React.Suspense fallback>
        <MockTheme theme={theme}>
          <RequestKUR />
        </MockTheme>
      </React.Suspense>,
    );
  });
});
it('request kur page should be shown', () => {
  const requestPageHeader = screen.getAllByText(/Request KUR/i);
  expect(requestPageHeader).toBeTruthy();
});
it('Table list request kur should be shown', () => {
  const tableRequest = screen.getByTestId('table-request-kur');
  expect(tableRequest).toBeInTheDocument();
});
