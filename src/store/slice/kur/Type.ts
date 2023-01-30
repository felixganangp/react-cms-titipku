import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ListResponse } from 'models/fetch';
import { Type } from 'models/kur/Type';

interface TypeInitialProps {
  data: Type[];
  loading: boolean;
  error?: any;
  total: number | undefined;
}

const initialState: TypeInitialProps = {
  data: [],
  loading: false,
  error: null,
  total: 0,
};

const TypeSlice = createSlice({
  name: 'Type',
  initialState,
  reducers: {
    fetchData(state: TypeInitialProps) {
      state.loading = true;
    },
    failedFetch(state: TypeInitialProps) {
      state.loading = false;
    },
    fetchDataSuccess(
      state: TypeInitialProps,
      action: PayloadAction<ListResponse<Type>>,
    ) {
      state.loading = false;
      state.data = action.payload.data;
    },
  },
});

// Action
export const typeAction = TypeSlice.actions;

// Selector
export const selectDataType = (state: TypeInitialProps) => state.data;

// Reducer
const typeReducer = TypeSlice.reducer;
export default typeReducer;
