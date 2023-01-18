import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RoleUser, RoleUserParams } from 'models/RoleUser';

interface RoleUserProps {
  data: RoleUser[];
  loading: boolean;
  loadingForm: boolean;
  error?: any;
}

const initialState: RoleUserProps = {
  data: [],
  loading: false,
  loadingForm: false,
  error: null,
};

const RoleUserSlice = createSlice({
  name: 'RoleUser',
  initialState,
  reducers: {
    fetchData(state: RoleUserProps, action: PayloadAction<RoleUserParams>) {
      state.loading = true;
    },
    fetchDataSuccess(state: RoleUserProps, action: PayloadAction<RoleUser[]>) {
      state.loading = false;
      state.data = action.payload;
    },
    addRoleUser(state: RoleUserProps, action: PayloadAction<any>) {
      state.loadingForm = true;
    },
    addRoleUserSuccess(state: RoleUserProps, action: PayloadAction<any>) {
      state.loadingForm = false;
      state.error = action.payload.error;
    },
    failedError(state: RoleUserProps, action: PayloadAction<any>) {
      state.loadingForm = false;
      state.error = action.payload.error;
    },
  },
});

// Action
export const roleUserAction = RoleUserSlice.actions;

// Selector
export const selectDataRoleUser = (state: RoleUserProps) => state.data;

// Reducer
const roleUserReducer = RoleUserSlice.reducer;
export default roleUserReducer;
