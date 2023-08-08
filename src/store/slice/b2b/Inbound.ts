import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Response, ListResponse } from 'models/fetch';
import {
  CreateInbound,
  Inbound,
  InboundParams,
  InboundDetail,
} from 'models/b2b/Inbound';

interface InboundProps {
  data: Inbound[];
  detailsData: InboundDetail | null;
  loading: boolean;
  loadingForm: boolean;
  error?: any;
  total: number | undefined;
  params: InboundParams;
  validMsg?: boolean;
  loadingValidMsg?: boolean;
}

const initialState: InboundProps = {
  data: [],
  detailsData: null,
  loading: false,
  loadingForm: false,
  error: null,
  total: 0,
  params: {
    page: 1,
    count: 10,
    search: '',
  },
  validMsg: false,
  loadingValidMsg: false,
};

const InboundSlice = createSlice({
  name: 'Inbound',
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fetchData(state: InboundProps, action: PayloadAction<InboundParams>) {
      state.loading = true;
    },
    failedFetch(state: InboundProps) {
      state.loading = false;
    },
    setParams(state: InboundProps, action: PayloadAction<InboundParams>) {
      state.params = {
        ...state.params,
        ...action.payload,
      };
    },
    setResetParams(state: InboundProps) {
      state.params = initialState.params;
    },
    fetchDataSuccess(
      state: InboundProps,
      action: PayloadAction<ListResponse<Inbound>>,
    ) {
      state.loading = false;
      state.data = action.payload.data || [];
      state.total = action.payload.total;
    },
    fetchDataDetail(
      state: InboundProps,
      action: PayloadAction<{ id: string }>,
    ) {
      state.loading = true;
    },
    fetchDataDetailSuccess(
      state: InboundProps,
      action: PayloadAction<Response<InboundDetail>>,
    ) {
      state.loading = false;
      state.detailsData = action.payload.data;
    },
    // addRoleUser(state: InboundProps, action: PayloadAction<CreateInbound>) {
    //   state.loadingForm = true;
    // },
    // editRoleUser(
    //   state: RoleUserProps,
    //   action: PayloadAction<CreateRoleUserPayload>,
    // ) {
    //   state.loadingForm = true;
    // },
    // editStatusRoleUser(
    //   state: RoleUserProps,
    //   action: PayloadAction<CreateRoleUserPayload>,
    // ) {
    //   state.loadingForm = true;
    // },
    // addOrEditRoleUserSuccess(
    //   state: RoleUserProps,
    //   action: PayloadAction<{ error: boolean }>,
    // ) {
    //   state.loadingForm = false;
    //   state.error = action.payload.error;
    // },
    // failedError(state: RoleUserProps, action: PayloadAction<any>) {
    //   state.loadingForm = false;
    //   state.error = action.payload.error;
    // },
    // checkEmailValid(state: RoleUserProps, action: PayloadAction<any>) {
    //   state.loadingValidMsg = true;
    // },
    // checkEmailValidSuccess(state: RoleUserProps, action: PayloadAction<any>) {
    //   state.loadingValidMsg = false;
    //   state.validMsg = action.payload.data;
    // },
  },
});

// Action
export const InboundAction = InboundSlice.actions;

// Selector
export const selectDataInbound = (state: InboundProps) => state.data;

// Reducer
const InboundReducer = InboundSlice.reducer;
export default InboundReducer;
