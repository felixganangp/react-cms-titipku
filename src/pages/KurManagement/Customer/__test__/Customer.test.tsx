/* eslint-disable @typescript-eslint/lines-between-class-members */
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import MockTheme from 'utils/MockTheme';
import { store } from 'store';
import { customerAction } from 'store/slice/kur/Customer';
import { typeAction } from 'store/slice/kur/Type';
import { areaAction } from 'store/slice/Area';
import { CreateCustomer } from 'models/kur/Customer';
import CustomerView from '../index';
import { MockLisCustomers, MockKurType, MockKurArea } from './MockCustomer';
import FormCustomer from '../components/form';

const formData: {
  isEdit: boolean;
  initialData: CreateCustomer;
} = {
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

const openForm = (id: string, menulist?: boolean) => {
  if (menulist) {
    const menuAction = screen.getAllByTestId('MoreVertIcon');
    fireEvent.click(menuAction[0]);

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
  it('Show pagination of table customer kur', async () => {
    await act(() => {
      mockCustomer(MockLisCustomers);
    });
    const getPagination = screen.getByLabelText('pagination navigation');
    const buttonPage = within(getPagination).getByLabelText('page 1');

    fireEvent.click(buttonPage);
    expect(buttonPage).toHaveClass('Mui-selected');
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
  it('Open filter, change type and area filter, then reset filter', async () => {
    await act(() => {
      mockKurType(MockKurType);
      mockKurArea(MockKurArea);
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
    // const selectedPasar = screen.getAllByText(/Pasar BSD Tekno mandiri/i);

    // const filterScoreInput = screen.getByTestId('filter-credit-score-customer');
    // expect(filterCollapse).not.toHaveClass('MuiCollapse-hidden');
    // const input = screen.getByRole('presentation');
    const resetButton = screen.getByRole('button', { name: 'Reset' });
    fireEvent.click(resetButton);
    expect(inputType).toHaveValue('');
    expect(filterPasarInput).toBeInTheDocument();
    // expect(inputArea.length).toBe(1);

    // expect(filterPasarInput).toBeInTheDocument();
    // expect(filterScoreInput).toBeInTheDocument();
  });
  it('Open filter, then filter customer', async () => {
    await act(() => {
      mockKurType(MockKurType);
      mockKurArea(MockKurArea);
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
    const applyButton = screen.getByRole('button', { name: 'Apply' });
    fireEvent.click(applyButton);
    const listTableCustomer = await screen.findAllByTestId(/list-table-/i);
    expect(inputType).toHaveValue('B2B');
    // expect(inputArea).toBeTruthy();
    expect(listTableCustomer.length).toBe(2);
  });
  //* FORM */
  it('Add customer button clicked', () => {
    openForm('button-add-customer');
    const addModalHeader = screen.getByTestId('form-customer');
    expect(addModalHeader).toBeInTheDocument();
  });
  it('Edit customer button clicked', async () => {
    await act(() => {
      mockCustomer(MockLisCustomers);
    });
    openForm('button-edit-customer', true);
    const addModalHeader = screen.getByTestId('form-customer');
    expect(addModalHeader).toBeInTheDocument();
  });
});

// describe('Form Customer Component Add', async () => {
//   // beforeEach(() => {
//   //   // vi.clearAllMocks();
//   //   render(
//   //     <React.Suspense fallback>
//   //       <MockTheme>
//   //         <FormCustomer onClose={() => {}} formData={formData} />
//   //       </MockTheme>
//   //     </React.Suspense>,
//   //   );
//   // });
//   afterEach(() => {
//     vi.clearAllMocks();
//   });
//   // // it('Form customer open', () => {
//   // //   const infoText = screen.getByText(/All forms must be filled/i);
//   // //   const firstTabButton = screen.getByText(/Basic Info/i);
//   // //   const secondTabButton = screen.getByText(/KUR Document/i);
//   // //   const nextbuttonElement = screen.getByRole('button', { name: 'Next' });

//   // //   expect(infoText).toBeInTheDocument();
//   // //   expect(firstTabButton).toBeInTheDocument();
//   // //   expect(firstTabButton).toHaveClass('Mui-selected');
//   // //   expect(secondTabButton).toBeInTheDocument();
//   // //   expect(secondTabButton).toHaveClass('Mui-disabled');
//   // //   expect(nextbuttonElement).toBeInTheDocument();
//   // //   expect(nextbuttonElement).toHaveClass('Mui-disabled');
//   // // });
//   it('Form initial state first tab (name, kur, admin fee, dpd rate, birth date, phone number, email, address(ktp and domicile), credit limit, list bank, bank account number(primary and nobu)) and next button disable', () => {
//     formData = {
//       ...formData,
//       initialData: {
//         ...formData.initialData,
//         kurType: null,
//       },
//     };
//     render(
//       <React.Suspense fallback>
//         <MockTheme>
//           <FormCustomer onClose={() => {}} formData={formData} />
//         </MockTheme>
//       </React.Suspense>,
//     );
//     const inputElementName =
//       screen.getByPlaceholderText(/Input customer name/i);
//     // await userEvent.setup().type(inputElementName, 'Asra');
//     const inputElementKurType = screen.getByPlaceholderText(/Select KUR Type/i);
//     const inputElementAdminFee =
//       screen.getByPlaceholderText(/Input admin fee/i);
//     const inputElementDpdRate = screen.getByPlaceholderText(/Input DPD rate/i);
//     // const inputElementBirthDate = screen.getByTestId('form-customer-birthdate');
//     const inputElementPhoneNumber =
//       screen.getByPlaceholderText(/Input Phone Number/i);
//     const inputElementEmail = screen.getByPlaceholderText(/Input email/i);
//     const inputElementAddressKtp =
//       screen.getByPlaceholderText(/Input address ktp/i);
//     const inputElementAddressDomicile = screen.getByPlaceholderText(
//       /Input address domicile/i,
//     );
//     const inputElementCreditLimit =
//       screen.getByPlaceholderText(/Input credit limit/i);
//     const inputElementBankAccount = screen.getByPlaceholderText(
//       /Select your bank account/i,
//     );
//     const inputElementBankAccountNumber = screen.getByPlaceholderText(
//       'Bank account number',
//     );
//     // const inputElementBankAccountNumber = screen.getByTestId(
//     //   'form-customer-bank-account',
//     // );
//     const inputElementBankAccountNumberNobu = screen.getByPlaceholderText(
//       'Bank account number (Nobu)',
//     );
//     const nextbuttonElement = screen.getByRole('button', { name: 'Next' });

//     expect(inputElementName).toHaveDisplayValue('');
//     expect(inputElementKurType).toHaveDisplayValue('');
//     expect(inputElementAdminFee).toHaveDisplayValue('');
//     expect(inputElementDpdRate).toHaveDisplayValue('');
//     // expect(inputElementBirthDate).toBeNull();
//     expect(inputElementPhoneNumber).toHaveDisplayValue('');
//     expect(inputElementEmail).toHaveDisplayValue('');
//     expect(inputElementAddressKtp).toHaveDisplayValue('');
//     expect(inputElementAddressDomicile).toHaveDisplayValue('');
//     expect(inputElementCreditLimit).toHaveDisplayValue('');
//     expect(inputElementBankAccount).toHaveDisplayValue('');
//     expect(inputElementBankAccountNumber).toHaveDisplayValue('');
//     expect(inputElementBankAccountNumberNobu).toHaveDisplayValue('');
//     expect(nextbuttonElement).toHaveClass('Mui-disabled');
//   });
//   it('Form typing input', async () => {
//     formData = {
//       ...formData,
//       initialData: {
//         ...formData.initialData,
//         kurType: {
//           id: 1,
//           created_at: 1674441599,
//           updated_at: 0,
//           created_by_id: 1,
//           created_by_type: 'admin',
//           updated_by_id: 0,
//           updated_by_type: '',
//           name: 'B2B',
//           description: 'B2B',
//         },
//       },
//     };

//     render(
//       <React.Suspense fallback>
//         <MockTheme>
//           <FormCustomer onClose={() => {}} formData={formData} />
//         </MockTheme>
//       </React.Suspense>,
//     );
//     await act(() => {
//       store.dispatch(
//         typeAction.fetchDataSuccess({
//           timestamp: 1675755225,
//           status: 'ok',
//           message: 'Retrieved successfully',
//           page: 1,
//           count: 2,
//           total: 2,
//           data: [
//             {
//               id: 1,
//               created_at: 1674441599,
//               updated_at: 0,
//               created_by_id: 1,
//               created_by_type: 'admin',
//               updated_by_id: 0,
//               updated_by_type: '',
//               name: 'B2B',
//               description: 'B2B',
//             },
//           ],
//         }),
//       );
//     });
//     const autocomplete = screen.getByPlaceholderText('Select KUR Type');
//     expect(autocomplete).toHaveDisplayValue('B2B');

//     // const { container } = render(
//     //   <React.Suspense fallback>
//     //     <MockTheme>
//     //       <FormCustomer onClose={() => {}} formData={formData} />
//     //     </MockTheme>
//     //   </React.Suspense>,
//     // );
//     // const autocomplete = screen.getByTestId('form-customer-kur-type');
//     // fireEvent.click(autocomplete);
//     // autocomplete.focus();
//     // const input = screen.getByRole('presentation');
//     // // const input = container.getElementsByClassName('MuiAutocomplete-popper');
//     // console.log('🚀 ~ file: Customer.test.tsx:269 ~ it ~ autocomplete', input);
//     // // fireEvent.change(input, { target: { value: 'B2' } });
//     // fireEvent.keyDown(autocomplete, { key: 'ArrowDown' });
//     // fireEvent.keyDown(autocomplete, { key: 'Enter' });
//     // expect(autocomplete).toHaveDisplayValue('B2B');

//     // userEvent.type(autocomplete, 'a');
//     // await waitFor(() => screen.getByText('B2B'));
//     // fireEvent.click(screen.getByText('B2B'));
//     // expect(autocomplete).toHaveTextContent('B2B');
//     // const input = within(autocomplete).getByPlaceholderText(/Select KUR Type/i);
//     // autocomplete.focus();
//     // const inputElementName =
//     //   screen.getByPlaceholderText(/Input customer name/i);
//     // console.log(
//     //   '🚀 ~ file: Customer.test.tsx:234 ~ it ~ inputElementName',
//     //   inputElementName,
//     // );
//     // await userEvent.setup().type(inputElementName, 'Jonny');
//     // const inputElementKurType = screen.getByPlaceholderText(/Select KUR Type/i);
//     // // await userEvent.setup().type(inputElementKurType, 'B2B');
//     // const inputElementAdminFee =
//     //   screen.getByPlaceholderText(/Input admin fee/i);
//     // await userEvent.setup().type(inputElementAdminFee, '10');
//     // const inputElementDpdRate = screen.getByPlaceholderText(/Input DPD rate/i);
//     // // const inputElementBirthDate = screen.getByTestId('form-customer-birthdate');
//     // const inputElementPhoneNumber =
//     //   screen.getByPlaceholderText(/Input Phone Number/i);
//     // const inputElementEmail = screen.getByPlaceholderText(/Input email/i);
//     // const inputElementAddressKtp =
//     //   screen.getByPlaceholderText(/Input address ktp/i);
//     // const inputElementAddressDomicile = screen.getByPlaceholderText(
//     //   /Input address domicile/i,
//     // );
//     // const inputElementCreditLimit =
//     //   screen.getByPlaceholderText(/Input credit limit/i);
//     // const inputElementBankAccount = screen.getByPlaceholderText(
//     //   /Select your bank account/i,
//     // );
//     // const inputElementBankAccountNumber = screen.getByPlaceholderText(
//     //   'Bank account number',
//     // );
//     // // const inputElementBankAccountNumber = screen.getByTestId(
//     // //   'form-customer-bank-account',
//     // // );
//     // const inputElementBankAccountNumberNobu = screen.getByPlaceholderText(
//     //   'Bank account number (Nobu)',
//     // );
//     // const nextbuttonElement = screen.getByRole('button', { name: 'Next' });
//     // expect(inputElementName).toHaveDisplayValue('Jonny');
//     // // expect(inputElementKurType).toHaveDisplayValue('B2B');
//     // expect(inputElementAdminFee).toHaveDisplayValue('10');
//     // expect(inputElementDpdRate).toHaveDisplayValue('');
//     // // expect(inputElementBirthDate).toBeNull();
//     // expect(inputElementPhoneNumber).toHaveDisplayValue('');
//     // expect(inputElementEmail).toHaveDisplayValue('');
//     // expect(inputElementAddressKtp).toHaveDisplayValue('');
//     // expect(inputElementAddressDomicile).toHaveDisplayValue('');
//     // expect(inputElementCreditLimit).toHaveDisplayValue('');
//     // expect(inputElementBankAccount).toHaveDisplayValue('');
//     // expect(inputElementBankAccountNumber).toHaveDisplayValue('');
//     // expect(inputElementBankAccountNumberNobu).toHaveDisplayValue('');
//     // expect(nextbuttonElement).toHaveClass('Mui-disabled');
//   });
// });
// describe('Form Customer Component Add', async () => {
//   beforeEach(() => {
//     // vi.clearAllMocks();
//     render(
//       <React.Suspense fallback>
//         <MockTheme>
//           <CustomerView />
//         </MockTheme>
//       </React.Suspense>,
//     );
//   });
//   afterEach(() => {
//     vi.clearAllMocks();
//   });

// });
