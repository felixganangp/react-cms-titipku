import { call, put, takeLatest, select } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { customerAction, selectDataCustomer } from 'store/slice/kur/Customer';
import { uiAction } from 'store/slice/ui';

import * as CustomerService from 'service/Kur/Customer';
import { ListResponse, Response } from 'models/fetch';
import {
  Customer,
  CustomerParams,
  CreateCustomer,
  CreateCustomerPayload,
  KurUserDocumentPayload,
  CheckMerchantExistParams,
  BiChecking,
  ReviewCustomer,
  VerifyCustomer,
} from 'models/kur/Customer';

interface ImageUpdatePayload {
  id: number | null | undefined;
  is_update: boolean;
  document_type: 'ktp' | 'kk' | 'npwp' | 'sku'; // available options : ktp, kk, npwp, sku
  document_filepath?: string;
  document_number?: string;
}
function* fetchData(params: PayloadAction<CustomerParams>) {
  try {
    const advanceParams: any = {};
    if (
      // @ts-ignore
      params.payload?.advance &&
      // @ts-ignore
      Object.keys(params.payload?.advance || {}).length > 0
    ) {
      // @ts-ignore
      const values = params.payload?.advance;

      const payload = {
        // @ts-ignore
        area_id: values.area.map((val) => val.id),
        // @ts-ignore
        category_jelajah_id: values.category_jelajah.map((val) => val.id),
        batch_id: values.batch,
        user_type_id: values.user_type_id,
        min_limit_request: values.min_limit_request,
        max_limit_request: values.max_limit_request,
        min_limit_cash: values.min_limit_cash,
        max_limit_cash: values.max_limit_cash,
        // @ts-ignore
        min_date_created: values.min_date_created?.unix(),
        // @ts-ignore
        max_date_created: values.max_date_created?.unix(),
        // @ts-ignore
        min_date_joined: values.min_date_joined?.unix(),
        // @ts-ignore
        max_date_joined: values.max_date_joined?.unix(),
      };

      Object.keys(payload).forEach((key) => {
        // @ts-ignore
        if (payload[key]) {
          // @ts-ignore
          advanceParams[key] = payload[key];
        }
      }); // eslint-disable-line
    }

    const response: ListResponse<Customer> = yield call(
      CustomerService.getAllCustomers,
      { ...params.payload, ...advanceParams },
    );
    yield put(customerAction.fetchDataSuccess(response));
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
    yield put(customerAction.failedFetch());
  }
}

function* fetchDataCustomerSelect(params: PayloadAction<CustomerParams>) {
  try {
    const response: ListResponse<Customer> = yield call(
      CustomerService.getAllCustomers,
      params.payload,
    );
    yield put(customerAction.setCustomerSelectTotalData(response?.total || 0));
    if ((params.payload?.page as number) > 1) {
      yield put(customerAction.setCustomerSelectDataMerge(response.data));
    } else {
      yield put(customerAction.setCustomerSelectData(response.data));
    }
    yield put(customerAction.stopLodingCustomerSelect());
  } catch (err) {
    yield put(customerAction.stopLodingCustomerSelect());
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
    yield put(customerAction.failedFetch());
  }
}

function* bulkBiChecking(payload: PayloadAction<BiChecking>) {
  try {
    const response: Response<string> = yield call(
      CustomerService.bulkBiChecking as any,
      payload.payload,
    );

    yield put(customerAction.bulkBiCheckingSuccess());
    yield call(fetchData, {
      type: customerAction.fetchData.type,
      payload: {
        page: 1,
        count: 10,
        search: '',
        status: 1,
      },
    });
    yield put(
      uiAction.openToast({
        headMsg: 'Success process BI Checking',
        severity: 'success',
      }),
    );
  } catch (error) {
    yield put(
      uiAction.openToast({
        headMsg: 'Failed to process BI Checking',
        message: error as string,
        severity: 'error',
      }),
    );
    yield put(customerAction.bulkBiCheckingFailed());
  }
}

function* updateStatusCustomer(payload: PayloadAction<ReviewCustomer>) {
  const successMessage =
    payload.payload.new_status === 7
      ? 'Customer Rejected'
      : 'Reviewed by Committee';
  const failMessage =
    payload.payload.new_status === 7
      ? 'Failed Reject Customer'
      : 'Failed Review Customer';
  try {
    const params: CustomerParams = yield select(
      (state) => state.customerKur.params,
    );
    yield call(CustomerService.updateStatusCustomer, payload.payload);
    yield put(customerAction.fetchData(params));
    yield put(
      uiAction.openToast({
        headMsg: `${successMessage}`,
        severity: 'success',
      }),
    );
  } catch (err) {
    const headMessage = `${failMessage}`;
    if (typeof err === 'string') {
      const error = err as string;
      yield put(
        uiAction.openToast({
          headMsg: headMessage,
          message: error,
          severity: 'error',
        }),
      );
    } else {
      yield put(
        uiAction.openToast({
          headMsg: headMessage,
          message: 'internal server error',
          severity: 'error',
        }),
      );
    }
  }
}

function* verifyCustomer(payload: PayloadAction<VerifyCustomer>) {
  try {
    const params: CustomerParams = yield select(
      (state) => state.customerKur.params,
    );
    yield call(CustomerService.verifyCustomer, payload.payload);
    yield put(customerAction.fetchData(params));
    yield put(
      uiAction.openToast({
        headMsg: 'Customer Verified',
        severity: 'success',
      }),
    );
  } catch (err) {
    const headMessage = 'Failed Verify Customer';
    if (typeof err === 'string') {
      const error = err as string;
      yield put(
        uiAction.openToast({
          headMsg: headMessage,
          message: error,
          severity: 'error',
        }),
      );
    } else {
      yield put(
        uiAction.openToast({
          headMsg: headMessage,
          message: 'internal server error',
          severity: 'error',
        }),
      );
    }
  }
}

// old

function* createCustomer(payload: PayloadAction<CreateCustomer>) {
  try {
    const responseImageNik: Response<string> = yield call(
      CustomerService.uploadImage as any,
      { file: payload.payload.imageNik, type: 'ktp' },
    );
    const responseImageKk: Response<string> = yield call(
      CustomerService.uploadImage as any,
      { file: payload.payload.imageKk, type: 'kk' },
    );
    const responseImageNpwp: Response<string> = yield call(
      CustomerService.uploadImage as any,
      { file: payload.payload.imageNpwp, type: 'npwp' },
    );
    const responseImageSKUsaha: Response<string> = yield call(
      CustomerService.uploadImage as any,
      { file: payload.payload.imageSKUsaha, type: 'sku' },
    );
    // let jsDate;
    // if (typeof payload.payload.birthDate !== 'string') {
    //   // eslint-disable-next-line no-underscore-dangle
    //   jsDate = payload.payload.birthDate?._d;
    // } else {
    //   jsDate = new Date(payload.payload.birthDate);
    // }
    // // eslint-disable-next-line no-unsafe-optional-chaining
    // const convertBirthDate = jsDate && jsDate?.getTime() / 1000;
    const jsDate = payload.payload.birthDate;
    // eslint-disable-next-line no-unsafe-optional-chaining
    const convertBirthDate = jsDate && jsDate?.valueOf() / 1000;
    const today = new Date();
    const convertJoindate = Math.floor(today.getTime() / 1000);

    const createCustomerPayload: CreateCustomerPayload = {
      user_id: payload.payload.merchantName?.id,
      user_type: 'merchant',
      name: payload.payload.name,
      nik: payload.payload.nikKtp,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      birth_date: convertBirthDate!,
      join_date: convertJoindate,
      email: payload.payload.email,
      phone_number: payload.payload.phoneNumber,
      registered_address: payload.payload.addressKtp,
      living_address: payload.payload.addressDomisili,
      credit_limit: +payload.payload.creditLimit,
      admin_fee: +payload.payload.adminFee,
      dpd_rate: +payload.payload.dpdRate,
      user_account_number: payload.payload.bankNumberPrimary,
      user_bank: payload.payload.bankName?.name,
      nobu_account_number: payload.payload.nobuAccountNumber,
      kur_user_status_id: 1,
      kur_user_type_id: payload.payload.kurType?.id,
      kur_user_document: [
        {
          document_filepath: responseImageNik.data,
          document_number: payload.payload.nikKtp,
          document_type: 'ktp',
        },
        {
          document_filepath: responseImageKk.data,
          document_number: payload.payload.kkNumber,
          document_type: 'kk',
        },
        {
          document_filepath: responseImageNpwp.data,
          document_number: payload.payload.npwp,
          document_type: 'npwp',
        },
        {
          document_filepath: responseImageSKUsaha.data,
          document_type: 'sku',
        },
      ],
    };
    const response: Response<string> = yield call(
      CustomerService.createCustomer as any,
      createCustomerPayload,
    );

    yield put(customerAction.createCustomerSuccess());
    yield call(fetchData, {
      type: customerAction.fetchData.type,
      payload: {
        page: 1,
        count: 10,
        search: '',
        order_by: 'id',
        order_type: 'desc',
      },
    });
    yield put(
      uiAction.openToast({
        headMsg: 'Success create customer kur',
        // message: 'Succes Fetch data',
        severity: 'success',
      }),
    );
  } catch (error) {
    yield put(
      uiAction.openToast({
        headMsg: 'Failed to create customer kur',
        message: error as string,
        severity: 'error',
      }),
    );
    yield put(customerAction.createCustomerFailed());
  }
}

function* editCustomer(payload: PayloadAction<CreateCustomer>) {
  try {
    const paramsState: CustomerParams = yield select((state) => {
      return state.customerKur.params;
    });

    //* KTP */
    let payloadKtp: KurUserDocumentPayload = {
      id: payload.payload.idImageNik,
      is_update: false,
      document_type: 'ktp',
    };
    if (payload.payload.oldNikKtp !== payload.payload.nikKtp) {
      payloadKtp = {
        ...payloadKtp,
        document_number: payload.payload.nikKtp,
        is_update: true,
      };
    } else {
      payloadKtp = {
        ...payloadKtp,
        document_number: payload.payload.nikKtp,
        is_update: false,
      };
    }
    if (typeof payload.payload.imageNik === 'object') {
      const responseImageNik: Response<string> = yield call(
        CustomerService.uploadImage as any,
        { file: payload.payload.imageNik, type: 'ktp' },
      );
      payloadKtp = {
        ...payloadKtp,
        document_filepath: responseImageNik.data,
        is_update: true,
      };
    } else {
      let imageNik: string | string[] = payload.payload.imageNik.toString();
      imageNik = imageNik.split('.com/');
      const payloadImageNik = imageNik[1].split('?');
      payloadKtp = {
        ...payloadKtp,
        document_filepath: `/${payloadImageNik[0]}`,
      };
    }

    //* KK */
    let payloadKK: KurUserDocumentPayload = {
      id: payload.payload.idImageKk,
      is_update: false,
      document_type: 'kk',
    };
    if (payload.payload.oldKkNumber !== payload.payload.kkNumber) {
      payloadKK = {
        ...payloadKK,
        document_number: payload.payload.kkNumber,
        is_update: true,
      };
    } else {
      payloadKK = {
        ...payloadKK,
        document_number: payload.payload.kkNumber,
        is_update: false,
      };
    }
    if (typeof payload.payload.imageKk === 'object') {
      const responseImageKk: Response<string> = yield call(
        CustomerService.uploadImage as any,
        { file: payload.payload.imageKk, type: 'kk' },
      );
      payloadKK = {
        ...payloadKK,
        document_filepath: responseImageKk.data,
        is_update: true,
      };
    } else {
      let imageKk: string | string[] = payload.payload.imageKk.toString();
      imageKk = imageKk.split('.com/');
      const payloadImageKk = imageKk[1].split('?');
      payloadKK = {
        ...payloadKK,
        document_filepath: `/${payloadImageKk[0]}`,
      };
    }

    //* NPWP */
    let payloadNpwp: KurUserDocumentPayload = {
      id: payload.payload.idImageNpwp,
      is_update: false,
      document_type: 'npwp',
    };
    if (payload.payload.oldNpwp !== payload.payload.npwp) {
      payloadNpwp = {
        ...payloadNpwp,
        document_number: payload.payload.npwp,
        is_update: true,
      };
    } else {
      payloadNpwp = {
        ...payloadNpwp,
        document_number: payload.payload.npwp,
        is_update: false,
      };
    }
    if (typeof payload.payload.imageNpwp === 'object') {
      const responseImageNpwp: Response<string> = yield call(
        CustomerService.uploadImage as any,
        { file: payload.payload.imageNpwp, type: 'npwp' },
      );
      payloadNpwp = {
        ...payloadNpwp,
        document_filepath: responseImageNpwp.data,
        is_update: true,
      };
    } else {
      let imageNpwp: string | string[] = payload.payload.imageNpwp.toString();
      imageNpwp = imageNpwp.split('.com/');
      const payloadImageNpwp = imageNpwp[1].split('?');
      payloadNpwp = {
        ...payloadNpwp,
        document_filepath: `/${payloadImageNpwp[0]}`,
      };
    }

    //* SKU */
    let payloadSKU: KurUserDocumentPayload = {
      id: payload.payload.idImageSKUsaha,
      is_update: false,
      document_type: 'sku',
      document_number: '',
    };
    if (typeof payload.payload.imageSKUsaha === 'object') {
      const responseImageSKUsaha: Response<string> = yield call(
        CustomerService.uploadImage as any,
        { file: payload.payload.imageSKUsaha, type: 'sku' },
      );
      payloadSKU = {
        ...payloadSKU,
        document_filepath: responseImageSKUsaha.data,
        is_update: true,
      };
    } else {
      let imageSku: string | string[] = payload.payload.imageSKUsaha.toString();
      imageSku = imageSku.split('.com/');
      const payloadImageSku = imageSku[1].split('?');
      payloadSKU = {
        ...payloadSKU,
        document_filepath: `/${payloadImageSku[0]}`,
      };
    }
    const jsDate = payload.payload.birthDate;
    // eslint-disable-next-line no-unsafe-optional-chaining
    const convertBirthDate = jsDate && jsDate?.valueOf() / 1000;
    const today = new Date();
    const convertJoindate = Math.floor(today.getTime() / 1000);

    let idCust: string | undefined;
    if (payload?.payload?.idCustomer) {
      idCust = payload?.payload?.idCustomer;
    }
    const createCustomerPayload: CreateCustomerPayload = {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      idCustomer: +idCust!,
      user_id: payload.payload.merchantName?.id,
      user_type: 'merchant',
      name: payload.payload.name,
      nik: payload.payload.nikKtp,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      birth_date: convertBirthDate!,
      join_date: convertJoindate,
      email: payload.payload.email,
      phone_number: payload.payload.phoneNumber,
      registered_address: payload.payload.addressKtp,
      living_address: payload.payload.addressDomisili,
      credit_limit: +payload.payload.creditLimit,
      admin_fee: +payload.payload.adminFee,
      dpd_rate: +payload.payload.dpdRate,
      user_account_number: payload.payload.bankNumberPrimary,
      user_bank: payload.payload.bankName?.name,
      nobu_account_number: payload.payload.nobuAccountNumber,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      kur_user_status_id: +payload.payload.kurUserStatus!,
      kur_user_type_id: payload.payload.kurType?.id,
      kur_user_document: [payloadKtp, payloadKK, payloadNpwp, payloadSKU],
    };
    const response: Response<string> = yield call(
      CustomerService.updateCustomer as any,
      createCustomerPayload,
    );

    yield put(customerAction.editCustomerSuccess());
    yield call(fetchData, {
      type: customerAction.fetchData.type,
      payload: paramsState,
    });
    yield put(
      uiAction.openToast({
        headMsg: 'Success update customer kur',
        // message: 'Succes Fetch data',
        severity: 'success',
      }),
    );
  } catch (error) {
    yield put(
      uiAction.openToast({
        headMsg: 'Failed to update customer kur',
        message: error as string,
        severity: 'error',
      }),
    );
    yield put(customerAction.createCustomerFailed());
  }
}

function* fetchDataDetail(params: PayloadAction<{ id: string | number }>) {
  try {
    const response: Response<Customer> = yield call(
      CustomerService.getCustomersDetails,
      params.payload.id,
    );
    // @ts-ignore
    yield put(customerAction.fetchDataDetailSuccess(response));
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
    yield put(customerAction.failedFetch());
  }
}

function* checkMerchantExist(params: PayloadAction<CheckMerchantExistParams>) {
  try {
    const response: Response<boolean> = yield call(
      CustomerService.checkMerchantExist,
      params.payload,
    );
    yield put(customerAction.checkMerchantExistSuccess(response));
  } catch (error) {
    // yield put(
    //   uiAction.openToast({
    //     headMsg: 'Failed to add new role user',
    //     message: error as string,
    //     severity: 'error',
    //   }),
    // );
    // yield put(roleUserAction.addOrEditRoleUserSuccess({ error: true }));
  }
}

export default function* customerKurSagas() {
  yield takeLatest(customerAction.fetchData.type, fetchData);
  yield takeLatest(customerAction.createCustomer.type, createCustomer);
  yield takeLatest(customerAction.editCustomer.type, editCustomer);
  yield takeLatest(customerAction.fetchDataDetail.type, fetchDataDetail);
  yield takeLatest(customerAction.checkMerchantExist.type, checkMerchantExist);
  yield takeLatest(
    customerAction.fetchCustomerSelect.type,
    fetchDataCustomerSelect,
  );
  yield takeLatest(customerAction.bulkBiChecking.type, bulkBiChecking);
  yield takeLatest(
    customerAction.updateStatusCustomer.type,
    updateStatusCustomer,
  );
  yield takeLatest(customerAction.verifyCustomer.type, verifyCustomer);
}
