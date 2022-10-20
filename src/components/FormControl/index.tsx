import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ReportIcon from '@mui/icons-material/Report';

interface FormControlProps {
  text: string;
  children: any;
  helperText: string;
  error: boolean;
  required: boolean;
}

export default function FormControl(props: FormControlProps) {
  const { text, children, helperText, error, required } = props;

  return (
    <Box width="100%" mt={0.5} mb={2}>
      <Typography sx={{ mb: '5px', color: '#626b79', fontSize: '14px' }}>
        {text}
        {required ? (
          <span style={{ paddingInline: '5px 0', color: '#c10000' }}>*</span>
        ) : null}
      </Typography>
      {children}
      {helperText ? (
        <Typography
          sx={{
            mt: '3px',
            display: 'flex',
            alignItems: 'center',
            fontSize: '0.75rem',
            color: !error ? '#626b79' : '#c10000',
          }}
        >
          {error && (
            <ReportIcon color="inherit" fontSize="inherit" sx={{ mr: 0.5 }} />
          )}
          {helperText}
        </Typography>
      ) : null}
    </Box>
  );
}
