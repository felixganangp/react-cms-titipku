import { call, put, select, takeLatest } from 'redux-saga/effects';
import { uiAction } from 'store/slice/ui';
import * as service from 'service/Kur/Payment';
import { PayloadAction } from '@reduxjs/toolkit';
import { ListResponse, Response } from 'models/fetch';
import { PaymentKUR, PaymentKURParams, ActionParams } from 'models/kur/Payment';
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
      service.getPaymentDetails,
      params.payload.id,
    );

    yield put(paymentKURAction.fetchDetailsSuccess(response));
    if (response.data.kur_user.id) {
      yield put(
        paymentKURAction.fetchCreditBalance({ id: response.data.kur_user.id }),
      );
    }
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

function* fetchCreditBalanceById(
  params: PayloadAction<{ id: string | number }>,
) {
  try {
    const response: Response<number> = yield call(
      service.getCreditBalanceById,
      params.payload.id,
    );
    yield put(paymentKURAction.fetchCreditBalanceSuccess(response));
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

function* approvePayment(params: PayloadAction<ActionParams>) {
  try {
    const listParams: PaymentKURParams = yield select(
      (state) => state.payment.params,
    );
    yield call(service.approvePayment, params.payload.id);
    yield put(
      uiAction.openToast({
        headMsg: 'Success',
        message: 'Successfully approve payment',
        severity: 'success',
      }),
    );
    // eslint-disable-next-line radix
    if (params.payload.detailsPage)
      yield put(paymentKURAction.fetchDetails({ id: params.payload.id }));
    else yield put(paymentKURAction.fetchData(listParams));
  } catch (err) {
    const headMsg = 'Failed to Approve Payment';
    if (typeof err === 'string') {
      const error = err as string;
      yield put(
        uiAction.openToast({
          headMsg,
          message: error,
          severity: 'error',
        }),
      );
    } else {
      yield put(
        uiAction.openToast({
          headMsg,
          message: 'interval server error',
          severity: 'error',
        }),
      );
    }
  }
}

function* rejectPayment(params: PayloadAction<ActionParams>) {
  try {
    const listParams: PaymentKURParams = yield select(
      (state) => state.payment.params,
    );
    yield call(service.rejectPayment, params.payload);
    yield put(
      uiAction.openToast({
        headMsg: 'Success',
        message: 'Successfully reject payment',
        severity: 'success',
      }),
    );
    // eslint-disable-next-line radix
    if (params.payload.detailsPage)
      yield put(paymentKURAction.fetchDetails({ id: params.payload.id }));
    else yield put(paymentKURAction.fetchData(listParams));
  } catch (err) {
    const headMsg = 'Failed to Reject Payment';
    if (typeof err === 'string') {
      const error = err as string;
      yield put(
        uiAction.openToast({
          headMsg,
          message: error,
          severity: 'error',
        }),
      );
    } else {
      yield put(
        uiAction.openToast({
          headMsg,
          message: 'interval server error',
          severity: 'error',
        }),
      );
    }
  }
}

export default function* paymentKurSagas() {
  yield takeLatest(paymentKURAction.fetchData.type, fetchData);
  yield takeLatest(paymentKURAction.fetchDetails.type, fetchDetails);
  yield takeLatest(paymentKURAction.approvePayment.type, approvePayment);
  yield takeLatest(paymentKURAction.rejectPayment.type, rejectPayment);
  yield takeLatest(
    paymentKURAction.fetchCreditBalance.type,
    fetchCreditBalanceById,
  );
}
