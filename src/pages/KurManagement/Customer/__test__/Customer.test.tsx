/* eslint-disable @typescript-eslint/lines-between-class-members */
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import MockTheme from 'utils/MockTheme';
import { store } from 'store';
import { customerAction } from 'store/slice/kur/Customer';
import CustomerView from '../index';
import { MockLisCustomers } from './MockCustomer';

// let documentBody: RenderResult;
// function MockTheme({ children }: any) {
//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       {children}
//     </ThemeProvider>
//   );
// }

const showFilter = () => {
  const buttonElement = screen.getByRole('button', { name: 'Filter' });
  fireEvent.click(buttonElement);
};

const addForm = () => {
  const buttonElement = screen.getByTestId('button-add-customer');
  fireEvent.click(buttonElement);
};

describe('Customer KUR Page', async () => {
  // it('Page customer kur should be shown', () => {
  //   const { debug } = render(
  //     <React.Suspense fallback>
  //       <MockTheme>
  //         <CustomerView />
  //       </MockTheme>
  //     </React.Suspense>,
  //   );
  //   // debug();
  //   const customerPageHeader = screen.getAllByText(/KUR Customer/i);
  //   expect(customerPageHeader).toBeTruthy();
  // });
  const mockCustomer = vi.fn((data) =>
    store.dispatch(
      customerAction.fetchDataSuccess({
        timestamp: 1675755225,
        status: 'ok',
        message: 'Retrieved successfully',
        page: 1,
        count: 2,
        total: 2,
        data,
      }),
    ),
  );
  beforeEach(() => {
    // vi.clearAllMocks();
    render(
      <React.Suspense fallback>
        <MockTheme>
          <CustomerView />
        </MockTheme>
      </React.Suspense>,
    );
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  it('Page customer kur should be shown', () => {
    // const { debug } = render(
    //   <React.Suspense fallback>
    //     <MockTheme theme={theme}>
    //       <CustomerView />
    //     </MockTheme>
    //   </React.Suspense>,
    // );
    // debug();
    const customerPageHeader = screen.getByText(/KUR Customer/i);
    expect(customerPageHeader).toBeInTheDocument();
  });
  it('Table list customer kur should be shown', () => {
    const tableCustomer = screen.getByTestId('table-customer');
    expect(tableCustomer).toBeInTheDocument();
  });
  it('Content of table list customer kur', async () => {
    mockCustomer(MockLisCustomers);
    const listTableCustomer = await screen.findAllByTestId(/list-table-/i);
    expect(listTableCustomer.length).toBe(2);
  });
  it('Add button, search, filter not be clicked', () => {
    const filterCollapse = screen.getByTestId('filter-collapse-customer');
    const addCusstomer = screen.getByTestId('button-add-customer');
    const searchCustomer = screen.getByTestId('search-customer');
    expect(addCusstomer).toBeInTheDocument();
    expect(searchCustomer).toBeInTheDocument();
    expect(filterCollapse).toHaveClass('MuiCollapse-hidden');
  });
  //* FILTER */
  it('Filter button clicked', () => {
    showFilter();
    const filterCollapse = screen.getByTestId('filter-collapse-customer');
    const filterTypeInput = screen.getByTestId('filter-type-customer');
    const filterPasarInput = screen.getByTestId('filter-pasar-customer');
    // const filterScoreInput = screen.getByTestId('filter-credit-score-customer');
    expect(filterCollapse).not.toHaveClass('MuiCollapse-hidden');
    expect(filterTypeInput).toBeInTheDocument();
    expect(filterPasarInput).toBeInTheDocument();
    // expect(filterScoreInput).toBeInTheDocument();
  });
  //* FORM */
  it('Add customer button clicked', () => {
    addForm();
    const addModalHeader = screen.getByTestId('form-customer');
    expect(addModalHeader).toBeInTheDocument();
  });
});
