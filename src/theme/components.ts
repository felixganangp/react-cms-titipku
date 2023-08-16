import { type Palette, type ThemeOptions } from '@mui/material/styles';

/**
 * Style overrides for Material UI components.
 */
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
const components = (palette: Palette): ThemeOptions['components'] => ({
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: '32px',
        textTransform: 'unset',
      },
      contained: {
        borderRadius: '32px',
        // boxShadow: "none",
        // "&:hover": {
        //   boxShadow: "none",
        // },
      },
    },
    defaultProps: {
      disableElevation: true,
      size: 'medium',
      variant: 'contained',
    },
  },

  MuiButtonGroup: {
    styleOverrides: {
      root: {
        boxShadow: 'none',
      },
    },
  },

  MuiTextField: {
    defaultProps: {
      size: 'small',
    },
  },

  MuiAutocomplete: {
    defaultProps: {
      color: 'primary',
    },
  },

  MuiCard: {
    defaultProps: {
      sx: {
        boxShadow: '0 3px 10px 0 rgba(0, 0, 0, 0.1)',
        p: '15px',
        borderRadius: '5px',
      },
    },
  },

  MuiInput: {
    styleOverrides: {
      root: {
        '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
          '-webkit-appearance': 'none',
          margin: 0,
        },
        '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button':
          {
            display: 'none',
          },
        '& input[type=number]': {
          MozAppearance: 'textfield',
        },
        '& input[type=number]::-webkit-outer-spin-button': {
          '-webkit-appearance': 'none',
          margin: 0,
        },
        '& input[type=number]::-webkit-inner-spin-button': {
          '-webkit-appearance': 'none',
          margin: 0,
        },
      },
    },
  },
});

export default components;
