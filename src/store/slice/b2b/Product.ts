/* eslint-disable @typescript-eslint/no-unused-vars */
import { Product, ProductParams } from 'models/b2b/Product';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ListResponse } from 'models/fetch';

interface ProductProps {
  loading: boolean;
  activeDashboard: string;
  totalProducts: number;
  products: Product[];
  params: ProductParams;
  loadingStockOpname: boolean;
}

const initialState: ProductProps = {
  loading: false,
  activeDashboard: 'all_data',
  totalProducts: 0,
  products: [],
  params: {
    page: 1,
    count: 10,
    search: '',
  },
  loadingStockOpname: false,
};

const ProductSlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    setActiveDashboard(
      state: ProductProps,
      action: PayloadAction<{ activeDashboard: string }>,
    ) {
      state.activeDashboard = action.payload.activeDashboard;
    },
    setParams(state: ProductProps, action: PayloadAction<ProductParams>) {
      state.params = {
        ...state.params,
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
  },
});

// action
export const productAction = ProductSlice.actions;

// reducer
export const productReducer = ProductSlice.reducer;

export default productReducer;
