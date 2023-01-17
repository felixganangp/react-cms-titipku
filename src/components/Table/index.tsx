import React from 'react';
import styled from '@emotion/styled';

import Box from '@mui/material/Box';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Skeleton from '@mui/material/Skeleton';
import Pagination from '@mui/material/Pagination';

import EnhancedTableHead from './TableHead';

import { Order, EnhancedTableProps, Align } from './types';

const PaginationStyle = styled(Pagination)`
  button {
    border: 0.8px solid #d5d5d5;
    color: ${(props: any) => props.theme.palette.primary.main};
    margin: 0;
    margin: 0 2px;
    border-radius: 5px;
  }
  div {
    border: 0.8px solid #d5d5d5;
    border-radius: 5px;
    margin: 0 2px;
    height: 32px;
    width: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .Mui-disabled {
    background-color: #ebeff3;
  }
`;

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number,
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTable({
  disableNumber = false,
  enableCheckBox = false,
  handleRequestSort,
  selected = [],
  setSelected = () => [],
  orderType = 'asc',
  orderBy,
  ...props
}: EnhancedTableProps) {
  // const [order, setOrder] = React.useState<Order>('asc');
  // const [orderBy, setOrderBy] = React.useState('');
  const [page] = React.useState(0);
  const [rowsPerPage] = React.useState(10);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = props.data.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (
    event: React.MouseEvent<unknown>,
    id: number | string,
  ) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: (string | number)[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (id: number | string) =>
    enableCheckBox ? selected.indexOf(id) !== -1 : false;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - props.data.length) : 0;

  const colLength = () => {
    let col = 0;

    col += props.headCells.length;

    if (!disableNumber) {
      col += 1;
    }

    if (enableCheckBox) {
      col += 1;
    }

    return col;
  };

  return (
    <Box width="100%">
      <TableContainer>
        <Table
          stickyHeader
          aria-labelledby="tableTitle"
          size="medium"
          sx={{
            wordBreak: 'break-all',
            // tableLayout: 'fixed',
          }}
        >
          <EnhancedTableHead
            numSelected={enableCheckBox ? selected.length : 0}
            orderType={orderType}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={props.data.length}
            headCells={props.headCells}
            bgHeader={props.bgHeader}
            enableCheckBox={enableCheckBox}
            disableNumber={disableNumber}
          />
          <TableBody>
            {!props.loading &&
              // stableSort(props.data, getComparator(orderType, orderBy))
              //   .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              props.data.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    hover
                    // role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={String(index)}
                    selected={isItemSelected}
                  >
                    {!props.loading && enableCheckBox && (
                      <TableCell
                        padding="checkbox"
                        sx={{ border: 'none', bgcolor: '#fff' }}
                      >
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                          onClick={(event) => handleClick(event, row.id)}
                        />
                      </TableCell>
                    )}
                    {!props.loading && !disableNumber && (
                      <TableCell
                        padding="checkbox"
                        sx={{
                          border: 'none',
                          whiteSpace: 'nowrap',
                          bgcolor: '#fff',
                        }}
                        align="center"
                      >
                        {index + 1}
                      </TableCell>
                    )}
                    {props.headCells.map((val, key) => (
                      <TableCell
                        sx={{
                          padding: '10px',
                          border: 'none',
                          whiteSpace: 'wrap',
                          fontSize: '14px',
                          color: '#626b79',
                          bgcolor: '#fff',
                        }}
                        align={val.align as Align}
                        key={String(key)}
                      >
                        {val.format ? val.format(row) : row[val.id]}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
            {!props.loading && props.data.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={props.headCells.length + 1}
                  style={{
                    height: '200px',
                    border: 'none',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column',
                      padding: '50px',
                    }}
                  >
                    <img
                      src="/images/no-data.svg"
                      alt="no-data"
                      width="133px"
                    />
                    <Typography
                      sx={{
                        fontWeight: '500',
                        fontSize: '16px',
                        color: '#232933',
                        my: '10px',
                      }}
                    >
                      No Results Found
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 'normal',
                        fontSize: '14px',
                        color: '#626b79',
                      }}
                    >
                      Try adjusting your keywords and try again
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            )}
            {/* /Loading */}
            {props.loading &&
              [1, 2, 3, 4, 5, 6, 7, 8].map((res) => (
                <TableRow
                  key={res}
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  {Array(colLength())
                    .fill('')
                    .map((val, key) => (
                      <TableCell
                        align={val.align as Align}
                        width={val.width}
                        key={String(key)}
                      >
                        <Skeleton variant="text" />
                      </TableCell>
                    ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box marginY={3}>
        <PaginationStyle
          count={props.totalPage}
          shape="rounded"
          color="primary"
          page={props.page}
          onChange={(_, e) => {
            props.onChangePage(e);
          }}
        />
      </Box>
    </Box>
  );
}

export default EnhancedTable;
