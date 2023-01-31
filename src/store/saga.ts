import { all } from 'redux-saga/effects';
import roleUserSagas from 'store/sagas/RoleUser';
import roleAccessSagas from 'store/sagas/RoleAccess';
import customerKurSagas from 'store/sagas/kur/CustomerAccess';
import typeKurSagas from 'store/sagas/kur/TypeAccess';
import userDetailsSaga from './sagas/UserDetails';
import areaSagas from './sagas/AreaAccess';
import merchantSagas from './sagas/MerchantAccess';

export default function* rootSaga() {
  yield all([
    roleUserSagas(),
    roleAccessSagas(),
    userDetailsSaga(),
    customerKurSagas(),
    typeKurSagas(),
    areaSagas(),
    merchantSagas(),
  ]);
}
