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
import { useEffect, useState } from 'react';
import useModal from 'hooks/useModal';
import Modal from 'components/Modal';
import FormLabel from 'components/FormLabel';
// import { DesktopDatePicker } from '@mui/x-date-pickers';
import { useNavigate, useParams } from 'react-router-dom';
import numberSeperator from 'utils/numberSeperator';
import ModalFormDisburseDepo from './components/ModalForm';
import {
  UseAreaListService,
  UseFilterMerchentDepoListService,
} from '../../hooks/useConfigMerchant';
import {
  useMerchantDepoList,
  MerchantCondition,
} from '../../hooks/useDisburse';

export default function DisburseForm() {
  const [selected, setSelected] = useState<(string | number)[]>([]);
  const { id } = useParams();
  const [selectedData, setSelectedData] = useState<{
    id_jelajah: number;
  }>();
  const navigate = useNavigate();
  const showFilter = useModal();
  const formModal = useModal();

  const queryMerchant = useMerchantDepoList();
  const queryArea = UseAreaListService();
  const filterMerchantDepoList = UseFilterMerchentDepoListService();

  const headCells: HeadCells<any>[] = [
    {
      id: 'area_name',
      label: 'Pasar',
    },

    {
      id: 'merchant_name',
      label: 'Merchant Name',
      format: (value) => {
        const isNew = value.is_new && (
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
                value={queryMerchant.searchValue}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                onChange={(event) => {
                  queryMerchant.handleSearch(event.target.value);
                  queryMerchant.handleToSetSearchParams(
                    'search',
                    event.target.value,
                  );
                }}
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
              onSubmit={queryMerchant.formik.handleSubmit}
            >
              <Grid item xs={12} md={4}>
                <FormLabel text="Pasar">
                  <Autocomplete
                    options={
                      queryArea.listData.map((val) => ({
                        id: val.id,
                        name: val.title,
                      })) || []
                    }
                    noOptionsText={
                      !queryArea.searchValue
                        ? 'Type to search pasar'
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
                            val.id === queryMerchant.formik.values.area_id,
                        ) || null
                    }
                    onChange={(e, value) =>
                      queryMerchant.formik.setFieldValue('area_id', value?.id)
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="area_id"
                        placeholder="Select Pasar"
                      />
                    )}
                  />
                </FormLabel>
              </Grid>
              <Grid item xs={12} md={5}>
                <FormLabel text="Merchant Name">
                  <Autocomplete
                    options={filterMerchantDepoList.listData.map((val) => ({
                      id: val.id,
                      name: val.merchant_name,
                    }))}
                    noOptionsText={
                      !filterMerchantDepoList.searchValue
                        ? 'Type to search merchant name'
                        : 'No option'
                    }
                    inputValue={filterMerchantDepoList.searchValue}
                    onInputChange={(_, newInputValue) => {
                      filterMerchantDepoList.handleSearch(newInputValue);
                    }}
                    loading={filterMerchantDepoList.isFetching}
                    getOptionLabel={(item) => item.name}
                    value={queryMerchant.formik.values.jelajah_id}
                    multiple
                    onChange={(e, value) => {
                      queryMerchant.formik.setFieldValue('jelajah_id', value);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="Merchant"
                        placeholder="Name of Merchant"
                        // error={
                        //   formik.touched.area && Boolean(formik.errors.area)
                        // }
                      />
                    )}
                  />
                </FormLabel>
              </Grid>
              <Grid item xs={12} md={2}>
                <FormLabel text="Condition">
                  <Autocomplete
                    id="filterStatus"
                    value={
                      queryMerchant.formik.values.balance_condition
                        ? {
                            id: queryMerchant.formik.values.balance_condition,
                            name: MerchantCondition[
                              queryMerchant.formik.values.balance_condition
                            ],
                          }
                        : null
                    }
                    options={Object.keys(MerchantCondition).map((val) => ({
                      id: val,
                      // @ts-ignore
                      name: MerchantCondition[val],
                    }))}
                    onChange={(e, value) => {
                      if (value?.id === '1') {
                        queryMerchant.formik.setFieldValue('is_new', value?.id);
                      } else {
                        queryMerchant.formik.setFieldValue('is_new', undefined);
                        queryMerchant.formik.setFieldValue(
                          'balance_condition',
                          value?.id,
                        );
                      }
                    }}
                    getOptionLabel={(option) => `${option.name}`}
                    renderInput={(params) => {
                      return (
                        <TextField
                          {...params}
                          name="condition"
                          placeholder="Select Condition"
                          variant="outlined"
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
                  tenPecent >= item.balance && !item.is_new
                    ? '#F9EBE7'
                    : fivePecent >= item.balance && !item.is_new
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
            orderBy={queryMerchant.params.sort_by || 'disburse'}
            orderType={queryMerchant.params.sort_type}
            loading={queryMerchant.isLoading}
            page={queryMerchant.data?.page || 0}
            count={queryMerchant.data?.count || 0}
            totalData={queryMerchant.data?.total || 0}
            onChangeSort={(value) => {
              queryMerchant.handleChangeParams({
                ...queryMerchant.params,
                sort_by: value.orderBy || 'disburse',
                sort_type: value.orderType,
              });
              queryMerchant.handleToSetSearchParams(
                'sort_by',
                // @ts-ignore
                value.orderBy || 'disburse',
              );
              queryMerchant.handleToSetSearchParams(
                'sort_type',
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
            <Button
              variant="text"
              color="error"
              onClick={() => navigate('/depo/disburse')}
            >
              Back
            </Button>
            <Button
              sx={{ borderRadius: '4px', width: '120px' }}
              disabled={selected.length === 0}
              onClick={() => {
                formModal.openModal();
                setSelectedData({
                  id_jelajah: +selected[0],
                });
              }}
            >
              Next
            </Button>
          </Stack>
        </Card>
      </Stack>

      <Modal
        open={formModal.open}
        title="Add New Disburse"
        onClose={!id ? formModal.closeModal : () => navigate(-1)}
      >
        <ModalFormDisburseDepo
          id={id}
          id_jelajah={selectedData?.id_jelajah}
          handleClose={(isSubmit) => {
            if (isSubmit) {
              navigate(-1);
            }
          }}
        />
      </Modal>
    </Box>
  );
}
