/* eslint-disable @typescript-eslint/lines-between-class-members */
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import MockTheme from 'utils/MockTheme';
import { store } from 'store';
import { customerAction } from 'store/slice/kur/Customer';
import CustomerView from '../index';
import { MockLisCustomers } from './MockCustomer';
import FormCustomer from '../components/form';

const formData = {
  isEdit: false,
  initialData: {
    idCustomer: '',
    name: '',
    kurType: null,
    adminFee: '',
    dpdRate: '',
    birthDate: null,
    phoneNumber: '',
    email: '',
    addressKtp: '',
    addressDomisili: '',
    pasarName: null,
    merchantName: null,
    nikKtp: '',
    imageNik: '',
    kkNumber: '',
    imageKk: '',
    npwp: '',
    imageNpwp: '',
    imageSKUsaha: '',
    creditLimit: '',
    bankName: null,
    bankNumberPrimary: '',
    nobuAccountNumber: '',
    oldNikKtp: '',
    oldKkNumber: '',
    oldNpwp: '',
    idImageNik: null,
    idImageKk: null,
    idImageNpwp: null,
    idImageSKUsaha: null,
  },
};

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
  //* TABLE */
  it('Content of table list customer kur', async () => {
    await act(() => {
      mockCustomer(MockLisCustomers);
    });
    const listTableCustomer = await screen.findAllByTestId(/list-table-/i);
    expect(listTableCustomer.length).toBe(2);
  });
  // it('Content of table list customer kur', async () => {
  //   mockCustomer(MockLisCustomers);
  //   const listTableCustomer = await screen.findAllByTestId(/list-table-/i);
  //   expect(listTableCustomer.length).toBe(2);
  // });
  it('Add button, search, filter not be clicked', () => {
    const filterCollapse = screen.getByTestId('filter-collapse-customer');
    const addCusstomer = screen.getByTestId('button-add-customer');
    const searchCustomer = screen.getByTestId('search-customer');
    expect(addCusstomer).toBeInTheDocument();
    expect(searchCustomer).toBeInTheDocument();
    expect(filterCollapse).toHaveClass('MuiCollapse-hidden');
  });
  //* FILTER */
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
  //* FORM */
  it('Add customer button clicked', () => {
    addForm();
    const addModalHeader = screen.getByTestId('form-customer');
    expect(addModalHeader).toBeInTheDocument();
  });
});

describe('Form Customer Component', async () => {
  beforeEach(() => {
    // vi.clearAllMocks();
    render(
      <React.Suspense fallback>
        <MockTheme>
          <FormCustomer onClose={() => {}} formData={formData} />
        </MockTheme>
      </React.Suspense>,
    );
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  it('Form customer open', () => {
    const infoText = screen.getByText(/All forms must be filled/i);
    const firstTabButton = screen.getByText(/Basic Info/i);
    const secondTabButton = screen.getByText(/KUR Document/i);
    const nextbuttonElement = screen.getByRole('button', { name: 'Next' });

    expect(infoText).toBeInTheDocument();
    expect(firstTabButton).toBeInTheDocument();
    expect(firstTabButton).toHaveClass('Mui-selected');
    expect(secondTabButton).toBeInTheDocument();
    expect(secondTabButton).toHaveClass('Mui-disabled');
    expect(nextbuttonElement).toBeInTheDocument();
    expect(nextbuttonElement).toHaveClass('Mui-disabled');
  });
  it('Form initial state first tab (name, kur, admin fee, dpd rate, birth date, phone number, email, address(ktp and domicile), credit limit, list bank, bank account number(primary and nobu))', () => {
    const inputElementName =
      screen.getByPlaceholderText(/Input customer name/i);
    const inputElementKurType = screen.getByPlaceholderText(/Select KUR Type/i);
    const inputElementAdminFee =
      screen.getByPlaceholderText(/Input admin fee/i);
    const inputElementDpdRate = screen.getByPlaceholderText(/Input DPD rate/i);
    // const inputElementBirthDate = screen.getByTestId('form-customer-birthdate');

    expect(inputElementName).toHaveDisplayValue('');
    expect(inputElementKurType).toHaveDisplayValue('');
    expect(inputElementAdminFee).toHaveDisplayValue('');
    expect(inputElementDpdRate).toHaveDisplayValue('');
    // expect(inputElementBirthDate).toBeNull();
  });
});
