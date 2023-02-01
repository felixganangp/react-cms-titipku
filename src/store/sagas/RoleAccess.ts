import { call, put, all, select, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import * as AdministratorService from 'service/Administrator';
import { Response, ListResponse } from 'models/fetch';
import RoleAccessForm, {
  CheckRoleNameParams,
  RoleAccess,
  RoleAccessParams,
} from 'models/RoleAccess';
import * as service from 'service/AdministratorRole';
import { uiAction } from 'store/slice/ui';
import { roleAccessAction } from 'store/slice/RoleAccess';
import { Menu, MenuParams } from 'models/Menu';

import { userDetailsAction } from 'store/slice/UserDetails';
import { IsExistResponse, MenuListParam } from '../../models/fetch';

function* addRoleAccess(body: PayloadAction<RoleAccessForm>) {
  try {
    const params: RoleAccessParams = yield select(
      (state) => state.roleAccess.params,
    );
    yield call(service.createAdministratorRole, body.payload);
    yield put(roleAccessAction.fetchData(params));
  } catch (err) {
    const headMessage = 'Failed Create Role Access';
    if (typeof err === 'string') {
      const error = err as string;
      yield put(
        uiAction.openToast({
          headMsg: headMessage,
          message: error,
          severity: 'error',
        }),
      );
    } else {
      yield put(
        uiAction.openToast({
          headMsg: headMessage,
          message: 'interval server error',
          severity: 'error',
        }),
      );
    }
  }
}

function* updateRoleAccess(payload: PayloadAction<RoleAccessForm>) {
  try {
    const params: RoleAccessParams = yield select(
      (state) => state.roleAccess.params,
    );
    const menuParams: MenuParams = yield select(
      (state) => state.userDetails.menuParams,
    );
    yield call(service.updateRoleAccess, payload.payload);
    yield put(userDetailsAction.fetchMenu(menuParams));
    yield put(roleAccessAction.fetchData(params));
  } catch (err) {
    const headMessage = 'Failed Update Role Access';
    if (typeof err === 'string') {
      const error = err as string;
      yield put(
        uiAction.openToast({
          headMsg: headMessage,
          message: error,
          severity: 'error',
        }),
      );
    } else {
      yield put(
        uiAction.openToast({
          headMsg: headMessage,
          message: 'interval server error',
          severity: 'error',
        }),
      );
    }
  }
}

function* deleteRoleAccess(body: PayloadAction<{ id: string | number }>) {
  try {
    const params: RoleAccessParams = yield select(
      (state) => state.roleAccess.params,
    );
    yield call(service.deleteRoleAccess, body.payload.id);
    yield put(roleAccessAction.fetchData(params));
    yield put(
      uiAction.openToast({
        headMsg: 'Role Access Deleted',
        severity: 'success',
      }),
    );
  } catch (err) {
    const headMessage = 'Failed Delete Role Access';
    if (typeof err === 'string') {
      const error = err as string;
      yield put(
        uiAction.openToast({
          headMsg: headMessage,
          message: error,
          severity: 'error',
        }),
      );
    } else {
      yield put(
        uiAction.openToast({
          headMsg: headMessage,
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

    yield put(roleAccessAction.fetchDataSuccess(response));
  } catch (err) {
    const headMessage = 'Failed Get Role Access';
    if (typeof err === 'string') {
      const error = err as string;
      yield put(
        uiAction.openToast({
          headMsg: headMessage,
          message: error,
          severity: 'error',
        }),
      );
    } else {
      yield put(
        uiAction.openToast({
          headMsg: headMessage,
          message: 'interval server error',
          severity: 'error',
        }),
      );
    }
    yield put(roleAccessAction.failedFetch());
  }
}

function* fetchDataDetail(params: PayloadAction<{ id: string | number }>) {
  try {
    const response: Response<RoleAccess> = yield call(
      service.fetchAdministratorRoleDetails,
      params.payload.id,
    );

    yield put(roleAccessAction.fetchDataDetailSuccess(response));
    // eslint-disable-next-line radix
    const idInt = parseInt(params.payload.id.toString());
    if (params.payload.id) {
      yield put(
        roleAccessAction.fetchMenuList({
          role_id: idInt,
        }),
      );
    }
  } catch (err) {
    const headMessage = 'Failed Get Role Access Detail';
    if (typeof err === 'string') {
      const error = err as string;
      yield put(
        uiAction.openToast({
          headMsg: headMessage,
          message: error,
          severity: 'error',
        }),
      );
    } else {
      yield put(
        uiAction.openToast({
          headMsg: headMessage,
          message: 'interval server error',
          severity: 'error',
        }),
      );
    }
    yield put(roleAccessAction.failedFetch());
  }
}

function* fetchMenu(param: PayloadAction<MenuListParam>) {
  try {
    const params: { page: number; account_type: string; role_id?: number } = {
      page: 1,
      account_type: 'cms',
    };
    const roleId = param.payload.role_id || 0;

    const res: ListResponse<Menu> = yield call(
      service.fetchAdministratorControl,
      params,
    );
    const menuList = res.data.map((item: any) => ({
      id: item.id,
      menu: item.menu,
      is_checked:
        item.active_role.split(',').map(Number).indexOf(roleId) !== -1,
      sub_menu: item.sub_menu
        ? item.sub_menu.map((child: any) => ({
            id: child.id,
            menu: child.menu,
            is_checked:
              child.active_role.split(',').map(Number).indexOf(roleId) !== -1,
          }))
        : null,
    }));

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
    const res: IsExistResponse = yield call(service.checkRoleNameExist, param);
    yield put(roleAccessAction.checkRoleNameSuccess(res));
  } catch (err) {
    if (typeof err === 'string') {
      const error = err as string;
      yield put(
        uiAction.openToast({
          headMsg: 'Failed data',
          message: error,
          severity: 'error',
        }),
      );
    } else {
      yield put(
        uiAction.openToast({
          headMsg: 'Failed data',
          message: 'interval server error',
          severity: 'error',
        }),
      );
    }
  }
}

export default function* saga() {
  yield takeLatest(roleAccessAction.fetchData.type, fetchData);
  yield takeLatest(roleAccessAction.fetchDataDetail.type, fetchDataDetail);
  yield takeLatest(roleAccessAction.fetchMenuList.type, fetchMenu);
  yield takeLatest(roleAccessAction.add.type, addRoleAccess);
  yield takeLatest(roleAccessAction.delete.type, deleteRoleAccess);
  yield takeLatest(roleAccessAction.update.type, updateRoleAccess);
  yield takeLatest(roleAccessAction.checkRoleName.type, checkRoleName);
}
