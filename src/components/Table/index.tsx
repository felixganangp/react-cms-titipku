import React from 'react';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Skeleton from '@mui/material/Skeleton';
import Pagination from '@mui/material/Pagination';

const PaginationStyle = styled(Pagination)`
  button {
    border: 0.8px solid #d5d5d5;
    color: ${(props: any) => props.theme.palette.primary.main};
    margin: 0;
    border-radius: 0;
  }
  div {
    border: 0.8px solid #d5d5d5;
    border-radius: 0;
    margin: 0;
    height: 32px;
    width: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
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
type Order = 'asc' | 'desc';


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

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
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
  
interface Data {
    name: string;
    code: string;
    population: number;
    size: number;
    density: number;
  }

  interface headCells {
    id: string;
    label: string;
    width?: number | string,
    format?: void,
    disablePadding?: boolean,
    align: any;

  }
  
  
interface EnhancedTableProps {
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void,
    order?: Order,
    orderBy?: string,
    numSelected: number,
    rowCount: number,
    enableCheckBox?: boolean,
    headCells: headCells[],
    bgHeader?:string,
    disableNumber?: boolean,
    onRequestSort: any
} 

function EnhancedTableHead(props: EnhancedTableProps) {
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
          {props.headCells.map(headCell => (
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
              align={headCell.align}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : undefined}
              width={headCell.width}
            >
              {headCell.label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  interface EnhancedTable {
    order?: Order,
    setSelected: (e:any)=> void,
    enableCheckBox: boolean,
    selected: number[],
    data: any[],
    loading: boolean,
    handleRequestSort: any,
    onChangePage: (e: number) => void,
    totalPage: number,
    page: number,
    headCells: any[],
    disableNumber: boolean,
    bgHeader: string

} 
  function EnhancedTable(props: EnhancedTable) {
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [page] = React.useState(0);
    const [rowsPerPage] = React.useState(10);
  
    const handleRequestSort = ( 
         event: React.MouseEvent<unknown>,
        property: keyof Data
        ) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };
  
    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        const newSelecteds = props.data.map(n => n.id);
        props.setSelected(newSelecteds);
        return;
      }
      props.setSelected([]);
    };
  
    const handleClick = (event: React.MouseEvent<unknown>, id: any) => {
      const selectedIndex = props.selected.indexOf(id);
      let newSelected: number[] = [];
  
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(props.selected, id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(props.selected.slice(1));
      } else if (selectedIndex === props.selected.length - 1) {
        newSelected = newSelected.concat(props.selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          props.selected.slice(0, selectedIndex),
          props.selected.slice(selectedIndex + 1),
        );
      }
  
      props.setSelected(newSelected);
    };
  
    const isSelected =( id?: any) =>
      props.enableCheckBox ? props.selected.indexOf(id) !== -1 : false;
  
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - props.data.length) : 0;
  
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
              numSelected={props.enableCheckBox ? props.selected.length : 0}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={props.data.length}
              headCells={props.headCells}
              bgHeader={props.bgHeader}
              enableCheckBox={props.enableCheckBox}
              disableNumber={props.disableNumber}
            />
            <TableBody>
              {!props.loading &&
                stableSort(props.data, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
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
                        {!props.loading && props.enableCheckBox && (
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
                              onClick={event => handleClick(event, row.id)}
                            />
                          </TableCell>
                        )}
                        {!props.loading && !props.disableNumber && (
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
                            align={val.align}
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
                      {/* <img src={Nodata} alt="no-data" width="133px" /> */}
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
                [1, 2, 3, 4, 5, 6, 7, 8].map(res => (
                  <TableRow
                    key={res}
                    style={{
                      height: 53 * emptyRows,
                    }}
                  >
                    {props.headCells.map((val, key) => (
                      <TableCell
                        align={val.align}
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
export default function Tabel() {
  return (
    <div>Tabel</div>
  )
}
