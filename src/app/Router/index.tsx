import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import ListRoute from './ListRoute';
import PrivateRoute from './PrivateRoute';

export default function IndexRoute() {
  return (
    <Routes>
      {ListRoute.map((val, index) => (
        <Route
          index={val.index}
          path={val.path}
          key={index}
          element={
            val.auth === 'Private' ? (
              <PrivateRoute redirect="/">
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
