import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAppSelector } from 'store/hooks';
import { Helmet } from 'react-helmet';

import ProgresBar from 'components/Loading/ProgresBar';
import ListRoute from './ListRoute';
import PrivateRoute from './PrivateRoute';

export default function IndexRoute() {
  const menuRoleUserCurrent = useAppSelector(
    (state) => state.userDetails.menuData,
  );

  const whiteList = ['Home', 'Login', 'Google auth', 'Not Found'];
  const listIdMenu = menuRoleUserCurrent
    .map((val) => val.menu)
    .concat(whiteList);

  return (
    <Routes>
      {ListRoute
        // .filter((val) => listIdMenu.indexOf(val.name) !== -1)
        .map((val, index) => (
          <Route
            index={val.index}
            path={val.path}
            key={index}
            element={
              <>
                <Helmet>
                  <title>{val.name} - Management Control Panel | Titipku</title>
                </Helmet>
                {val.auth === 'Private' ? (
                  <PrivateRoute redirect="/sign-in">
                    <Suspense fallback={<ProgresBar />}>
                      <val.comp />
                    </Suspense>
                  </PrivateRoute>
                ) : (
                  <Suspense fallback={<ProgresBar />}>
                    <val.comp />
                  </Suspense>
                )}
              </>
            }
          />
        ))}
    </Routes>
  );
}
