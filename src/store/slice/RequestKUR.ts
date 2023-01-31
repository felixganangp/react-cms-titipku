import { createSlice } from '@reduxjs/toolkit';

interface RequestKURProps {
  data: [];
  loading: boolean;
  loadingForm: boolean;
  total: number | undefined;
}

const initialState: RequestKURProps = {
  data: [],
  loading: false,
  loadingForm: false,
  total: 0,
};

const RequestKURSlice = createSlice({
  name: 'RequestKUR',
  initialState,
  reducers: {},
});
