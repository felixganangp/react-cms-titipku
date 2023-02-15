import { describe, expect, it, vi } from 'vitest';
// import { render, screen } from 'test-utils';
import { waitFor, render, screen } from '@testing-library/react';
import Table from '../index';
import { HeadCells } from '../types';

interface DummyDataTypes {
  name: string;
  number1: number;
  number2: number;
  imgUrl: string;
}

const headCell: HeadCells<DummyDataTypes>[] = [
  {
    id: 'name',
    label: 'Name',
    align: 'left',
    enableSort: true,
  },
  {
    id: 'sum_number',
    label: 'Sum Number',
    align: 'left',
    format: (val) => <span>{val.number1 * val.number2}</span>,
  },
  {
    id: 'sum_number_2',
    label: 'Sum Number 2',
    align: 'left',
    format: (val) => <img src={val.imgUrl} alt={val.name} />,
  },
];

describe('Render Table', async () => {
  // TableComp.debug();

  it('Render Check Count Head Cells', async () => {
    const TableComp = render(<Table headCells={headCell} data={[]} />);

    for (let index = 0; index < headCell.length; index += 1) {
      const TableHead = TableComp.getByTestId(`header-${headCell[index].id}`);
      expect(TableHead).toBeInTheDocument();
    }
  });

  it('Render Check Not Found Data', () => {
    const TableComp = render(<Table headCells={headCell} data={[]} />);

    const NotFoundData = TableComp.getByTestId('data-table-not-result-found');
    expect(NotFoundData).toBeInTheDocument();
  });

  it('Render Table Loading Animation', () => {
    const TableComp = render(<Table headCells={headCell} data={[]} loading />);

    const Header = TableComp.container.querySelectorAll('th');
    const RowTable = TableComp.container.querySelectorAll('tr')[1];
    const Skeleton = RowTable.querySelectorAll('.MuiSkeleton-root');

    expect(Skeleton.length).toBe(Header.length);

    TableComp.rerender(
      <Table headCells={headCell} data={[]} loading={false} />,
    );

    const newRowTable = TableComp.container.querySelectorAll('tr')[1];
    const newSkeleton = newRowTable.querySelectorAll('.MuiSkeleton-root');

    expect(newSkeleton.length).toBe(0);
  });
});

describe('User Interaction', async () => {
  it('Pagination', async () => {
    const TableComp = render(<Table headCells={headCell} data={[]} />);

    for (let index = 0; index < headCell.length; index += 1) {
      const TableHead = TableComp.getByTestId(`header-${headCell[index].id}`);
      expect(TableHead).toBeInTheDocument();
    }
  });
});
