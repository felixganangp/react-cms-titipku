import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ListResponse } from 'models/fetch';
import { MerchantResp, MerchantParams } from 'models/Merchant';

interface MerchantInitialProps {
  data: MerchantResp[];
  loading: boolean;
  error?: any;
  params: MerchantParams;
}

const initialState: MerchantInitialProps = {
  data: [],
  loading: false,
  error: null,
  params: {
    page: 1,
  },
};

const MerchantSlice = createSlice({
  name: 'Merchant',
  initialState,
  reducers: {
    fetchData(
      state: MerchantInitialProps,
      action: PayloadAction<MerchantParams>,
    ) {
      state.loading = true;
    },
    failedFetch(state: MerchantInitialProps) {
      state.loading = false;
    },
    fetchDataSuccess(
      state: MerchantInitialProps,
      action: PayloadAction<ListResponse<MerchantResp>>,
    ) {
      state.loading = false;
      state.data = action.payload.data;
    },
    setParams(
      state: MerchantInitialProps,
      action: PayloadAction<MerchantParams>,
    ) {
      state.params = {
        ...state.params,
        ...action.payload,
      };
    },
  },
});

// Action
export const merchantAction = MerchantSlice.actions;

// Selector
export const selectDataMerchant = (state: MerchantInitialProps) => state.data;

// Reducer
const merchantReducer = MerchantSlice.reducer;
export default merchantReducer;
