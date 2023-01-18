/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from 'react';

export type Order = 'asc' | 'desc';

// export interface Data<T = any> {
//   [key: string]: T;
// }

export interface HeadCells<T> {
  id: string | number;
  label: string;
  width?: number | string;
  minWidth?: number | string;
  format?: (val: T) => ReactNode | JSX.Element | undefined;
  disablePadding?: boolean;
  enableSort?: boolean;
  align?: string;
}

interface TableOrder {
  orderType: Order;
  orderBy: string | number;
}
export interface EnhancedTableHeadProps<T> {
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  orderType: Order;
  orderBy: string | null | undefined;
  numSelected: number;
  rowCount: number;
  enableCheckBox: boolean;
  headCells: Array<HeadCells<T>>;
  bgHeader?: string;
  disableNumber: boolean;
  onRequestSort?: (order: TableOrder) => void;
}

export interface EnhancedTableProps<T> {
  enableCheckBox?: boolean;
  disableNumber?: boolean;
  loading?: boolean;
  orderType?: Order;
  orderBy?: string | undefined | null;
  // totalPage: number;
  totalData?: number;
  count?: number;
  handleRequestSort?: (order: TableOrder) => void;
  page: number | undefined;
  onChangePage: (page: number) => void;
  setSelected?: (array: (string | number | undefined)[]) => void;
  selected?: (string | number)[];
  bgHeader?: string;
  headCells: Array<HeadCells<T>>;
  data: Array<T>;
}

export type Align = 'inherit' | 'left' | 'center' | 'right' | 'justify';
