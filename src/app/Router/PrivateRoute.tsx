import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import SideBar from 'components/Layout/SideBar';
import TopBar from 'components/Layout/TopBar';

interface PrivateRouteProps {
  redirect: string;
  children: React.ReactNode;
}

export default function PrivateRoute({
  redirect,
  children,
}: PrivateRouteProps) {
  const [open, setOpen] = useState(true);
  const authToken = localStorage.getItem('auth');
  const parsAuthToken = JSON.parse(authToken || '{}');

  const isAuth = parsAuthToken.token;
  if (!isAuth) {
    return <Navigate to={redirect} />;
  }

  const userDetails = {
    fullName: 'Full Name',
    email: 'full.name@titipku.com',
    roleName: 'Super Admin',
  };

  const toggleOpen = () => {
    setOpen(!open);
  };

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div>
        <TopBar
          userDetails={userDetails}
          onLogoClick={toggleOpen}
          open={open}
        />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <div>
          <SideBar open={open} setOpen={setOpen} userDetails={userDetails} />
        </div>
        <div style={{ flex: 1, overflow: 'auto' }}>{children} </div>
      </div>
    </div>
  );
}
