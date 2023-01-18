/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'),
);
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:storybook/recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': ['error', prettierOptions],
    'no-async-promise-executor': 0,
    'react/function-component-definition': 0,
    'react/no-array-index-key': 0,
    'react/destructuring-assignment': 0,
    'react/jsx-props-no-spreading': 'off',
    'react/no-unstable-nested-components': 'off',
    'no-param-reassign': 'off',
    'consistent-return': 0,
    'react-hooks/exhaustive-deps': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
      },
    ],
    'react/jsx-no-useless-fragment': 0,
    'react/react-in-jsx-scope': 0,
    'react/require-default-props': 0,
    'import/prefer-default-export': 0,
  },
};
