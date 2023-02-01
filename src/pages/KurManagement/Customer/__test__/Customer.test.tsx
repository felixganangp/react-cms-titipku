/* eslint-disable @typescript-eslint/lines-between-class-members */
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import {
  render,
  screen,
  RenderResult,
  fireEvent,
} from '@testing-library/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Modal from 'components/Modal';
import theme from '../../../../theme/index';
import CustomerView from '../index';
import FormCustomer from '../components/form';

// let documentBody: RenderResult;
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

const addForm = () => {
  const buttonElement = screen.getByTestId('button-add-customer');
  fireEvent.click(buttonElement);
};

describe('Customer KUR Page', async () => {
  it('Page customer kur should be shown', () => {
    // const { debug } = render(
    //   <React.Suspense fallback>
    //     <MockTheme theme={theme}>
    //       <CustomerView />
    //     </MockTheme>
    //   </React.Suspense>,
    // );
    // debug();
    // const customerPageHeader = screen.getAllByText(/KUR Customer/i);
    // expect(customerPageHeader).toBeTruthy();
  });
  // beforeEach(() => {
  //   vi.clearAllMocks();
  //   render(
  //     <React.Suspense fallback>
  //       <MockTheme theme={theme}>
  //         <CustomerView />
  //       </MockTheme>
  //     </React.Suspense>,
  //   );
  // });
  // it('Page customer kur should be shown', () => {
  //   // const { debug } = render(
  //   //   <React.Suspense fallback>
  //   //     <MockTheme theme={theme}>
  //   //       <CustomerView />
  //   //     </MockTheme>
  //   //   </React.Suspense>,
  //   // );
  //   // debug();
  //   const customerPageHeader = screen.getAllByText(/KUR Customer/i);
  //   expect(customerPageHeader).toBeTruthy();
  // });
  // it('Table list customer kur should be shown', () => {
  //   const tableCustomer = screen.getByTestId('table-customer');
  //   expect(tableCustomer).toBeInTheDocument();
  // });
  // it('Add button, search, filter not be clicked', () => {
  //   const filterCollapse = screen.getByTestId('filter-collapse-customer');
  //   const addCusstomer = screen.getByTestId('button-add-customer');
  //   const searchCustomer = screen.getByTestId('search-customer');
  //   expect(addCusstomer).toBeInTheDocument();
  //   expect(searchCustomer).toBeInTheDocument();
  //   expect(filterCollapse).toHaveClass('MuiCollapse-hidden');
  // });
  // it('Filtered clicked', () => {
  //   showFilter();
  //   const filterCollapse = screen.getByTestId('filter-collapse-customer');
  //   const filterTypeInput = screen.getByTestId('filter-type-customer');
  //   const filterPasarInput = screen.getByTestId('filter-pasar-customer');
  //   const filterScoreInput = screen.getByTestId('filter-credit-score-customer');
  //   expect(filterCollapse).not.toHaveClass('MuiCollapse-hidden');
  //   expect(filterTypeInput).toBeInTheDocument();
  //   expect(filterPasarInput).toBeInTheDocument();
  //   expect(filterScoreInput).toBeInTheDocument();
  // });
});
