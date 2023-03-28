import React from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

export default function Google(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 6.167v11a1 1 0 0 0 .615.923L12 22M2 6.167l9.23-3.846a2 2 0 0 1 1.54 0L17 4.083M2 6.167 7 8.25m5 2.083V22m0-11.667 10-4.166m-10 4.166L7 8.25M12 22l9.385-3.91a1 1 0 0 0 .615-.923v-11m0 0-5-2.084M7 8.25l10-4.167"
          stroke="#008E58"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  );
}
