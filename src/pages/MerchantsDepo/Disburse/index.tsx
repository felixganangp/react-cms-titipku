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
} from '@mui/material';
import CustomModal from 'components/Modal';
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
import ModalFormDisburseDepo from './Form/components/ModalForm';
// eslint-disable-next-line import/no-cycle
import {
  UseDisburse,
  useDeleteDisburse,
  useUpdateStatusDisburse,
  UseListDisburseStatus,
  useUpdateDisburse,
} from '../hooks/useDisburse';
// eslint-disable-next-line import/no-cycle
import ModalRetransfer from './Components/ModalRetransfer';
import { UseFilterMerchentDepoListService } from '../hooks/useConfigMerchant';

type UpdateStatusPayload = {
  id: number;
  status: number;
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'On Process':
      return '#83b9e8';
    case 'Transferred':
      return '#008e58';
    case 'Request':
      return '#ffc902';
    case 'Transferred By System':
      return '#008e58';
    case 'Request By System':
      return '#ff8f00';
    case 'On Process By System':
      return '#0774d1';
    case 'Cancelled':
      return '#757575';
    default:
      return '#c10000';
  }
};
export const getRenameStatus = (status: string) => {
  switch (status) {
    case 'On Process':
      return 'In Process';
    // case 'Transferred':
    //   return '#008e58';
    case 'Request':
      return 'Requested';
    // case 'Transferred By System':
    //   return '#ff8f00';
    case 'Request By System':
      return 'Requested By System';
    case 'On Process By System':
      return 'In Process By System';
    case 'Cancelled':
      return 'Declined';
    default:
      return status;
  }
};

export default function DisbursePages() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<(string | number)[]>([]);
  const [selectedData, setSelectedData] = useState<DisburseList>();
  const showFilter = useModal();
  const modalDelete = useModal();
  const modalUpdateStatus = useModal();
  const modalUpdateStatusOneItem = useModal();
  const modalUpdate = useModal();
  const openStartDateFilter = useModal();
  const openEndDateFilter = useModal();

  const queryDisburse = UseDisburse();
  const queryMerchantFilter = UseFilterMerchentDepoListService();
  const deleteDisburse = useDeleteDisburse();
  const updateStatusDisburse = useUpdateStatusDisburse();
  const queryDisburseStatus = UseListDisburseStatus();
  const updateDisburse = useUpdateDisburse();

  // const handleUpdate = () => {
  //   if (selectedData?.id) {
  //     modalUpdate.openModal();
  //   }
  // };

  // useEffect(() => {
  //   handleUpdate();
  // }, [selectedData]);

  const headCells: HeadCells<any>[] = [
    {
      id: 'date',
      label: 'Date',
      format: (value) => (
        <Typography sx={{ whiteSpace: 'nowrap' }}>
          {moment(value.date * 1000).format('DD MMM YYYY')}
        </Typography>
      ),
    },
    {
      id: 'due_date',
      label: 'Due Date',
      format: (value) => {
        return (
          <Typography sx={{ whiteSpace: 'nowrap' }}>
            {value.due_date
              ? moment(value.due_date * 1000).format('DD MMM YYYY') || '-'
              : '-'}
          </Typography>
        );
      },
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
      id: 'transfer_date',
      label: 'Transfer Date',
      format: (value) => {
        return (
          <Typography sx={{ whiteSpace: 'nowrap' }}>
            {value.paid_date
              ? moment(value.paid_date * 1000).format('DD MMM YYYY') || '-'
              : '-'}
          </Typography>
        );
      },
    },
    {
      id: 'paid_off_date',
      label: 'Paid Date',
      format: (value) => {
        return (
          <Typography sx={{ whiteSpace: 'nowrap' }}>
            {value.paid_off_date
              ? moment(value.paid_off_date * 1000).format('DD MMM YYYY') || '-'
              : '-'}
          </Typography>
        );
      },
    },
    {
      id: 'account_number',
      label: 'Account Number',
      width: 200,
    },
    {
      id: 'bank_branch_office',
      label: 'Branch',
    },
    {
      id: 'amount',
      label: 'Amount',
      format: ({ amount }) => {
        return (
          <Typography variant="body1" sx={{ whiteSpace: 'nowrap' }}>
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
          <Typography variant="body1" sx={{ whiteSpace: 'nowrap' }}>
            Rp. {numberSeperator(transfer_amount || 0)}
          </Typography>
        );
      },
    },
    {
      id: 'status',
      label: 'Status',
      align: 'center',
      format: ({ status }) => {
        const color = getStatusColor(status);
        return (
          <Label variant="filled" sx={{ backgroundColor: color }}>
            {getRenameStatus(status)}
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
              hide:
                value.status === 'On Process By System' ||
                value.status === 'Transferred By System',
              onClick: () => {
                modalUpdate.openModal();
                setSelectedData(value);
              },
            },
            {
              label: 'Delete',
              color: 'error',
              hide:
                value.status === 'On Process By System' ||
                value.status === 'Transferred By System',
              onClick: () => {
                setSelected([value.id]);
                modalDelete.openModal();
              },
            },
            {
              label: 'Update to Transferred',
              color: 'error',
              hide: value.status !== 'On Process',
              onClick: () => {
                setSelected([value.id]);
                modalUpdateStatus.openModal();
              },
            },
            {
              label: 'Re-Transferred',
              color: 'error',
              hide: value.status !== 'Failed',
              onClick: () => {
                setSelectedData(value);
                setSelected([value.id]);
                modalUpdateStatusOneItem.openModal();
              },
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
                  {
                    label: `Update ${selected.length} Items to Transferred`,
                    color: 'error',
                    onClick: () => {
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
              <Grid item xs={12} md={2}>
                <FormLabel text="Status">
                  <Autocomplete
                    id="filterStatus"
                    value={
                      queryDisburseStatus.listData.find(
                        // @ts-ignore
                        (val) =>
                          val.id === queryDisburse.formikParams.values.status,
                      ) || null
                    }
                    options={queryDisburseStatus.listData}
                    onChange={(e, value) => {
                      // handleChangeGrade(value);
                      queryDisburse.formikParams.setFieldValue(
                        'status',
                        value?.id,
                      );
                    }}
                    getOptionLabel={(option) => `${option.description}`}
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
                  setSelected([]);
                  modalDelete.closeModal();
                },
              },
            );
          }}
        />
      </Modal>
      <CustomModal
        open={modalUpdateStatusOneItem.open}
        onClose={modalUpdateStatusOneItem.closeModal}
        title="Re-Transfer"
      >
        <ModalRetransfer
          selectedData={selectedData}
          id={selected[0] || null}
          onCLose={() => {
            queryDisburse.refetch();
            setSelected([]);
            modalUpdateStatusOneItem.closeModal();
            setSelectedData(undefined);
          }}
        />
      </CustomModal>
      <Modal
        open={modalUpdateStatus.open}
        onClose={modalUpdateStatus.closeModal}
      >
        <DeleteModal
          onClose={modalUpdateStatus.closeModal}
          headerText="Update Status Disburse"
          textButton="Update Status"
          desc={
            <>
              Are you sure want to update status {selected.length} Disburse(s)
              to transferred?
            </>
          }
          onSubmit={() => {
            const payload: UpdateStatusPayload[] = [];
            selected.forEach((data) => {
              payload.push({ id: +data, status: 2 });
            });
            updateStatusDisburse.mutate(payload, {
              onSuccess: () => {
                queryDisburse.refetch();
                setSelected([]);
                modalUpdateStatus.closeModal();
              },
            });
          }}
        />
      </Modal>
      <CustomModal
        open={modalUpdate.open}
        title="Edit Disburse"
        onClose={modalUpdate.closeModal}
      >
        <ModalFormDisburseDepo
          id={selectedData?.id.toString()}
          id_jelajah={selectedData?.jelajah_id}
          handleClose={(isSubmiting) => {
            if (isSubmiting) {
              queryDisburse.refetch();
              setSelectedData(undefined);
            }
            modalUpdate.closeModal();
          }}
        />
      </CustomModal>
    </Box>
  );
}
