import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Collapse from '@mui/material/Collapse';
import Autocomplete from '@mui/material/Autocomplete';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import Table from 'components/Table';
import MenuList from 'components/MenuList';
import Status from 'components/Status';
import useModal from 'hooks/useModal';

import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function Ivoice() {
  const formModal = useModal();
  const [collapseFilter, setCollapseFilter] = useState(false);

  const headCell = [
    {
      id: 'id',
      label: 'ID',
      align: 'left',
      enableSort: true,
      format: () => {
        return (
          <Link
            to="INV/192323934"
            style={{ textDecoration: 'none', color: '#0774d1' }}
          >
            INV/192323934
          </Link>
        );
      },
    },
    {
      id: 'condition',
      label: 'Condition',
      align: 'left',
      enableSort: true,
      width: '60px',
      format: () => {
        return <Status color="#cecece">Late</Status>;
      },
    },
    {
      id: 'status',
      label: 'Status',
      align: 'left',
      enableSort: true,
      width: '60px',
      format: () => {
        return <Status color="#cecece">Debt</Status>;
      },
    },
    {
      id: 'cust',
      label: 'Name',
      align: 'left',
      enableSort: true,
      format: () => {
        return (
          <Box display="flex" alignItems="center" gap="10px">
            <Box
              bgcolor="#cecece"
              width="8px"
              height="8px"
              borderRadius="100%"
            />
            <Typography>Neneng Murdiyati</Typography>
          </Box>
        );
      },
    },
    {
      id: 'kurType',
      label: 'KUR Type',
      align: 'left',
    },
    {
      id: 'req_amount',
      label: 'Request Amount',
      align: 'left',
    },
    {
      id: 'delivy',
      label: 'Delivery Date',
      align: 'left',
    },
    {
      id: 'invoice',
      label: 'Invoice Date',
      align: 'left',
    },
    {
      id: 'due',
      label: 'Due Date',
      align: 'left',
    },
    {
      id: 'due',
      label: 'Last Paid',
      align: 'left',
    },
    {
      id: 'paid_amount',
      label: 'Paid amount',
      align: 'left',
    },
    {
      id: 'action',
      label: 'Action',
      align: 'left',
      format: () => (
        <>
          <MenuList
            menu={[
              {
                label: 'Details',
                onClick: () => {},
              },
            ]}
          >
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </MenuList>
        </>
      ),
    },
  ];

  return (
    <div>
      <Box>
        <Box p="20px" bgcolor="#F5F7FA">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card>
                <Typography variant="titlePage">Invoice Managemet</Typography>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <Box display="flex" gap="20px" flexWrap="wrap">
                  <Button startIcon={<AddIcon />} onClick={formModal.openModal}>
                    Add New
                  </Button>
                  <Box flex="1">
                    <TextField
                      placeholder="Search for name or email"
                      size="small"
                      sx={{ bgcolor: '#ebeff3', maxWidth: '560px' }}
                      fullWidth
                      // defaultValue={roleUser.params.search}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                      }}
                      onChange={(event) => {
                        // debounceSearch(event.target.value);
                      }}
                    />
                  </Box>
                  <Button
                    endIcon={<KeyboardArrowDownIcon />}
                    onClick={() => setCollapseFilter(!collapseFilter)}
                  >
                    Filter
                  </Button>
                </Box>
                <Collapse in={collapseFilter}>
                  <Grid container spacing={2} sx={{ marginTop: '2rem' }}>
                    <Grid item xs={3}>
                      <Typography
                        sx={{
                          fontSize: '14px',
                          fontWeight: '500',
                          marginBottom: 1,
                        }}
                      >
                        Type
                      </Typography>
                      <Autocomplete
                        data-testid="filter-type-customer"
                        id="type"
                        options={[]}
                        onChange={(e, value) => {
                          // setTypeKurFilter(value);
                        }}
                        // isOptionEqualToValue={(option: Type) => {
                        //   return (
                        //     option.id === customerKur.stateFilter?.typeKur?.id
                        //   );
                        // }}
                        getOptionLabel={(option) => `${option.name}`}
                        // value={customerKur?.stateFilter?.typeKur}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            name="type"
                            placeholder="Select Type of KUR"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <Typography
                        sx={{
                          fontSize: '14px',
                          fontWeight: '500',
                          marginBottom: 1,
                        }}
                      >
                        Pasar
                      </Typography>
                      <Autocomplete
                        data-testid="filter-type-customer"
                        id="type"
                        options={[]}
                        onChange={(e, value) => {
                          // setTypeKurFilter(value);
                        }}
                        // isOptionEqualToValue={(option: Type) => {
                        //   return (
                        //     option.id === customerKur.stateFilter?.typeKur?.id
                        //   );
                        // }}
                        getOptionLabel={(option) => `${option.name}`}
                        // value={customerKur?.stateFilter?.typeKur}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            name="type"
                            placeholder="Select Type of KUR"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <Typography
                        sx={{
                          fontSize: '14px',
                          fontWeight: '500',
                          marginBottom: 1,
                        }}
                      >
                        Status
                      </Typography>
                      <Autocomplete
                        data-testid="filter-type-customer"
                        id="type"
                        options={[]}
                        onChange={(e, value) => {
                          // setTypeKurFilter(value);
                        }}
                        // isOptionEqualToValue={(option: Type) => {
                        //   return (
                        //     option.id === customerKur.stateFilter?.typeKur?.id
                        //   );
                        // }}
                        getOptionLabel={(option) => `${option.name}`}
                        // value={customerKur?.stateFilter?.typeKur}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            name="type"
                            placeholder="Select Type of KUR"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <Typography
                        sx={{
                          fontSize: '14px',
                          fontWeight: '500',
                          marginBottom: 1,
                        }}
                      >
                        Condition
                      </Typography>
                      <Autocomplete
                        data-testid="filter-type-customer"
                        id="type"
                        options={[]}
                        onChange={(e, value) => {
                          // setTypeKurFilter(value);
                        }}
                        // isOptionEqualToValue={(option: Type) => {
                        //   return (
                        //     option.id === customerKur.stateFilter?.typeKur?.id
                        //   );
                        // }}
                        getOptionLabel={(option) => `${option.name}`}
                        // value={customerKur?.stateFilter?.typeKur}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            name="type"
                            placeholder="Select Type of KUR"
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </Collapse>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Box
                bgcolor="#fff"
                p="7px"
                borderRadius="5px"
                boxShadow="0 3px 10px 0 rgba(0, 0, 0, 0.1)"
                data-testid="table-customer"
              >
                <Table
                  data={[]}
                  headCells={headCell}
                  selected={[]}
                  // page={customerKur.params.page}
                  // totalData={customerKur.total}
                  // count={customerKur.params.count}
                  // orderBy={customerKur.params.order_by}
                  // orderType={customerKur.params.order_type}
                  // onChangePage={(val) => handleChangePage(val)}
                  // onChangeSort={(val) => handleChangeSort(val)}
                  enableCheckBox
                  disableNumber
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
}

const data = [
  {
    kurType: 'B2B',
    amount: 'Rp.100',
  },
];
