/* eslint-disable @typescript-eslint/no-use-before-define */
import { useEffect, useMemo, useState } from 'react';
import AccordionOnDetails from 'components/Accordion/SubDetailsPagesWrapper';
import DescriptionDetail from 'components/DescDetails';
import {
  ArrowBack,
  Person2Outlined,
  CalendarToday,
  KeyboardArrowDown,
  MoreVert,
} from '@mui/icons-material';
import {
  Box,
  Card,
  Button,
  Grid,
  IconButton,
  Stack,
  Typography,
  Autocomplete,
  TextField,
  styled,
  Modal,
  Switch,
  InputAdornment,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import MerchantAndalan from 'assets/merchant-andalan.svg';
import MerchantDepo from 'assets/merchant-deposit.svg';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
// import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PhoneIcon from '@mui/icons-material/Phone';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MenuList from 'components/MenuList';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import FormLabel from 'components/FormLabel';
import Table from 'components/Table';
import { HeadCells } from 'components/Table/types';
import moment from 'moment';
import numberSeperator from 'utils/numberSeperator';
import { TransactionMerchantDepoList } from 'models/merchantDepo/Merchant';
import useModal from 'hooks/useModal';
import ModalComp from 'components/Modal';
import DeleteModal from 'components/Delete/freetext';
import { QrisForm } from 'models/merchantDepo/Qris';
// import FormControl from 'components/FormLabel';
import DateRangePicker from 'components/DateRangePicker';
import useToast from 'hooks/useToast';
import {
  useGetTransactionMutation,
  useMerchantDetails,
  useUpdateMerchantDepo,
} from '../hooks/useMerchant';
import { UseMutationTypeListService } from '../hooks/useConfigMerchant';
import ModalFormQris from '../Qris/Components/ModalFormQris';

import { useDeleteQris } from '../hooks/useQris';

export default function MercheantsDetails() {
  const { openToast } = useToast();
  const { id } = useParams();
  const mutationType = UseMutationTypeListService();
  const mutationTransaction = useGetTransactionMutation(id);
  const merchantDetails = useMerchantDetails(id);
  const details = merchantDetails.data?.data;
  const [updateData, setUpdateData] = useState<any>();

  const navigate = useNavigate();
  const [selected, setSelected] = useState<(string | number)[]>([]);
  const currentSelected = useMemo(() => {
    return selected.filter((val) => val !== 0);
  }, [selected]);

  const isDepo = details?.depo_type_id === 1 || details?.depo_type_id === 3;
  const isAndalan = details?.depo_type_id === 2 || details?.depo_type_id === 3;
  const deleteQris = useDeleteQris();

  const updateMerchant = useUpdateMerchantDepo();
  const modalDelete = useModal();
  const modalForm = useModal();
  const isEditReason = useModal();
  const [editSelected, setEditSelected] = useState<
    (QrisForm & { id: number; merchant_name: string }) | undefined
  >(undefined);

  useEffect(() => {
    if (details) {
      setUpdateData({
        // @ts-ignore
        limit: details?.limit,
        // @ts-ignore
        depo_discount: details?.depo_discount,
        // @ts-ignore
        admin_fee: details?.admin_fee,
        bank_name: details?.bank_name,
        bank_branch_office: details?.bank_branch_office || '',
        bank_account_name: details?.bank_account_name || '',
        bank_account_number: details?.bank_account_number || '',
        nobu_account_name: details?.nobu_account_name || '',
        nobu_account_number: details?.nobu_account_number || '',
        qris_ready: details?.qris_ready,
        // @ts-ignore
        bank_id: details?.bank_id || 0,
        // @ts-ignore
        merchant_qris_id: details?.qris_merchant_id || '',
        merchant_depo_type_id: details?.depo_type_id || 2,
        is_auto_disburse:
          details?.is_auto_disburse === undefined
            ? false
            : details?.is_auto_disburse,
        auto_disburse_disable_reason:
          details?.auto_disburse_disable_reason || '',
      });
    }
  }, [details]);
  const headCells: HeadCells<TransactionMerchantDepoList>[] = [
    {
      id: 'Date',
      label: 'Date',
      format: (value) => moment.unix(value.created_at).format('DD MMM YYYY'),
    },
    {
      id: 'Type',
      label: 'Type',
      format: (value) => {
        const type = mutationType.listData.find(
          (item) => item.id === value.mutation_type_id,
        );
        return type?.description || '-';
      },
    },
    {
      id: 'Reference',
      label: 'Reference',
      format: (value) => {
        return value?.description || '-';
      },
    },
    {
      id: 'Amount',
      label: 'Amount',
      format: (value) => `Rp ${numberSeperator(value.credit)}`,
    },
    {
      id: 'Action',
      label: 'Action',
      format: (value) => (
        <MenuList
          menu={[
            {
              label: 'Edit',
              onClick: () => {
                setEditSelected({
                  id: value.qris_id,
                  merchant_name: details?.merchant_name || '',
                  amount: value.credit,
                  transaction_date: value.created_at,
                  jelajah_id: value.jelajah_id,
                });
                modalForm.toggleModal();
              },
            },
            {
              label: 'Delete',
              onClick: () => {
                setSelected([value.qris_id]);
                modalDelete.openModal();
              },
            },
          ]}
        >
          <IconButton disabled={value.qris_id === 0}>
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
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack>
              <Stack direction="row" alignItems="center">
                <IconButton onClick={() => navigate(-1)}>
                  <ArrowBack />
                </IconButton>
                <Typography variant="h3" fontWeight={600}>
                  Merchant Info
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Card>
      </Stack>
      <AccordionOnDetails defaultOpen title="Merchant Info">
        <Card>
          <Box p="10px">
            <Stack direction="row" alignItems="center" gap="10px">
              <Typography variant="h3" fontWeight="bold">
                {details?.merchant_name}{' '}
                {details?.merchant_name ? `(${details?.area_name})` : ''}
              </Typography>
              <Box
                component="img"
                src={MerchantAndalan}
                display={
                  details?.depo_type_id === 2 || details?.depo_type_id === 3
                    ? 'block'
                    : 'none'
                }
              />
              <Box
                component="img"
                src={MerchantDepo}
                display={
                  details?.depo_type_id === 1 || details?.depo_type_id === 3
                    ? 'block'
                    : 'none'
                }
              />
            </Stack>
            <Box width="full" borderBottom="1px solid #E0E0E0" my={1} />
            <Stack px={2} py={1} width={['100%', '100%', '60%']}>
              <Grid container spacing={2}>
                <Grid item xs={6} md={2.4}>
                  <Box bgcolor="#F9EBE7" p={1}>
                    <Typography color="#8e8e8e" fontSize={14}>
                      Balance
                    </Typography>
                    <Typography variant="h3" fontWeight={600} color="red">
                      Rp {numberSeperator(details?.balance || 0)}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={2.4}>
                  <Box p={1}>
                    <Typography color="#8e8e8e" fontSize={14}>
                      Total Transaction
                    </Typography>
                    <Typography variant="h3" fontWeight={600}>
                      {details?.total_transaction}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={2.4}>
                  <Box p={1}>
                    <Typography color="#8e8e8e" fontSize={14}>
                      Total Disburse
                    </Typography>
                    <Typography variant="h3" fontWeight={600}>
                      {details?.total_disburse}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={2.4}>
                  <Box p={1}>
                    <Typography color="#8e8e8e" fontSize={14}>
                      Rank
                    </Typography>
                    <Typography variant="h3" fontWeight={600}>
                      #{details?.rank}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={2.4}>
                  <Box p={1}>
                    <Typography color="#8e8e8e" fontSize={14}>
                      Activity Score
                    </Typography>
                    <Typography variant="h3" fontWeight={600}>
                      {details?.score}/100
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Stack>
            <Box width="full" borderBottom="1px solid #E0E0E0" my={1} />

            <Grid container spacing={2} mt={2}>
              <Grid item xs={6} md={2.4}>
                <DescriptionDetail
                  title="Merchant Status"
                  icon={<FiberManualRecordIcon sx={{ color: '#008e58' }} />}
                  content={details?.is_active ? 'Active' : 'Inactive'}
                />
              </Grid>
              <Grid item xs={6} md={2.4}>
                <DescriptionDetail
                  title="Merchant ID"
                  icon={<Person2Outlined sx={{ color: '#008e58' }} />}
                  content={details?.jelajah_id}
                />
              </Grid>
              <Grid item xs={6} md={2.4}>
                {isDepo && (
                  <DescriptionDetail
                    title="Limit"
                    icon={<AttachMoneyIcon sx={{ color: '#008e58' }} />}
                    content={`Rp ${numberSeperator(details?.limit || 0)}`}
                  />
                )}
                {isAndalan && !isDepo && (
                  <DescriptionDetail
                    title="Discount"
                    content={`${details?.depo_discount}%`}
                  />
                )}
              </Grid>
              <Grid
                item
                xs={6}
                md={2.4}
                sx={{ opacity: isDepo ? '100%' : '0%' }}
              >
                <DescriptionDetail
                  title="Primary Account Name "
                  content={details?.bank_account_name}
                />
              </Grid>
              <Grid
                item
                xs={6}
                md={2.4}
                sx={{ opacity: isDepo ? '100%' : '0%' }}
              >
                <DescriptionDetail
                  title="NOBU Account Name "
                  content={details?.nobu_account_name}
                />
              </Grid>
              <Grid item xs={6} md={2.4}>
                <DescriptionDetail
                  title="Join Date"
                  icon={<CalendarToday sx={{ color: '#008e58' }} />}
                  content={
                    details?.join_date !== 0 && details?.join_date !== null
                      ? moment((details?.join_date || 0) * 1000).format(
                          'DD MMM YYYY',
                        )
                      : ''
                  }
                />
              </Grid>
              <Grid item xs={6} md={2.4}>
                <DescriptionDetail
                  title="Phone Number"
                  icon={<PhoneIcon sx={{ color: '#008e58' }} />}
                  content={details?.phone_number}
                />
              </Grid>
              <Grid item xs={6} md={2.4}>
                <DescriptionDetail
                  title="Admin Fee"
                  content={`${details?.admin_fee}%`}
                />
              </Grid>
              <Grid
                item
                xs={6}
                md={2.4}
                sx={{ opacity: isDepo ? '100%' : '0%' }}
              >
                <DescriptionDetail
                  title="Primary Account Number"
                  content={details?.bank_account_number}
                />
              </Grid>
              <Grid
                item
                xs={6}
                md={2.4}
                sx={{ opacity: isDepo ? '100%' : '0%' }}
              >
                <DescriptionDetail
                  title="NOBU Account Number "
                  content={details?.nobu_account_number}
                />
              </Grid>
              <Grid item xs={6} md={2.4}>
                <DescriptionDetail
                  title="Join Date Andalan & Depo"
                  icon={<CalendarToday sx={{ color: '#008e58' }} />}
                  content={
                    details?.active_date !== 0 && details?.active_date !== null
                      ? moment((details?.active_date || 0) * 1000).format(
                          'DD MMM YYYY',
                        )
                      : ''
                  }
                />
              </Grid>
              <Grid item xs={6} md={2.4}>
                <div />
              </Grid>
              <Grid item xs={6} md={2.4}>
                {!isAndalan ||
                  (details?.depo_type_id === 3 && (
                    <DescriptionDetail
                      title="Discount"
                      content={`${details?.depo_discount}%`}
                    />
                  ))}
              </Grid>
              <Grid
                item
                xs={6}
                md={2.4}
                sx={{ opacity: isDepo ? '100%' : '0%' }}
              >
                <DescriptionDetail
                  title="Branch Office"
                  content={details?.bank_branch_office}
                />
              </Grid>
              <Grid
                item
                xs={6}
                md={2.4}
                sx={{ opacity: isDepo && details.qris_ready ? '100%' : '0%' }}
              >
                <DescriptionDetail
                  title="QRIS Merchant ID"
                  content={details?.qris_merchant_id}
                />
              </Grid>
            </Grid>
            <Box width="full" borderBottom="1px solid #E0E0E0" my={1} />
            <Stack px={2} py={1} width={['100%', '100%', '60%']}>
              <Grid container spacing={2} alignItems="start">
                <Grid item xs={6} md={4}>
                  <FormLabel text="Auto Disburse">
                    <SwitchCostum
                      checked={details?.is_auto_disburse}
                      onChange={(e) => {
                        updateMerchant.mutate(
                          {
                            id: id || '',
                            data: {
                              ...updateData,
                              is_auto_disburse: e.target.checked,
                            },
                          },
                          {
                            onSuccess: () => {
                              merchantDetails.refetch();
                              openToast({
                                severity: 'success',
                                headMsg: e.target.checked
                                  ? 'Auto Disburse Enabled'
                                  : 'Auto Disburse Disabled',
                              });
                              isEditReason.closeModal();
                            },
                            onError: (v) => {
                              openToast({
                                severity: 'error',
                                headMsg:
                                  typeof v === 'string'
                                    ? v
                                    : 'Create Merchant Failed',
                              });
                            },
                          },
                        );
                      }}
                    />
                  </FormLabel>
                </Grid>
                <Grid item xs={6} md={8}>
                  <div />
                </Grid>
                <Grid item xs={6} md={8}>
                  {!details?.is_auto_disburse && (
                    <>
                      {isEditReason.open ? (
                        <FormLabel text="Reason" required>
                          <TextField
                            fullWidth
                            placeholder="Reason"
                            size="medium"
                            value={
                              updateData?.auto_disburse_disable_reason || ''
                            }
                            onChange={(e) => {
                              setUpdateData({
                                ...updateData,
                                auto_disburse_disable_reason: e.target.value,
                              });
                            }}
                            name="auto_disburse_disable_reason"
                            InputProps={{
                              // style: {
                              //   color: !startDate && !endDate ? 'rgba(0, 0, 0, 0.3)' : 'unset',
                              // },
                              endAdornment: (
                                <InputAdornment position="start">
                                  <Button
                                    size="small"
                                    disabled={
                                      updateData?.auto_disburse_disable_reason ===
                                        '' ||
                                      updateData?.auto_disburse_disable_reason ===
                                        details?.auto_disburse_disable_reason
                                    }
                                    onClick={() => {
                                      updateMerchant.mutate(
                                        {
                                          id: id || '',
                                          data: updateData,
                                        },
                                        {
                                          onSuccess: () => {
                                            merchantDetails.refetch();
                                            openToast({
                                              severity: 'success',
                                              headMsg: 'Reason Cleared',
                                            });
                                            isEditReason.toggleModal();
                                          },
                                          onError: (e) => {
                                            openToast({
                                              severity: 'error',
                                              headMsg:
                                                typeof e === 'string'
                                                  ? e
                                                  : 'Create Merchant Failed',
                                            });
                                          },
                                        },
                                      );
                                    }}
                                  >
                                    Submit
                                  </Button>
                                </InputAdornment>
                              ),
                            }}
                          />
                        </FormLabel>
                      ) : (
                        <Stack
                          border="solid 1px #e4e4e4"
                          p="15px 20px"
                          borderRadius="5px"
                          bgcolor="#fdf1da"
                          spacing={0.1}
                          mt={1.5}
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Typography fontSize="14">
                            <b>Reason :</b>{' '}
                            {details?.auto_disburse_disable_reason || ''}
                          </Typography>
                          <Button
                            variant="text"
                            onClick={isEditReason.toggleModal}
                          >
                            Edit
                          </Button>
                        </Stack>
                      )}
                    </>
                  )}
                </Grid>
              </Grid>
            </Stack>
          </Box>
        </Card>
      </AccordionOnDetails>
      <AccordionOnDetails defaultOpen title="Transaction">
        <Card>
          <Box p="10px">
            <Grid container spacing={2} mb={2}>
              <Grid item xs={12} md={6}>
                <Grid
                  container
                  spacing={2}
                  component="form"
                  onSubmit={mutationTransaction.formik.handleSubmit}
                >
                  <Grid item xs={12} md={5}>
                    <FormLabel text="Type">
                      <Autocomplete
                        options={mutationType.listData}
                        getOptionLabel={(option) => option.description || ''}
                        value={mutationTransaction.formik.values.type}
                        onChange={(e, value) => {
                          mutationTransaction.formik.setFieldValue(
                            'type',
                            value,
                          );
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            name="Type"
                            placeholder="Type transaction"
                          />
                        )}
                      />
                    </FormLabel>
                  </Grid>
                  <Grid item xs={12} md={7}>
                    <FormLabel text="Range Date">
                      <DateRangePicker
                        endSelectDate={moment()}
                        date={[
                          mutationTransaction.formik.values.from,
                          mutationTransaction.formik.values.to,
                        ]}
                        onChange={(value) => {
                          mutationTransaction.formik.setFieldValue(
                            'from',
                            value[0],
                          );
                          mutationTransaction.formik.setFieldValue(
                            'to',
                            value[1],
                          );
                        }}
                      />
                      {/* <Stack direction="row" gap={1} alignItems="start">
                        <Stack spacing={1} width="100%">
                          <DesktopDatePicker
                            value={
                              mutationTransaction.formik.values.from || null
                            }
                            onChange={(value) => {
                              mutationTransaction.formik.setFieldValue(
                                'from',
                                value,
                              );
                              openDateFilter.toggleModal();
                            }}
                            inputFormat="DD/MM/YYYY"
                            maxDate={mutationTransaction.formik.values.to}
                            open={openDateFilter.open}
                            onOpen={openDateFilter.toggleModal}
                            onClose={openDateFilter.toggleModal}
                            renderInput={(params) => {
                              return (
                                <TextField
                                  {...params}
                                  name="date"
                                  placeholder="Select date"
                                  variant="outlined"
                                  fullWidth
                                  onClick={openDateFilter.toggleModal}
                                />
                              );
                            }}
                          />
                        </Stack>
                        {mutationTransaction.formik.errors.from && (
                          <Typography color="error.main">
                            {mutationTransaction.formik.errors.from}
                          </Typography>
                        )}
                        <Box
                          minWidth="20px"
                          borderBottom="1px solid"
                          mt="20px"
                        />
                        <Stack spacing={1} width="100%">
                          <DesktopDatePicker
                            value={mutationTransaction.formik.values.to || null}
                            onChange={(value) => {
                              mutationTransaction.formik.setFieldValue(
                                'to',
                                value,
                              );
                              openEndDateFilter.toggleModal();
                            }}
                            inputFormat="DD/MM/YYYY"
                            maxDate={moment()}
                            minDate={mutationTransaction.formik.values.from}
                            open={openEndDateFilter.open}
                            onOpen={openEndDateFilter.toggleModal}
                            onClose={openEndDateFilter.toggleModal}
                            renderInput={(params) => {
                              return (
                                <TextField
                                  {...params}
                                  name="date"
                                  placeholder="Select date"
                                  variant="outlined"
                                  fullWidth
                                  onClick={openEndDateFilter.toggleModal}
                                />
                              );
                            }}
                          />
                          {mutationTransaction.formik.errors.to && (
                            <Typography color="error.main">
                              {mutationTransaction.formik.errors.to}
                            </Typography>
                          )}
                        </Stack>
                      </Stack> */}
                    </FormLabel>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Button
                        variant="text"
                        onClick={() => {
                          mutationTransaction.formik.resetForm();
                          mutationTransaction.handleResetFilter({
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
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack direction="row" justifyContent="end">
                  <MenuList
                    menu={[
                      {
                        label: `Delete ${currentSelected.length} Items`,
                        onClick: () => {
                          modalDelete.openModal();
                        },
                      },
                    ]}
                  >
                    <Button
                      endIcon={<KeyboardArrowDown />}
                      disabled={currentSelected.length === 0}

                      //   variant="outlined"
                      //   onClick={showFilter.toggleModal}
                    >
                      Action
                    </Button>
                  </MenuList>
                </Stack>
              </Grid>
            </Grid>
            <Table
              headCells={headCells}
              data={mutationTransaction.listData.map((val) => {
                return {
                  ...val,
                  table_disabled: val.qris_id === 0,
                  id: val.qris_id,
                };
              })}
              selected={selected}
              setSelected={(e) => {
                setSelected(e);
              }}
              enableCheckBox
              loading={mutationTransaction.isLoading}
              page={mutationTransaction.data?.page || 0}
              count={mutationTransaction.data?.count || 0}
              totalData={mutationTransaction.data?.total || 0}
              onChangePage={(value) => {
                mutationTransaction.handleChangeParams({
                  ...mutationTransaction.params,
                  page: value,
                });
              }}
            />
          </Box>
        </Card>
      </AccordionOnDetails>
      <ModalComp
        open={modalForm.open}
        title={!editSelected ? 'Add New QRIS' : 'Edit QRIS'}
        onClose={modalForm.closeModal}
      >
        <ModalFormQris
          data={editSelected}
          handleClose={(isSubmited) => {
            if (isSubmited) {
              mutationTransaction.refetch();
            }
            modalForm.closeModal();
          }}
        />
      </ModalComp>
      <Modal open={modalDelete.open} onClose={modalDelete.closeModal}>
        <DeleteModal
          onClose={modalDelete.closeModal}
          headerText="Delete  Merchant"
          desc={
            <>
              Are you sure want to delete {currentSelected.length} item
              Merchant?
            </>
          }
          onSubmit={() => {
            deleteQris.mutate(
              { ids: currentSelected },
              {
                onSuccess: () => {
                  mutationTransaction.refetch();
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

const SwitchCostum = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255,255,255,.35)'
        : 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
  },
}));
