import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  redirect: string;
  children: React.ReactNode;
}

export default function PrivateRoute({
  redirect,
  children,
}: PrivateRouteProps) {
  const isAuth = true;
  if (!isAuth) {
    return <Navigate to={redirect} />;
  }
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
}
