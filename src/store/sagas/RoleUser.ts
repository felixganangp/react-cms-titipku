import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { roleUserAction } from 'store/slice/RoleUser';
import { uiAction } from 'store/slice/ui';

import * as AdministratorService from 'service/Administrator';
import { ListResponse } from 'models/fetch';
import {
  RoleUser,
  RoleUserParams,
  CreateRoleUserPayload,
} from 'models/RoleUser';
import { userDetailsAction } from 'store/slice/UserDetails';
import { MenuParams } from 'models/Menu';

function* fetchData(params: PayloadAction<RoleUserParams>) {
  try {
    const response: ListResponse<RoleUser> = yield call(
      AdministratorService.getAllAdministratorUser,
      params.payload,
    );

    yield put(roleUserAction.fetchDataSuccess(response));
  } catch (err) {
    if (typeof err === 'string') {
      const error = err as string;
      yield put(
        uiAction.openToast({
          headMsg: 'Error get data',
          message: error,
          severity: 'error',
        }),
      );
    } else {
      yield put(
        uiAction.openToast({
          headMsg: 'Error get data',
          message: 'interval server error',
          severity: 'error',
        }),
      );
    }
    yield put(roleUserAction.failedFetch());
  }
}

function* addRoleUser({ payload }: PayloadAction<CreateRoleUserPayload>) {
  try {
    const response: ListResponse<RoleUser> = yield call(
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
    yield put(roleUserAction.addOrEditRoleUserSuccess({ error: false }));
  } catch (error) {
    yield put(
      uiAction.openToast({
        headMsg: 'Failed to add new role user',
        message: error as string,
        severity: 'error',
      }),
    );
    yield put(roleUserAction.addOrEditRoleUserSuccess({ error: true }));
    console.log(`Failed to create user: `, error);
  }
}

function* editRoleUser({ payload }: PayloadAction<CreateRoleUserPayload>) {
  try {
    const menuParams: MenuParams = yield select(
      (state) => state.userDetails.menuParams,
    );
    const response: ListResponse<RoleUser> = yield call(
      AdministratorService.editAdministrator,
      payload,
    );
    yield put(
      uiAction.openToast({
        headMsg: 'Role User Edited',
        // message: 'Succes Fetch data',
        severity: 'success',
      }),
    );
    yield put(userDetailsAction.fetchMenu(menuParams));
    yield put(roleUserAction.addOrEditRoleUserSuccess({ error: false }));
  } catch (error) {
    yield put(
      uiAction.openToast({
        headMsg: 'Failed to edit role user',
        message: error as string,
        severity: 'error',
      }),
    );
    yield put(roleUserAction.addOrEditRoleUserSuccess({ error: true }));
    console.log(`Failed to create user: `, error);
  }
}

function* editStatusRoleUser({
  payload,
}: PayloadAction<CreateRoleUserPayload>) {
  try {
    const menuParams: RoleUserParams = yield select(
      (state) => state.roleUser.params,
    );
    const response: ListResponse<RoleUser> = yield call(
      AdministratorService.editAdministrator,
      payload,
    );
    yield put(
      uiAction.openToast({
        headMsg: `Role User ${
          payload.id_status === 1 ? 'Actived' : 'Inactivated'
        }`,
        // message: 'Succes Fetch data',
        severity: 'success',
      }),
    );
    // console.log(menuParams)
    yield put(roleUserAction.fetchData(menuParams));
  } catch (error) {
    yield put(
      uiAction.openToast({
        headMsg: 'Failed to change status user',
        message: error as string,
        severity: 'error',
      }),
    );
    yield put(roleUserAction.addOrEditRoleUserSuccess({ error: true }));
    console.log(`Failed to create user: `, error);
  }
}

function* checkEmailValid(params: any) {
  try {
    const response: ListResponse<any> = yield call(
      AdministratorService.checkValidEmail,
      params.payload,
    );
    yield put(roleUserAction.checkEmailValidSuccess(response));
  } catch (error) {
    // yield put(
    //   uiAction.openToast({
    //     headMsg: 'Failed to add new role user',
    //     message: error as string,
    //     severity: 'error',
    //   }),
    // );
    // yield put(roleUserAction.addOrEditRoleUserSuccess({ error: true }));
    console.log(`Failed to create user: `, error);
  }
}

export default function* roleUserSagas() {
  yield takeLatest(roleUserAction.fetchData.type, fetchData);
  yield takeLatest(roleUserAction.addRoleUser.type, addRoleUser);
  yield takeLatest(roleUserAction.editRoleUser.type, editRoleUser);
  yield takeLatest(roleUserAction.editStatusRoleUser.type, editStatusRoleUser);
  yield takeLatest(roleUserAction.checkEmailValid.type, checkEmailValid);
}
