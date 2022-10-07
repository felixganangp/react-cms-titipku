import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Checkbox from '@mui/material/Checkbox';
import { EnhancedTableHeadProps, Align } from './types';

export default function EnhancedTableHead(props: EnhancedTableHeadProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    enableCheckBox,
    disableNumber,
  } = props;

  return (
    <TableHead>
      <TableRow>
        {enableCheckBox && (
          <TableCell
            padding="checkbox"
            sx={{ bgcolor: props.bgHeader || '#ebeff3' }}
          >
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all desserts',
              }}
            />
          </TableCell>
        )}
        {!disableNumber && (
          <TableCell
            padding="checkbox"
            sx={{
              border: 'none',
              bgcolor: props.bgHeader || '#ebeff3',
              whiteSpace: 'nowrap',
              color: '#626b79',
              fontWeight: 'normal',
              fontSize: '14px',
            }}
            align="center"
          >
            No
          </TableCell>
        )}
        {props.headCells.map((headCell) => (
          <TableCell
            sx={{
              bgcolor: props.bgHeader || '#ebeff3',
              padding: '10px',
              minWidth: headCell.width,
              whiteSpace: 'nowrap',
              fontWeight: 'normal',
              color: '#626b79',
              fontSize: '14px',
            }}
            key={headCell.id}
            align={headCell.align as Align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            width={headCell.width}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
