import SideBar from 'components/Layout/SideBar';
import TopBar from 'components/Layout/TopBar';
import React, { lazy, Suspense, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import ListRoute from './ListRoute';

export default function IndexRoute() {
  const [open, setOpen] = useState(true);

  const userDetails = {
    fullName: 'Full Name',
    email: 'full.name@titipku.com',
    roleName: 'Super Admin',
  };

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
        <div>
          <SideBar open={open} setOpen={setOpen} userDetails={userDetails} />
        </div>
        <div style={{ flex: 1, overflow: 'auto' }}>
          <Routes>
            {ListRoute.map((val, index) => (
              <Route
                index={val.index}
                path={val.path}
                key={index}
                element={
                  <Suspense>
                    <val.comp />
                  </Suspense>
                }
              />
            ))}
          </Routes>
        </div>
      </div>
    </div>
  );
}
