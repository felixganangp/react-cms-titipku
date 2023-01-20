import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as service from 'service/RequestKUR';
import { uiAction } from 'store/slice/ui';

function* fetchRequestKURData(params: any) {
  try {
    const response = yield call(service.getAllRequestKUR(params));
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
  }
}
