import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ListResponse, Response } from 'models/fetch';
import {
  InvoiceKur,
  InvoiceKurDetail,
  PaymentKURParams,
} from 'models/kur/Invoice';

interface InvoiceInitialProps {
  data: InvoiceKur[];
  loading: boolean;
  total?: number;
  params: PaymentKURParams;
  details: InvoiceKur | null;
}

const initialState: InvoiceInitialProps = {
  data: [],
  loading: false,
  total: 0,
  params: {
    page: 1,
    count: 10,
    search: '',
  },
  details: null,
};

const InvoiceSlice = createSlice({
  name: 'Invoice',
  initialState,
  reducers: {
    fetchData(
      state: InvoiceInitialProps,
      action: PayloadAction<PaymentKURParams>,
    ) {
      state.loading = true;
    },
    failedFetch(state: InvoiceInitialProps) {
      state.loading = false;
    },
    fetchDataSuccess(
      state: InvoiceInitialProps,
      action: PayloadAction<ListResponse<InvoiceKur>>,
    ) {
      state.loading = false;
      state.data = action.payload.data || [];
      state.total = action.payload.total;
    },
    setParams(
      state: InvoiceInitialProps,
      action: PayloadAction<PaymentKURParams>,
    ) {
      state.params = {
        ...state.params,
        ...action.payload,
      };
    },
    setResetParams(state: InvoiceInitialProps) {
      state.params = {
        page: 1,
        count: 10,
        search: '',
      };
    },
    fetchDataDetail(
      state: InvoiceInitialProps,
      action: PayloadAction<{ id: string | number }>,
    ) {
      state.loading = true;
    },
    fetchDataDetailSuccess(
      state: InvoiceInitialProps,
      action: PayloadAction<Response<InvoiceKur>>,
    ) {
      state.loading = false;
      state.details = action.payload.data;
    },
  },
});

// Action
export const invoiceKurAction = InvoiceSlice.actions;

// Selector
export const selectDataInvoice = (state: any) => state.data;

// Reducer
const invoiceReducer = InvoiceSlice.reducer;
export default invoiceReducer;
