/* eslint-disable no-plusplus */
import React, { useRef } from 'react';
import styled from '@emotion/styled';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Checkbox from '@mui/material/Checkbox';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Skeleton from '@mui/material/Skeleton';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import PaginationItem from '@mui/material/PaginationItem';
import Pagination, {
  PaginationRenderItemParams,
} from '@mui/material/Pagination';

import CodeIcon from '@mui/icons-material/Code';
import ArrowTopDown from 'components/Icon/ArrowTopDown';
import PrevIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined';
import NextIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined';

import EnhancedTableHead from './TableHead';
import { EnhancedTableProps, Align } from './types';
import DefaultNoData from './NoDataView/default';

const PaginationStyle = styled(Pagination)`
  button {
    border: 0.8px solid #d5d5d5;
    color: ${(props: any) => props.theme.palette?.primary.main};
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

export interface Data {
  [key: string]: any;
}

function EnhancedTable<T extends Data>({
  disableNumber = false,
  enableCheckBox = false,
  onChangeSort,
  selected = [],
  setSelected = () => [],
  orderType = 'asc',
  count = 0,
  orderBy,
  ...props
}: EnhancedTableProps<T>) {
  // const [order, setOrder] = React.useState<Order>('asc');
  // const [orderBy, setOrderBy] = React.useState('');
  const [page] = React.useState(0);
  const [rowsPerPage] = React.useState(10);
  const tableRef = useRef<any>();

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = props.data.map((n: { id: string }) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (
    event: React.MouseEvent<unknown>,
    id: string | number | undefined,
  ) => {
    if (!id) return null;
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

  const isSelected = (id: string | number | undefined) => {
    if (!id) return false;

    return enableCheckBox ? selected.indexOf(id) !== -1 : false;
  };

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

  // eslint-disable-next-line consistent-return
  const totalPage = () => {
    if (props?.totalData && count) {
      return Math.ceil(props.totalData / count);
    }

    return 0;
  };

  const numberSumPages = props.page > 1 ? props.page * count - count : 0;

  const headCell = props.headCells.sort((item1, item2) => {
    if (item2.isSticky) {
      return 1;
    }

    if (item1.isSticky) {
      return -1;
    }

    return 0;
  });
  const countTotalSticky = props.headCells.filter((val) => val.isSticky).length;

  const currentWidth = (index: number) =>
    tableRef.current?.children[1]?.childNodes[index]?.scrollWidth;

  const startIndexSticky = () => {
    let countIndeSticky = 0;

    if (enableCheckBox) {
      countIndeSticky += 1;
    }

    if (!disableNumber) {
      countIndeSticky += 1;
    }

    return countIndeSticky;
  };

  const countLeftSticky = (indexTd: number) => {
    let left = 0;

    for (let index = 0; index < indexTd + startIndexSticky(); index++) {
      left += currentWidth(index);
    }

    return left;
  };

  return (
    <Box width="100%">
      <TableContainer>
        <Table stickyHeader aria-labelledby="tableTitle" size="medium">
          <EnhancedTableHead
            numSelected={enableCheckBox ? selected.length : 0}
            orderType={orderType}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={onChangeSort}
            rowCount={props.data.length}
            headCells={headCell}
            bgHeader={props.bgHeader}
            enableCheckBox={enableCheckBox}
            disableNumber={disableNumber}
            countLeftSticky={countLeftSticky}
            countTotalSticky={countTotalSticky}
            startIndexSticky={startIndexSticky}
            currentWidth={currentWidth}
          />
          <TableBody ref={tableRef}>
            {!props.loading &&
              props.data.map((row: T, index: number) => {
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
                    data-testid={`list-table-${index}`}
                  >
                    {!props.loading && enableCheckBox && (
                      <TableCell
                        padding="checkbox"
                        sx={[
                          { border: 'none', bgcolor: '#fff' },
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
                        sx={[
                          {
                            border: 'none',
                            whiteSpace: 'pre-line',
                            bgcolor: '#fff',
                            minWidth: '50px',
                          },
                          countTotalSticky !== 0
                            ? {
                                position: 'sticky',
                                left:
                                  startIndexSticky() === 2
                                    ? currentWidth(0)
                                    : 0,
                                zIndex: 10,
                              }
                            : {},
                        ]}
                        align="center"
                      >
                        {index + 1 + numberSumPages}
                      </TableCell>
                    )}
                    {headCell.map((val, key) => (
                      <TableCell
                        sx={[
                          {
                            padding: '10px',
                            border: 'none',
                            whiteSpace: 'pre-line',
                            fontSize: '14px',
                            color: '#232933',
                            bgcolor: '#fff',
                          },
                          val.isSticky
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
                  height="200px"
                  style={{ border: 'none' }}
                >
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    p="50px"
                    data-testid="data-table-not-result-found"
                  >
                    {!props.noDataComponent ? (
                      <DefaultNoData />
                    ) : (
                      props.noDataComponent
                    )}
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
      {!props.disablePagination && (
        <Stack direction="row" marginY={3} justifyContent="space-between">
          <PaginationStyle
            count={totalPage()}
            shape="rounded"
            color="primary"
            page={props.page}
            onChange={(_, e) => {
              if (props.onChangePage) {
                props.onChangePage(e);
              }
            }}
            renderItem={(item: PaginationRenderItemParams) => (
              <PaginationItem
                components={{ previous: PrevIcon, next: NextIcon }}
                {...item}
              />
            )}
          />
          {props.onChangeRowPerpage && (
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={count}
              onChange={(e) => {
                const newValue = e.target.value as number;
                if (props.onChangeRowPerpage)
                  props.onChangeRowPerpage(newValue);
              }}
              IconComponent={() => (
                <Box position="absolute" right="13px" top="10px">
                  <CodeIcon
                    sx={{ transform: 'rotate(90deg)', fontSize: '15px' }}
                  />
                </Box>
              )}
              sx={{
                mr: '20px',
                fontSize: '14px',
                borderRadius: '8px',
                width: '160px',
                '.MuiSelect-select': {
                  padding: '8px 18px',
                  paddingRight: '0 !important',
                },
                '&.MuiOutlinedInput-root': {
                  '& fieldset': {
                    border: '#626B79 solid 1px',
                  },
                  '&:hover fieldset': {
                    border: '#626B79 solid 1px',
                  },
                  '&.Mui-focused fieldset': {
                    border: '#626B79 solid 1px',
                  },
                },
              }}
            >
              {props.rowsPerPageOptions?.map((val) => (
                <MenuItem key={val} value={val}>
                  {val} Row per page
                </MenuItem>
              ))}
            </Select>
          )}
        </Stack>
      )}
    </Box>
  );
}

EnhancedTable.defaultProps = {
  page: 1,
  rowsPerPageOptions: [5, 10, 15],
};
export default EnhancedTable;
