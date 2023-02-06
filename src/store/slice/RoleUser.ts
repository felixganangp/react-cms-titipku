import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ListResponse } from 'models/fetch';
import {
  RoleUser,
  RoleUserParams,
  CreateRoleUserPayload,
} from 'models/RoleUser';

interface RoleUserProps {
  data: RoleUser[];
  loading: boolean;
  loadingForm: boolean;
  error?: any;
  total: number | undefined;
  params: RoleUserParams;
  validMsg?: boolean;
  loadingValidMsg?: boolean;
}

const initialState: RoleUserProps = {
  data: [],
  loading: false,
  loadingForm: false,
  error: null,
  total: 0,
  params: {
    page: 1,
    count: 10,
    search: '',
    account_type: 'cms',
  },
  validMsg: false,
  loadingValidMsg: false,
};

const RoleUserSlice = createSlice({
  name: 'RoleUser',
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fetchData(state: RoleUserProps, action: PayloadAction<RoleUserParams>) {
      state.loading = true;
    },
    failedFetch(state: RoleUserProps) {
      state.loading = false;
    },
    setParams(state: RoleUserProps, action: PayloadAction<RoleUserParams>) {
      state.params = {
        ...state.params,
        ...action.payload,
      };
    },
    setResetParams(state: RoleUserProps) {
      state.params = {
        page: 1,
        count: 10,
        search: null,
        account_type: 'cms',
      };
    },
    fetchDataSuccess(
      state: RoleUserProps,
      action: PayloadAction<ListResponse<RoleUser>>,
    ) {
      state.loading = false;
      state.data = action.payload.data || [];
      state.total = action.payload.total;
    },
    addRoleUser(
      state: RoleUserProps,
      action: PayloadAction<CreateRoleUserPayload>,
    ) {
      state.loadingForm = true;
    },
    editRoleUser(
      state: RoleUserProps,
      action: PayloadAction<CreateRoleUserPayload>,
    ) {
      state.loadingForm = true;
    },
    editStatusRoleUser(
      state: RoleUserProps,
      action: PayloadAction<CreateRoleUserPayload>,
    ) {
      state.loadingForm = true;
    },
    addOrEditRoleUserSuccess(
      state: RoleUserProps,
      action: PayloadAction<{ error: boolean }>,
    ) {
      state.loadingForm = false;
      state.error = action.payload.error;
    },
    failedError(state: RoleUserProps, action: PayloadAction<any>) {
      state.loadingForm = false;
      state.error = action.payload.error;
    },
    checkEmailValid(state: RoleUserProps, action: PayloadAction<any>) {
      state.loadingValidMsg = true;
    },
    checkEmailValidSuccess(state: RoleUserProps, action: PayloadAction<any>) {
      state.loadingValidMsg = false;
      state.validMsg = action.payload.data;
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
