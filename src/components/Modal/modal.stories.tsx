import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Box from '@mui/material/Box';
import Modal from './index';

export default {
  title: 'Components/Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => (
  <Modal {...args}>
    <Box
      height="200px"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      Content
    </Box>
  </Modal>
);

export const Example = Template.bind({});
Example.args = {
  open: true,
  title: 'Example Modal',
};
