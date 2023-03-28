import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import SideBar from 'components/Layout/SideBar';
import TopBar from 'components/Layout/TopBar';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { userDetailsAction } from 'store/slice/UserDetails';
import { Box } from '@mui/material';

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
  const dispatch = useAppDispatch();
  const isAuth = parsAuthToken.token;
  const userDetails = useAppSelector((state) => state.userDetails.data);

  useEffect(() => {
    if (isAuth) dispatch(userDetailsAction.fetchUserDetails());
  }, []);

  if (!isAuth) {
    console.log('not auth');
    return <Navigate to={redirect} />;
  }

  const toggleOpen = () => {
    setOpen(!open);
  };

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
        <div
          style={{
            position: 'sticky',
            top: 0,
            width: '63px',
            height: '100vh',
            zIndex: 20,
          }}
        >
          <SideBar open={open} setOpen={setOpen} />
        </div>
        <div style={{ flex: 1, overflow: 'auto' }}>{children} </div>
      </div>
    </div>
  );
}
