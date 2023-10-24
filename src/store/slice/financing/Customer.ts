import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ListResponse, Response } from 'models/fetch';
import {
  Customer,
  CustomerType,
  CustomerParams,
} from 'models/financing/Customer';
// import { Type } from 'models/kur/Type';
// import { Area } from 'models/Area';

interface CustomerInitialProps {
  data: Customer[];
  loading: boolean;
  loadingForm: boolean;
  error?: any;
  total: number | undefined;
  params: CustomerParams;
  details: Customer | null;
  stateFilter?: {
    typeKur?: CustomerType | null;
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
  },
  stateFilter: {
    typeKur: null,
  },
  details: null,
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
    setParams(
      state: CustomerInitialProps,
      action: PayloadAction<CustomerParams>,
    ) {
      state.params = {
        ...state.params,
        ...action.payload,
      };
    },
    setFilter(
      state: CustomerInitialProps,
      action: PayloadAction<{
        typeKur: CustomerType | null;
      }>,
    ) {
      state.stateFilter = {
        ...state.stateFilter,
        ...action.payload,
      };
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
