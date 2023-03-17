/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from 'react';

export type Order = 'asc' | 'desc';

export interface Data<T> {
  [key: string]: any;
}

export interface HeadCells<T> {
  id: string;
  label: string;
  width?: number | string;
  minWidth?: number | string;
  format?: (val: T) => ReactNode | JSX.Element | undefined;
  disablePadding?: boolean;
  enableSort?: boolean;
  align?: string;
  isSticky?: boolean;
}

interface TableOrder {
  orderType: Order;
  orderBy: string | number;
}
export interface EnhancedTableHeadProps<T> {
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  orderType: Order;
  orderBy: string | number | null | undefined;
  numSelected: number;
  rowCount: number;
  enableCheckBox: boolean;
  headCells: Array<HeadCells<T>>;
  bgHeader?: string;
  disableNumber: boolean;
  countTotalSticky: number;
  startIndexSticky: () => number;
  currentWidth: (index: number) => any;
  onRequestSort?: (order: TableOrder) => void;
  countLeftSticky: (indexTd: number) => number;
}

export interface EnhancedTableProps<T extends { id?: string | number }> {
  enableCheckBox?: boolean;
  disableNumber?: boolean;
  loading?: boolean;
  orderType?: Order;
  orderBy?: string | number | null | undefined;
  // totalPage: number;
  totalData?: number;
  count?: number;
  onChangeSort?: (order: TableOrder) => void;
  page: number;
  onChangePage?: (page: number) => void;
  setSelected?: (array: (string | number)[]) => void;
  selected?: (string | number)[];
  bgHeader?: string;
  headCells: Array<HeadCells<T>>;
  data: Data<T>;
  disablePagination?: boolean;
  disableRowPerPage?: boolean;
}

export type Align = 'inherit' | 'left' | 'center' | 'right' | 'justify';
