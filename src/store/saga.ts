import { all } from 'redux-saga/effects';
import roleUserSagas from 'store/sagas/RoleUser';
import RoleAccessSagas from 'store/sagas/RoleAccess';

export default function* rootSaga() {
  yield all([roleUserSagas(), RoleAccessSagas()]);
}
