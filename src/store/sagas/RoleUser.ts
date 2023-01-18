import { all, call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { roleUserAction } from 'store/slice/RoleUser';
import { uiAction } from 'store/slice/ui';

import * as AdministratorService from 'service/Administrator';
import { ListResponse } from 'models/fetch';
import { RoleUser, RoleUserParams } from 'models/RoleUser';

function* fetchData(params: PayloadAction<RoleUserParams>) {
  try {
    const response: ListResponse<RoleUser> = yield call(
      AdministratorService.getAllAdministratorRole,
      params,
    );

    yield put(roleUserAction.fetchDataSuccess(response.data));
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

function* addRoleUser() {
  try {
    // const response: ListResponse<City> = yield call(cityApi.getAll);
    yield put(
      uiAction.openToast({
        headMsg: 'Success add role',
        // message: 'Succes Fetch data',
        severity: 'success',
      }),
    );
  } catch (error) {
    console.log(`Failed to fetch city list`, error);
  }
}

export default function* roleUserSagas() {
  yield takeLatest(roleUserAction.fetchData.type, fetchData);
  yield takeLatest(roleUserAction.addRoleUser.type, addRoleUser);
}
