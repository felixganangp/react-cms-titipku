import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserDetails } from 'models/UserDetails';
import { ListResponse, MenuListParam, Response } from 'models/fetch';
import { Menu, SideBarMenu } from 'models/Menu';
import { MenuParams } from '../../models/Menu';

export interface UserDetailsProps {
  data: UserDetails | null;
  menuData: SideBarMenu[];
  loading: boolean;
  loadingMenu: boolean;
  error?: any;
  menuParams: MenuListParam;
}

const initialState: UserDetailsProps = {
  data: null,
  menuData: [],
  loading: false,
  loadingMenu: false,
  error: null,
  menuParams: {
    page: 1,
    account_type: 'cms',
    role_id: 0,
  },
};

const UserDetailsSlice = createSlice({
  name: 'UserDetails',
  initialState,
  reducers: {
    fetchUserDetails(state: UserDetailsProps, action: PayloadAction) {
      state.loading = true;
    },
    failedFetch(state: UserDetailsProps) {
      state.loading = false;
    },
    fetchUserDetailsSuccess(
      state: UserDetailsProps,
      action: PayloadAction<Response<UserDetails>>,
    ) {
      state.loading = false;
      state.data = action.payload.data;
      state.menuParams.role_id =
        action.payload.data.administrator_detail[0].administrator_role.id;
    },
    setMenuParams(
      state: UserDetailsProps,
      action: PayloadAction<MenuListParam>,
    ) {
      state.menuParams = {
        ...state.menuParams,
        ...action.payload,
      };
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fetchMenu(state: UserDetailsProps, action: PayloadAction<MenuParams>) {
      state.loadingMenu = true;
    },
    fetchMenuSuccess(
      state: UserDetailsProps,
      action: PayloadAction<SideBarMenu[]>,
    ) {
      state.loadingMenu = false;
      state.menuData = action.payload;
    },
    fetchMenuFailed(state: UserDetailsProps) {
      state.loadingMenu = false;
    },
  },
});

// action
export const userDetailsAction = UserDetailsSlice.actions;

// selector
export const selectDataUserDetails = (state: UserDetailsProps) => state.data;

// reducer
const userDetailsReducer = UserDetailsSlice.reducer;
export default userDetailsReducer;
