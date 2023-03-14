import React from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

export default function Google(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <svg
        // width="20"
        // height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="2.5"
          y="5"
          width="15"
          height="10"
          rx="2"
          stroke="#303030"
          strokeWidth="1.5"
        />
        <path
          d="M5 7.5h1.667M13.333 12.5H15"
          stroke="#303030"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="10" cy="10" r="1.75" stroke="#303030" strokeWidth="1.5" />
      </svg>
    </SvgIcon>
  );
}
