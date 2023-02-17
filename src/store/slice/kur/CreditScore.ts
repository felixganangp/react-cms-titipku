import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ListResponse } from 'models/fetch';
import { UserCreditScore } from 'models/kur/Customer';

interface CreditScoreInitialProps {
  data: UserCreditScore[];
  loading: boolean;
  error?: any;
  total: number | undefined;
}

const initialState: CreditScoreInitialProps = {
  data: [],
  loading: false,
  error: null,
  total: 0,
};

const CreditScoreSlice = createSlice({
  name: 'CreditScore',
  initialState,
  reducers: {
    fetchData(state: CreditScoreInitialProps) {
      state.loading = true;
    },
    failedFetch(state: CreditScoreInitialProps) {
      state.loading = false;
    },
    fetchDataSuccess(
      state: CreditScoreInitialProps,
      action: PayloadAction<ListResponse<UserCreditScore>>,
    ) {
      state.loading = false;
      state.data = action.payload.data;
    },
  },
});

// Action
export const creditScoreAction = CreditScoreSlice.actions;

// Selector
export const selectDataCreditScore = (state: CreditScoreInitialProps) =>
  state.data;

// Reducer
const creditScoreReducer = CreditScoreSlice.reducer;
export default creditScoreReducer;
