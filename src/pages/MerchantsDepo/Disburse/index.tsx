import MenuList from 'components/MenuList';
import { HeadCells } from 'components/Table/types';
import { Add, KeyboardArrowDown, MoreVert, Search } from '@mui/icons-material';
import {
  Box,
  Stack,
  Card,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Menu,
  IconButton,
  Collapse,
  Grid,
  Autocomplete,
} from '@mui/material';
import Table from 'components/Table';
import moment from 'moment';
import { useState } from 'react';
import useModal from 'hooks/useModal';
import FormLabel from 'components/FormLabel';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { useNavigate } from 'react-router-dom';
import numberSeperator from 'utils/numberSeperator';
import Label from 'components/Label';

export default function DisbursePages() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<(string | number)[]>([]);
  const showFilter = useModal();

  const headCells: HeadCells<any>[] = [
    {
      id: 'date',
      label: 'Date',
      format: (value) => moment().format('DD MMM YYYY'),
    },
    {
      id: 'due_date',
      label: 'Due Date',
      format: (value) => moment().format('DD MMM YYYY'),
    },
    {
      id: 'dpd',
      label: 'DPD',
    },
    {
      id: 'merch_name',
      label: 'Merchant Name',
    },
    {
      id: 'paid_date',
      label: 'Paid Date',
      format: (value) => moment().format('DD MMM YYYY'),
    },
    {
      id: 'account',
      label: 'Account Number',
    },
    {
      id: 'amount',
      label: 'Amount',
      format: ({ amount }) => {
        return (
          <Typography variant="body1">
            Rp. {numberSeperator(amount || 0)}
          </Typography>
        );
      },
    },
    {
      id: 'amount_trf',
      label: 'Amount',
      format: ({ amount_trf }) => {
        return (
          <Typography variant="body1">
            Rp. {numberSeperator(amount_trf || 0)}
          </Typography>
        );
      },
    },
    {
      id: 'status',
      label: 'Status',
      align: 'center',
      format: ({ status }) => {
        const color =
          // eslint-disable-next-line no-nested-ternary
          status === 'Waiting'
            ? 'warning'
            : status === 'Transferred'
            ? 'success'
            : 'info';
        return (
          <Label variant="filled" color={color}>
            {status}
          </Label>
        );
      },
    },
    {
      id: 'Action',
      label: 'Action',
      format: (value) => (
        <MenuList
          menu={[
            {
              label: 'Edit',
              onClick: () => {},
            },
            {
              label: 'Delete',
              color: 'error',
              onClick: () => {},
            },
            {
              label: 'Update to Transfer',
              color: 'error',
              hide: value.status !== 'Waiting',
              onClick: () => {},
            },
          ]}
        >
          <IconButton>
            <MoreVert />
          </IconButton>
        </MenuList>
      ),
    },
  ];
  return (
    <Box p="20px" bgcolor="#F5F7FA">
      <Stack spacing={2}>
        <Card>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={2}
          >
            <Stack direction="row" alignItems="center" gap={2} flex={1}>
              <Button
                startIcon={<Add />}
                onClick={() => navigate('/depo/merchants/form')}
              >
                Add New
              </Button>
              <TextField
                placeholder="Search Item"
                size="small"
                sx={{ bgcolor: '#ebeff3', maxWidth: '560px', flex: 1 }}
                fullWidth
                // value={queryInnvoice.searchValue}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                // onChange={(event) => {
                //   queryInnvoice.handleSearch(event.target.value);
                //   queryInnvoice.handleToSetSearchParams(
                //     'search',
                //     event.target.value,
                //   );
                // }}
              />
            </Stack>
            <Stack direction="row" alignItems="center" gap={2}>
              <Button
                endIcon={<KeyboardArrowDown />}
                //   variant="outlined"
                onClick={showFilter.toggleModal}
              >
                Filter
              </Button>
              <MenuList
                menu={[
                  {
                    label: 'Delete 2 Items',
                    color: 'error',
                    onClick: () => {},
                  },
                ]}
              >
                <Button
                  endIcon={<KeyboardArrowDown />}
                  //   variant="outlined"
                  //   onClick={showFilter.toggleModal}
                >
                  Action
                </Button>
              </MenuList>
            </Stack>
          </Stack>
          <Collapse in={showFilter.open}>
            <Grid
              container
              spacing={2}
              component="form"
              mt={2}
              // onSubmit={queryInnvoice.formikParams.handleSubmit}
            >
              <Grid item xs={12} md={4}>
                <FormLabel text="Merchant Name">
                  <Autocomplete
                    options={[]}
                    // onBlur={() => {
                    //   formik.setFieldTouched('area');
                    // }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="Merchant"
                        placeholder="Select Merchant Name"
                        // error={
                        //   formik.touched.area && Boolean(formik.errors.area)
                        // }
                      />
                    )}
                  />
                </FormLabel>
              </Grid>
              <Grid item xs={12} md={2}>
                <FormLabel text="Status">
                  <Autocomplete
                    options={[]}
                    // onBlur={() => {
                    //   formik.setFieldTouched('area');
                    // }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="Type"
                        placeholder="Select Status"
                        // error={
                        //   formik.touched.area && Boolean(formik.errors.area)
                        // }
                      />
                    )}
                  />
                </FormLabel>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormLabel text="Date">
                  <DesktopDatePicker
                    // value={
                    //   queryInnvoice.formikParams.values.max_invoice_date || null
                    // }
                    value={null}
                    onChange={() => {}}
                    inputFormat="DD/MM/YYYY"
                    // onChange={(value) => {
                    //   queryInnvoice.formikParams.setFieldValue(
                    //     'max_invoice_date',
                    //     value,
                    //   );
                    // }}
                    // minDate={queryInnvoice.formikParams.values.min_invoice_date}
                    // maxDate={formik.values.max_date_created}
                    renderInput={(params) => {
                      return (
                        <TextField
                          {...params}
                          name="grade"
                          placeholder="Select Grade"
                          variant="outlined"
                          fullWidth
                        />
                      );
                    }}
                  />
                </FormLabel>
              </Grid>
              <Grid item xs={12} md={12}>
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  justifyContent="end"
                >
                  <Button
                    variant="text"
                    onClick={() => {
                      // queryInnvoice.formikParams.resetForm();
                      // queryInnvoice.handleResetFilter({
                      //   whiteList: ['search'],
                      // });
                    }}
                  >
                    Reset
                  </Button>
                  <Button type="submit">Apply</Button>
                </Stack>
              </Grid>
            </Grid>
          </Collapse>
        </Card>
        <Card>
          <Table
            headCells={headCells}
            data={[
              {
                date: '2021-10-10',
                due_date: 1,
                dpd: 1,
                merch_name:
                  'LP - 03 Toko Joni Tahu Tempe (Pasar Modern Paramount)',
                paid_date: '2021-10-10',
                account: 'BCA - 293958292',
                amount: 1200000,
                amount_trf: 1100000,
                status: 'Transferred',
              },
              {
                date: '2021-10-10',
                due_date: 1,
                dpd: 1,
                merch_name:
                  'LP - 99 Toko JoJon Ayam Kuing (Pasar Modern Bintaro)',
                paid_date: '2021-10-10',
                account: 'BCA - 293958292',
                amount: 1000000,
                amount_trf: 900000,
                status: 'Waiting',
              },
            ]}
            selected={selected}
            setSelected={(e) => {
              setSelected(e);
            }}
            enableCheckBox
            orderBy="total_gmv"
            // loading={queryInnvoice.isLoading}
            // page={queryInnvoice.data?.page || 0}
            // count={queryInnvoice.data?.count || 0}
            // totalData={queryInnvoice.data?.total || 0}
            // onChangePage={(value) => {
            //   queryInnvoice.handleChangeParams({
            //     ...queryInnvoice.params,
            //     page: value,
            //   });
            //   queryInnvoice.handleToSetSearchParams('page', value.toString());
            // }}
          />
        </Card>
      </Stack>
    </Box>
  );
}
