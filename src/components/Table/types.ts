/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from 'react';

export type Order = 'asc' | 'desc';

export interface Data {
  [key: string]: any;
}

export interface HeadCells {
  id: string;
  label: string;
  width?: number | string;
  format?: (page: Data) => ReactNode | undefined;
  disablePadding?: boolean;
  align?: string;
}

export interface EnhancedTableHeadProps {
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  numSelected: number;
  rowCount: number;
  enableCheckBox: boolean;
  headCells: HeadCells[];
  bgHeader?: string;
  disableNumber: boolean;
}

export interface EnhancedTableProps {
  enableCheckBox?: boolean;
  disableNumber?: boolean;
  loading?: boolean;
  totalPage: number;
  page: number;
  onChangePage: (page: number) => void;
  setSelected?: (array: (string | number)[]) => void;
  selected?: (string | number)[];
  bgHeader?: string;
  headCells: HeadCells[];
  data: Data[];
}

export type Align = 'inherit' | 'left' | 'center' | 'right' | 'justify';
