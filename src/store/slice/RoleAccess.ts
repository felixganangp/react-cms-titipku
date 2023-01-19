import AddRoleAccess, { RoleAccess, RoleAccessParams } from 'models/RoleAccess';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AccessMenu, Menu } from '../../models/Menu';
import { IsExistResponse } from '../../models/fetch';

interface RoleAccessProps {
  data: RoleAccess[];
  menuData: [];
  loading: boolean;
  loadingForm: boolean;
  errorName: IsExistResponse;
}

interface MenuProps {
  menuData: AccessMenu[];
  loading: boolean;
  loadingForm: boolean;
}

interface CheckRoleNameProps {
  errorName?: IsExistResponse;
  loading?: boolean;
}

const initialState: RoleAccessProps = {
  data: [],
  menuData: [],
  errorName: {
    timestamp: 0,
    status: '',
    message: '',
    data: false,
  },
  loading: false,
  loadingForm: false,
};

const RoleAccessSlice = createSlice({
  name: 'RoleAccess',
  initialState,
  reducers: {
    fetchMenuList(state: MenuProps) {
      state.loading = true;
    },
    fetchMenuListSuccess(
      state: MenuProps,
      action: PayloadAction<AccessMenu[]>,
    ) {
      state.loading = false;
      state.menuData = action.payload;
    },
    checkRoleName(state: CheckRoleNameProps, action: any) {
      state.loading = true;
    },
    checkRoleNameSuccess(
      state: CheckRoleNameProps,
      action: PayloadAction<IsExistResponse>,
    ) {
      state.loading = false;
      state.errorName = action.payload;
    },
    add(state: RoleAccessProps, action: PayloadAction<AddRoleAccess>) {
      state.loadingForm = true;
    },
    fetchData(state: RoleAccessProps, action: PayloadAction<RoleAccessParams>) {
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
// action
export const roleAccessAction = RoleAccessSlice.actions;
// selector
export const selectRoleAccess = (state: RoleAccessProps) => state.data;
export const selectMenu = (state: MenuProps) => state.menuData;
// reducer
const roleAccessReducer = RoleAccessSlice.reducer;
export default roleAccessReducer;
