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
import { merchantAction } from 'store/slice/Merchant';
import { CreateCustomer } from 'models/kur/Customer';
import CustomerView from '../index';
import {
  MockKurType,
  MockArea,
  MockMerchantId1,
  MockMerchantId2,
} from './MockCustomer';
import FormCustomer from '../../Verification/components/form';

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

vi.useRealTimers();
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
  const mockArea = vi.fn((data) =>
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
  const mockMerchant = vi.fn((data) =>
    store.dispatch(
      merchantAction.fetchDataSuccess({
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
    const mockResponse = vi.fn();
    Object.defineProperty(window, 'location', {
      value: {
        hash: {
          endsWith: mockResponse,
          includes: mockResponse,
        },
        assign: mockResponse,
      },
      writable: true,
    });
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  it('[CREATE CUSTOMER] Form initial state first tab, all input have been touched, and leave error with next button disabled', async () => {
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
    render(
      <React.Suspense fallback>
        <MockTheme>
          <FormCustomer onClose={() => {}} formData={formData} />
        </MockTheme>
      </React.Suspense>,
    );
    const inputElementName =
      screen.getByPlaceholderText(/Input customer name/i);
    await act(async () => {
      await fireEvent.blur(inputElementName);
    });
    // await fireEvent.blur(allFormTexts);
    await waitFor(async () => {
      const errorMsgName = screen.getByText('Name is required');
      expect(errorMsgName).toBeInTheDocument();
    });

    const inputElementFee = screen.getByPlaceholderText(/Input admin fee/i);
    // await fireEvent.blur(inputElementFee);

    await act(async () => {
      await fireEvent.blur(inputElementFee);
    });
    // await fireEvent.blur(allFormTexts);
    await waitFor(async () => {
      const errorMsgAdminFee = screen.getByText('Admin fee is required');
      expect(errorMsgAdminFee).toBeInTheDocument();
    });

    const inputElementDpdRate = screen.getByPlaceholderText(/Input DPD rate/i);
    await act(async () => {
      await fireEvent.blur(inputElementDpdRate);
    });
    // await fireEvent.blur(allFormTexts);
    await waitFor(async () => {
      const errorMsgAdminDpdRate = screen.getByText('DPD rate is required');
      expect(errorMsgAdminDpdRate).toBeInTheDocument();
    });

    const inputElementPhoneNumber =
      screen.getByPlaceholderText(/Input Phone Number/i);
    await act(async () => {
      await fireEvent.blur(inputElementPhoneNumber);
    });
    // await fireEvent.blur(allFormTexts);
    await waitFor(async () => {
      const errorMsgAdminPhoneNumber = screen.getByText(
        'Phone Number is required',
      );
      expect(errorMsgAdminPhoneNumber).toBeInTheDocument();
    });

    const inputElementEmail = screen.getByPlaceholderText(/Input email/i);
    await act(async () => {
      await fireEvent.blur(inputElementEmail);
    });
    // await fireEvent.blur(allFormTexts);
    await waitFor(async () => {
      const errorMsgAdminEmail = screen.getByText('Email is required');
      expect(errorMsgAdminEmail).toBeInTheDocument();
    });

    const inputElementAddressKtp =
      screen.getByPlaceholderText(/Input address ktp/i);
    await act(async () => {
      await fireEvent.blur(inputElementAddressKtp);
    });
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
    await act(async () => {
      await fireEvent.blur(inputElementAddressDomicile);
    });
    // await fireEvent.blur(allFormTexts);
    await waitFor(async () => {
      const errorMsgAdminAddressDomicile = screen.getByText(
        'Address (Domicile) is required',
      );
      expect(errorMsgAdminAddressDomicile).toBeInTheDocument();
    });

    const inputElementCreditLimit =
      screen.getByPlaceholderText(/Input credit limit/i);
    await act(async () => {
      await fireEvent.blur(inputElementCreditLimit);
    });
    // await fireEvent.blur(allFormTexts);
    await waitFor(async () => {
      const errorMsgAdminCreditLimit = screen.getByText(
        'Credit limit is required',
      );
      expect(errorMsgAdminCreditLimit).toBeInTheDocument();
    });

    const inputElementBankPrimary =
      screen.getByPlaceholderText(`Bank account number`);
    await act(async () => {
      await fireEvent.blur(inputElementBankPrimary);
    });
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
    await act(async () => {
      await fireEvent.blur(inputElementBankNobu);
    });
    // await fireEvent.blur(allFormTexts);
    await waitFor(async () => {
      const errorMsgAdminBankNobu = screen.getByText(
        'Nobu account number is required',
      );
      expect(errorMsgAdminBankNobu).toBeInTheDocument();
    });

    // TYPE KUR
    const inputElementKurType = screen.getByPlaceholderText(/Select KUR Type/i);
    await act(async () => {
      await fireEvent.blur(inputElementKurType);
    });
    // await fireEvent.blur(allFormTexts);
    await waitFor(async () => {
      const errorMsgKurType = screen.getByText('KUR Type is required');
      expect(errorMsgKurType).toBeInTheDocument();
    });

    // LIST BANK KUR
    const inputElementKurListBank =
      screen.getByPlaceholderText(/Seleck bank account/i);
    await act(async () => {
      await fireEvent.blur(inputElementKurListBank);
    });
    // await fireEvent.blur(allFormTexts);
    await waitFor(async () => {
      const errorMsgKurListBank = screen.getByText('Bank account is required');
      expect(errorMsgKurListBank).toBeInTheDocument();
    });

    // BIRTH DATE
    const inputElementKurBirthDate = screen.getByPlaceholderText('dd/mm/yyyy');
    await act(async () => {
      await fireEvent.click(inputElementKurBirthDate);
      await fireEvent.focus(inputElementKurBirthDate);
    });
    await waitFor(async () => {
      await fireEvent.click(inputElementName);
      const errorMsgKurBirthDate = screen.getByText('Birth date is required');
      expect(errorMsgKurBirthDate).toBeInTheDocument();
    });
    const nextbuttonElement = screen.getByRole('button', { name: 'Next' });
    expect(nextbuttonElement).toHaveClass('Mui-disabled');
  });
  it('[CREATE CUSTOMER] Form first tab, select date', async () => {
    formData = {
      ...formData,
      initialData: {
        ...formData.initialData,
        kurType: null,
      },
    };
    render(
      <React.Suspense fallback>
        <MockTheme>
          <FormCustomer onClose={() => {}} formData={formData} />
        </MockTheme>
      </React.Suspense>,
    );
    const dateToday = new Date();
    const date = dateToday.getDate() - 1;
    // const month = dateToday.getMonth() + 1;
    // const year = dateToday.getFullYear();
    // const newDate = `${date}/0${month}/${year}`;
    // const allFormText = screen.getByText('All forms must be filled');
    // BIRTH DATE
    const inputElementKurBirthDate = screen.getByPlaceholderText('dd/mm/yyyy');
    await fireEvent.click(inputElementKurBirthDate);
    // await fireEvent.blur(allFormTexts);
    await waitFor(async () => {
      screen.getByRole('dialog');
    });
    const gridDate = within(screen.getByRole('dialog')).getByRole('grid');
    const rowGroupDate = within(gridDate).getByRole('rowgroup');
    const buttonDate = within(rowGroupDate).getByText(date, {
      selector: 'button',
    });
    await fireEvent.click(buttonDate);
    await act(async () => {
      // eslint-disable-next-line no-promise-executor-return
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    // const getDateChoosen = screen.getByText(newDate);
    expect(buttonDate).not.toBeInTheDocument();
    const nextbuttonElement = screen.getByRole('button', { name: 'Next' });
    expect(nextbuttonElement).toHaveClass('Mui-disabled');
  });
  it('[CREATE CUSTOMER] All form in the first tab has been filled with admin fee and dpd rate are 0', async () => {
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
    render(
      <React.Suspense fallback>
        <MockTheme>
          <FormCustomer onClose={() => {}} formData={formData} />
        </MockTheme>
      </React.Suspense>,
    );

    const inputElementName =
      screen.getByPlaceholderText(/Input customer name/i);
    fireEvent.change(inputElementName, { target: { value: 'Name testing' } });

    const inputElementFee = screen.getByPlaceholderText(/Input admin fee/i);
    fireEvent.change(inputElementFee, { target: { value: '0' } });

    const inputElementDpdRate = screen.getByPlaceholderText(/Input DPD rate/i);
    fireEvent.change(inputElementDpdRate, { target: { value: '0' } });

    const inputElementPhoneNumber =
      screen.getByPlaceholderText(/Input Phone Number/i);
    fireEvent.change(inputElementPhoneNumber, {
      target: { value: '1234567890' },
    });

    const inputElementEmail = screen.getByPlaceholderText(/Input email/i);
    fireEvent.change(inputElementEmail, {
      target: { value: 'test@tset.com' },
    });

    const inputElementAddressKtp =
      screen.getByPlaceholderText(/Input address ktp/i);
    fireEvent.change(inputElementAddressKtp, {
      target: { value: 'Testing address123' },
    });

    const inputElementAddressDomicile = screen.getByPlaceholderText(
      /Input address domicile/i,
    );
    fireEvent.change(inputElementAddressDomicile, {
      target: { value: 'Testing address' },
    });

    const inputElementCheckBoxAddress = screen.getByTestId(
      'form-customer-kur-checkbox-address',
    );

    await fireEvent.click(inputElementCheckBoxAddress);
    const inputElementCreditLimit =
      screen.getByPlaceholderText(/Input credit limit/i);
    fireEvent.change(inputElementCreditLimit, {
      target: { value: '20000' },
    });

    const inputElementBankPrimary =
      screen.getByPlaceholderText(`Bank account number`);
    fireEvent.change(inputElementBankPrimary, {
      target: { value: '1111111' },
    });

    const inputElementBankNobu = screen.getByPlaceholderText(
      `Bank account number (Nobu)`,
    );
    fireEvent.change(inputElementBankNobu, {
      target: { value: '1111111' },
    });

    // TYPE KUR
    const inputElementKurType = screen.getByTestId(`form-customer-kur-type`);
    fireEvent.click(inputElementKurType);
    const inputType = within(inputElementKurType).getByRole('combobox');
    fireEvent.change(inputType, { target: { value: 'b2' } });
    await act(async () => {
      // eslint-disable-next-line no-promise-executor-return
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    fireEvent.click(screen.getAllByRole('option')[0]);

    // LIST BANK KUR
    const inputElementKurListBank = screen.getByTestId(
      'form-customer-list-bank',
    );
    await fireEvent.blur(inputElementKurListBank);
    fireEvent.click(inputElementKurListBank);
    const inputListBank = within(inputElementKurListBank).getByRole('combobox');
    fireEvent.change(inputListBank, { target: { value: 'Bank Ma' } });
    await act(async () => {
      // eslint-disable-next-line no-promise-executor-return
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    fireEvent.click(screen.getAllByRole('option')[0]);

    // BIRTH DATE
    const dateToday = new Date();
    const date = dateToday.getDate() - 1;
    const inputElementKurBirthDate = screen.getByPlaceholderText('dd/mm/yyyy');
    await fireEvent.click(inputElementKurBirthDate);
    // await fireEvent.blur(allFormTexts);
    await waitFor(async () => {
      screen.getByRole('dialog');
    });
    const gridDate = within(screen.getByRole('dialog')).getByRole('grid');
    const rowGroupDate = within(gridDate).getByRole('rowgroup');
    const buttonDate = within(rowGroupDate).getByText(date, {
      selector: 'button',
    });
    await fireEvent.click(buttonDate);
    await act(async () => {
      // eslint-disable-next-line no-promise-executor-return
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    const nextbuttonElement = screen.getByRole('button', { name: 'Next' });
    expect(nextbuttonElement).not.toHaveClass('Mui-disabled');
  });
  it('[CREATE CUSTOMER] All form in the first tab has been filled and click next button', async () => {
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
    render(
      <React.Suspense fallback>
        <MockTheme>
          <FormCustomer onClose={() => {}} formData={formData} />
        </MockTheme>
      </React.Suspense>,
    );

    const buttonElementFirstTab = screen.getByText('1. Basic Info');
    const buttonElementSecondTab = screen.getByText('2. KUR Document');
    const inputElementName =
      screen.getByPlaceholderText(/Input customer name/i);
    fireEvent.change(inputElementName, { target: { value: 'Name testing' } });

    const inputElementFee = screen.getByPlaceholderText(/Input admin fee/i);
    fireEvent.change(inputElementFee, { target: { value: '0' } });

    const inputElementDpdRate = screen.getByPlaceholderText(/Input DPD rate/i);
    fireEvent.change(inputElementDpdRate, { target: { value: '0' } });

    const inputElementPhoneNumber =
      screen.getByPlaceholderText(/Input Phone Number/i);
    fireEvent.change(inputElementPhoneNumber, {
      target: { value: '1234567890' },
    });

    const inputElementEmail = screen.getByPlaceholderText(/Input email/i);
    fireEvent.change(inputElementEmail, {
      target: { value: 'test@tset.com' },
    });

    const inputElementAddressKtp =
      screen.getByPlaceholderText(/Input address ktp/i);
    fireEvent.change(inputElementAddressKtp, {
      target: { value: 'Testing address' },
    });

    const inputElementAddressDomicile = screen.getByPlaceholderText(
      /Input address domicile/i,
    );
    fireEvent.change(inputElementAddressDomicile, {
      target: { value: 'Testing address' },
    });

    const inputElementCreditLimit =
      screen.getByPlaceholderText(/Input credit limit/i);
    fireEvent.change(inputElementCreditLimit, {
      target: { value: '20000' },
    });

    const inputElementBankPrimary =
      screen.getByPlaceholderText(`Bank account number`);
    fireEvent.change(inputElementBankPrimary, {
      target: { value: '1111111' },
    });

    const inputElementBankNobu = screen.getByPlaceholderText(
      `Bank account number (Nobu)`,
    );
    fireEvent.change(inputElementBankNobu, {
      target: { value: '1111111' },
    });

    // TYPE KUR
    const inputElementKurType = screen.getByTestId(`form-customer-kur-type`);
    fireEvent.click(inputElementKurType);
    const inputType = within(inputElementKurType).getByRole('combobox');
    fireEvent.change(inputType, { target: { value: 'b2' } });
    await act(async () => {
      // eslint-disable-next-line no-promise-executor-return
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    fireEvent.click(screen.getAllByRole('option')[0]);

    // LIST BANK KUR
    const inputElementKurListBank = screen.getByTestId(
      'form-customer-list-bank',
    );
    await fireEvent.blur(inputElementKurListBank);
    fireEvent.click(inputElementKurListBank);
    const inputListBank = within(inputElementKurListBank).getByRole('combobox');
    fireEvent.change(inputListBank, { target: { value: 'Bank Ma' } });
    await act(async () => {
      // eslint-disable-next-line no-promise-executor-return
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    fireEvent.click(screen.getAllByRole('option')[0]);

    // BIRTH DATE
    const dateToday = new Date();
    const date = dateToday.getDate() - 1;
    const inputElementKurBirthDate = screen.getByPlaceholderText('dd/mm/yyyy');
    await fireEvent.click(inputElementKurBirthDate);
    // await fireEvent.blur(allFormTexts);
    await waitFor(async () => {
      screen.getByRole('dialog');
    });
    const gridDate = within(screen.getByRole('dialog')).getByRole('grid');
    const rowGroupDate = within(gridDate).getByRole('rowgroup');
    const buttonDate = within(rowGroupDate).getByText(date, {
      selector: 'button',
    });
    await fireEvent.click(buttonDate);
    await act(async () => {
      // eslint-disable-next-line no-promise-executor-return
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    const nextbuttonElement = screen.getByRole('button', { name: 'Next' });
    Element.prototype.scrollIntoView = vi.fn();
    fireEvent.click(nextbuttonElement);
    expect(buttonElementFirstTab).not.toHaveClass('Mui-selected');
    expect(buttonElementSecondTab).toHaveClass('Mui-selected');
  });

  // SECOND TAB
  it('[CREATE CUSTOMER] Form initial state second tab, all input have been touched, and leave error with save button disabled', async () => {
    await act(() => {
      mockKurType(MockKurType);
    });
    formData = {
      ...formData,
      initialData: {
        ...formData.initialData,
        name: 'Test name',
        adminFee: '2',
        dpdRate: '1',
        phoneNumber: '81287594317',
        email: 'test@test.com',
        addressKtp: 'addresssn',
        addressDomisili: 'addresssn',
        creditLimit: '100000',
        bankNumberPrimary: '123453545',
        nobuAccountNumber: '123453545',
        bankName: { name: 'Bank Mandiri', code: 'mandiri' },
        kurType: {
          id: 1,
          created_at: 1674441599,
          updated_at: 0,
          created_by_id: 1,
          created_by_type: 'admin',
          updated_by_id: 0,
          updated_by_type: '',
          name: 'B2B',
          description: 'B2B',
        },
      },
    };
    render(
      <React.Suspense fallback>
        <MockTheme>
          <FormCustomer onClose={() => {}} formData={formData} />
        </MockTheme>
      </React.Suspense>,
    );

    const buttonElementFirstTab = screen.getByText('1. Basic Info');
    const buttonElementSecondTab = screen.getByText('2. KUR Document');
    // BIRTH DATE
    const dateToday = new Date();
    const date = dateToday.getDate() - 1;
    const inputElementKurBirthDate = screen.getByPlaceholderText('dd/mm/yyyy');
    await fireEvent.click(inputElementKurBirthDate);
    // await fireEvent.blur(allFormTexts);
    await waitFor(async () => {
      screen.getByRole('dialog');
    });
    const gridDate = within(screen.getByRole('dialog')).getByRole('grid');
    const rowGroupDate = within(gridDate).getByRole('rowgroup');
    const buttonDate = within(rowGroupDate).getByText(date, {
      selector: 'button',
    });
    await fireEvent.click(buttonDate);
    await act(async () => {
      // eslint-disable-next-line no-promise-executor-return
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    const nextbuttonElement = screen.getByRole('button', { name: 'Next' });
    Element.prototype.scrollIntoView = vi.fn();
    await fireEvent.click(nextbuttonElement);
    await act(async () => {
      // eslint-disable-next-line no-promise-executor-return
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    const inputElementNik = screen.getByPlaceholderText(/Input NIK KTP/i);
    await act(async () => {
      await fireEvent.blur(inputElementNik);
    });
    // await fireEvent.blur(allFormTexts);
    await waitFor(async () => {
      const errorMsgNik = screen.getByText('NIK KTP is required');
      expect(errorMsgNik).toBeInTheDocument();
    });

    const inputElementKk = screen.getByPlaceholderText(
      /Input Kartu Keluarga number/i,
    );
    await act(async () => {
      await fireEvent.blur(inputElementKk);
    });
    // await fireEvent.blur(allFormTexts);
    await waitFor(async () => {
      const errorMsgKk = screen.getByText('Kartu Keluarga number is required');
      expect(errorMsgKk).toBeInTheDocument();
    });
    const inputElementNpwp = screen.getByPlaceholderText(/Input NPWP number/i);
    await act(async () => {
      await fireEvent.blur(inputElementNpwp);
    });
    // await fireEvent.blur(allFormTexts);
    await waitFor(async () => {
      const errorMsgNpwp = screen.getByText('NPWP number is required');
      expect(errorMsgNpwp).toBeInTheDocument();
    });
    // expect(nextbuttonElement).toHaveClass('Mui-disabled');

    // PASAR KUR
    const inputElementKurPasar = screen.getByPlaceholderText(/Cari Pasar/i);
    await act(async () => {
      await fireEvent.blur(inputElementKurPasar);
    });
    // await fireEvent.blur(allFormTexts);
    await waitFor(async () => {
      const errorMsgKurPasar = screen.getByText('Pasar is required');
      expect(errorMsgKurPasar).toBeInTheDocument();
    });
    expect(buttonElementFirstTab).not.toHaveClass('Mui-selected');
    expect(buttonElementSecondTab).toHaveClass('Mui-selected');
  });
  it('[CREATE CUSTOMER] Form initial state second tab, pasar has been selected and touch lapak and show the error', async () => {
    await act(() => {
      mockKurType(MockKurType);
      mockArea(MockArea);
    });
    formData = {
      ...formData,
      initialData: {
        ...formData.initialData,
        name: 'Test name',
        adminFee: '2',
        dpdRate: '1',
        phoneNumber: '81287594317',
        email: 'test@test.com',
        addressKtp: 'addresssn',
        addressDomisili: 'addresssn',
        creditLimit: '100000',
        bankNumberPrimary: '123453545',
        nobuAccountNumber: '123453545',
        bankName: { name: 'Bank Mandiri', code: 'mandiri' },
        kurType: {
          id: 1,
          created_at: 1674441599,
          updated_at: 0,
          created_by_id: 1,
          created_by_type: 'admin',
          updated_by_id: 0,
          updated_by_type: '',
          name: 'B2B',
          description: 'B2B',
        },
      },
    };
    render(
      <React.Suspense>
        <MockTheme>
          <FormCustomer onClose={() => {}} formData={formData} />
        </MockTheme>
      </React.Suspense>,
    );

    const indexPasar = 0;
    // BIRTH DATE
    const dateToday = new Date();
    const date = dateToday.getDate() - 1;
    const inputElementKurBirthDate = screen.getByPlaceholderText('dd/mm/yyyy');
    await fireEvent.click(inputElementKurBirthDate);
    // await fireEvent.blur(allFormTexts);
    await waitFor(async () => {
      screen.getByRole('dialog');
    });
    const gridDate = within(screen.getByRole('dialog')).getByRole('grid');
    const rowGroupDate = within(gridDate).getByRole('rowgroup');
    const buttonDate = within(rowGroupDate).getByText(date, {
      selector: 'button',
    });
    await fireEvent.click(buttonDate);
    await act(async () => {
      // eslint-disable-next-line no-promise-executor-return
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    Element.prototype.scrollIntoView = vi.fn();
    const nextbuttonElement = screen.getByRole('button', { name: 'Next' });
    await fireEvent.click(nextbuttonElement);
    await act(async () => {
      // eslint-disable-next-line no-promise-executor-return
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    // PASAR KUR
    const inputKurPasar = screen.getByTestId('form-customer-kur-pasar');
    await act(async () => {
      await fireEvent.click(inputKurPasar);
    });
    const inputPasar = within(inputKurPasar).getByRole('combobox');
    fireEvent.change(inputPasar, { target: { value: 'Pas' } });
    await act(async () => {
      // eslint-disable-next-line no-promise-executor-return
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    fireEvent.click(screen.getAllByRole('option')[indexPasar]);
    await act(async () => {
      // eslint-disable-next-line no-promise-executor-return
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    await act(() => {
      mockMerchant(MockMerchantId1);
    });
    // LAPAK KUR
    const inputElementKurLapak = screen.getByPlaceholderText(/Cari Lapak/i);
    await act(async () => {
      await fireEvent.blur(inputElementKurLapak);
    });
    // await fireEvent.blur(allFormTexts);
    await waitFor(async () => {
      const errorMsgKurLapak = screen.getByText('Lapak is required');
      expect(errorMsgKurLapak).toBeInTheDocument();
    });
  });
  it('[CREATE CUSTOMER] Form initial state second tab, previous button clicked', async () => {
    await act(() => {
      mockKurType(MockKurType);
    });
    formData = {
      ...formData,
      initialData: {
        ...formData.initialData,
        name: 'Test name',
        adminFee: '2',
        dpdRate: '1',
        phoneNumber: '81287594317',
        email: 'test@test.com',
        addressKtp: 'addresssn',
        addressDomisili: 'addresssn',
        creditLimit: '100000',
        bankNumberPrimary: '123453545',
        nobuAccountNumber: '123453545',
        bankName: { name: 'Bank Mandiri', code: 'mandiri' },
        kurType: {
          id: 1,
          created_at: 1674441599,
          updated_at: 0,
          created_by_id: 1,
          created_by_type: 'admin',
          updated_by_id: 0,
          updated_by_type: '',
          name: 'B2B',
          description: 'B2B',
        },
      },
    };
    render(
      <React.Suspense fallback>
        <MockTheme>
          <FormCustomer onClose={() => {}} formData={formData} />
        </MockTheme>
      </React.Suspense>,
    );

    const buttonElementFirstTab = screen.getByText('1. Basic Info');
    const buttonElementSecondTab = screen.getByText('2. KUR Document');
    // BIRTH DATE
    const dateToday = new Date();
    const date = dateToday.getDate() - 1;
    const inputElementKurBirthDate = screen.getByPlaceholderText('dd/mm/yyyy');
    await fireEvent.click(inputElementKurBirthDate);
    // await fireEvent.blur(allFormTexts);
    await waitFor(async () => {
      screen.getByRole('dialog');
    });
    const gridDate = within(screen.getByRole('dialog')).getByRole('grid');
    const rowGroupDate = within(gridDate).getByRole('rowgroup');
    const buttonDate = within(rowGroupDate).getByText(date, {
      selector: 'button',
    });
    await fireEvent.click(buttonDate);
    await act(async () => {
      // eslint-disable-next-line no-promise-executor-return
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    const nextbuttonElement = screen.getByRole('button', { name: 'Next' });
    Element.prototype.scrollIntoView = vi.fn();
    await fireEvent.click(nextbuttonElement);
    await act(async () => {
      // eslint-disable-next-line no-promise-executor-return
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    const prevbuttonElement = screen.getByRole('button', { name: 'Previous' });
    await fireEvent.click(prevbuttonElement);
    await act(async () => {
      // eslint-disable-next-line no-promise-executor-return
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    // expect(nextbuttonElement).toHaveClass('Mui-disabled');
    expect(buttonElementFirstTab).toHaveClass('Mui-selected');
    expect(buttonElementSecondTab).not.toHaveClass('Mui-selected');
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
  //   //   /Seleck bank account/i,
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
}, 15000);
