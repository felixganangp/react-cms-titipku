import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RoleAccessProps {
  data: [];
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
    get(state: RoleAccessProps) {
      state.loading = true;
    },
    getDataSuccess(
      state: RoleAccessProps,
      action: PayloadAction<RoleAccessProps>,
    ) {
      state.loading = false;
      state.data = action.payload.data;
    },
    add(state: RoleAccessProps) {
      state.loadingForm = true;
    },
  },
});

export const roleAccessAction = RoleAccessSlice.actions;
export const selectRoleAccess = (state: RoleAccessProps) => state.data;
const roleAccessReducer = RoleAccessSlice.reducer;
export default roleAccessReducer;
