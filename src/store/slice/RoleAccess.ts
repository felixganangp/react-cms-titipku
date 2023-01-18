import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RoleAccess } from 'models/RoleAccess';

interface RoleAccessProps {
  data: RoleAccess[];
  loading: boolean;
  loadingForm: boolean;
}

const initialState: RoleAccessProps = {
  data: [],
  loading: false,
  loadingForm: false,
};

const RoleAccessSlice = createSlice({
  name: 'RoleAccess',
  initialState,
  reducers: {
    fetchData(state: RoleAccessProps) {
      state.loading = true;
    },
    fetchDataSuccess(
      state: RoleAccessProps,
      action: PayloadAction<RoleAccess[]>,
    ) {
      state.loading = false;
      state.data = action.payload;
    },
    addRoleUser(state: RoleAccessProps) {
      state.loadingForm = true;
    },
  },
});

export const roleAccessAction = RoleAccessSlice.actions;
export const selectRoleAccess = (state: RoleAccessProps) => state.data;
const roleAccessReducer = RoleAccessSlice.reducer;
export default roleAccessReducer;
