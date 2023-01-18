import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { roleAccessAction } from 'store/slice/RoleAccess';
import { uiAction } from 'store/slice/ui';

import * as AdministratorService from 'service/Administrator';
import { ListResponse } from 'models/fetch';
import { RoleAccess, RoleAccessParams } from 'models/RoleAccess';

function* fetchData(params: PayloadAction<RoleAccessParams>) {
  try {
    const response: ListResponse<RoleAccess> = yield call(
      AdministratorService.getAllAdministratorRole,
      params.payload,
    );

    yield put(roleAccessAction.fetchDataSuccess(response.data));
  } catch (err) {
    if (typeof err === 'string') {
      const error = err as string;
      yield put(
        uiAction.openToast({
          headMsg: 'Success data',
          message: error,
          severity: 'error',
        }),
      );
    } else {
      yield put(
        uiAction.openToast({
          headMsg: 'Success data',
          message: 'interval server error',
          severity: 'error',
        }),
      );
    }
  }
}

export default function* saga() {
  yield takeLatest(roleAccessAction.fetchData.type, fetchData);
}
