import { PayloadAction } from '@reduxjs/toolkit';
import { ProductRaw, RawParams } from 'models/b2b/ProductRaw';
import { ListResponse } from 'models/fetch';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as service from 'service/B2B/ProductRaw';
import { uiAction } from 'store/slice/ui';
import { Category } from 'models/b2b/Category';
import { fetchCategory } from 'service/B2B/Category';
import { rawAction } from '../../slice/b2b/ProductRaw';

function* fetchData(params: PayloadAction<RawParams>) {
  try {
    const response: ListResponse<ProductRaw> = yield call(
      service.fetchData,
      params.payload,
    );
    yield put(rawAction.fetchDataSuccess(response));
  } catch (err) {
    if (typeof err === 'string') {
      const error = err as string;
      yield put(
        uiAction.openToast({
          headMsg: 'Error get raw data',
          message: error,
          severity: 'error',
        }),
      );
    } else {
      yield put(
        uiAction.openToast({
          headMsg: 'Error get raw data',
          message: 'interval server error',
          severity: 'error',
        }),
      );
    }
    yield put(rawAction.fetchDataFailed());
  }
}

function* fetchCategories() {
  try {
    const response: ListResponse<Category> = yield call(fetchCategory, {});
    yield put(rawAction.fetchCategorySuccess(response));
  } catch (err) {
    if (typeof err === 'string') {
      const error = err as string;
      yield put(
        uiAction.openToast({
          headMsg: 'Error get category data',
          message: error,
          severity: 'error',
        }),
      );
    } else {
      yield put(
        uiAction.openToast({
          headMsg: 'Error get category data',
          message: 'interval server error',
          severity: 'error',
        }),
      );
    }
    yield put(rawAction.fetchCategoryFailed());
  }
}

export default function* rawSagas() {
  yield takeLatest(rawAction.fetchData.type, fetchData);
  yield takeLatest(rawAction.fetchCategory.type, fetchCategories);
}
