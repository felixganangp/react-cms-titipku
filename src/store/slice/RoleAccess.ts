import AddRoleAccess, { RoleAccess, RoleAccessParams } from 'models/RoleAccess';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AccessMenu, Menu } from '../../models/Menu';
import { IsExistResponse, ListResponse } from '../../models/fetch';

interface RoleAccessProps {
  data: RoleAccess[];
  menuData: [];
  loading: boolean;
  loadingForm: boolean;
  errorName: IsExistResponse;
  total: number;
  params: RoleAccessParams;
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
