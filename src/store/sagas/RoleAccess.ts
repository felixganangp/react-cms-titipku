import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import * as AdministratorService from 'service/Administrator';
import { AddResponse, ListResponse } from 'models/fetch';
import AddRoleAccess, {
  CheckRoleNameParams,
  RoleAccess,
  RoleAccessParams,
} from 'models/RoleAccess';
import { uiAction } from '../slice/ui';
import { roleAccessAction } from '../slice/RoleAccess';
import * as service from '../../service/AdministratorRole';
import { Menu } from '../../models/Menu';

import { IsExistResponse } from '../../models/fetch';

function* addRoleAccess(body: PayloadAction<AddRoleAccess>) {
  try {
    console.log('masuk saga~', body.payload);
    const res: AddResponse<AddRoleAccess> = yield call(
      service.createAdministratorRole(body.payload),
    );
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

function* updateRoleAccess() {
  try {
    // const res = yield call()
    yield put(
      uiAction.openToast({
        headMsg: 'Success update Role Access',
        message: 'Succesfully update new role access',
        severity: 'success',
      }),
    );
  } catch (error) {
    console.log('Failed to update role access', error);
  }
}

function* fetchMenu() {
  try {
    console.log('fetch administrator control');
    const params = {
      page: 1,
      account_type: 'cms',
    };
    const res: ListResponse<Menu> = yield call(
      service.fetchAdministratorControl,
      params,
    );
    console.log('response menulist', res);
    const menuList = res.data.map((item: any) => ({
      id: item.id,
      menu: item.menu,
      is_checked: false,
      sub_menu: item.sub_menu
        ? item.sub_menu.map((child: any) => ({
            id: child.id,
            menu: child.menu,
            is_checked: false,
          }))
        : null,
    }));
    console.log('menulist', menuList);
    yield put(roleAccessAction.fetchMenuListSuccess(menuList));
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

function* checkRoleName(params: PayloadAction<CheckRoleNameParams>) {
  try {
    const param = {
      role_name: params.payload,
      account_type: 'cms',
    };
    console.log('params', params);
    const res: IsExistResponse = yield call(service.checkRoleNameExist, param);
    yield put(roleAccessAction.checkRoleNameSuccess(res));
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
  yield takeLatest(roleAccessAction.fetchMenuList.type, fetchMenu);
  yield takeLatest(roleAccessAction.add.type, addRoleAccess);
  yield takeLatest(roleAccessAction.checkRoleName.type, checkRoleName);
}
