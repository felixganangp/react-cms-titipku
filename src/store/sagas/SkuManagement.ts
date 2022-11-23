import { put, takeLatest } from 'redux-saga/effects';
import { skuManagementAction } from 'store/slice/SkuManagement';
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
    // yield put(skuManagementAction.fetchDataSuccess('test'));
  } catch (error) {
    console.log(`Failed to fetch city list`, error);
  }
}

export default function* dashboardSaga() {
  yield takeLatest(skuManagementAction.fetchData.type, fetchData);
}
