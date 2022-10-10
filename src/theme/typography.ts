/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */
import React from 'react';
import { TypographyVariantsOptions } from '@mui/material/styles';

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    titlePage: true;
  }
}
interface ExtendedTypographyOptions extends TypographyVariantsOptions {
  titlePage: React.CSSProperties;
}

export const options: TypographyVariantsOptions = {
  fontFamily: [`"Roboto"`].join(','),
};

export const overrides: ExtendedTypographyOptions = {
  h1: { fontSize: '2em' },
  h2: { fontSize: '1.5em' },
  h3: { fontSize: '1.3em' },
  h4: { fontSize: '1em' },
  h5: { fontSize: '0.8em' },
  h6: { fontSize: '0.7em' },
  button: { textTransform: 'none' },
  titlePage: { fontSize: '20px', color: '#626b79', fontWeight: 500 },
};
