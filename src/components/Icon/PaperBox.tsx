import React from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

export default function Google(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <svg
        // width="24"
        // height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2 17.166a1 1 0 0 0 .615.923l8.635 3.598V10.829L6.21 8.691 2 6.937v10.229zM3.025 5.739l3.469 1.445 8.784-3.819-2.509-1.045a2 2 0 0 0-1.538 0L3.025 5.739zM17.2 4.165 8.4 7.991l3.595 1.525 8.782-3.86-3.579-1.49zM22 6.758l-9.25 4.064v10.865l8.635-3.598a1 1 0 0 0 .615-.923V6.758z"
          fill="#fff"
        />
      </svg>
    </SvgIcon>
  );
}
