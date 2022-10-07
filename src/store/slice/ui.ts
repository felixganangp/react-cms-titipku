import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ToastProsp } from 'components/Toast';
import { RootState } from 'store';

interface UIState {
  toast: ToastProsp;
}

const initialState: UIState = {
  toast: {
    open: false,
    duration: 3000,
    severity: 'success',
    headMsg: '',
    message: '',
    deleted: false,
  },
};
const uiSlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    openToast(state: UIState, action: PayloadAction<ToastProsp>) {
      state.toast = {
        ...state.toast,
        ...action.payload,
        open: true,
      };
    },
    closeToast(state: UIState) {
      state.toast = {
        ...state.toast,
        open: false,
        deleted: false,
        severity: 'success',
      };
    },
  },
});

// Action
export const uiAction = uiSlice.actions;

// Selector
export const selectUIToast = (state: RootState) => state.ui.toast;

// Reducer
const uiReducer = uiSlice.reducer;
export default uiReducer;
