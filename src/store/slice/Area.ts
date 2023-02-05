import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ListResponse } from 'models/fetch';
import { Area } from 'models/Area';

interface AreaInitialProps {
  data: Area[];
  loading: boolean;
  error?: any;
}

const initialState: AreaInitialProps = {
  data: [],
  loading: false,
  error: null,
};

const AreaSlice = createSlice({
  name: 'Area',
  initialState,
  reducers: {
    fetchData(state: AreaInitialProps) {
      state.loading = true;
    },
    failedFetch(state: AreaInitialProps) {
      state.loading = false;
    },
    fetchDataSuccess(
      state: AreaInitialProps,
      action: PayloadAction<ListResponse<Area>>,
    ) {
      state.loading = false;
      state.data = action.payload.data;
    },
  },
});

// Action
export const areaAction = AreaSlice.actions;

// Selector
export const selectDataArea = (state: AreaInitialProps) => state.data;

// Reducer
const areaReducer = AreaSlice.reducer;
export default areaReducer;
