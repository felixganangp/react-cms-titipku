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
import { useMerchantDepoList, useMerchantList } from '../Hooks/useMerchant';

export default function MerchantsPages() {
  const merchantQuery = useMerchantDepoList();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<(string | number)[]>([]);
  const showFilter = useModal();

  const headCells: HeadCells<any>[] = [
    // {
    //   id: 'rank',
    //   label: 'Rank',
    //   format: (value) => `#${value.rank}`,
    // },
    {
      id: 'Join Date',
      label: 'Join Date',
      format: (value) => moment(value.join_date * 1000).format('DD MMM YYYY'),
    },
    {
      id: 'merchant_name',
      label: 'Merchant Name',
      format: (value) => {
        const isNew = false && (
          <Typography
            color="primary"
            component="span"
            fontWeight="bold"
            fontSize="14px"
          >
            [NEW]{' '}
          </Typography>
        );
        return (
          <Typography>
            {isNew}
            {value.merchant_name}
          </Typography>
        );
      },
    },
    {
      id: 'type',
      label: 'Merchant Name',
    },
    {
      id: 'limit',
      enableSort: true,
      label: 'Limit',
      format: (value) => {
        if (!value.limit) return <Typography>-</Typography>;
        return <Typography>Rp {numberSeperator(value.limit)}</Typography>;
      },
    },
    {
      id: 'balance',
      enableSort: true,
      label: 'Balance',
      format: (value) => {
        if (!value.balance) return <Typography>-</Typography>;
        return <Typography>Rp {numberSeperator(value.balance)}</Typography>;
      },
    },
    {
      id: 'total_gmv',
      enableSort: true,
      label: 'Total GMV',
      format: (value) => {
        if (!value.total_gmv) return <Typography>-</Typography>;
        return <Typography>Rp {numberSeperator(value.total_gmv)}</Typography>;
      },
    },
    {
      id: 'Action',
      label: 'Action',
      format: (value) => (
        <MenuList
          menu={[
            {
              label: 'Detail',
              onClick: () => {
                navigate('/depo/merchants/id');
              },
            },
            {
              label: 'Edit',
              onClick: () => {
                navigate('/depo/merchants/form/id');
              },
            },
            {
              label: 'Delete',
              color: 'error',
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
                placeholder="Search for Invoice Number"
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
              <Grid item xs={12} md={5}>
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
              <Grid item xs={12} md={3}>
                <FormLabel text="Merchant Name">
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
              <Grid item xs={12} md={4}>
                <FormLabel text="Join Date">
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
            data={merchantQuery.listData}
            selected={selected}
            setSelected={(e) => {
              setSelected(e);
            }}
            enableCheckBox
            orderBy={merchantQuery.params.order_by}
            orderType={merchantQuery.params.order_type}
            loading={merchantQuery.isLoading}
            page={merchantQuery.data?.page || 0}
            count={merchantQuery.data?.count || 0}
            totalData={merchantQuery.data?.total || 0}
            onChangeSort={(value) => {
              merchantQuery.handleChangeParams({
                ...merchantQuery.params,
                order_by: value.orderBy,
                order_type: value.orderType,
              });
              merchantQuery.handleToSetSearchParams('order_by', value.id);
              merchantQuery.handleToSetSearchParams('order_type', value.order);
            }}
            onChangePage={(value) => {
              merchantQuery.handleChangeParams({
                ...merchantQuery.params,
                page: value,
              });
              merchantQuery.handleToSetSearchParams('page', value.toString());
            }}
          />
        </Card>
      </Stack>
    </Box>
  );
}
