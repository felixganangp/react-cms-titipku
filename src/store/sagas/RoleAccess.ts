import { call, put, takeLatest } from 'redux-saga/effects';
import { uiAction } from '../slice/ui';
import { roleAccessAction } from '../slice/RoleAccess';
import * as service from '../../service/AdministratorRole';

function* fetchRoleAccess() {
  try {
    const res = yield call()
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
    const res: any = yield call(service.createAdministratorRole(body));
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

function* fetchAdministratorControl() {
  try {
    const res = yield call(service.fetchAdministratorControl);
    const menuList = res.data;
    // yield put(roleAccessAction.setMenuList({
    //   payload
    // }))
  } catch (error) {

  }
}

export default function* saga() {
  yield takeLatest(roleAccessAction.get, fetchRoleAccess);
  yield takeLatest(roleAccessAction.add, addRoleAccess);
  yield takeLatest(roleAccessAction.update, updateRoleAccess);
  yield takeLatest(roleAccessAction.getMenuList, fetchAdministratorControl);
}
