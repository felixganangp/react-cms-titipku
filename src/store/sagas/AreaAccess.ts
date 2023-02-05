import { call, put, takeLatest } from 'redux-saga/effects';
import { areaAction } from 'store/slice/Area';
import { uiAction } from 'store/slice/ui';

import * as AreaService from 'service/Area';
import { ListResponse } from 'models/fetch';
import { Area } from 'models/Area';

function* fetchData() {
  try {
    const response: ListResponse<Area> = yield call(AreaService.getAllAreas);

    yield put(areaAction.fetchDataSuccess(response));
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
    yield put(areaAction.failedFetch());
  }
}

export default function* customerKurSagas() {
  yield takeLatest(areaAction.fetchData.type, fetchData);
}
