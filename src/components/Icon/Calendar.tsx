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
        <rect
          x="3"
          y="3.5"
          width="18"
          height="18"
          rx="5"
          stroke="#626B79"
          strokeWidth="1.5"
        />
        <path
          d="M3 8.5h18"
          stroke="#626B79"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M16.5 2v3M7.5 2v3M6.5 12.5h1M11.5 12.5h1M16.5 12.5h1M6.5 16.5h1M11.5 16.5h1M16.5 16.5h1"
          stroke="#626B79"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  );
}
