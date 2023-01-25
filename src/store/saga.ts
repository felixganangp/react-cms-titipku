import { all } from 'redux-saga/effects';
import roleUserSagas from 'store/sagas/RoleUser';
import roleAccessSagas from 'store/sagas/RoleAccess';
import userDetailsSaga from './sagas/UserDetails';

export default function* rootSaga() {
  yield all([roleUserSagas(), roleAccessSagas(), userDetailsSaga()]);
}
