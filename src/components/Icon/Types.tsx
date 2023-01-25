import React from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

export default function Google(props: SvgIconProps) {
  return (
    <SvgIcon {...props} sx={{ ...props.sx }}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="2"
          y="4"
          width="12"
          height="8"
          rx="2"
          stroke="#008E58"
          strokeWidth="1.2"
        />
        <path
          d="M4 6L5.33333 6"
          stroke="#008E58"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M10.667 10H12.0003"
          stroke="#008E58"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <circle cx="8" cy="8" r="1.4" stroke="#008E58" strokeWidth="1.2" />
      </svg>
    </SvgIcon>
  );
}
