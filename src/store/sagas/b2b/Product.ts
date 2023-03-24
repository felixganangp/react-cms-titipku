import { PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductParams } from 'models/b2b/Product';
import { ListResponse } from 'models/fetch';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import * as service from 'service/B2B/Product';
import { productAction } from 'store/slice/b2b/Product';
import { uiAction } from 'store/slice/ui';

function* fetchData(params: PayloadAction<ProductParams>) {
  try {
    const response: ListResponse<Product> = yield call(
      service.fetchProduct,
      params.payload,
    );
    yield put(productAction.fetchDataSuccess(response));
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

function* stockOpname(payload: PayloadAction<any>) {
  try {
    const paramsState: ProductParams = yield select((state) => {
      return state.product.params;
    });
    const response: ListResponse<any> = yield call(
      service.stockOpnameProduct,
      payload.payload,
    );
    yield put(productAction.stockOpnameSuccess());
    yield call(fetchData, {
      type: productAction.fetchData.type,
      payload: paramsState,
    });
    yield put(
      uiAction.openToast({
        headMsg: 'Success stock opname product',
        // message: 'Succes Fetch data',
        severity: 'success',
      }),
    );
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

export default function* productSagas() {
  yield takeLatest(productAction.fetchData, fetchData);
  yield takeLatest(productAction.stockOpname, stockOpname);
}
