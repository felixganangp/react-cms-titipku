import { all, call, put, takeLatest } from 'redux-saga/effects';
import { roleUserAction } from 'store/slice/RoleUser';
import { uiAction } from 'store/slice/ui';

function* fetchData() {
  try {
    // const response: ListResponse<City> = yield call(cityApi.getAll);
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

export default function* dashboardSaga() {
  yield takeLatest(roleUserAction.fetchData.type, fetchData);
  yield takeLatest(roleUserAction.addRoleUser.type, addRoleUser);
}
