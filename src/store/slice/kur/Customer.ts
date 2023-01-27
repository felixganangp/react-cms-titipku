import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ListResponse } from 'models/fetch';

const initialState = {
  data: [],
  loading: false,
  loadingForm: false,
  error: null,
  total: 0,
  params: {
    page: 1,
    count: 10,
  },
};

const CustomerSlice = createSlice({
  name: 'Customer',
  initialState,
  reducers: {
    fetchData(state, action: PayloadAction<any>) {
      state.loading = true;
    },
    failedFetch(state) {
      state.loading = false;
    },
    fetchDataSuccess(state, action: PayloadAction<ListResponse<any>>) {
      state.loading = false;
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
