import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ListResponse, Response } from 'models/fetch';
import {
  CreateCustomer,
  Customer,
  CustomerParams,
  CheckMerchantExistParams,
  UserCreditScore,
} from 'models/kur/Customer';
import { Type } from 'models/kur/Type';
import { Area } from 'models/Area';

interface CustomerInitialProps {
  data: Customer[];
  loading: boolean;
  loadingForm: boolean;
  error?: any;
  total: number | undefined;
  params: CustomerParams;
  details: Customer | null;
  stateFilter?: {
    status: number;
  };
  loadingMerchantExist: boolean;
  merchantExistMsg: string;
}
const initialState: CustomerInitialProps = {
  data: [],
  loading: false,
  loadingForm: false,
  error: null,
  total: 0,
  params: {
    page: 1,
    count: 10,
    search: '',
    order_by: 'id',
    order_type: 'desc',
    status: 1,
  },
  stateFilter: {
    status: 1,
  },
  details: null,
  loadingMerchantExist: false,
  merchantExistMsg: '',
};

const CustomerSlice = createSlice({
  name: 'Customer',
  initialState,
  reducers: {
    fetchData(
      state: CustomerInitialProps,
      action: PayloadAction<CustomerParams>,
    ) {
      state.loading = true;
    },
    failedFetch(state: CustomerInitialProps) {
      state.loading = false;
    },
    fetchDataSuccess(
      state: CustomerInitialProps,
      action: PayloadAction<ListResponse<Customer>>,
    ) {
      state.loading = false;
      state.data = action.payload.data || [];
      state.total = action.payload.total;
    },
    fetchDataDetail(
      state: CustomerInitialProps,
      action: PayloadAction<{ id: string | number }>,
    ) {
      state.loading = true;
    },
    fetchDataDetailSuccess(
      state: CustomerInitialProps,
      action: PayloadAction<Response<Customer>>,
    ) {
      state.loading = false;
      state.details = action.payload.data;
    },
    setParams(
      state: CustomerInitialProps,
      action: PayloadAction<CustomerParams>,
    ) {
      state.params = {
        ...state.params,
        ...action.payload,
      };
    },
    createCustomer(
      state: CustomerInitialProps,
      action: PayloadAction<CreateCustomer>,
    ) {
      state.loadingForm = true;
    },
    createCustomerSuccess(
      state: CustomerInitialProps,
      // action: PayloadAction<CreateCustomer>,
    ) {
      state.loadingForm = false;
    },
    createCustomerFailed(
      state: CustomerInitialProps,
      // action: PayloadAction<CreateCustomer>,
    ) {
      state.loadingForm = false;
    },
    setFilter(
      state: CustomerInitialProps,
      action: PayloadAction<{
        status?: number;
      }>,
    ) {
      state.stateFilter = {
        ...state.stateFilter,
        ...action.payload,
      };
    },
    editCustomer(
      state: CustomerInitialProps,
      action: PayloadAction<CreateCustomer>,
    ) {
      state.loadingForm = true;
    },
    editCustomerSuccess(
      state: CustomerInitialProps,
      // action: PayloadAction<CreateCustomer>,
    ) {
      state.loadingForm = false;
    },
    editCustomerFailed(
      state: CustomerInitialProps,
      // action: PayloadAction<CreateCustomer>,
    ) {
      state.loadingForm = false;
    },
    checkMerchantExist(
      state: CustomerInitialProps,
      action: PayloadAction<CheckMerchantExistParams>,
    ) {
      state.loadingMerchantExist = true;
    },
    checkMerchantExistSuccess(
      state: CustomerInitialProps,
      action: PayloadAction<any>,
    ) {
      state.loadingMerchantExist = false;
      state.merchantExistMsg = action.payload.data;
    },
  },
});

// Action
export const customerAction = CustomerSlice.actions;

// Selector
export const selectDataCustomer = (state: any) => state.data;

// Reducer
const customerReducer = CustomerSlice.reducer;
export default customerReducer;
