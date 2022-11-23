import React from 'react';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import ReportIcon from '@mui/icons-material/Report';

interface FormControlPros {
  text: string;
  children: JSX.Element;
  helperText?: string | false | undefined;
  required?: boolean | undefined | null;
  error?: boolean | undefined;
}

const FormControl = (props: FormControlPros) => (
  <Box width="100%" mt={0.5} mb={2}>
    <Typography
      sx={{ mb: '5px', color: '#232933', fontSize: '14px', fontWeight: 500 }}
    >
      {props.text}
      {props.required && (
        <span style={{ paddingInline: '5px 0', color: '#c10000' }}>*</span>
      )}
    </Typography>
    {props.children}
    {props.helperText && (
      <Typography
        sx={{
          mt: '3px',
          display: 'flex',
          alignItems: 'center',
          fontSize: '0.75rem',
          color: !props.error ? '#626b79' : '#c10000',
        }}
      >
        {props.error && (
          <ReportIcon color="inherit" fontSize="inherit" sx={{ mr: 0.5 }} />
        )}
        {props.helperText}
      </Typography>
    )}
  </Box>
);

FormControl.defaultProps = {
  required: false,
  helperText: '',
  error: false,
};

export default FormControl;
