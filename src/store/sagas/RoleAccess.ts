import { call, put, takeLatest } from 'redux-saga/effects';
import { uiAction } from '../slice/ui';
import { roleAccessAction } from '../slice/RoleAccess';
import * as service from '../../service/AdministratorRole';
import { Menu } from '../../models/Menu';

function* fetchRoleAccess() {
  try {
    // const res = yield call()
    yield put(
      uiAction.openToast({
        headMsg: 'Success data',
        message: 'Succes Fetch data',
        severity: 'success',
      }),
    );
  } catch (error) {
    console.log(`Failed to fetch city list`, error);
  }
}

function* addRoleAccess(body: any) {
  try {
    console.log('masuk saga~', body.payload);
    const res: any = yield call(service.createAdministratorRole(body.payload));
    console.log('res', res);
    yield put(
      uiAction.openToast({
        headMsg: 'Success add Role Access',
        message: 'Succesfully add new role access',
        severity: 'success',
      }),
    );
  } catch (error) {
    console.log('Failed to add role access', error);
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
    }
    const res: Menu = 
      yield call(
        service.fetchAdministratorControl,
        params
      );
    const menuList = res.data.map((item: any) => ({
      id: item.id,
      menu: item.menu,
      is_checked: false,
      sub_menu:
        item.sub_menu !== null ? item.sub_menu.map((child: any) => ({
          id: child.id,
          menu: child.menu,
          is_checked: false,
      })) : null,
    }));
    console.log('menulist', menuList);
    yield put(roleAccessAction.fetchMenuListSuccess(menuList));
  } catch (error) {
    console.log(`Failed to fetch menu list`, error);
  }
}

export default function* dashboardSaga() {
  yield takeLatest(roleAccessAction.fetchMenuList.type, fetchMenu);
  yield takeLatest(roleAccessAction.add, addRoleAccess);
}