/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CreateRawSaga,
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
  loadingAction: boolean;
  isSuccessDelete: boolean;
  isSuccessUndo: boolean;
  isSuccessCreate: boolean;
  tempIds: (number | string)[];
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
  loadingAction: false,
  isSuccessCreate: false,
  isSuccessDelete: false,
  isSuccessUndo: false,
  tempIds: [],
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
    createRaw(state: RawProps, action: PayloadAction<CreateRawSaga>) {
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
    updateRaw(
      state: RawProps,
      action: PayloadAction<{ id: string | number; body: CreateRawSaga }>,
    ) {
      state.loadingForm = true;
      state.isSuccessCreate = false;
    },
    updateRawSuccess(state: RawProps) {
      state.loadingForm = false;
      state.isSuccessCreate = true;
    },
    updateRawFailed(state: RawProps) {
      state.loadingForm = false;
      state.isSuccessCreate = false;
    },
    resetFormParam(state: RawProps) {
      state.loadingForm = false;
      state.isSuccessCreate = false;
    },
    deleteRaw(state: RawProps, action: PayloadAction<(number | string)[]>) {
      state.loadingAction = true;
      state.isSuccessDelete = false;
      state.isSuccessUndo = false;
      state.tempIds = action.payload;
    },
    deleteRawSuccess(state: RawProps) {
      state.loadingAction = false;
      state.isSuccessDelete = true;
    },
    deleteRawFailed(state: RawProps) {
      state.loadingAction = false;
      state.isSuccessDelete = false;
    },
    undoDelete(state: RawProps) {
      state.loadingAction = true;
      state.isSuccessUndo = false;
    },
    undoDeleteDone(state: RawProps) {
      state.loadingAction = false;
      state.isSuccessUndo = true;
    },
  },
});

// action
export const rawAction = RawSlice.actions;

// reducer
export const rawReducer = RawSlice.reducer;

export default rawReducer;
