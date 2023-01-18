import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ListResponse } from 'models/fetch';
import { RoleAccess, RoleAccessParams } from 'models/RoleAccess';

interface RoleAccessProps {
  data: RoleAccess[];
  loading: boolean;
  loadingForm: boolean;
  total: number;
  params: RoleAccessParams;
}

const initialState: RoleAccessProps = {
  data: [],
  loading: false,
  loadingForm: false,
  total: 0,
  params: {
    page: 1,
    count: 10,
    search: '',
    account_type: 'cms',
    is_exist: true,
  },
};

const RoleAccessSlice = createSlice({
  name: 'RoleAccess',
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fetchData(state: RoleAccessProps, action: PayloadAction<RoleAccessParams>) {
      state.loading = true;
    },
    failedFetch(state: RoleAccessProps) {
      state.loading = false;
    },
    setParams(state: RoleAccessProps, action: PayloadAction<RoleAccessParams>) {
      state.params = {
        ...state.params,
        ...action.payload,
      };
    },
    fetchDataSuccess(
      state: RoleAccessProps,
      action: PayloadAction<ListResponse<RoleAccess>>,
    ) {
      state.loading = false;
      state.data = action.payload.data;
      state.total = action.payload.total;
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
