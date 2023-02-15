import { call, put, takeLatest } from 'redux-saga/effects';
import { creditScoreAction } from 'store/slice/kur/CreditScore';
import { uiAction } from 'store/slice/ui';

import * as creditScoreService from 'service/Kur/CreditScore';
import { ListResponse } from 'models/fetch';
import { UserCreditScore } from 'models/kur/Customer';

function* fetchData() {
  try {
    const response: ListResponse<UserCreditScore> = yield call(
      creditScoreService.getAllCreditScores,
    );

    yield put(creditScoreAction.fetchDataSuccess(response));
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
    yield put(creditScoreAction.failedFetch());
  }
}

export default function* customerKurSagas() {
  yield takeLatest(creditScoreAction.fetchData.type, fetchData);
}
