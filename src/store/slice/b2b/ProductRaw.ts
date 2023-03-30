/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CreateRawPayload,
  ProductRaw,
  RawDisplayFilter,
  RawParams,
} from 'models/b2b/ProductRaw';
import { Category } from 'models/b2b/Category';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ListResponse } from 'models/fetch';

interface RawProps {
  loading: boolean;
  loadingFilter: boolean;
  loadingForm: boolean;
  isSuccessCreate: boolean;
  raws: ProductRaw[];
  total: number;
  categories: Category[];
  params: RawParams;
  displayFilter: RawDisplayFilter;
}

const initialState: RawProps = {
  loading: false,
  loadingFilter: false,
  loadingForm: false,
  isSuccessCreate: false,
  raws: [],
  total: 0,
  categories: [],
  params: {
    page: 1,
    count: 10,
    search: '',
  },
  displayFilter: {
    search: '',
    category: null,
  },
};

const RawSlice = createSlice({
  name: 'raw',
  initialState,
  reducers: {
    fetchCategory(state: RawProps) {
      state.loadingFilter = true;
    },
    fetchCategorySuccess(
      state: RawProps,
      action: PayloadAction<ListResponse<Category>>,
    ) {
      state.loadingFilter = false;
      state.categories = action.payload.data || [];
    },
    fetchCategoryFailed(state: RawProps) {
      state.loadingFilter = false;
    },
    setParams(state: RawProps, action: PayloadAction<RawParams>) {
      state.params = {
        ...state.params,
        ...action.payload,
      };
    },
    setDisplayFilter(state: RawProps, action: PayloadAction<RawDisplayFilter>) {
      state.displayFilter = {
        ...state.displayFilter,
        ...action.payload,
      };
    },
    fetchData(state: RawProps, action: PayloadAction<RawParams>) {
      state.loading = true;
    },
    fetchDataSuccess(
      state: RawProps,
      action: PayloadAction<ListResponse<ProductRaw>>,
    ) {
      state.total = action.payload.total || 0;
      state.raws = action.payload.data || [];
      state.loading = false;
    },
    fetchDataFailed(state: RawProps) {
      state.loading = false;
    },
    createRaw(state: RawProps, action: PayloadAction<CreateRawPayload>) {
      state.loadingForm = true;
      state.isSuccessCreate = false;
    },
    createRawSuccess(state: RawProps) {
      state.loadingForm = false;
      state.isSuccessCreate = true;
    },
    createRawFailed(state: RawProps) {
      state.loadingForm = false;
      state.isSuccessCreate = false;
    },
  },
});

// action
export const rawAction = RawSlice.actions;

// reducer
export const rawReducer = RawSlice.reducer;

export default rawReducer;
