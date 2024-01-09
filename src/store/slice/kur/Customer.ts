import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ListResponse, Response } from 'models/fetch';
import {
  Customer,
  CustomerParams,
  CheckMerchantExistParams,
  UserCreditScore,
  BiChecking,
  ReviewCustomer,
  CustomerDetail,
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
  details: CustomerDetail | null;
  stateFilter?: {
    status?: number;
    area_id?: Area[];
    batch_id?: number | null;
    user_type_id?: Type | null;
  };
  loadingMerchantExist: boolean;
  merchantExistMsg: string;
  customerSelect: {
    data: Customer[];
    params: CustomerParams;
    totalCustomer: number;
    isLoading: boolean;
  };
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
    area_id: [],
    batch_id: null,
    user_type_id: null,
  },
  details: null,
  loadingMerchantExist: false,
  merchantExistMsg: '',
  customerSelect: {
    isLoading: false,
    data: [],
    params: {
      page: 1,
      count: 10,
      search: '',
      status: 1,
    },
    totalCustomer: 0,
  },
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
      action: PayloadAction<Response<CustomerDetail>>,
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
    // bulk bi checking
    bulkBiChecking(
      state: CustomerInitialProps,
      action: PayloadAction<BiChecking[]>,
    ) {
      state.loadingForm = true;
    },
    bulkBiCheckingSuccess(state: CustomerInitialProps) {
      state.loadingForm = false;
    },
    bulkBiCheckingFailed(state: CustomerInitialProps) {
      state.loadingForm = false;
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
        status: number | undefined;
        area_id: Area[] | undefined;
        batch_id: number | null;
        user_type_id: Type | null;
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
    // Customer Select ================
    fetchCustomerSelect(state, action: PayloadAction<CustomerParams>) {
      state.customerSelect.isLoading = true;
    },
    stopLodingCustomerSelect(state) {
      state.customerSelect.isLoading = false;
    },
    setCustomerSelectData(state, action: PayloadAction<Customer[]>) {
      state.customerSelect.data = action.payload;
    },
    setCustomerSelectDataMerge(state, action: PayloadAction<Customer[]>) {
      state.customerSelect.data = [
        ...state.customerSelect.data,
        ...action.payload,
      ];
    },
    setCustomerSelectTotalData(state, action: PayloadAction<number>) {
      state.customerSelect.totalCustomer = action.payload;
    },
    setParamsCustomerSelect(state, action: PayloadAction<CustomerParams>) {
      state.customerSelect.params = {
        ...state.customerSelect.params,
        ...action.payload,
      };
    },
    updateStatusCustomer(
      state: CustomerInitialProps,
      action: PayloadAction<ReviewCustomer>,
    ) {
      state.loadingForm = true;
    },
    updateStatusCustomerSuccess(state: CustomerInitialProps) {
      state.loadingForm = false;
    },
    updateStatusCustomerFailed(state: CustomerInitialProps) {
      state.loadingForm = false;
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
