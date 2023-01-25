import React, { useState } from 'react';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Checkbox from '@mui/material/Checkbox';
import SwapVertIcon from '@mui/icons-material/SwapVert';

import { EnhancedTableHeadProps, Align } from './types';

export default function EnhancedTableHead<T>(props: EnhancedTableHeadProps<T>) {
  const {
    onSelectAllClick,
    orderType,
    orderBy,
    numSelected,
    rowCount,
    enableCheckBox,
    disableNumber,
    onRequestSort,
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
              width: headCell.width,
              minWidth: headCell.minWidth,
              whiteSpace: 'nowrap',
              fontWeight: 'normal',
              color: '#626b79',
              fontSize: '14px',
            }}
            key={headCell.id}
            align={headCell.align as Align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            // sortDirection={orderBy === headCell.id ? orderType : false}
          >
            {headCell.enableSort ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? orderType : 'asc'}
                IconComponent={SwapVertIcon}
                onClick={() => {
                  if (onRequestSort) {
                    const order = orderType === 'desc' ? 'asc' : 'desc';
                    onRequestSort({
                      orderBy: headCell.id,
                      orderType: orderBy !== headCell.id ? 'asc' : order,
                    });
                  }
                }}
              >
                {headCell.label}
              </TableSortLabel>
            ) : (
              <span>{headCell.label}</span>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
