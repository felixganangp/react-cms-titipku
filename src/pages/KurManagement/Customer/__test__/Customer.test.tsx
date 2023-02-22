/* eslint-disable @typescript-eslint/lines-between-class-members */
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import MockTheme from 'utils/MockTheme';
import { store } from 'store';
import { customerAction } from 'store/slice/kur/Customer';
import { typeAction } from 'store/slice/kur/Type';
import { areaAction } from 'store/slice/Area';
import { creditScoreAction } from 'store/slice/kur/CreditScore';
import CustomerView from '../index';
import {
  MockLisCustomers,
  MockKurType,
  MockKurArea,
  MockCreditScore,
} from './MockCustomer';

const showFilter = () => {
  const buttonElement = screen.getByRole('button', { name: 'Filter' });
  fireEvent.click(buttonElement);
};

const openForm = (id: string, menulist?: boolean, index = 0) => {
  if (menulist) {
    const menuAction = screen.getAllByTestId('MoreVertIcon');
    fireEvent.click(menuAction[index]);

    const buttonElement = screen.getByTestId(id);
    fireEvent.click(buttonElement);
  } else {
    const buttonElement = screen.getByTestId(id);
    fireEvent.click(buttonElement);
  }
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

  const mockKurType = vi.fn((data) =>
    store.dispatch(
      typeAction.fetchDataSuccess({
        timestamp: 1675755225,
        status: 'ok',
        message: 'Retrieved successfully',
        count: 2,
        total: 2,
        data,
      }),
    ),
  );

  const mockKurArea = vi.fn((data) =>
    store.dispatch(
      areaAction.fetchDataSuccess({
        timestamp: 1675755225,
        status: 'ok',
        message: 'Retrieved successfully',
        count: 2,
        total: 2,
        data,
      }),
    ),
  );

  const mockKurCreditScore = vi.fn((data) =>
    store.dispatch(
      creditScoreAction.fetchDataSuccess({
        timestamp: 1675755225,
        status: 'ok',
        message: 'Retrieved successfully',
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
    // showFilter();
  });
  //* TABLE */
  it('Content of table list customer kur', async () => {
    await act(() => {
      mockCustomer(MockLisCustomers);
    });
    const listTableCustomer = await screen.findAllByTestId(/list-table-/i);
    expect(listTableCustomer.length).toBe(2);
  });
  it('Show pagination of table customer kur', async () => {
    const getPagination = screen.getByLabelText('pagination navigation');
    const buttonPage = within(getPagination).getByLabelText('page 1');

    fireEvent.click(buttonPage);
    expect(buttonPage).toHaveClass('Mui-selected');
  });
  it('Add button, search, filter not be clicked', () => {
    const filterCollapse = screen.getByTestId('filter-collapse-customer');
    const addCusstomer = screen.getByTestId('button-add-customer');
    const searchCustomer = screen.getByTestId('search-customer');
    expect(addCusstomer).toBeInTheDocument();
    expect(searchCustomer).toBeInTheDocument();
    expect(filterCollapse).toHaveClass('MuiCollapse-hidden');
  });
  //* FILTER, SORT AND SEARCH */
  it('Open filter button clicked', () => {
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
  it('Open filter, change type and area filter, then reset filter', async () => {
    await act(() => {
      mockKurType(MockKurType);
      mockKurArea(MockKurArea);
      mockKurCreditScore(MockCreditScore);
    });
    showFilter();
    // const filterCollapse = screen.getByTestId('filter-collapse-customer');
    const filterTypeInput = screen.getByTestId('filter-type-customer');
    fireEvent.click(filterTypeInput);
    const inputType = within(filterTypeInput).getByRole('combobox');
    fireEvent.change(inputType, { target: { value: 'b2' } });
    await act(async () => {
      // eslint-disable-next-line no-promise-executor-return
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    fireEvent.click(screen.getAllByRole('option')[0]);
    const filterPasarInput = screen.getByTestId('filter-pasar-customer');
    fireEvent.click(filterPasarInput);
    const inputArea = within(filterPasarInput).getByRole('combobox');
    fireEvent.change(inputArea, { target: { value: 'Pas' } });
    await act(async () => {
      // eslint-disable-next-line no-promise-executor-return
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    fireEvent.click(screen.getAllByRole('option')[0]);
    const resetButton = screen.getByRole('button', { name: 'Reset' });
    fireEvent.click(resetButton);
    expect(inputType).toHaveValue('');
    expect(filterPasarInput).toBeInTheDocument();
  });
  it('Open filter, then filter customer and change page', async () => {
    await act(() => {
      mockCustomer(MockLisCustomers);
      mockKurType(MockKurType);
      mockKurArea(MockKurArea);
      mockKurCreditScore(MockCreditScore);
    });
    showFilter();
    const filterTypeInput = screen.getByTestId('filter-type-customer');
    fireEvent.click(filterTypeInput);
    const inputType = within(filterTypeInput).getByRole('combobox');
    fireEvent.change(inputType, { target: { value: 'b2' } });
    await act(async () => {
      // eslint-disable-next-line no-promise-executor-return
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    fireEvent.click(screen.getAllByRole('option')[0]);

    const filterPasarInput = screen.getByTestId('filter-pasar-customer');
    fireEvent.click(filterPasarInput);
    const inputArea = within(filterPasarInput).getByRole('combobox');
    fireEvent.change(inputArea, { target: { value: 'Pas' } });
    await act(async () => {
      // eslint-disable-next-line no-promise-executor-return
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    fireEvent.click(screen.getAllByRole('option')[0]);

    const filterCreditScoreInput = screen.getByTestId(
      'filter-credit-score-customer',
    );
    fireEvent.click(filterCreditScoreInput);
    const inputCreditScore = within(filterCreditScoreInput).getByRole(
      'combobox',
    );
    fireEvent.change(inputCreditScore, { target: { value: 'Lancar' } });
    await act(async () => {
      // eslint-disable-next-line no-promise-executor-return
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    fireEvent.click(screen.getAllByRole('option')[0]);

    const applyButton = screen.getByRole('button', { name: 'Apply' });
    fireEvent.click(applyButton);
    // Change Page
    const getPagination = screen.getByLabelText('pagination navigation');
    const buttonPage = within(getPagination).getByLabelText('page 1');
    fireEvent.click(buttonPage);

    expect(buttonPage).toHaveClass('Mui-selected');
    const listTableCustomer = await screen.findAllByTestId(/list-table-/i);
    expect(inputType).toHaveValue('B2B');
    expect(inputCreditScore).toHaveValue('Lancar');
    // expect(inputArea).toBeTruthy();
    expect(listTableCustomer.length).toBe(2);
  });
  it('Open filter, then filter area with []', async () => {
    await act(() => {
      mockKurType(MockKurType);
      mockKurArea(MockKurArea);
      mockKurCreditScore(MockCreditScore);
    });

    const filterPasarInput = screen.getByTestId('filter-pasar-customer');
    fireEvent.click(filterPasarInput);
    const inputArea = within(filterPasarInput).getByRole('combobox');
    fireEvent.change(inputArea, { target: { value: 'Pas' } });
    await act(async () => {
      // eslint-disable-next-line no-promise-executor-return
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    fireEvent.click(screen.getAllByRole('option')[0]);
    await act(async () => {
      // eslint-disable-next-line no-promise-executor-return
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    const applyButton = screen.getByRole('button', { name: 'Apply' });
    fireEvent.click(applyButton);

    const listTableCustomer = await screen.findAllByTestId(/list-table-/i);
    // expect(inputType).toHaveValue('B2B');
    // expect(inputCreditScore).toHaveValue('Lancar');
    // expect(inputArea).toBeTruthy();
    expect(listTableCustomer.length).toBe(2);
  });
  it('Open filter, then filter customer only area', async () => {
    await act(() => {
      mockKurType(MockKurType);
      mockKurArea(MockKurArea);
      mockKurCreditScore(MockCreditScore);
    });
    showFilter();
    const resetButton = screen.getByRole('button', { name: 'Reset' });
    fireEvent.click(resetButton);
    const filterPasarInput = screen.getByTestId('filter-pasar-customer');
    fireEvent.click(filterPasarInput);
    const inputArea = within(filterPasarInput).getByRole('combobox');
    fireEvent.change(inputArea, { target: { value: 'Pas' } });
    await act(async () => {
      // eslint-disable-next-line no-promise-executor-return
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    fireEvent.click(screen.getAllByRole('option')[0]);

    const applyButton = screen.getByRole('button', { name: 'Apply' });
    fireEvent.click(applyButton);
    const listTableCustomer = await screen.findAllByTestId(/list-table-/i);
    // expect(inputArea).toBeTruthy();
    expect(listTableCustomer.length).toBe(2);
  });
  it('Open filter, then filter customer only credit score', async () => {
    await act(() => {
      mockKurType(MockKurType);
      mockKurArea(MockKurArea);
      mockKurCreditScore(MockCreditScore);
    });
    const resetButton = screen.getByRole('button', { name: 'Reset' });
    fireEvent.click(resetButton);

    const filterCreditScoreInput = screen.getByTestId(
      'filter-credit-score-customer',
    );
    fireEvent.click(filterCreditScoreInput);
    const inputCreditScore = within(filterCreditScoreInput).getByRole(
      'combobox',
    );
    fireEvent.change(inputCreditScore, { target: { value: 'Lancar' } });
    await act(async () => {
      // eslint-disable-next-line no-promise-executor-return
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    fireEvent.click(screen.getAllByRole('option')[0]);

    const applyButton = screen.getByRole('button', { name: 'Apply' });
    fireEvent.click(applyButton);
    const listTableCustomer = await screen.findAllByTestId(/list-table-/i);
    // expect(inputArea).toBeTruthy();
    expect(listTableCustomer.length).toBe(2);
  });
  // SEARCH
  it('Search customer', async () => {
    const searchCustomer = screen.getByTestId('search-customer');
    const inputSearch =
      within(searchCustomer).getByPlaceholderText('Search item');
    fireEvent.change(inputSearch, { target: { value: 'test' } });
    await act(async () => {
      // eslint-disable-next-line no-promise-executor-return
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });
    expect(inputSearch).toHaveValue('test');
  });
  // SORT
  it('Sort customer clicked', async () => {
    const getIdHead = screen.getByTestId('header-id');
    const sortCustomerIcon = within(getIdHead).getByTestId('SwapVertIcon');
    fireEvent.click(sortCustomerIcon);
    expect(sortCustomerIcon).toBeInTheDocument();
  });
  //* FORM */
  it('Add customer button clicked', () => {
    openForm('button-add-customer');
    const addModalHeader = screen.getByTestId('form-customer');
    expect(addModalHeader).toBeInTheDocument();
  });
  it('Add customer button clicked and closed', async () => {
    openForm('button-add-customer');
    const addModalHeader = screen.getByRole('dialog');
    const closeButton = within(addModalHeader).getByTestId('CloseIcon');
    fireEvent.click(closeButton);
    await act(async () => {
      // eslint-disable-next-line no-promise-executor-return
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });
    expect(addModalHeader).not.toBeInTheDocument();
  });
  it('Edit customer button clicked', async () => {
    await act(() => {
      mockCustomer(MockLisCustomers);
    });
    openForm('button-edit-customer', true);
    const addModalHeader = screen.getByTestId('form-customer');
    expect(addModalHeader).toBeInTheDocument();
  });
  //* HOLD CUSTOMER */
  it('Hold customer button clicked', async () => {
    await act(() => {
      mockCustomer(MockLisCustomers);
    });
    openForm('button-hold-customer', true);
    expect(screen.getByTestId('button-hold-customer')).toBeInTheDocument();
  });
  it('Active customer button clicked', async () => {
    await act(() => {
      mockCustomer(MockLisCustomers);
    });
    openForm('button-hold-customer', true, 1);
    expect(screen.getByTestId('button-hold-customer')).toBeInTheDocument();
  });
  //* DETAILS */
  it('Details customer button clicked', async () => {
    await act(() => {
      mockCustomer(MockLisCustomers);
    });
    openForm('button-details-customer', true);
    const idSelectedCustomer = MockLisCustomers[0].id;
    expect(window.location.pathname).toBe(
      `/kur/customer/${idSelectedCustomer}`,
    );
  });
});
