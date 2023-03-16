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
        <path
          d="m1.667 2.5.633.127a2 2 0 0 1 1.598 1.762L4 5.417m0 0 .789 6.571a2 2 0 0 0 1.986 1.762h6.743a3.5 3.5 0 0 0 3.395-2.651l.706-2.825a2.3 2.3 0 0 0-2.231-2.857H4z"
          stroke="#303030"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M10.833 11.25H7.5"
          stroke="#303030"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="7.084" cy="16.668" fill="#303030" r="1.25" />
        <circle cx="14.584" cy="16.668" fill="#303030" r="1.25" />
      </svg>
    </SvgIcon>
  );
}
