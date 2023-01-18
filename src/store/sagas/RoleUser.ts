import { all, call, put, takeLatest } from 'redux-saga/effects';
import { roleUserAction } from 'store/slice/RoleUser';
import { uiAction } from 'store/slice/ui';

import * as AdministratorService from 'service/Administrator';
import { RoleUserResponse } from 'models/RoleUser';

function* fetchData() {
  try {
    const params = {
      page: 1,
      count: 10,
      id_status: 1,
      account_type: 'cms',
      is_exist: true,
    };
    const response: RoleUserResponse = yield call(
      AdministratorService.getAllAdministratorRole,
      params,
    );
    yield put(
      uiAction.openToast({
        headMsg: 'Success data',
        message: 'Succes Fetch data',
        severity: 'success',
      }),
    );
    yield put(roleUserAction.fetchDataSuccess(response));
  } catch (error) {
    console.log(`Failed to fetch data role list: `, error);
  }
}

function* addRoleUser({ payload }: any) {
  try {
    const response = yield call(
      AdministratorService.createAdministrator,
      payload,
    );
    yield put(
      uiAction.openToast({
        headMsg: 'Success add new role user',
        // message: 'Succes Fetch data',
        severity: 'success',
      }),
    );
    yield put(roleUserAction.addRoleUserSuccess({ error: false }));
  } catch (error) {
    yield put(
      uiAction.openToast({
        headMsg: 'Failed to add new role user',
        message: error as string,
        severity: 'error',
      }),
    );
    yield put(roleUserAction.addRoleUserSuccess({ error: true }));
    console.log(`Failed to create user: `, error);
  }
}

export default function* dashboardSaga() {
  yield takeLatest(roleUserAction.fetchData.type, fetchData);
  yield takeLatest(roleUserAction.addRoleUser.type, addRoleUser);
}
