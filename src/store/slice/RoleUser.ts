import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RoleUserResponse } from 'models/RoleUser';

interface RoleUserProps {
  data: [];
  loading: boolean;
  loadingForm: boolean;
}

const initialState: RoleUserProps = {
  data: [],
  loading: false,
  loadingForm: false,
};

const RoleUserSlice = createSlice({
  name: 'RoleUser',
  initialState,
  reducers: {
    fetchData(state: RoleUserProps) {
      state.loading = true;
    },
    fetchDataSuccess(
      state: RoleUserProps,
      action: PayloadAction<RoleUserResponse>,
    ) {
      state.loading = false;
      state.data = action.payload.data;
    },
    addRoleUser(state: RoleUserProps) {
      state.loadingForm = true;
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
