import { YellowToastProps } from 'components/YellowToast';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ToastProsp } from 'components/Toast';
import { RootState } from 'store';

interface UIState {
  loadingSpinner: boolean;
  toast: ToastProsp;
  yellowToast: YellowToastProps;
}

const initialState: UIState = {
  loadingSpinner: false,
  toast: {
    open: false,
    duration: 3000,
    severity: 'success',
    headMsg: '',
    message: '',
    deleted: false,
  },
  yellowToast: {
    totalItem: 0,
    open: false,
    additionalMsg: '',
    action: '',
    error: false,
  },
};
const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoadingSpinner(state: UIState, action: PayloadAction<boolean>) {
      state.loadingSpinner = action.payload;
    },
    openToast(state: UIState, action: PayloadAction<ToastProsp>) {
      state.toast = {
        ...state.toast,
        ...action.payload,
        open: true,
      };
    },
    closeToast(state: UIState) {
      state.toast.open = false;
    },
    clearToast(state: UIState) {
      state.toast = initialState.toast;
    },
    openYellowToast(state: UIState, action: PayloadAction<YellowToastProps>) {
      state.yellowToast = {
        ...state.yellowToast,
        ...action.payload,
        open: true,
      };
    },
    closeYellowToast(state: UIState) {
      state.yellowToast.open = false;
    },
    clearYellowToast(state: UIState) {
      state.yellowToast = initialState.yellowToast;
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
