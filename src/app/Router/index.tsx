import React, { Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { userDetailsAction } from 'store/slice/UserDetails';
import ListRoute from './ListRoute';
import PrivateRoute from './PrivateRoute';

export default function IndexRoute() {
  const dispatch = useAppDispatch();
  const menuRoleUserCurrent = useAppSelector(
    (state) => state.userDetails.menuData,
  );

  // useEffect(() => {
  //   dispatch(userDetailsAction.fetchUserDetails());
  // }, []);

  const listIdMenu = menuRoleUserCurrent.map((val) => val.id);

  return (
    <Routes>
      {ListRoute.filter(
        (val) => listIdMenu.indexOf(val.id) !== -1 || val.id === 0,
      ).map((val, index) => (
        <Route
          index={val.index}
          path={val.path}
          key={index}
          element={
            val.auth === 'Private' ? (
              <PrivateRoute redirect="/sign-in">
                <Suspense>
                  <val.comp />
                </Suspense>
              </PrivateRoute>
            ) : (
              <Suspense>
                <val.comp />
              </Suspense>
            )
          }
        />
      ))}
    </Routes>
  );
}
