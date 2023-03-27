/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ChangeStatusParams,
  IsActiveType,
  Product,
  ProductDisplayFilter,
  ProductParams,
  Status,
} from 'models/b2b/Product';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ListResponse } from 'models/fetch';
import { ProductGrade } from 'models/b2b/Grade';
import { Category } from 'models/b2b/Category';

interface ProductProps {
  activeDashboard: string;
  loading: boolean;
  loadingLowStock: boolean;
  loadingEmptyStock: boolean;
  loadingDelete: boolean;
  loadingChangeStatus: boolean;
  loadingFilter: boolean;
  totalProducts: number;
  totalLowStock: number;
  totalEmptyStock: number;
  products: Product[];
  params: ProductParams;
  loadingStockOpname: boolean;
  displayFilter: ProductDisplayFilter;
  grades: ProductGrade[];
  categories: Category[];
  status: Status[];
  tempIds: (number | string)[];
  tempChangeStatus: IsActiveType[];
}

const initialState: ProductProps = {
  activeDashboard: 'all_stock',
  loading: false,
  loadingLowStock: false,
  loadingEmptyStock: false,
  loadingDelete: false,
  loadingChangeStatus: false,
  loadingFilter: false,
  totalProducts: 0,
  totalLowStock: 0,
  totalEmptyStock: 0,
  products: [],
  params: {
    page: 1,
    count: 10,
    search: '',
  },
  loadingStockOpname: false,
  displayFilter: {
    search: '',
    grade: null,
    category: null,
    status: null,
  },
  grades: [],
  categories: [],
  status: [
    {
      value: 'ready_stock',
      label: 'Tersedia',
    },
    {
      value: 'low_stock',
      label: 'Hampir Habis',
    },
    {
      value: 'empty_stock',
      label: 'Habis',
    },
    {
      value: 'inactive',
      label: 'Inactive',
    },
    {
      value: 'nonexist',
      label: 'Deleted',
    },
  ],
  tempIds: [],
  tempChangeStatus: [],
};

const ProductSlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    setActiveDashboard(state: ProductProps, action: PayloadAction<string>) {
      state.activeDashboard = action.payload;
    },
    setParams(state: ProductProps, action: PayloadAction<ProductParams>) {
      state.params = {
        ...state.params,
        ...action.payload,
      };
    },
    setDisplayFilter(
      state: ProductProps,
      action: PayloadAction<ProductDisplayFilter>,
    ) {
      state.displayFilter = {
        ...state.displayFilter,
        ...action.payload,
      };
    },
    fetchData(state: ProductProps, action: PayloadAction<ProductParams>) {
      state.loading = true;
    },
    fetchDataSuccess(
      state: ProductProps,
      action: PayloadAction<ListResponse<Product>>,
    ) {
      state.products = action.payload.data || [];
      state.totalProducts = action.payload.total || 0;
      state.loading = false;
    },
    fetchDataFailed(state: ProductProps) {
      state.loading = false;
    },
    stockOpname(state: ProductProps, action: PayloadAction<any>) {
      state.loadingStockOpname = true;
    },
    stockOpnameSuccess(state: ProductProps) {
      state.loadingStockOpname = false;
    },
    fetchTotalLowStock(state: ProductProps) {
      state.loadingLowStock = true;
    },
    fetchTotalLowStockSuccess(
      state: ProductProps,
      action: PayloadAction<ListResponse<Product>>,
    ) {
      state.totalLowStock = action.payload.total || 0;
      state.loadingLowStock = false;
    },
    fetchTotalLowStockFailed(state: ProductProps) {
      state.loadingLowStock = false;
    },
    fetchTotalEmptyStock(state: ProductProps) {
      state.loadingEmptyStock = true;
    },
    fetchTotalEmptyStockSuccess(
      state: ProductProps,
      action: PayloadAction<ListResponse<Product>>,
    ) {
      state.totalEmptyStock = action.payload.total || 0;
      state.loadingEmptyStock = false;
    },
    fetchTotalEmptyStockFailed(state: ProductProps) {
      state.loadingEmptyStock = false;
    },
    fetchGrade(state: ProductProps) {
      state.loadingFilter = true;
    },
    fetchGradeSuccess(
      state: ProductProps,
      action: PayloadAction<ListResponse<ProductGrade>>,
    ) {
      state.loadingFilter = false;
      state.grades = action.payload.data || [];
    },
    fetchGradeFailed(state: ProductProps) {
      state.loadingFilter = false;
    },
    fetchCategory(state: ProductProps) {
      state.loadingFilter = true;
    },
    fetchCategorySuccess(
      state: ProductProps,
      action: PayloadAction<ListResponse<Category>>,
    ) {
      state.loadingFilter = false;
      state.categories = action.payload.data || [];
    },
    fetchCategoryFailed(state: ProductProps) {
      state.loadingFilter = false;
    },
    emptyTempIds(state: ProductProps) {
      state.tempIds = [];
      state.tempChangeStatus = [];
    },
    delete(state: ProductProps, action: PayloadAction<(number | string)[]>) {
      state.loadingDelete = true;
      state.tempIds = action.payload;
    },
    deleteDone(state: ProductProps) {
      state.loadingDelete = false;
    },
    undoDelete(state: ProductProps) {
      state.loadingDelete = true;
    },
    changeStatus(
      state: ProductProps,
      action: PayloadAction<ChangeStatusParams>,
    ) {
      state.loadingChangeStatus = true;
      state.tempChangeStatus = action.payload.existingStatus;
    },
    changeStatusDone(state: ProductProps) {
      state.loadingChangeStatus = false;
    },
    undoChangeStatus(state: ProductProps) {
      state.loadingChangeStatus = true;
    },
  },
});

// action
export const productAction = ProductSlice.actions;

// reducer
export const productReducer = ProductSlice.reducer;

export default productReducer;
