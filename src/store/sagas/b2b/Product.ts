import { PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductParams } from 'models/b2b/Product';
import { ListResponse } from 'models/fetch';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as service from 'service/B2B/Product';
import { productAction } from 'store/slice/b2b/Product';
import { uiAction } from 'store/slice/ui';
import { ProductGrade } from 'models/b2b/Grade';
import { fetchGrade } from 'service/B2B/Grade';
import { Category } from 'models/b2b/Category';
import { fetchCategory } from 'service/B2B/Category';

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
    yield put(productAction.fetchDataFailed());
  }
}

function* fetchTotalEmptyStock() {
  try {
    const response: ListResponse<Product> = yield call(service.fetchProduct, {
      status: 'empty_stock',
    });
    yield put(productAction.fetchTotalEmptyStockSuccess(response));
  } catch (err) {
    if (typeof err === 'string') {
      const error = err as string;
      yield put(
        uiAction.openToast({
          headMsg: 'Error get total empty stock',
          message: error,
          severity: 'error',
        }),
      );
    } else {
      yield put(
        uiAction.openToast({
          headMsg: 'Error get total empty stock',
          message: 'interval server error',
          severity: 'error',
        }),
      );
    }
    yield put(productAction.fetchTotalEmptyStockFailed());
  }
}

function* fetchTotalLowStock() {
  try {
    const response: ListResponse<Product> = yield call(service.fetchProduct, {
      status: 'low_stock',
    });
    yield put(productAction.fetchTotalLowStockSuccess(response));
  } catch (err) {
    if (typeof err === 'string') {
      const error = err as string;
      yield put(
        uiAction.openToast({
          headMsg: 'Error get total low stock',
          message: error,
          severity: 'error',
        }),
      );
    } else {
      yield put(
        uiAction.openToast({
          headMsg: 'Error get total low stock',
          message: 'interval server error',
          severity: 'error',
        }),
      );
    }
    yield put(productAction.fetchTotalLowStockFailed());
  }
}

function* fetchGrades() {
  try {
    const response: ListResponse<ProductGrade> = yield call(fetchGrade, {});
    yield put(productAction.fetchGradeSuccess(response));
  } catch (err) {
    if (typeof err === 'string') {
      const error = err as string;
      yield put(
        uiAction.openToast({
          headMsg: 'Error get grades',
          message: error,
          severity: 'error',
        }),
      );
    } else {
      yield put(
        uiAction.openToast({
          headMsg: 'Error get grades',
          message: 'interval server error',
          severity: 'error',
        }),
      );
    }
    yield put(productAction.fetchGradeFailed());
  }
}

function* fetchCategories() {
  try {
    const response: ListResponse<Category> = yield call(fetchCategory, {});
    yield put(productAction.fetchCategorySuccess(response));
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
    yield put(productAction.fetchCategoryFailed());
  }
}

export default function* productSagas() {
  yield takeLatest(productAction.fetchData, fetchData);
  yield takeLatest(productAction.fetchTotalEmptyStock, fetchTotalEmptyStock);
  yield takeLatest(productAction.fetchTotalLowStock, fetchTotalLowStock);
  yield takeLatest(productAction.fetchGrade, fetchGrades);
  yield takeLatest(productAction.fetchCategory, fetchCategories);
}
