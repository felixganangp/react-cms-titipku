import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Table from './index';

export default {
  title: 'Components/Table',
  component: Table,
} as ComponentMeta<typeof Table>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Table> = (args) => <Table {...args} />;

const headCells = [
  {
    id: 'name',
    label: 'Name',
    align: 'center',
  },
  {
    id: 'value',
    label: 'Value',
    align: 'center',
  },
];

export const Example = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Example.args = {
  headCells,
  data: [{ name: 'Testign' }],
  selected: [],
  page: 1,
};
