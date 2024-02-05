/* eslint-disable no-nested-ternary */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */

// import MenuList from 'components/MenuList';
import { HeadCells } from 'components/Table/types';
import { KeyboardArrowDown, Search } from '@mui/icons-material';
import {
  Box,
  Stack,
  Card,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Collapse,
  Grid,
  Autocomplete,
} from '@mui/material';
import Table from 'components/Table';
// import moment from 'moment';
import { useState } from 'react';
import useModal from 'hooks/useModal';
import FormLabel from 'components/FormLabel';
// import { DesktopDatePicker } from '@mui/x-date-pickers';
import { useNavigate } from 'react-router-dom';
import numberSeperator from 'utils/numberSeperator';
import {
  UseAreaListService,
} from '../../hooks/useConfigMerchant';
import { useMerchantDepoList } from '../../hooks/useMerchant';

export default function DisburseForm() {
  const [selected, setSelected] = useState<(string | number)[]>([]);
  const navigate = useNavigate();
  const showFilter = useModal();

  const queryMerchant = useMerchantDepoList();
  const queryArea = UseAreaListService();

  const headCells: HeadCells<any>[] = [
    {
      id: 'area_name',
      label: 'Pasar',
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
      id: 'average_daily_transaction',
      label: 'Average Daily Transaction',
      enableSort: true,
      format: (value) => {
        if (!value.average_daily_transaction) return <Typography>-</Typography>;
        return (
          <Typography>
            Rp {numberSeperator(value.average_daily_transaction)}
          </Typography>
        );
      },
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
              <TextField
                placeholder="Search Merchant"
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
                <FormLabel text="Pasar">
                  <Autocomplete
                    options={queryArea.listData.map((val) => ({
                      id: val.id,
                      name: val.title,
                    }))}
                    noOptionsText={
                      !queryArea.searchValue
                        ? 'Type to search area name'
                        : 'No option'
                    }
                    inputValue={queryArea.searchValue}
                    onInputChange={(_, newInputValue) => {
                      queryArea.handleSearch(newInputValue);
                    }}
                    loading={queryArea.isFetching}
                    getOptionLabel={(item) => item.name}
                    value={
                      queryArea.listData
                        .map((val) => ({
                          id: val.id,
                          name: val.title,
                        }))
                        .find(
                          (val) =>
                            // @ts-ignore
                            queryMerchant.formik.values.area_id === val.id,
                        ) || null
                    }
                    onChange={(e, value) => {
                      queryMerchant.formik.setFieldValue('area_id', value?.id);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="Area"
                        placeholder="Select Area"
                        // error={
                        //   formik.touched.area && Boolean(formik.errors.area)
                        // }
                      />
                    )}
                  />
                </FormLabel>
              </Grid>
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
              <Grid item xs={12} md={4}>
                <FormLabel text="Condition">
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
                      queryMerchant.formik.resetForm();
                      queryMerchant.handleResetFilter({
                        whiteList: ['search'],
                      });
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
            data={queryMerchant.listData.map((item) => {
              const tenPecent = item.limit * 0.1;
              const fivePecent = item.limit * 0.05;
              return {
                ...item,
                table_color:
                  tenPecent >= item.balance
                    ? '#F9EBE7'
                    : fivePecent >= item.balance
                    ? '#FFF3CD'
                    : '#fff',
                id: item.jelajah_id,
              };
            })}
            selected={selected}
            setSelected={(e) => {
              setSelected(e);
            }}
            enableRadio
            orderBy={queryMerchant.params.order_by}
            orderType={queryMerchant.params.order_type}
            loading={queryMerchant.isLoading}
            page={queryMerchant.data?.page || 0}
            count={queryMerchant.data?.count || 0}
            totalData={queryMerchant.data?.total || 0}
            onChangeSort={(value) => {
              queryMerchant.handleChangeParams({
                ...queryMerchant.params,
                order_by: value.orderBy,
                order_type: value.orderType,
              });
              queryMerchant.handleToSetSearchParams(
                'order_by',
                // @ts-ignore
                value.orderBy || '',
              );
              queryMerchant.handleToSetSearchParams(
                'order_type',
                value.orderType,
              );
            }}
            onChangePage={(value) => {
              queryMerchant.handleChangeParams({
                ...queryMerchant.params,
                page: value,
              });
              queryMerchant.handleToSetSearchParams('page', value.toString());
            }}
          />
          <Stack direction="row" gap={2}>
            <Button variant="text" color="error" onClick={() => navigate(-1)}>
              Back
            </Button>
            <Button
              sx={{ borderRadius: '4px' }}
              // onClick={showFilter.toggleModal}
            >
              Next
            </Button>
          </Stack>
        </Card>
      </Stack>
    </Box>
  );
}
