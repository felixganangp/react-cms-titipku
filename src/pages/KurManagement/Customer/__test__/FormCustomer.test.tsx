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
import { creditScoreAction } from 'store/slice/kur/CreditScore';
import CustomerView from '../index';
import {
  MockLisCustomers,
  MockKurType,
  MockKurArea,
  MockCreditScore,
} from './MockCustomer';
import FormCustomer from '../components/form';

let formData: {
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
    kurUserStatus: '',
  },
};

describe('Form Customer Component Add', async () => {
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
  afterEach(() => {
    vi.clearAllMocks();
  });
  it('Form initial state first tab, all input have been touched, and leave error with next button disabled', async () => {
    formData = {
      ...formData,
      initialData: {
        ...formData.initialData,
        kurType: null,
      },
    };
    await act(() => {
      mockKurType(MockKurType);
    });
    const { debug, queryByText } = render(
      <React.Suspense fallback>
        <MockTheme>
          <FormCustomer onClose={() => {}} formData={formData} />
        </MockTheme>
      </React.Suspense>,
    );
    const allFormText = screen.getByText('All forms must be filled');
    const inputElementName =
      screen.getByPlaceholderText(/Input customer name/i);
    await fireEvent.blur(inputElementName);
    // await fireEvent.blur(allFormTexts);
    await waitFor(async () => {
      const errorMsgName = screen.getByText('Name is required');
      expect(errorMsgName).toBeInTheDocument();
    });

    const inputElementFee = screen.getByPlaceholderText(/Input admin fee/i);
    await fireEvent.blur(inputElementFee);
    // await fireEvent.blur(allFormTexts);
    await waitFor(async () => {
      const errorMsgAdminFee = screen.getByText('Admin fee is required');
      expect(errorMsgAdminFee).toBeInTheDocument();
    });

    const inputElementDpdRate = screen.getByPlaceholderText(/Input DPD rate/i);
    await fireEvent.blur(inputElementDpdRate);
    // await fireEvent.blur(allFormTexts);
    await waitFor(async () => {
      const errorMsgAdminDpdRate = screen.getByText('DPD rate is required');
      expect(errorMsgAdminDpdRate).toBeInTheDocument();
    });

    const inputElementPhoneNumber =
      screen.getByPlaceholderText(/Input Phone Number/i);
    await fireEvent.blur(inputElementPhoneNumber);
    // await fireEvent.blur(allFormTexts);
    await waitFor(async () => {
      const errorMsgAdminPhoneNumber = screen.getByText(
        'Phone Number is required',
      );
      expect(errorMsgAdminPhoneNumber).toBeInTheDocument();
    });

    const inputElementEmail = screen.getByPlaceholderText(/Input email/i);
    await fireEvent.blur(inputElementEmail);
    // await fireEvent.blur(allFormTexts);
    await waitFor(async () => {
      const errorMsgAdminEmail = screen.getByText('Email is required');
      expect(errorMsgAdminEmail).toBeInTheDocument();
    });

    const inputElementAddressKtp =
      screen.getByPlaceholderText(/Input address ktp/i);
    await fireEvent.blur(inputElementAddressKtp);
    // await fireEvent.blur(allFormTexts);
    await waitFor(async () => {
      const errorMsgAdminAddressKtp = screen.getByText(
        'Address (KTP) is required',
      );
      expect(errorMsgAdminAddressKtp).toBeInTheDocument();
    });

    const inputElementAddressDomicile = screen.getByPlaceholderText(
      /Input address domicile/i,
    );
    await fireEvent.blur(inputElementAddressDomicile);
    // await fireEvent.blur(allFormTexts);
    await waitFor(async () => {
      const errorMsgAdminAddressDomicile = screen.getByText(
        'Address (Domicile) is required',
      );
      expect(errorMsgAdminAddressDomicile).toBeInTheDocument();
    });

    const inputElementCreditLimit =
      screen.getByPlaceholderText(/Input credit limit/i);
    await fireEvent.blur(inputElementCreditLimit);
    // await fireEvent.blur(allFormTexts);
    await waitFor(async () => {
      const errorMsgAdminCreditLimit = screen.getByText(
        'Credit limit is required',
      );
      expect(errorMsgAdminCreditLimit).toBeInTheDocument();
    });

    const inputElementBankPrimary =
      screen.getByPlaceholderText(`Bank account number`);
    await fireEvent.blur(inputElementBankPrimary);
    // await fireEvent.blur(allFormTexts);
    await waitFor(async () => {
      const errorMsgAdminBankPrimary = screen.getByText(
        'Bank account number (primary) is required',
      );
      expect(errorMsgAdminBankPrimary).toBeInTheDocument();
    });

    const inputElementBankNobu = screen.getByPlaceholderText(
      `Bank account number (Nobu)`,
    );
    await fireEvent.blur(inputElementBankNobu);
    // await fireEvent.blur(allFormTexts);
    await waitFor(async () => {
      const errorMsgAdminBankNobu = screen.getByText(
        'Nobu account number is required',
      );
      expect(errorMsgAdminBankNobu).toBeInTheDocument();
    });

    // TYPE KUR
    const inputElementKurType = screen.getByPlaceholderText(/Select KUR Type/i);
    await fireEvent.blur(inputElementKurType);
    // await fireEvent.blur(allFormTexts);
    await waitFor(async () => {
      const errorMsgKurType = screen.getByText('KUR Type is required');
      expect(errorMsgKurType).toBeInTheDocument();
    });

    // LIST BANK KUR
    const inputElementKurListBank = screen.getByPlaceholderText(
      /Select your bank account/i,
    );
    await fireEvent.blur(inputElementKurListBank);
    // await fireEvent.blur(allFormTexts);
    await waitFor(async () => {
      const errorMsgKurListBank = screen.getByText('Bank account is required');
      expect(errorMsgKurListBank).toBeInTheDocument();
    });

    // BIRTH DATE
    const inputElementKurBirthDate = screen.getByPlaceholderText('dd/mm/yyyy');
    await fireEvent.click(inputElementKurBirthDate);
    // await fireEvent.blur(allFormTexts);
    await waitFor(async () => {
      const errorMsgKurBirthDate = screen.getByText('Birth date is required');
      expect(errorMsgKurBirthDate).toBeInTheDocument();
    });

    // await userEvent.setup().type(inputElementName, 'Asra');
    // const inputElementKurType = screen.getByPlaceholderText(/Select KUR Type/i);
    // const inputElementAdminFee =
    //   screen.getByPlaceholderText(/Input admin fee/i);
    // const inputElementDpdRate = screen.getByPlaceholderText(/Input DPD rate/i);
    // // const inputElementBirthDate = screen.getByTestId('form-customer-birthdate');
    // const inputElementPhoneNumber =
    //   screen.getByPlaceholderText(/Input Phone Number/i);
    // const inputElementEmail = screen.getByPlaceholderText(/Input email/i);
    // const inputElementAddressKtp =
    //   screen.getByPlaceholderText(/Input address ktp/i);
    // const inputElementAddressDomicile = screen.getByPlaceholderText(
    //   /Input address domicile/i,
    // );
    // const inputElementCreditLimit =
    //   screen.getByPlaceholderText(/Input credit limit/i);
    // const inputElementBankAccount = screen.getByPlaceholderText(
    //   /Select your bank account/i,
    // );
    // const inputElementBankAccountNumber = screen.getByPlaceholderText(
    //   'Bank account number',
    // );
    // // const inputElementBankAccountNumber = screen.getByTestId(
    // //   'form-customer-bank-account',
    // // );
    // const inputElementBankAccountNumberNobu = screen.getByPlaceholderText(
    //   'Bank account number (Nobu)',
    // );
    // const nextbuttonElement = screen.getByRole('button', { name: 'Next' });

    // expect(errorMsgName).toBeInTheDocument();
    // expect(inputElementKurType).toHaveDisplayValue('');
    // expect(inputElementAdminFee).toHaveDisplayValue('');
    // expect(inputElementDpdRate).toHaveDisplayValue('');
    // // expect(inputElementBirthDate).toBeNull();
    // expect(inputElementPhoneNumber).toHaveDisplayValue('');
    // expect(inputElementEmail).toHaveDisplayValue('');
    // expect(inputElementAddressKtp).toHaveDisplayValue('');
    // expect(inputElementAddressDomicile).toHaveDisplayValue('');
    // expect(inputElementCreditLimit).toHaveDisplayValue('');
    // expect(inputElementBankAccount).toHaveDisplayValue('');
    // expect(inputElementBankAccountNumber).toHaveDisplayValue('');
    // expect(inputElementBankAccountNumberNobu).toHaveDisplayValue('');
    // expect(nextbuttonElement).toHaveClass('Mui-disabled');
  });
  // it('Form typing input', async () => {
  //   formData = {
  //     ...formData,
  //     initialData: {
  //       ...formData.initialData,
  //       kurType: {
  //         id: 1,
  //         created_at: 1674441599,
  //         updated_at: 0,
  //         created_by_id: 1,
  //         created_by_type: 'admin',
  //         updated_by_id: 0,
  //         updated_by_type: '',
  //         name: 'B2B',
  //         description: 'B2B',
  //       },
  //     },
  //   };

  //   render(
  //     <React.Suspense fallback>
  //       <MockTheme>
  //         <FormCustomer onClose={() => {}} formData={formData} />
  //       </MockTheme>
  //     </React.Suspense>,
  //   );
  //   await act(() => {
  //     store.dispatch(
  //       typeAction.fetchDataSuccess({
  //         timestamp: 1675755225,
  //         status: 'ok',
  //         message: 'Retrieved successfully',
  //         page: 1,
  //         count: 2,
  //         total: 2,
  //         data: [
  //           {
  //             id: 1,
  //             created_at: 1674441599,
  //             updated_at: 0,
  //             created_by_id: 1,
  //             created_by_type: 'admin',
  //             updated_by_id: 0,
  //             updated_by_type: '',
  //             name: 'B2B',
  //             description: 'B2B',
  //           },
  //         ],
  //       }),
  //     );
  //   });
  //   const autocomplete = screen.getByPlaceholderText('Select KUR Type');
  //   expect(autocomplete).toHaveDisplayValue('B2B');

  //   // const { container } = render(
  //   //   <React.Suspense fallback>
  //   //     <MockTheme>
  //   //       <FormCustomer onClose={() => {}} formData={formData} />
  //   //     </MockTheme>
  //   //   </React.Suspense>,
  //   // );
  //   // const autocomplete = screen.getByTestId('form-customer-kur-type');
  //   // fireEvent.click(autocomplete);
  //   // autocomplete.focus();
  //   // const input = screen.getByRole('presentation');
  //   // // const input = container.getElementsByClassName('MuiAutocomplete-popper');
  //   // // fireEvent.change(input, { target: { value: 'B2' } });
  //   // fireEvent.keyDown(autocomplete, { key: 'ArrowDown' });
  //   // fireEvent.keyDown(autocomplete, { key: 'Enter' });
  //   // expect(autocomplete).toHaveDisplayValue('B2B');

  //   // userEvent.type(autocomplete, 'a');
  //   // await waitFor(() => screen.getByText('B2B'));
  //   // fireEvent.click(screen.getByText('B2B'));
  //   // expect(autocomplete).toHaveTextContent('B2B');
  //   // const input = within(autocomplete).getByPlaceholderText(/Select KUR Type/i);
  //   // autocomplete.focus();
  //   // const inputElementName =
  //   //   screen.getByPlaceholderText(/Input customer name/i);
  //   // console.log(
  //   //   inputElementName,
  //   // );
  //   // await userEvent.setup().type(inputElementName, 'Jonny');
  //   // const inputElementKurType = screen.getByPlaceholderText(/Select KUR Type/i);
  //   // // await userEvent.setup().type(inputElementKurType, 'B2B');
  //   // const inputElementAdminFee =
  //   //   screen.getByPlaceholderText(/Input admin fee/i);
  //   // await userEvent.setup().type(inputElementAdminFee, '10');
  //   // const inputElementDpdRate = screen.getByPlaceholderText(/Input DPD rate/i);
  //   // // const inputElementBirthDate = screen.getByTestId('form-customer-birthdate');
  //   // const inputElementPhoneNumber =
  //   //   screen.getByPlaceholderText(/Input Phone Number/i);
  //   // const inputElementEmail = screen.getByPlaceholderText(/Input email/i);
  //   // const inputElementAddressKtp =
  //   //   screen.getByPlaceholderText(/Input address ktp/i);
  //   // const inputElementAddressDomicile = screen.getByPlaceholderText(
  //   //   /Input address domicile/i,
  //   // );
  //   // const inputElementCreditLimit =
  //   //   screen.getByPlaceholderText(/Input credit limit/i);
  //   // const inputElementBankAccount = screen.getByPlaceholderText(
  //   //   /Select your bank account/i,
  //   // );
  //   // const inputElementBankAccountNumber = screen.getByPlaceholderText(
  //   //   'Bank account number',
  //   // );
  //   // // const inputElementBankAccountNumber = screen.getByTestId(
  //   // //   'form-customer-bank-account',
  //   // // );
  //   // const inputElementBankAccountNumberNobu = screen.getByPlaceholderText(
  //   //   'Bank account number (Nobu)',
  //   // );
  //   // const nextbuttonElement = screen.getByRole('button', { name: 'Next' });
  //   // expect(inputElementName).toHaveDisplayValue('Jonny');
  //   // // expect(inputElementKurType).toHaveDisplayValue('B2B');
  //   // expect(inputElementAdminFee).toHaveDisplayValue('10');
  //   // expect(inputElementDpdRate).toHaveDisplayValue('');
  //   // // expect(inputElementBirthDate).toBeNull();
  //   // expect(inputElementPhoneNumber).toHaveDisplayValue('');
  //   // expect(inputElementEmail).toHaveDisplayValue('');
  //   // expect(inputElementAddressKtp).toHaveDisplayValue('');
  //   // expect(inputElementAddressDomicile).toHaveDisplayValue('');
  //   // expect(inputElementCreditLimit).toHaveDisplayValue('');
  //   // expect(inputElementBankAccount).toHaveDisplayValue('');
  //   // expect(inputElementBankAccountNumber).toHaveDisplayValue('');
  //   // expect(inputElementBankAccountNumberNobu).toHaveDisplayValue('');
  //   // expect(nextbuttonElement).toHaveClass('Mui-disabled');
  // });
});
