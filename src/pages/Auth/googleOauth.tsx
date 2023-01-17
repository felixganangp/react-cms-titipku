import React, { useEffect } from 'react';

export default function GoogleOauth() {
  useEffect(() => {
    let getSuccess = window.location.search.split('success=');

    getSuccess = getSuccess[1].split('&');
    if (getSuccess[0] === 'true') {
      window.opener.location.href = `/role-user${window.location.search}`;
      const getToken = getSuccess[2].split('token=');
      localStorage.setItem('auth', `{"token": "${getToken[1]}"}`);
    }
    if (getSuccess[0] === 'false') {
      window.opener.location.href = `/sign-in${window.location.search}`;
    }
    window.close();
  }, []);

  return <div>googleOauth</div>;
}
