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
        <rect width="24" height="24" rx="12" fill="white" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20.64 12.2044C20.64 11.5663 20.5827 10.9526 20.4764 10.3635H12V13.8449H16.8436C16.635 14.9699 16.0009 15.9231 15.0477 16.5613V18.8194H17.9564C19.6582 17.2526 20.64 14.9453 20.64 12.2044Z"
          fill="#4285F4"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 21C14.43 21 16.4673 20.1941 17.9564 18.8195L15.0477 16.5613C14.2418 17.1013 13.2109 17.4204 12 17.4204C9.65591 17.4204 7.67182 15.8372 6.96409 13.71H3.95728V16.0418C5.43818 18.9831 8.48182 21 12 21Z"
          fill="#34A853"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.96409 13.7099C6.78409 13.1699 6.68182 12.5931 6.68182 11.9999C6.68182 11.4068 6.78409 10.8299 6.96409 10.2899V7.95813H3.95727C3.34773 9.17313 3 10.5477 3 11.9999C3 13.4522 3.34773 14.8268 3.95727 16.0418L6.96409 13.7099Z"
          fill="#FBBC05"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 6.57955C13.3214 6.57955 14.5077 7.03364 15.4405 7.92545L18.0218 5.34409C16.4632 3.89182 14.4259 3 12 3C8.48182 3 5.43818 5.01682 3.95728 7.95818L6.96409 10.29C7.67182 8.16273 9.65591 6.57955 12 6.57955Z"
          fill="#EA4335"
        />
      </svg>
    </SvgIcon>
  );
}
