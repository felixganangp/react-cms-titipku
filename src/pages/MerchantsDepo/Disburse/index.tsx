/* eslint-disable @typescript-eslint/no-unused-vars */
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
  Modal,
  IconButton,
  Collapse,
  Grid,
  Autocomplete,
} from '@mui/material';
import Table from 'components/Table';
import DeleteModal from 'components/Delete/freetext';
import moment from 'moment';
import { useState } from 'react';
import useModal from 'hooks/useModal';
import FormLabel from 'components/FormLabel';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { useNavigate } from 'react-router-dom';
import numberSeperator from 'utils/numberSeperator';
import Label from 'components/Label';
import SearchIcon from '@mui/icons-material/Search';

import {
  UseDisburse,
  DisburseStatus,
  useDeleteDisburse,
} from '../hooks/useDisburse';
import { useMerchantFilterList } from '../hooks/useMerchant';

export default function DisbursePages() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<(string | number)[]>([]);
  const showFilter = useModal();
  const modalDelete = useModal();

  const queryDisburse = UseDisburse();
  const queryMerchantFilter = useMerchantFilterList();
  const deleteDisburse = useDeleteDisburse();

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
      id: 'merchant_name',
      label: 'Merchant Name',
    },
    {
      id: 'paid_date',
      label: 'Paid Date',
      format: (value) => moment().format('DD MMM YYYY'),
    },
    {
      id: 'account_number',
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
      id: 'transfer_amount',
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
          status === 'On Process'
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
              onClick: () => {
                setSelected([value.id]);
                modalDelete.openModal();
              },
            },
            {
              label: 'Update to Transfer',
              color: 'error',
              hide: value.status !== 'On Process',
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
                onClick={() => navigate('/depo/disburse/form')}
              >
                Add New
              </Button>
              <TextField
                placeholder="Search items"
                size="small"
                sx={{ bgcolor: '#ebeff3', maxWidth: '560px', flex: 1 }}
                fullWidth
                value={queryDisburse.searchValue}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={(event) => {
                  queryDisburse.handleSearch(event.target.value);
                  queryDisburse.handleToSetSearchParams(
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
              <MenuList
                menu={[
                  {
                    label: `Delete ${selected.length} Items`,
                    color: 'error',
                    onClick: () => {
                      modalDelete.openModal();
                    },
                  },
                ]}
              >
                <Button
                  endIcon={<KeyboardArrowDown />}
                  disabled={selected.length === 0}
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
              onSubmit={queryDisburse.formikParams.handleSubmit}
            >
              <Grid item xs={12} md={4}>
                <FormLabel text="Pasar">
                  <Autocomplete
                    options={
                      queryMerchantFilter.listData.map((val) => ({
                        id: val.id,
                        name: val.merchant_name,
                      })) || []
                    }
                    noOptionsText={
                      !queryMerchantFilter.searchValue
                        ? 'Type to search merchant'
                        : 'No option'
                    }
                    inputValue={queryMerchantFilter.searchValue}
                    onInputChange={(_, newInputValue) => {
                      queryMerchantFilter.handleSearch(newInputValue);
                    }}
                    loading={queryMerchantFilter.isFetching}
                    getOptionLabel={(item) => item.name}
                    value={
                      queryMerchantFilter.listData
                        .map((val) => ({
                          id: val.id,
                          name: val.merchant_name,
                        }))
                        .find(
                          (val) =>
                            val.id ===
                            queryDisburse.formikParams.values.jelajah_id,
                        ) || null
                    }
                    // value={queryInnvoice}
                    onChange={(e, value) =>
                      queryDisburse.formikParams.setFieldValue(
                        'jelajah_id',
                        value?.id,
                      )
                    }
                    // onBlur={() => {
                    //   formik.setFieldTouched('area');
                    // }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="area"
                        placeholder="Select Merchant"
                        // error={
                        //   formik.touched.area && Boolean(formik.errors.area)
                        // }
                      />
                    )}
                  />
                </FormLabel>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormLabel text="Status">
                  <Autocomplete
                    id="filterStatus"
                    value={
                      queryDisburse.formikParams.values.status
                        ? {
                            id: queryDisburse.formikParams.values.status,
                            name: DisburseStatus[
                              queryDisburse.formikParams.values.status
                            ],
                          }
                        : null
                    }
                    options={Object.keys(DisburseStatus).map((val) => ({
                      id: val,
                      // @ts-ignore
                      name: DisburseStatus[val],
                    }))}
                    onChange={(e, value) => {
                      // handleChangeGrade(value);
                      queryDisburse.formikParams.setFieldValue(
                        'status',
                        value?.id,
                      );
                    }}
                    getOptionLabel={(option) => `${option.name}`}
                    renderInput={(params) => {
                      return (
                        <TextField
                          {...params}
                          name="status"
                          placeholder="Select Status"
                          variant="outlined"
                        />
                      );
                    }}
                  />
                </FormLabel>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormLabel text="Disburse Date Range">
                  <Stack direction="row" spacing={1} alignItems="start">
                    <Stack spacing={1} width="100%">
                      <DesktopDatePicker
                        value={
                          queryDisburse.formikParams.values.start_date || null
                        }
                        inputFormat="DD/MM/YYYY"
                        onChange={(value) => {
                          queryDisburse.formikParams.setFieldValue(
                            'start_date',
                            value,
                          );
                        }}
                        maxDate={queryDisburse.formikParams.values.end_date}
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
                      {queryDisburse.formikParams.errors.start_date && (
                        <Typography color="error.main">
                          {queryDisburse.formikParams.errors.start_date}
                        </Typography>
                      )}
                    </Stack>
                    <Box
                      sx={{
                        width: '20px',
                        borderBottom: '1px solid #000',
                        pt: 2,
                      }}
                    />
                    <Stack spacing={1} width="100%">
                      <DesktopDatePicker
                        value={
                          queryDisburse.formikParams.values.end_date || null
                        }
                        inputFormat="DD/MM/YYYY"
                        onChange={(value) => {
                          queryDisburse.formikParams.setFieldValue(
                            'end_date',
                            value,
                          );
                        }}
                        minDate={queryDisburse.formikParams.values.start_date}
                        // maxDate={formik.values.max_date_created}
                        renderInput={(params) => {
                          return (
                            <TextField
                              {...params}
                              name="grade"
                              placeholder="Select Date"
                              variant="outlined"
                              fullWidth
                            />
                          );
                        }}
                      />
                      {queryDisburse.formikParams.errors.end_date && (
                        <Typography color="error.main">
                          {queryDisburse.formikParams.errors.end_date}
                        </Typography>
                      )}
                    </Stack>
                  </Stack>
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
                      queryDisburse.formikParams.resetForm();
                      queryDisburse.handleResetFilter({
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
            data={queryDisburse.listData || []}
            selected={selected}
            setSelected={(e) => {
              setSelected(e);
            }}
            enableCheckBox
            loading={queryDisburse.isLoading}
            page={queryDisburse.data?.page || 0}
            count={queryDisburse.data?.count || 0}
            totalData={queryDisburse.data?.total || 0}
            onChangePage={(value) => {
              queryDisburse.handleChangeParams({
                ...queryDisburse.params,
                page: value,
              });
              queryDisburse.handleToSetSearchParams('page', value.toString());
            }}
          />
        </Card>
      </Stack>
      <Modal open={modalDelete.open} onClose={modalDelete.closeModal}>
        <DeleteModal
          onClose={modalDelete.closeModal}
          headerText="Delete  Disburse"
          desc={<>Are you sure want to delete {selected.length} Disburse(s)?</>}
          onSubmit={() => {
            deleteDisburse.mutate(
              { ids: selected },
              {
                onSuccess: () => {
                  queryDisburse.refetch();
                  modalDelete.closeModal();
                },
              },
            );
          }}
        />
      </Modal>
    </Box>
  );
}
