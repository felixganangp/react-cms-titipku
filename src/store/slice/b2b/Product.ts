/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Product,
  ProductDisplayFilter,
  ProductParams,
  Status,
  FormInventoryTypes,
} from 'models/b2b/Product';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ListResponse } from 'models/fetch';
import { ProductGrade } from 'models/b2b/Grade';
import { Category } from 'models/b2b/Category';
import { ProductType } from 'models/b2b/Type';

interface ProductProps {
  activeDashboard: string;
  loading: boolean;
  loadingLowStock: boolean;
  loadingEmptyStock: boolean;
  loadingForm: boolean;
  isSuccessCreate: boolean;
  totalProducts: number;
  totalLowStock: number;
  totalEmptyStock: number;
  products: Product[];
  params: ProductParams;
  loadingStockOpname: boolean;
  displayFilter: ProductDisplayFilter;
  grades: ProductGrade[];
  types: ProductType[];
  categories: Category[];
  status: Status[];
}

const initialState: ProductProps = {
  activeDashboard: 'all_stock',
  loading: false,
  loadingLowStock: false,
  loadingEmptyStock: false,
  loadingForm: false,
  isSuccessCreate: false,
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
  types: [],
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
  ],
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
      state.loading = false;
      state.products = action.payload.data || [];
      state.totalProducts = action.payload.total || 0;
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
      state.loadingLowStock = false;
      state.totalLowStock = action.payload.total || 0;
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
      state.loadingEmptyStock = false;
      state.totalEmptyStock = action.payload.total || 0;
    },
    fetchTotalEmptyStockFailed(state: ProductProps) {
      state.loadingEmptyStock = false;
    },
    fetchGrade(state: ProductProps) {
      state.loading = true;
    },
    fetchGradeSuccess(
      state: ProductProps,
      action: PayloadAction<ListResponse<ProductGrade>>,
    ) {
      state.loading = false;
      state.grades = action.payload.data || [];
    },
    fetchGradeFailed(state: ProductProps) {
      state.loading = false;
    },
    fetchCategory(state: ProductProps) {
      state.loading = true;
    },
    fetchCategorySuccess(
      state: ProductProps,
      action: PayloadAction<ListResponse<Category>>,
    ) {
      state.loading = false;
      state.categories = action.payload.data || [];
    },
    fetchCategoryFailed(state: ProductProps) {
      state.loading = false;
    },
    fetchTypes(state: ProductProps) {
      // state.loading = true;
    },
    fetchTypesSuccess(
      state: ProductProps,
      action: PayloadAction<ListResponse<ProductType>>,
    ) {
      // state.loading = false;
      state.types = action.payload.data || [];
    },
    fetchTypesFailed(state: ProductProps) {
      state.loading = false;
    },
    createProduct(
      state: ProductProps,
      action: PayloadAction<FormInventoryTypes>,
    ) {
      state.loadingForm = true;
      state.isSuccessCreate = false;
    },
    createProductSuccess(state: ProductProps) {
      state.loadingForm = false;
      state.isSuccessCreate = true;
    },
    createProductFailed(state: ProductProps) {
      state.loadingForm = false;
      state.isSuccessCreate = false;
    },
  },
});

// action
export const productAction = ProductSlice.actions;

// reducer
export const productReducer = ProductSlice.reducer;

export default productReducer;
