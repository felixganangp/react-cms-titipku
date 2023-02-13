/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  PaymentKUR,
  PaymentKURDisplayFilter,
  PaymentKURParams,
  ActionParams,
  KURPaymentDetail,
} from 'models/kur/Payment';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ListParams, ListResponse, Response } from 'models/fetch';

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
  },
});

// action
export const paymentKURAction = PaymentKURSlice.actions;

// selector
export const selectPaymentKUR = (state: PaymentKURProps) => state.data;

// reducer
const paymentKURReducer = PaymentKURSlice.reducer;
export default paymentKURReducer;
