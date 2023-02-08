import { test } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import { Box } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from 'store';
import { BrowserRouter } from 'react-router-dom';
import AccordionOnDetails from '../Details';

afterEach(() => {
  cleanup();
});

test('title is shown', async () => {
  const condition = 0 + 1 === 1;
  const accordion = render(
    <Provider store={store}>
      <BrowserRouter>
        <AccordionOnDetails
          title="Title"
          parent={condition}
          headerContent={<Box>Title</Box>}
          havingChild={condition}
        >
          <Box>This is children</Box>
        </AccordionOnDetails>
        ,
      </BrowserRouter>
    </Provider>,
  );
  const parent = accordion.getByTestId('accordion-parent');
  expect(parent).toHaveTextContent('Title');
  accordion.unmount();
});

test('button color is grey if parent is true', async () => {
  const accordion1 = render(
    <Provider store={store}>
      <BrowserRouter>
        <AccordionOnDetails
          title="Title"
          parent
          headerContent={<Box>Title</Box>}
          havingChild
        >
          <Box>This is children</Box>
        </AccordionOnDetails>
        ,
      </BrowserRouter>
    </Provider>,
  );
  const currentIndex = accordion1.getByTestId('accordion-header-button');
  expect(currentIndex).toHaveStyle('background-color: #ebeff3');
  accordion1.unmount();
});

test('button color is white if parent is false', async () => {
  const accordion2 = render(
    <Provider store={store}>
      <BrowserRouter>
        <AccordionOnDetails
          title="Title"
          parent={false}
          headerContent={<Box>Title</Box>}
          havingChild={false}
        >
          <Box>This is children</Box>
        </AccordionOnDetails>
        ,
      </BrowserRouter>
    </Provider>,
  );
  const currentIndex = accordion2.getByTestId('accordion-header-button');
  expect(currentIndex).toHaveStyle('backgroundColor: #ffff');
  accordion2.unmount();
});
