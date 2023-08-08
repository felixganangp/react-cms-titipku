/* eslint-disable radix */
/* eslint-disable @typescript-eslint/naming-convention */
import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, select, takeLatest, all } from 'redux-saga/effects';
import { productAction } from 'store/slice/b2b/Product';
import { uiAction } from 'store/slice/ui';
import { typeNumberValidate } from 'utils/numberSeperator';
// models
import { ListParams, ListResponse, Response } from 'models/fetch';
import {
  ChangeStatusParams,
  IsActiveType,
  Product,
  ProductParams,
  FormInventoryTypes,
  Log,
  LogParams,
} from 'models/b2b/Product';
import { ProductGrade } from 'models/b2b/Grade';
import { Category } from 'models/b2b/Category';
import { ProductType } from 'models/b2b/Type';
import { CreateUomTypes, UomTypes } from 'models/b2b/Uom';
import {
  ProductParent,
  CreateProduct as CreateProductParent,
} from 'models/b2b/ProductParent';
// service
import * as service from 'service/B2B/Product';
import * as serviceUom from 'service/B2B/Uom';
import { fetchGrade } from 'service/B2B/Grade';
import { fetchCategory } from 'service/B2B/Category';
import { fetchTypes } from 'service/B2B/Types';

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
      count: 0,
      page: 1,
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
      page: 1,
      count: 0,
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

function* fetchTypesList() {
  try {
    const response: ListResponse<ProductType> = yield call(fetchTypes, {});
    yield put(productAction.fetchTypesSuccess(response));
  } catch (err) {
    if (typeof err === 'string') {
      const error = err as string;
      yield put(
        uiAction.openToast({
          headMsg: 'Error get types data',
          message: error,
          severity: 'error',
        }),
      );
    } else {
      yield put(
        uiAction.openToast({
          headMsg: 'Error get types data',
          message: 'interval server error',
          severity: 'error',
        }),
      );
    }
    yield put(productAction.fetchTypesFailed());
  }
}

function* stockOpname(payload: PayloadAction<any>) {
  try {
    const filter: ProductParams = yield select((state) => state.product.params);
    const response: ListResponse<any> = yield call(
      service.stockOpnameProduct,
      payload.payload,
    );
    yield put(productAction.stockOpnameSuccess());
    yield put(productAction.fetchData(filter));
    yield put(productAction.fetchTotalLowStock());
    yield put(productAction.fetchTotalEmptyStock());
  } catch (err) {
    if (typeof err === 'string') {
      const error = err as string;
      yield put(
        uiAction.openToast({
          headMsg: 'Error get data',
          message: error || 'interval server error',
          severity: 'error',
        }),
      );
    }
  }
}

function* createProduct(payload: PayloadAction<FormInventoryTypes>) {
  try {
    const { category, ...dataForm } = payload.payload;
    const body: { [key: string]: any } = {
      ...dataForm,
      product_category_id: category,
    };
    const fd = new FormData();
    Object.keys(body).forEach((val) => {
      fd.append(val, body[val]);
    });
    yield call(service.createProduct, fd);
    yield put(
      uiAction.openYellowToast({
        totalItem: 1,
        additionalMsg: '',
        action: 'successfully added!',
        error: false,
        noUndo: true,
      }),
    );
    yield put(productAction.createProductSuccess());
    const filter: ProductParams = yield select((state) => state.product.params);
    yield put(productAction.fetchData(filter));
  } catch (err) {
    yield put(productAction.resetProductForm());

    if (typeof err === 'string') {
      const error = err as string;
      yield put(
        uiAction.openToast({
          headMsg: 'Error create product',
          message: error,
          severity: 'error',
        }),
      );
    } else {
      yield put(
        uiAction.openToast({
          headMsg: 'Error create product',
          message: 'interval server error',
          severity: 'error',
        }),
      );
    }
  }
}

function* undoDelete() {
  try {
    const ids: (string | number)[] = yield select(
      (state) => state.product.tempIds,
    );
    const params: ProductParams = yield select((state) => state.product.params);
    yield call(service.deleteProduct, { is_exist: true, ids });
    yield put(productAction.deleteDone());
    yield put(productAction.fetchData(params));
  } catch (err) {
    if (typeof err === 'string') {
      const error = err as string;
      yield put(
        uiAction.openToast({
          headMsg: 'Error undo delete products',
          message: error,
          severity: 'error',
        }),
      );
    } else {
      yield put(
        uiAction.openToast({
          headMsg: 'Error undo delete products',
          message: 'interval server error',
          severity: 'error',
        }),
      );
    }
    yield put(productAction.deleteDone());
  }
}

function* deleteProduct(params: PayloadAction<(number | string)[]>) {
  try {
    const filter: ProductParams = yield select((state) => state.product.params);
    yield call(service.deleteProduct, {
      is_exist: false,
      ids: params.payload,
    });
    yield put(productAction.deleteDone());
    yield put(productAction.fetchData(filter));
  } catch (err) {
    if (typeof err === 'string') {
      const error = err as string;
      yield put(
        uiAction.openToast({
          headMsg: 'Error delete products',
          message: error,
          severity: 'error',
        }),
      );
    } else {
      yield put(
        uiAction.openToast({
          headMsg: 'Error delete products',
          message: 'interval server error',
          severity: 'error',
        }),
      );
    }
    yield put(productAction.deleteDone());
  }
}

function* changeStatus(params: PayloadAction<ChangeStatusParams>) {
  try {
    const filter: ProductParams = yield select((state) => state.product.params);
    const { is_active, ids } = params.payload.newStatus;
    yield call(service.changeStatusProduct, { is_active, ids });
    yield put(productAction.changeStatusDone());
    yield put(productAction.fetchData(filter));
  } catch (err) {
    if (typeof err === 'string') {
      const error = err as string;
      yield put(
        uiAction.openToast({
          headMsg: 'Error change status products',
          message: error,
          severity: 'error',
        }),
      );
    } else {
      yield put(
        uiAction.openToast({
          headMsg: 'Error change status products',
          message: 'interval server error',
          severity: 'error',
        }),
      );
    }
    yield put(productAction.changeStatusDone());
  }
}

function* undoChangeStatus() {
  try {
    const temps: IsActiveType[] = yield select(
      (state) => state.product.tempChangeStatus,
    );
    const filter: ProductParams = yield select((state) => state.product.params);
    yield call(service.batchUndoChangeStatus, temps);
    yield put(productAction.changeStatusDone());
    yield put(productAction.fetchData(filter));
  } catch (err) {
    if (typeof err === 'string') {
      const error = err as string;
      yield put(
        uiAction.openToast({
          headMsg: 'Error undo change status products',
          message: error,
          severity: 'error',
        }),
      );
    } else {
      yield put(
        uiAction.openToast({
          headMsg: 'Error undo change status products',
          message: 'interval server error',
          severity: 'error',
        }),
      );
    }
    yield put(productAction.changeStatusDone());
  }
}

function* fetchDetails(params: PayloadAction<string | number>) {
  try {
    const response: Response<Product> = yield call(
      service.fetchDetails,
      params.payload,
    );
    yield put(productAction.fetchDetailsSuccess(response));
  } catch (err) {
    if (typeof err === 'string') {
      const error = err as string;
      yield put(
        uiAction.openToast({
          headMsg: 'Error get details data',
          message: error,
          severity: 'error',
        }),
      );
    } else {
      yield put(
        uiAction.openToast({
          headMsg: 'Error get details data',
          message: 'interval server error',
          severity: 'error',
        }),
      );
    }
  }
}

function* fetchLog(params: PayloadAction<LogParams>) {
  try {
    const response: ListResponse<Log> = yield call(
      service.fetchLog,
      params.payload,
    );
    yield put(productAction.fetchLogSuccess(response));
  } catch (err) {
    if (typeof err === 'string') {
      const error = err as string;
      yield put(
        uiAction.openToast({
          headMsg: 'Error get log data',
          message: error,
          severity: 'error',
        }),
      );
    } else {
      yield put(
        uiAction.openToast({
          headMsg: 'Error get log data',
          message: 'interval server error',
          severity: 'error',
        }),
      );
    }
  }
}

function* updateProduct(
  payload: PayloadAction<{ id: number; data: FormInventoryTypes }>,
) {
  try {
    const { data, id } = payload.payload;
    const { category, ...dataForm } = data;
    const body: { [key: string]: any } = {
      ...dataForm,
      product_category_id: category,
    };
    const fd = new FormData();
    Object.keys(body).forEach((val) => {
      if (val === 'image' && typeof body[val] === 'string') {
        return null;
      }
      fd.append(val, body[val]);
    });
    yield call(service.updateProduct, { id, data: fd });
    yield put(
      uiAction.openYellowToast({
        totalItem: 1,
        additionalMsg: '',
        action: 'successfully updated!',
        error: false,
        noUndo: true,
      }),
    );
    yield put(productAction.updateProductSuccess());
    const filter: ProductParams = yield select((state) => state.product.params);
    yield put(productAction.fetchData(filter));
  } catch (err) {
    if (typeof err === 'string') {
      const error = err as string;
      yield put(
        uiAction.openToast({
          headMsg: 'Error create product',
          message: error,
          severity: 'error',
        }),
      );
    } else {
      yield put(
        uiAction.openToast({
          headMsg: 'Error create product',
          message: 'interval server error',
          severity: 'error',
        }),
      );
    }
    yield put(productAction.resetProductForm());
  }
}

function* fetchDataListProductMovestck(
  params: PayloadAction<{ product_parent_id: number }>,
) {
  try {
    if (params.payload.product_parent_id) {
      const response: ListResponse<Product> = yield call(
        service.fetchProductListProductMoveStk,
        params.payload,
      );
      yield put(productAction.fetchDataSuccessListProductsMoveStk(response));
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
    yield put(productAction.fetchDataFailed());
  }
}

function* moveStock(
  payload: PayloadAction<{
    from_product_id: number | undefined;
    to_product_id: number | undefined;
    stock_change: number;
  }>,
) {
  try {
    const filter: ProductParams = yield select((state) => state.product.params);
    const response: ListResponse<any> = yield call(
      service.moveStockProduct,
      payload.payload,
    );
    yield put(productAction.moveStockSuccess());
    yield put(productAction.fetchData(filter));
  } catch (err) {
    if (typeof err === 'string') {
      const error = err as string;
      yield put(
        uiAction.openToast({
          headMsg: 'Error get data',
          message: error || 'interval server error',
          severity: 'error',
        }),
      );
    }
  }
}

function* fetchUom(payload: PayloadAction<ListParams>) {
  try {
    const respon: ListResponse<UomTypes> = yield call(
      serviceUom.fetchUom,
      payload.payload,
    );

    yield put(productAction.fetchOumSuccess(respon));
  } catch (err) {
    if (typeof err === 'string') {
      const error = err as string;
      yield put(
        uiAction.openToast({
          headMsg: 'Error get data',
          message: error || 'interval server error',
          severity: 'error',
        }),
      );
    }
  }
}

function* createUom(payload: PayloadAction<CreateUomTypes>) {
  try {
    yield call(serviceUom.create, payload.payload);
    yield put(
      uiAction.openYellowToast({
        totalItem: 1,
        additionalMsg: '',
        action: 'successfully added!',
        error: false,
        noUndo: true,
      }),
    );
    yield put(productAction.successLoadingOum());
    const filter: ListParams = yield select((state) => state.product.paramsOum);
    yield put(productAction.fetchUom(filter));
  } catch (err) {
    yield put(productAction.resetUomform());

    if (typeof err === 'string') {
      const error = err as string;
      yield put(
        uiAction.openToast({
          headMsg: 'Error create Uom',
          message: error,
          severity: 'error',
        }),
      );
    } else {
      yield put(
        uiAction.openToast({
          headMsg: 'Error create Uom',
          message: 'interval server error',
          severity: 'error',
        }),
      );
    }
  }
}

function* updateUom(
  payload: PayloadAction<{ id: number; body: CreateUomTypes }>,
) {
  try {
    yield call(serviceUom.update, payload.payload.id, payload.payload.body);
    yield put(
      uiAction.openYellowToast({
        totalItem: 1,
        additionalMsg: '',
        action: 'successfully update!',
        error: false,
        noUndo: true,
      }),
    );
    yield put(productAction.successLoadingOum());
    const filter: ListParams = yield select((state) => state.product.paramsOum);
    yield put(productAction.fetchUom(filter));
  } catch (err) {
    yield put(productAction.resetUomform());

    if (typeof err === 'string') {
      const error = err as string;
      yield put(
        uiAction.openToast({
          headMsg: 'Error create Uom',
          message: error,
          severity: 'error',
        }),
      );
    } else {
      yield put(
        uiAction.openToast({
          headMsg: 'Error create Uom',
          message: 'interval server error',
          severity: 'error',
        }),
      );
    }
  }
}

function* deleteUom(payload: PayloadAction<{ id: number }>) {
  try {
    yield call(serviceUom.deleteUom, payload.payload.id);
    yield put(
      uiAction.openYellowToast({
        totalItem: 1,
        additionalMsg: '',
        action: 'successfully deleted!',
        error: false,
        noUndo: true,
      }),
    );
    yield put(productAction.successLoadingOum());
    const filter: ListParams = yield select((state) => state.product.paramsOum);
    yield put(productAction.fetchUom(filter));
  } catch (err) {
    yield put(productAction.resetUomform());

    if (typeof err === 'string') {
      const error = err as string;
      yield put(
        uiAction.openToast({
          headMsg: 'Error create Uom',
          message: error,
          severity: 'error',
        }),
      );
    } else {
      yield put(
        uiAction.openToast({
          headMsg: 'Error create Uom',
          message: 'interval server error',
          severity: 'error',
        }),
      );
    }
  }
}

export default function* productSagas() {
  yield takeLatest(productAction.stockOpname, stockOpname);
  yield takeLatest(productAction.fetchTotalLowStock, fetchTotalLowStock);
  yield takeLatest(productAction.fetchGrade, fetchGrades);
  yield takeLatest(productAction.fetchCategory, fetchCategories);
  yield takeLatest(productAction.fetchTypes, fetchTypesList);
  yield takeLatest(productAction.createProduct, createProduct);
  yield takeLatest(productAction.fetchData.type, fetchData);
  yield takeLatest(
    productAction.fetchTotalEmptyStock.type,
    fetchTotalEmptyStock,
  );
  yield takeLatest(productAction.delete.type, deleteProduct);
  yield takeLatest(productAction.undoDelete.type, undoDelete);
  yield takeLatest(productAction.changeStatus.type, changeStatus);
  yield takeLatest(productAction.undoChangeStatus.type, undoChangeStatus);
  yield takeLatest(productAction.fetchDetails.type, fetchDetails);
  yield takeLatest(productAction.fetchLog.type, fetchLog);
  yield takeLatest(
    productAction.fetchDataListProductsMoveStk.type,
    fetchDataListProductMovestck,
  );
  yield takeLatest(productAction.moveStock.type, moveStock);
  yield takeLatest(productAction.updateProduct.type, updateProduct);
  yield takeLatest(productAction.fetchUom.type, fetchUom);
  yield takeLatest(productAction.createUom.type, createUom);
  yield takeLatest(productAction.updateUom.type, updateUom);
  yield takeLatest(productAction.deleteUom.type, deleteUom);
}
