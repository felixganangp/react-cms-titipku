/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  PaymentKUR,
  PaymentKURDisplayFilter,
  PaymentKURParams,
  ActionParams,
  KURPaymentDetail,
  CreatePayment,
  BankAccount,
} from 'models/kur/Payment';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ListParams, ListResponse, Response } from 'models/fetch';
import { Customer, CustomerParams } from 'models/kur/Customer';

interface PaymentKURProps {
  data: PaymentKUR[];
  loading: boolean;
  loadingForm: boolean;
  total: number | undefined;
  params: PaymentKURParams;
  displayFilter: PaymentKURDisplayFilter;
  detailsData: PaymentKUR | null;
  detailsTableData: PaymentKUR[];
  totalDetailsTable: number | undefined;
  detailParams: ListParams;
  creditBalance: number;
  customerParams: CustomerParams;
  customersData: Customer[];
  customersTotal: number;
  selectedCustomer: Customer | null;
  bankAccounts: BankAccount[];
}

const initialState: PaymentKURProps = {
  data: [],
  loading: false,
  loadingForm: false,
  total: 0,
  params: {
    page: 1,
    count: 10,
    search: '',
  },
  displayFilter: {
    areas: [],
    types: null,
  },
  detailsData: null,
  detailsTableData: [],
  totalDetailsTable: 0,
  detailParams: {
    page: 1,
    count: 5,
  },
  creditBalance: 0,
  customerParams: {
    search: '',
    order_by: 'id',
    order_type: 'asc',
  },
  customersData: [],
  customersTotal: 0,
  selectedCustomer: null,
  bankAccounts: [],
};

const PaymentKURSlice = createSlice({
  name: 'PaymentKUR',
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fetchData(state: PaymentKURProps, action: PayloadAction<PaymentKURParams>) {
      state.loading = true;
    },
    failedFetch(state: PaymentKURProps) {
      state.loading = false;
    },
    setParams(state: PaymentKURProps, action: PayloadAction<PaymentKURParams>) {
      state.params = {
        ...state.params,
        ...action.payload,
      };
    },
    setDisplayFilter(
      state: PaymentKURProps,
      action: PayloadAction<PaymentKURDisplayFilter>,
    ) {
      state.displayFilter = {
        ...state.displayFilter,
        ...action.payload,
      };
    },
    fetchDataSuccess(
      state: PaymentKURProps,
      action: PayloadAction<ListResponse<PaymentKUR>>,
    ) {
      state.loading = false;
      state.data = action.payload.data || [];
      state.total = action.payload.total;
    },
    fetchDetails(
      state: PaymentKURProps,
      action: PayloadAction<{ id: string | number }>,
    ) {
      state.loading = true;
    },
    fetchDetailsSuccess(
      state: PaymentKURProps,
      action: PayloadAction<Response<PaymentKUR>>,
    ) {
      state.loading = true;
      state.detailsData = action.payload.data;
      state.detailsTableData = [action.payload.data];
    },
    setResetParams(state: PaymentKURProps) {
      state.params = {
        page: 1,
        count: 10,
        search: '',
      };
    },
    fetchCreditBalance(
      state: PaymentKURProps,
      action: PayloadAction<{ id: string | number }>,
    ) {
      state.loading = true;
    },
    fetchCreditBalanceSuccess(
      state: PaymentKURProps,
      action: PayloadAction<Response<number>>,
    ) {
      state.loading = false;
      state.creditBalance = action.payload.data;
    },
    approvePayment(
      state: PaymentKURProps,
      action: PayloadAction<ActionParams>,
    ) {
      state.loading = true;
    },
    rejectPayment(state: PaymentKURProps, action: PayloadAction<ActionParams>) {
      state.loading = true;
    },
    createPayment(
      state: PaymentKURProps,
      action: PayloadAction<CreatePayment>,
    ) {
      state.loadingForm = true;
    },
    createPaymentSuccess(state: PaymentKURProps) {
      state.loadingForm = false;
    },
    createPaymentFailed(state: PaymentKURProps) {
      state.loadingForm = false;
    },
    setCustomerDataParams(
      state: PaymentKURProps,
      action: PayloadAction<CustomerParams>,
    ) {
      state.customerParams = {
        ...state.customerParams,
        ...action.payload,
      };
    },
    fetchCustomerData(
      state: PaymentKURProps,
      action: PayloadAction<CustomerParams>,
    ) {
      state.loading = true;
    },
    fetchCustomerDataSuccess(
      state: PaymentKURProps,
      action: PayloadAction<ListResponse<Customer>>,
    ) {
      state.loading = false;
      state.customersData = action.payload.data || [];
      state.total = action.payload.total;
    },
    setSelectedCustomer(
      state: PaymentKURProps,
      action: PayloadAction<Customer | null>,
    ) {
      if (action.payload) {
        state.selectedCustomer = {
          ...state.selectedCustomer,
          ...action.payload,
        };
      } else state.selectedCustomer = null;
    },
    fetchBankAccount(state: PaymentKURProps, action: PayloadAction) {
      state.loading = true;
    },
    fetchBankAccountSuccess(
      state: PaymentKURProps,
      action: PayloadAction<Response<{ bank_account: BankAccount[] }>>,
    ) {
      state.bankAccounts = action.payload.data.bank_account;
    },
  },
});

// action
export const paymentKURAction = PaymentKURSlice.actions;

// selector
export const selectPaymentKUR = (state: PaymentKURProps) => state.data;

// reducer
const paymentKURReducer = PaymentKURSlice.reducer;
export default paymentKURReducer;
