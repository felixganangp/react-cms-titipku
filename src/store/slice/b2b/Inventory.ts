/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inventory, InventoryParams } from 'models/b2b/Inventory';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ListResponse } from 'models/fetch';

interface InventoryProps {
  loading: boolean;
  activeDashboard: string;
  inventories: Inventory[];
  params: InventoryParams;
}

const initialState: InventoryProps = {
  loading: false,
  activeDashboard: 'all_data',
  inventories: [],
  params: {
    page: 1,
    count: 10,
    search: '',
  },
};

const InventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    setActiveDashboard(
      state: InventoryProps,
      action: PayloadAction<{ activeDashboard: string }>,
    ) {
      state.activeDashboard = action.payload.activeDashboard;
    },
    fetchData(state: InventoryProps, action: PayloadAction<InventoryParams>) {
      state.loading = true;
    },
    fetchDataSuccess(
      state: InventoryProps,
      action: PayloadAction<ListResponse<Inventory>>,
    ) {
      state.loading = false;
      state.inventories = action.payload.data || [];
    },
    fetchDataFailed(state: InventoryProps) {
      state.loading = false;
    },
  },
});

// action
export const inventoryAction = InventorySlice.actions;

// reducer
export const inventoryReducer = InventorySlice.reducer;
export default inventoryReducer;
