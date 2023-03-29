import React, { useState } from 'react';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Checkbox, { checkboxClasses } from '@mui/material/Checkbox';
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
    countLeftSticky,
    countTotalSticky,
    startIndexSticky,
    currentWidth,
  } = props;

  return (
    <TableHead>
      <TableRow>
        {enableCheckBox && (
          <TableCell
            padding="checkbox"
            sx={[
              { bgcolor: props.bgHeader || '#ebeff3' },
              countTotalSticky !== 0
                ? {
                    position: 'sticky',
                    left: 0,
                    zIndex: 10,
                  }
                : {},
            ]}
          >
            <Checkbox
              sx={{
                color: '#E5E5E5',
                position: 'relative',
                '&:after': {
                  content: '""',
                  left: 0,
                  right: 0,
                  m: 'auto',
                  height: 15,
                  width: 15,
                  position: 'absolute',
                  backgroundColor: 'white',
                  zIndex: -1,
                },
              }}
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
            sx={[
              {
                border: 'none',
                bgcolor: props.bgHeader || '#ebeff3',
                whiteSpace: 'nowrap',
                color: '#626b79',
                fontWeight: 'normal',
                fontSize: '14px',
                minWidth: '50px',
              },
              countTotalSticky !== 0
                ? {
                    position: 'sticky',
                    left: startIndexSticky() === 2 ? currentWidth(0) : 0,
                    zIndex: 10,
                  }
                : {},
            ]}
            align="center"
          >
            No
          </TableCell>
        )}
        {props.headCells.map((headCell, key) => (
          <TableCell
            sx={[
              {
                bgcolor: props.bgHeader || '#ebeff3',
                padding: '10px',
                width: headCell.width,
                minWidth: headCell.minWidth,
                whiteSpace: 'nowrap',
                fontWeight: 'normal',
                color: '#626b79',
                fontSize: '14px',
              },
              headCell.isSticky
                ? {
                    position: 'sticky',
                    left: countLeftSticky(key),
                    zIndex: 10,
                    borderRight:
                      countTotalSticky === key + 1
                        ? '1px solid rgba(0.1,0,0,0.2)'
                        : 'none',
                  }
                : {},
            ]}
            key={headCell.id}
            align={headCell.align as Align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            // sortDirection={orderBy === headCell.id ? orderType : false}
            data-testid={`header-${headCell.id}`}
          >
            {headCell.enableSort ? (
              <TableSortLabel
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
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
