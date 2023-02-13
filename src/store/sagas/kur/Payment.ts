import { call, put, select, takeLatest } from 'redux-saga/effects';
import { uiAction } from 'store/slice/ui';
// import * as service from 'service/Kur/Request';
import * as service from 'service/Kur/Payment';
import { PayloadAction } from '@reduxjs/toolkit';
import { ListParams, ListResponse, Response } from 'models/fetch';
import {
  PaymentKUR,
  PaymentKURDisplayFilter,
  PaymentKURParams,
  ActionParams,
  KURPaymentDetail,
} from 'models/kur/Payment';
import { paymentKURAction } from 'store/slice/kur/Payment';

function* fetchData(params: PayloadAction<PaymentKUR>) {
  try {
    const response: ListResponse<PaymentKUR> = yield call(
      service.getAllPaymentKUR,
      params.payload,
    );

    yield put(paymentKURAction.fetchDataSuccess(response));
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

function* fetchDetails(params: PayloadAction<{ id: string | number }>) {
  try {
    const response: Response<PaymentKUR> = yield call(
      service.getRequestDetails,
      params.payload.id,
    );

    yield put(paymentKURAction.fetchDetailsSuccess(response));
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

// function* fetchDetailsTable(
//   params: PayloadAction<{ id: string | number; params: ListParams }>,
// ) {
//   try {
//     const response: ListResponse<KURPaymentDetail> = yield call(
//       service.getDetailsTable,
//       params.payload.id,
//       params.payload.params,
//     );
//     yield put(paymentKURAction.fetchDetailsTableSuccess(response));
//   } catch (err) {
//     if (typeof err === 'string') {
//       const error = err as string;
//       yield put(
//         uiAction.openToast({
//           headMsg: 'Error get data',
//           message: error,
//           severity: 'error',
//         }),
//       );
//     } else {
//       yield put(
//         uiAction.openToast({
//           headMsg: 'Error get data',
//           message: 'interval server error',
//           severity: 'error',
//         }),
//       );
//     }
//   }
// }

export default function* requestKurSagas() {
  yield takeLatest(paymentKURAction.fetchData.type, fetchData);
  yield takeLatest(paymentKURAction.fetchDetails.type, fetchDetails);
  // yield takeLatest(paymentKURAction.fetchDetailsTable.type, fetchDetailsTable);
}
