import React, { useEffect } from 'react';

interface PayloadJWTDecode {
  raw: string;
  header: object;
  payload: any;
}
export default function GoogleOauth() {
  function jwtDecode(t: string) {
    const payload: PayloadJWTDecode = {
      raw: '',
      header: {},
      payload: {},
    };
    payload.raw = t;
    payload.header = JSON.parse(window.atob(t.split('.')[0]));
    payload.payload = JSON.parse(window.atob(t.split('.')[1]));
    return payload;
  }
  useEffect(() => {
    let getSuccess = window.location.search.split('success=');

    getSuccess = getSuccess[1].split('&');
    if (getSuccess[0] === 'true') {
      const getToken = getSuccess[2].split('token=');
      const decodedJWT = jwtDecode(getToken[1]);
      localStorage.setItem(
        'auth',
        `{"token": "${decodedJWT.raw}", "email": "${decodedJWT.payload.email}", "id": "${decodedJWT.payload.id_admin}"}`,
      );
      window.opener.location.href = `/role-user${window.location.search}`;
    }
    if (getSuccess[0] === 'false') {
      window.opener.location.href = `/sign-in${window.location.search}`;
    }
    window.close();
  }, []);

  return <div>googleOauth</div>;
}
