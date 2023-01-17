import { put, takeLatest } from 'redux-saga/effects';
import { uiAction } from '../slice/ui';
import { roleAccessAction } from '../slice/RoleAccess';

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

function* addRoleAccess() {
  try {
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

export default function* saga() {
  yield takeLatest(roleAccessAction.get, fetchRoleAccess);
  yield takeLatest(roleAccessAction.add, addRoleAccess);
  yield takeLatest(roleAccessAction.update, updateRoleAccess);
}
