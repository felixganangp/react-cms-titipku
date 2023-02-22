import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ListResponse, Response } from 'models/fetch';
import {
  AdjustInvoice,
  InvoiceKur,
  InvoiceKurDetail,
  PaymentKURParams,
} from 'models/kur/Invoice';
import { Area } from 'models/Area';
import { Type } from 'models/kur/Type';

interface DisplayFilter {
  areas?: Area[];
  type?: Type | null;
  condition?: string | null;
  status?: string | null;
  delivery_date_start?: Date | null;
  delivery_date_end?: Date | null;
  invoice_date_start?: Date | null;
  invoice_date_end?: Date | null;
  due_date_start?: Date | null;
  due_date_end?: Date | null;
}
interface InvoiceInitialProps {
  data: InvoiceKur[];
  stateFilter: {
    status: string[];
    condition: string[];
  };
  loading: boolean;
  total?: number;
  params: PaymentKURParams;
  details: InvoiceKur | null;
  displayFilter: DisplayFilter;
  loadingForm: boolean;
}

const initialState: InvoiceInitialProps = {
  data: [],
  stateFilter: {
    status: [],
    condition: [],
  },
  displayFilter: {
    areas: [],
    type: null,
    condition: null,
    status: null,
    delivery_date_start: null,
    delivery_date_end: null,
    invoice_date_start: null,
    invoice_date_end: null,
    due_date_start: null,
    due_date_end: null,
  },
  loading: false,
  total: 0,
  params: {
    page: 1,
    count: 10,
    search: '',
  },
  details: null,
  loadingForm: false,
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
      state.params = initialState.params;
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
    fetchDataStatusInvoice() {},
    fetchDataConditionInvoice() {},
    fetchDataStatusInvoiceSuccess(
      state: InvoiceInitialProps,
      action: PayloadAction<Response<string[]>>,
    ) {
      state.stateFilter.status = action.payload.data;
    },
    fetchDataConditionInvoiceSuccess(
      state: InvoiceInitialProps,
      action: PayloadAction<Response<string[]>>,
    ) {
      state.stateFilter.condition = action.payload.data;
    },
    setDisplayFilter(
      state: InvoiceInitialProps,
      action: PayloadAction<DisplayFilter>,
    ) {
      state.displayFilter = {
        ...state.displayFilter,
        ...action.payload,
      };
    },
    setResetDisplayFilter(state: InvoiceInitialProps) {
      state.displayFilter = {
        areas: [],
        type: null,
        condition: null,
        status: null,
        delivery_date_start: null,
        delivery_date_end: null,
        invoice_date_start: null,
        invoice_date_end: null,
        due_date_start: null,
        due_date_end: null,
      };
    },
    adjust(state: InvoiceInitialProps, action: PayloadAction<AdjustInvoice>) {
      state.loadingForm = true;
    },
    adjustSuccess(state: InvoiceInitialProps) {
      state.loadingForm = false;
    },
    adjustFailed(state: InvoiceInitialProps) {
      state.loadingForm = false;
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
