import React, { useEffect } from 'react';

export default function GoogleOauth() {
  useEffect(() => {
    window.opener.location.href = `/sign-in${window.location.search}`;
    window.close();
  }, []);

  return <div>googleOauth</div>;
}
