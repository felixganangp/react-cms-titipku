/* eslint-disable array-callback-return */
import { UserDetails } from 'models/UserDetails';
import { ListResponse, Response } from 'models/fetch';
import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { userDetailsAction } from 'store/slice/UserDetails';
import { uiAction } from 'store/slice/ui';
import { Menu, MenuParams, SideBarMenu } from 'models/Menu';
import { PayloadAction } from '@reduxjs/toolkit';
import { number, string } from 'yup';
import * as service from '../../service/UserDetails';
import * as menuService from '../../service/AdministratorRole';

function* fetchUserDetails() {
  try {
    const response: Response<UserDetails> = yield call(service.getUserDetails);
    const params = {
      account_type: 'cms',
      page: 1,
      role_id: response.data.administrator_detail[0].administrator_role.id,
    };
    yield put(userDetailsAction.fetchMenu(params));
    yield put(userDetailsAction.fetchUserDetailsSuccess(response));
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
    yield put(userDetailsAction.failedFetch());
  }
}

function* fetchMenuList(params: PayloadAction<MenuParams>) {
  try {
    const response: ListResponse<Menu> = yield call(
      menuService.fetchAdministratorControl,
      params.payload,
    );
    const mappedMenu: any = [];
    response.data.map((item) => {
      mappedMenu.push({
        id: item.id,
        menu: item.menu,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      item.sub_menu &&
        item.sub_menu.map((child) => {
          mappedMenu.push({
            id: child.id,
            menu: child.menu,
          });
        });
    });

    yield put(userDetailsAction.fetchMenuSuccess(mappedMenu));
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
    yield put(userDetailsAction.fetchMenuFailed());
  }
}

export default function* userDetailsSaga() {
  yield takeLatest(userDetailsAction.fetchUserDetails.type, fetchUserDetails);
  yield takeLatest(userDetailsAction.fetchMenu.type, fetchMenuList);
}
