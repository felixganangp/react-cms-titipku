import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ListResponse } from 'models/fetch';
import { Supplier, SupplierParams, CreateSupplier } from 'models/b2b/Supplier';

interface SupplierProps {
  data: Supplier[];
  loading: boolean;
  loadingForm: boolean;
  error?: any;
  total: number | undefined;
  params: SupplierParams;
  validMsg?: boolean;
  loadingValidMsg?: boolean;
}

const initialState: SupplierProps = {
  data: [],
  loading: false,
  loadingForm: false,
  error: null,
  total: 0,
  params: {
    page: 1,
    count: 10,
    search: '',
  },
  validMsg: false,
  loadingValidMsg: false,
};

const SupplierSlice = createSlice({
  name: 'Supplier',
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fetchData(state: SupplierProps, action: PayloadAction<SupplierParams>) {
      state.loading = true;
    },
    failedFetch(state: SupplierProps) {
      state.loading = false;
    },
    setParams(state: SupplierProps, action: PayloadAction<SupplierParams>) {
      state.params = {
        ...state.params,
        ...action.payload,
      };
    },
    setResetParams(state: SupplierProps) {
      state.params = initialState.params;
    },
    fetchDataSuccess(
      state: SupplierProps,
      action: PayloadAction<ListResponse<Supplier>>,
    ) {
      state.loading = false;
      state.data = action.payload.data || [];
      state.total = action.payload.total;
    },
    updateSupplier(
      state: SupplierProps,
      action: PayloadAction<CreateSupplier>,
    ) {
      state.loadingForm = true;
    },
    updateSupplierSuccess(
      state: SupplierProps,
      action: PayloadAction<{ error: boolean }>,
    ) {
      state.loadingForm = false;
      state.error = action.payload.error;
    },
    failedError(state: SupplierProps, action: PayloadAction<any>) {
      state.loadingForm = false;
      state.error = action.payload.error;
    },
  },
});

// Action
export const SupplierAction = SupplierSlice.actions;

// Selector
export const selectDataSupplier = (state: SupplierProps) => state.data;

// Reducer
const SupplierReducer = SupplierSlice.reducer;
export default SupplierReducer;
