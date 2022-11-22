import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import FormLabel from './index';

export default {
  title: 'Components/FormLabel',
  component: FormLabel,
} as ComponentMeta<typeof FormLabel>;

const Template: ComponentStory<typeof FormLabel> = (args) => (
  <Box bgcolor="#fff" padding="20px">
    <FormLabel {...args} />
  </Box>
);

export const Example = Template.bind({});

Example.args = {
  children: (
    <TextField
      type="text"
      name="name"
      placeholder="Input Category name"
      fullWidth
    />
  ),
  text: 'Name Category',
  required: true,
};

export const Error = Template.bind({});

Error.args = {
  children: (
    <TextField
      type="text"
      name="name"
      placeholder="Input Category name"
      fullWidth
    />
  ),
  text: 'Name Category',
  required: true,
  error: true,
  helperText: 'Category name required',
};
