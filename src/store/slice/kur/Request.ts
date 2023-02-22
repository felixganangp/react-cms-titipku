/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  RequestKUR,
  RequestKURDisplayFilter,
  RequestKURParams,
  ActionParams,
  KURRequestDetail,
} from 'models/kur/Request';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ListParams, ListResponse, Response } from 'models/fetch';

interface RequestKURProps {
  data: RequestKUR[];
  loading: boolean;
  loadingForm: boolean;
  total: number | undefined;
  params: RequestKURParams;
  displayParams: RequestKURParams;
  displayFilter: RequestKURDisplayFilter;
  detailsData: RequestKUR | null;
  detailsTableData: KURRequestDetail[];
  totalDetailsTable: number | undefined;
  detailParams: ListParams;
  creditBalance: number;
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
  displayParams: {
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
    setDisplayParams(
      state: RequestKURProps,
      action: PayloadAction<RequestKURParams>,
    ) {
      state.displayParams = {
        ...state.displayParams,
        ...action.payload,
      };
    },
    setResetParams(state: RequestKURProps) {
      state.params = initialState.params;
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
      state.data = action.payload.data || [];
      state.total = action.payload.total;
    },
    fetchDetails(
      state: RequestKURProps,
      action: PayloadAction<{ id: string | number }>,
    ) {
      state.loading = true;
    },
    fetchDetailsSuccess(
      state: RequestKURProps,
      action: PayloadAction<Response<RequestKUR>>,
    ) {
      state.loading = true;
      state.detailsData = action.payload.data;
    },
    setDetailsTableParams(
      state: RequestKURProps,
      action: PayloadAction<ListParams>,
    ) {
      state.detailParams = {
        ...state.detailParams,
        ...action.payload,
      };
    },
    fetchDetailsTable(
      state: RequestKURProps,
      action: PayloadAction<{ id: string | number; params: ListParams }>,
    ) {
      state.loading = true;
    },
    fetchDetailsTableSuccess(
      state: RequestKURProps,
      action: PayloadAction<ListResponse<KURRequestDetail>>,
    ) {
      state.loading = false;
      state.detailsTableData = action.payload.data;
      state.totalDetailsTable = action.payload.total;
    },
    approveRequest(
      state: RequestKURProps,
      action: PayloadAction<ActionParams>,
    ) {
      state.loading = true;
    },
    rejectRequest(state: RequestKURProps, action: PayloadAction<ActionParams>) {
      state.loading = true;
    },
    fetchCreditBalance(
      state: RequestKURProps,
      action: PayloadAction<{ id: string | number }>,
    ) {
      state.loading = true;
    },
    fetchCreditBalanceSuccess(
      state: RequestKURProps,
      action: PayloadAction<Response<number>>,
    ) {
      state.loading = false;
      state.creditBalance = action.payload.data;
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
