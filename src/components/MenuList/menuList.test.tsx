import { describe, expect, it, vi } from 'vitest';
import { render, screen } from 'test-utils';
import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MenuList from './index';

const MOCK_FUNCTION_LIST = vi.fn();
const listEventMenu = [
  {
    label: 'check',
    onClick: () => MOCK_FUNCTION_LIST(),
  },
];

describe('Menu List test', () => {
  it('Menu list is visible when child clicked', async () => {
    render(
      <MenuList menu={listEventMenu}>
        <button type="button" data-testid="open-menu">
          click
        </button>
      </MenuList>,
    );
    const openMenu = screen.getByTestId('open-menu');
    await userEvent.click(openMenu);

    await waitFor(() =>
      expect(screen.getAllByRole('menuitem')).toHaveLength(
        listEventMenu.length,
      ),
    );
  });

  it('Menu list is hidden when outer comp clicked', async () => {
    render(
      <MenuList menu={listEventMenu}>
        <button type="button" data-testid="open-menu">
          click
        </button>
      </MenuList>,
    );
    const openMenu = screen.getByTestId('open-menu');
    await userEvent.click(openMenu);

    const clickList = screen.getByText('check');
    await userEvent.click(clickList);

    // await Promise.resolve();
    expect(MOCK_FUNCTION_LIST).toHaveBeenCalled();
  });
});
