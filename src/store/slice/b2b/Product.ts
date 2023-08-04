/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ChangeStatusParams,
  IsActiveType,
  Product,
  ProductDisplayFilter,
  ProductParams,
  Status,
  FormInventoryTypes,
  Log,
} from 'models/b2b/Product';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ListParams, ListResponse, Response } from 'models/fetch';
import { ProductGrade } from 'models/b2b/Grade';
import { Category } from 'models/b2b/Category';
import { ProductType } from 'models/b2b/Type';
import { LogParams } from '../../../models/b2b/Product';

interface ProductProps {
  activeDashboard: string;
  loading: boolean;
  loadingLowStock: boolean;
  loadingEmptyStock: boolean;
  loadingForm: boolean;
  isSuccessCreate: boolean;
  loadingDelete: boolean;
  loadingChangeStatus: boolean;
  loadingFilter: boolean;
  loadingDetails: boolean;
  loadingLog: boolean;
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
  tempIds: (number | string)[];
  tempChangeStatus: IsActiveType[];
  details: Product | null;
  log: Log[];
  totalLog: number;
  listProductsMoveStk: Product[];
  loadingListProductsMoveStk: boolean;
  loadingMoveStock: boolean;
  paramsLog: LogParams;
}

const initialState: ProductProps = {
  activeDashboard: 'all_stock',
  loading: false,
  loadingLowStock: false,
  loadingEmptyStock: false,
  loadingForm: false,
  isSuccessCreate: false,
  loadingDelete: false,
  loadingChangeStatus: false,
  loadingFilter: false,
  loadingDetails: false,
  loadingLog: false,
  totalProducts: 0,
  totalLowStock: 0,
  totalEmptyStock: 0,
  products: [],
  params: {
    page: 1,
    count: 10,
    search: '',
    order_by: 'updated_at',
    order_type: 'desc',
  },
  loadingStockOpname: false,
  displayFilter: {
    search: '',
    grade: null,
    category: null,
    type: null,
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
  tempIds: [],
  tempChangeStatus: [],
  details: null,
  log: [],
  totalLog: 0,
  paramsLog: {
    page: 1,
    count: 5,
  },
  listProductsMoveStk: [],
  loadingListProductsMoveStk: false,
  loadingMoveStock: false,
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
      setTimeout(() => {
        state.isSuccessCreate = false;
      }, 1000);
    },
    createProductFailed(state: ProductProps) {
      state.loadingForm = false;
      state.isSuccessCreate = false;
    },
    updateProduct(
      state: ProductProps,
      action: PayloadAction<{ id: number; data: FormInventoryTypes }>,
    ) {
      state.loadingForm = true;
      state.isSuccessCreate = false;
    },
    updateProductSuccess(state: ProductProps) {
      state.loadingForm = false;
      state.isSuccessCreate = true;
    },
    resetProductForm(state: ProductProps) {
      state.loadingForm = false;
      state.isSuccessCreate = false;
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
    fetchDetails(state: ProductProps, action: PayloadAction<number | string>) {
      state.loadingDetails = true;
    },
    fetchDetailsSuccess(
      state: ProductProps,
      action: PayloadAction<Response<Product>>,
    ) {
      state.loadingDetails = false;
      state.details = action.payload.data;
    },
    fetchDetailsFailed(state: ProductProps) {
      state.loadingDetails = false;
    },
    fetchLog(state: ProductProps, action: PayloadAction<LogParams>) {
      state.loadingLog = true;
    },
    fetchLogSuccess(
      state: ProductProps,
      action: PayloadAction<ListResponse<Log>>,
    ) {
      state.loadingLog = false;
      state.log = action.payload.data || [];
      state.totalLog = action.payload.total || 0;
    },
    fetchLogFailed(state: ProductProps) {
      state.loadingLog = false;
    },
    setLogParams(state: ProductProps, action: PayloadAction<LogParams>) {
      state.paramsLog = {
        ...state.paramsLog,
        ...action.payload,
      };
    },
    fetchDataListProductsMoveStk(
      state: ProductProps,
      action: PayloadAction<{ product_parent_id: number }>,
    ) {
      state.loadingListProductsMoveStk = true;
    },
    fetchDataSuccessListProductsMoveStk(
      state: ProductProps,
      action: PayloadAction<ListResponse<Product>>,
    ) {
      state.listProductsMoveStk = action.payload.data || [];
      // state.totalProducts = action.payload.total || 0;
      state.loadingListProductsMoveStk = false;
    },
    moveStock(state: ProductProps, action: PayloadAction<any>) {
      state.loadingMoveStock = true;
    },
    moveStockSuccess(state: ProductProps) {
      state.loadingMoveStock = false;
    },
  },
});

// action
export const productAction = ProductSlice.actions;

// reducer
export const productReducer = ProductSlice.reducer;

export default productReducer;
