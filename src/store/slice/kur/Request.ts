import {
  RequestKUR,
  RequestKURDisplayFilter,
  RequestKURParams,
} from 'models/kur/Request';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ListResponse } from 'models/fetch';

interface RequestKURProps {
  data: RequestKUR[];
  loading: boolean;
  loadingForm: boolean;
  total: number | undefined;
  params: RequestKURParams;
  displayFilter: RequestKURDisplayFilter;
}

const initialState: RequestKURProps = {
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
};

const RequestKURSlice = createSlice({
  name: 'RequestKUR',
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fetchData(state: RequestKURProps, action: PayloadAction<RequestKURParams>) {
      state.loading = true;
    },
    failedFetch(state: RequestKURProps) {
      state.loading = false;
    },
    setParams(state: RequestKURProps, action: PayloadAction<RequestKURParams>) {
      state.params = {
        ...state.params,
        ...action.payload,
      };
    },
    setDisplayFilter(
      state: RequestKURProps,
      action: PayloadAction<RequestKURDisplayFilter>,
    ) {
      state.displayFilter = {
        ...state.displayFilter,
        ...action.payload,
      };
    },
    fetchDataSuccess(
      state: RequestKURProps,
      action: PayloadAction<ListResponse<RequestKUR>>,
    ) {
      state.loading = false;
      state.data = action.payload.data;
      state.total = action.payload.total;
    },
  },
});

// action
export const requestKURAction = RequestKURSlice.actions;

// selector
export const selectRequestKUR = (state: RequestKURProps) => state.data;

// reducer
const requestKURReducer = RequestKURSlice.reducer;
export default requestKURReducer;
