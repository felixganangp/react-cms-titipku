import { type Palette, type ThemeOptions } from '@mui/material/styles';

/**
 * Style overrides for Material UI components.
 */
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
const components = (palette: Palette): ThemeOptions['components'] => ({
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: 'unset',
      },
      contained: {
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
});

export default components;
