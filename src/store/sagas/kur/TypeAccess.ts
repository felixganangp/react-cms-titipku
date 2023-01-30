import { call, put, takeLatest } from 'redux-saga/effects';
import { typeAction } from 'store/slice/kur/Type';
import { uiAction } from 'store/slice/ui';

import * as TypeService from 'service/Kur/Type';
import { ListResponse } from 'models/fetch';
import { Type } from 'models/kur/Type';

function* fetchData() {
  try {
    const response: ListResponse<Type> = yield call(TypeService.getAllTypes);

    yield put(typeAction.fetchDataSuccess(response));
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
    yield put(typeAction.failedFetch());
  }
}

export default function* customerKurSagas() {
  yield takeLatest(typeAction.fetchData.type, fetchData);
}
