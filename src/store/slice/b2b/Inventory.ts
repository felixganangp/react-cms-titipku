import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InventoryProps {
  loading: boolean;
  activeDashboard: string;
}

const initialState: InventoryProps = {
  loading: false,
  activeDashboard: 'all_data',
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
  },
});

// action
export const inventoryAction = InventorySlice.actions;

// reducer
export const inventoryReducer = InventorySlice.reducer;
export default inventoryReducer;
