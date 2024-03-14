/* eslint-disable @typescript-eslint/no-unused-vars */
import MenuList from 'components/MenuList';
import { HeadCells } from 'components/Table/types';
import {
  Add,
  JoinLeft,
  KeyboardArrowDown,
  MoreVert,
  Search,
} from '@mui/icons-material';
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
  CircularProgress,
} from '@mui/material';
import Table from 'components/Table';
import DeleteModal from 'components/Delete/freetext';
import moment from 'moment';
import { useEffect, useState } from 'react';
import useModal from 'hooks/useModal';
import FormLabel from 'components/FormLabel';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { useNavigate } from 'react-router-dom';
import numberSeperator from 'utils/numberSeperator';
import Label from 'components/Label';
import SearchIcon from '@mui/icons-material/Search';
import DateRangePicker from 'components/DateRangePicker';
import { DisburseList } from 'models/merchantDepo/disburse';
import ModalComp from 'components/Modal';
import {
  UseDisburse,
  DisburseStatus,
  useDeleteDisburse,
  useUpdateStatusDisburse,
  UseListDisburseStatus,
  useUpdateDisburse,
} from '../hooks/useDisburse';
import { UseFilterMerchentDepoListService } from '../hooks/useConfigMerchant';
import ModalConfirmTransfer from './Components/ModalConfirmTransfer';

type UpdateStatusPayload = {
  id: number;
  status: number;
};

export default function DisbursePages() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<(string | number)[]>([]);
  const [selectedData, setSelectedData] = useState<DisburseList>();
  const showFilter = useModal();
  const modalDelete = useModal();
  const modalUpdateStatus = useModal();
  const modalUpdate = useModal();
  const openStartDateFilter = useModal();
  const openEndDateFilter = useModal();
  const openConfirmTransfer = useModal();
  const [type, setType] = useState<string>('');

  const queryDisburse = UseDisburse({ status: ['8', '4'] });
  const queryMerchantFilter = UseFilterMerchentDepoListService();
  const deleteDisburse = useDeleteDisburse();
  const updateStatusDisburse = useUpdateStatusDisburse();
  const updateDisburse = useUpdateDisburse();
  const queryDisburseStatus = UseListDisburseStatus();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'On Process':
        return '#ff8f00';
      case 'Transferred':
        return '#008e58';
      case 'Request':
        return '#ff8f00';
      default:
        return 'red';
    }
  };

  const headCells: HeadCells<DisburseList>[] = [
    {
      id: 'date',
      label: 'Request Date',
      format: (value) => moment(value.date * 1000).format('DD MMM YYYY'),
    },
    {
      id: 'merchant_name',
      label: 'Merchant Name',
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
      label: 'Amount Transferred',
      format: ({ transfer_amount }) => {
        return (
          <Typography variant="body1">
            Rp. {numberSeperator(transfer_amount || 0)}
          </Typography>
        );
      },
    },
    {
      id: 'Action',
      label: 'Action',
      format: (value) => (
        <Stack direction="row" gap="10px">
          <Button
            color="error"
            variant="outlined"
            sx={{ borderRadius: '5px' }}
            disabled={
              selectedData?.id === value?.id && updateDisburse.isLoading
            }
            startIcon={
              selectedData?.id === value?.id &&
              updateDisburse.isLoading && <CircularProgress size={20} />
            }
            onClick={() => {
              setSelectedData(value);
              openConfirmTransfer.openModal();
              setType('Decline');
            }}
          >
            Decline
          </Button>
          <Button
            sx={{ borderRadius: '5px' }}
            onClick={() => {
              setSelectedData(value);
              openConfirmTransfer.openModal();
              setType('Approve');
            }}
          >
            Approve
          </Button>
        </Stack>
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
                    label: `Decline ${selected.length} Items`,
                    color: 'error.main',
                    onClick: () => {
                      setType('Decline');
                      modalUpdateStatus.openModal();
                    },
                  },
                  {
                    label: `Approve ${selected.length} Items`,
                    color: 'primary.main',
                    onClick: () => {
                      setType('Approve');
                      modalUpdateStatus.openModal();
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
                <FormLabel text="Merchant Name">
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
                        placeholder="Select Merchant Name"
                        // error={
                        //   formik.touched.area && Boolean(formik.errors.area)
                        // }
                      />
                    )}
                  />
                </FormLabel>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormLabel text="Date">
                  <DateRangePicker
                    endSelectDate={moment()}
                    date={[
                      queryDisburse.formikParams.values.start_date,
                      queryDisburse.formikParams.values.end_date,
                    ]}
                    onChange={(value) => {
                      queryDisburse.formikParams.setFieldValue(
                        'start_date',
                        value[0],
                      );
                      queryDisburse.formikParams.setFieldValue(
                        'end_date',
                        value[1],
                      );
                    }}
                  />
                  {/* <Stack direction="row" spacing={1} alignItems="start">
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
                          openStartDateFilter.toggleModal();
                        }}
                        maxDate={queryDisburse.formikParams.values.end_date}
                        open={openStartDateFilter.open}
                        onOpen={openStartDateFilter.toggleModal}
                        onClose={openStartDateFilter.toggleModal}
                        renderInput={(params) => {
                          return (
                            <TextField
                              {...params}
                              name="grade"
                              placeholder="Select Grade"
                              variant="outlined"
                              fullWidth
                              onClick={openStartDateFilter.toggleModal}
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
                          openEndDateFilter.toggleModal();
                        }}
                        minDate={queryDisburse.formikParams.values.start_date}
                        open={openEndDateFilter.open}
                        onOpen={openEndDateFilter.toggleModal}
                        onClose={openEndDateFilter.toggleModal}
                        renderInput={(params) => {
                          return (
                            <TextField
                              {...params}
                              name="grade"
                              placeholder="Select Date"
                              variant="outlined"
                              fullWidth
                              onClick={openEndDateFilter.toggleModal}
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
                  </Stack> */}
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
            disableNumber
            loading={queryDisburse.isFetching}
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
                  setSelected([]);
                  modalDelete.closeModal();
                },
              },
            );
          }}
        />
      </Modal>
      <Modal
        open={modalUpdateStatus.open}
        onClose={modalUpdateStatus.closeModal}
      >
        <DeleteModal
          onClose={modalUpdateStatus.closeModal}
          headerText={`${type} transfer`}
          textButton={type}
          desc={
            <>
              Are you sure want to {type} {selected.length} items?
            </>
          }
          onSubmit={() => {
            const payload: UpdateStatusPayload[] = [];
            selected.forEach((data) => {
              payload.push({ id: +data, status: type === 'Approve' ? 6 : 3 });
            });
            updateStatusDisburse.mutate(payload, {
              onSuccess: () => {
                queryDisburse.refetch();
                setType('');
                setSelected([]);
                modalUpdateStatus.closeModal();
              },
            });
          }}
        />
      </Modal>
      <ModalComp
        open={openConfirmTransfer.open}
        title="Confirm Transfer"
        onClose={openConfirmTransfer.closeModal}
      >
        <ModalConfirmTransfer
          type={type}
          data={selectedData}
          onCLose={() => {
            queryDisburse.refetch();
            openConfirmTransfer.closeModal();
            setSelectedData(undefined);
            setType('');
          }}
        />
      </ModalComp>
    </Box>
  );
}
