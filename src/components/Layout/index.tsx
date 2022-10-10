import React, { useState } from 'react';
import SideBar from './SideBar';
import TopBar from './TopBar';

export default function Layout() {
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
        <div style={{ flex: 1, overflow: 'auto' }}>Web Content</div>
      </div>
    </div>
  );
}
