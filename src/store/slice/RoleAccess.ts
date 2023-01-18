import RoleAccess from '../../models/RoleAccess';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Menu } from '../../models/Menu';

interface RoleAccessProps {
  data: [];
  menuData: [];
  loading: boolean;
  loadingForm: boolean;
}

interface MenuProps {
  menuData: [];
  loading: boolean;
  loadingForm: boolean;
}

const initialState: RoleAccessProps = {
  data: [],
  menuData: [],
  loading: false,
  loadingForm: false,
};

const RoleAccessSlice = createSlice({
  name: 'RoleAccess',
  initialState,
  reducers: {
    // get(state: RoleAccessProps) {
    //   state.loading = true;
    // },
    // getDataSuccess(
    //   state: RoleAccessProps,
    //   action: PayloadAction<Menu>,
    // ) {
    //   state.loading = false;
    //   state.data = action.payload;
    // },
    fetchMenuList(state: MenuProps) {
      state.loading = true;
    },
    fetchMenuListSuccess(
      state: MenuProps,
      action: PayloadAction<Menu>,
    ) {
      state.loading = false;
      state.menuData = action.payload;
    },
    add(
      state: RoleAccessProps,
      action: PayloadAction<RoleAccess>
    ) {
      state.loadingForm = true;
    },
    update(state: RoleAccessProps) {
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
