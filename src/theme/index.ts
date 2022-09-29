import { createTheme } from '@mui/material/styles';
import * as typography from './typography';
import palettes from './pallets';
import components from './components';

const { palette } = createTheme({ palette: palettes.light });
const mainTheme = createTheme(
  {
    palette,
    typography: typography.options,
    components: components(palette),
  },
  {
    typography: typography.overrides,
  },
);

export default mainTheme;
