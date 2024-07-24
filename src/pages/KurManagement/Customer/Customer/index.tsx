/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  Box,
  Grid,
  Button,
  TextField,
  Typography,
  InputAdornment,
  Autocomplete,
  Collapse,
  IconButton,
  Chip,
  Stack,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuList from 'components/MenuList';
import digitFormatter from 'utils/digitFormatter';
import moment from 'moment';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { customerAction } from 'store/slice/kur/Customer';
import { typeAction } from 'store/slice/kur/Type';
import { creditScoreAction } from 'store/slice/kur/CreditScore';
import { areaAction } from 'store/slice/Area';
import useModal from 'hooks/useModal';
import Table from 'components/Table';
import Modal from 'components/Modal';
import {
  Customer,
  CustomerParams,
  CreateCustomer,
  UserCreditScore,
} from 'models/kur/Customer';
import { Type } from 'models/kur/Type';
import { Area } from 'models/Area';
import { MerchantResp } from 'models/Merchant';
import debounce from 'utils/debounce';
import { getColorCreditScore } from 'utils/creditScoreColor';
import bankData from 'data/list-bank.json';
import FormCustomer from 'pages/Finance/Customer/Components/Form';
import { useMutation } from '@tanstack/react-query';
import { getDownloadPdfUser } from 'service/Kur/Customer';
import useLoadingSpinner from 'hooks/useLoadingSpinner';
import { base64toOpen } from 'utils/base64toDownload';
import useToast from 'hooks/useToast';
import FormUserMerchant from 'pages/Finance/UserMerchant/Components/Form';
import FormTopUpLimit from 'pages/Finance/UserMerchant/Components/FormTopUpLimit';
import FormRestructureMerchant from 'pages/Finance/UserMerchant/Components/FormRestructure';
import PrintInvoice from 'pages/Finance/Components/PrintInvoice';
import FormAssignAo from 'pages/Finance/UserMerchant/Components/FormAssignAo';
import FilterUserMerchant from 'pages/Finance/UserMerchant/Components/FilterUserMerchant';

// import FormCustomer from '../Verification/components/form';

interface FormDataType {
  isEdit: boolean;
  initialData: CreateCustomer;
}

export default function KurCustomer() {
  const { openToast } = useToast();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const customerKur = useAppSelector((state) => state.customerKur);
  // const typeKur = useAppSelector((state) => state.typeKur);
  const areaKur = useAppSelector((state) => state.area);
  // const creditScore = useAppSelector((state) => state.creditScore);
  const createUserModal = useModal();
  const topUpModal = useModal();
  const restructureModal = useModal();
  const [selectedIdUser, setSelectedIdUser] = useState<number | undefined>();
  const generatePDF = useMutation(getDownloadPdfUser);
  const { setLoading } = useLoadingSpinner();
  const assignAoModal = useModal();

  const printInvoiceModal = useModal();
  const [selected, setSelected] = useState<any>();

  // useEffect(() => {
  //   dispatch(customerAction.fetchData(customerKur.params));
  // }, [
  //   customerKur.params.search,
  //   customerKur.params.order_by,
  //   customerKur.params.order_type,
  //   customerKur.params.page,
  //   customerKur.params.status,
  // ]);

  const customerType: Type[] = [
    {
      id: 1,
      name: 'KUR WC',
    },
    {
      id: 2,
      name: 'WC Titipku',
    },
  ];

  useEffect(() => {
    dispatch(
      customerAction.fetchData({
        status: 6,
        page: customerKur.params.page,
        search: customerKur.params.search,
      }),
    );
  }, [
    customerKur.params.search,
    // customerKur.params.order_by,
    // customerKur.params.order_type,
    customerKur.params.page,
    // customerKur.params.status,
  ]);

  const initialData = {
    // imageCustomer: '',
    idCustomer: '',
    name: '',
    kurType: null,
    adminFee: '',
    dpdRate: '',
    birthDate: null,
    phoneNumber: '',
    email: '',
    addressKtp: '',
    addressDomisili: '',
    pasarName: null,
    merchantName: null,
    nikKtp: '',
    imageNik: '',
    kkNumber: '',
    imageKk: '',
    npwp: '',
    imageNpwp: '',
    imageSKUsaha: '',
    creditLimit: '',
    bankName: null,
    bankNumberPrimary: '',
    nobuAccountNumber: '',
    oldNikKtp: '',
    oldKkNumber: '',
    oldNpwp: '',
    idImageNik: null,
    idImageKk: null,
    idImageNpwp: null,
    idImageSKUsaha: null,
    kurUserStatus: '',
  };
  const [openFilter, setOpenFilter] = useState(false);
  const [formData, setFormData] = useState<FormDataType>({
    isEdit: false,
    initialData,
  });
  // useEffect(() => {
  //   if (
  //     customerKur.stateFilter?.areaKur &&
  //     customerKur.stateFilter?.areaKur.length > 0
  //   ) {
  //     setOpenFilter(true);
  //   }
  //   dispatch(typeAction.fetchData());
  //   dispatch(areaAction.fetchData());
  //   dispatch(creditScoreAction.fetchData());
  // }, []);

  const [inputValueArea, setInputValueArea] = useState('');

  const formModal = useModal();

  const convertDate = (date: number) => {
    const result = moment(date * 1000).format('DD MMM YYYY');
    return result;
  };

  const headCell = [
    {
      id: 'id',
      label: 'ID',
      align: 'left',
      format: (val: Customer) => <div>{val.id}</div>,
      enableSort: true,
    },
    {
      id: 'user_number',
      label: 'User Number',
      align: 'left',
      format: (val: Customer) => <div>{val.user_number}</div>,
      enableSort: true,
    },
    {
      id: 'debtor_name',
      label: 'Debtor Name',
      align: 'left',
      width: '200px',
      format: (val: Customer) => <div>{val.debtor_name}</div>,
      enableSort: true,
    },
    {
      id: 'merchant',
      label: 'Merchant',
      align: 'left',
      minWidth: '200px',
      format: (val: Customer) => <div>{val.merchant_name}</div>,
    },
    // {
    //   id: 'pasar',
    //   label: 'Pasar',
    //   align: 'left',
    //   format: (val: Customer) => <div>{val.area_name}</div>,
    // },
    {
      id: 'kur_user_type',
      label: 'KUR Type',
      align: 'left',
      width: '95px',
      format: (val: Customer) => <div>{val.user_type.name}</div>,
      enableSort: true,
    },
    {
      id: 'create_date',
      label: 'Join Date',
      align: 'left',
      width: '100px',
      format: (val: Customer) => (
        <Box whiteSpace="nowrap">{convertDate(val.created_at)}</Box>
      ),
    },
    {
      id: 'disburse_date',
      label: 'Disburse Date',
      align: 'left',
      width: '100px',
      format: (val: Customer) => (
        <div>{val.disburse_date ? convertDate(val.disburse_date) : '-'}</div>
      ),
    },
    {
      id: 'first_transaction',
      label: 'First Transaction',
      align: 'left',
      width: '100px',
      format: (val: Customer) => (
        <div>
          {val.first_transaction ? convertDate(val.first_transaction) : '-'}
        </div>
      ),
    },
    {
      id: 'nearest_due_date',
      label: 'Nearest Due Date',
      align: 'left',
      width: '100px',
      format: (val: Customer) => (
        <div>
          {val.nearest_due_date ? convertDate(val.nearest_due_date) : '-'}
        </div>
      ),
    },
    {
      id: 'average_invoice',
      label: 'Average Invoice',
      align: 'left',
      minWidth: '150px',
      format: (val: Customer) => (
        <Typography>Rp {digitFormatter.format(val.average_invoice)}</Typography>
      ),
    },
    {
      id: 'limit_invoice',
      label: 'Limit Invoice',
      align: 'left',
      minWidth: '150px',
      format: (val: Customer) => (
        <Typography>Rp {digitFormatter.format(val.limit_plafon)}</Typography>
      ),
    },
    {
      id: 'limit_cash',
      label: 'Limit Cash',
      align: 'left',
      minWidth: '150px',
      format: (val: Customer) => (
        <Typography>Rp {digitFormatter.format(val.limit_cash)}</Typography>
      ),
    },
    {
      id: 'status',
      label: 'Status',
      align: 'left',
      width: '100px',
      format: (val: Customer) => (
        <Typography>{val.user_status.name}</Typography>
      ),
    },
    {
      id: 'have_restructure',
      label: 'Restructure',
      align: 'left',
      width: '100px',
      format: (val: Customer) => (
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="center"
        >
          <Typography>{val.is_restructure ? 'Yes' : 'No'}</Typography>
          <Typography color="green">
            {val.is_running_restructure ? '(Ongoing)' : ''}
          </Typography>
        </Stack>
      ),
    },
    {
      id: 'ao',
      label: 'AO',
      align: 'center',
      width: '100px',
      format: (val: Customer) => val.ao?.name || '-',
    },
    {
      id: 'action',
      label: 'Action',
      align: 'left',
      format: (val: Customer) => (
        <>
          <MenuList
            menu={[
              {
                label: 'Details',
                onClick: () => {
                  navigate(`/finance/customer/${val.id}`);
                },
                dataId: 'button-details-customer',
              },
              {
                label: `Edit`,
                onClick: () => {
                  createUserModal.openModal();
                  setSelectedIdUser(val.id);
                },
                dataId: 'button-edit-customer',
              },
              {
                label: `Generate Invoice`,
                onClick: () => {
                  setSelected({
                    id: val.id,
                    name: `${val.user_number} - ${val.debtor_name}(${val.merchant_name}).pdf`,
                  });
                  printInvoiceModal.openModal();
                  // setLoading(true);
                  // generatePDF.mutate(val.id.toString(), {
                  //   onSuccess: (data) => {
                  //     setLoading(false);
                  //     openToast({
                  //       headMsg: 'Success to generate PDF',
                  //       severity: 'success',
                  //     });
                  //     base64toOpen(
                  //       // @ts-ignore
                  //       data.data,
                  //       `${val.user_number} - ${val.debtor_name}(${val.merchant_name}).pdf`,
                  //     );
                  //   },
                  //   onError: (error) => {
                  //     openToast({
                  //       headMsg: 'Failed to generate PDF',
                  //       severity: 'error',
                  //     });
                  //     setLoading(false);
                  //   },
                  // });
                },
                dataId: 'button-edit-customer',
              },
              {
                label: `Top Up Limit`,
                onClick: () => {
                  topUpModal.openModal();
                  setSelectedIdUser(val.id);
                },
                dataId: 'button-top-up-customer',
              },
              {
                label: `Restructure`,
                onClick: () => {
                  restructureModal.openModal();
                  setSelectedIdUser(val.id);
                },
                dataId: 'button-restructure-customer',
              },
              {
                label: `Assign AO`,
                onClick: () => {
                  assignAoModal.openModal();
                  setSelectedIdUser(val.id);
                },
                dataId: 'button-assign-ao-customer',
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

  const handleChangePage = (value: number) => {
    let payload: {
      typeKur?: Type | null;
      areaKur?: Area[] | [];
      creditScore?: UserCreditScore | null;
    } = {
      areaKur: [],
      typeKur: null,
      creditScore: null,
    };

    if (customerKur.params.kur_user_type_id) {
      payload = {
        ...payload,
        typeKur: customerKur.stateFilter?.typeKur,
      };
    }
    if (customerKur.params.area_ids) {
      payload = {
        ...payload,
        areaKur: customerKur.stateFilter?.areaKur,
      };
    }
    if (customerKur.params.credit_score) {
      payload = {
        ...payload,
        creditScore: customerKur.stateFilter?.creditScore,
      };
    }
    dispatch(
      customerAction.setFilter(
        payload as {
          typeKur: Type | null;
          areaKur: Area[] | [];
          creditScore: UserCreditScore | null;
        },
      ),
    );
    console.log('value', value);
    // }
    dispatch(
      customerAction.setParams({
        ...customerKur.params,
        page: value,
      }),
    );
  };

  const handleChangeType = (value: Type | null) => {
    dispatch(
      customerAction.setFilter({
        status: customerKur.stateFilter?.status || undefined,
        area_id: customerKur.stateFilter?.area_id,
        user_type_id: value,
        batch_id: customerKur.stateFilter?.batch_id || null,
      }),
    );
  };

  // const handleChangeType = (value: Type | null) => {
  //   dispatch(
  //     customerAction.setFilter({
  //       typeKur: value,
  //       areaKur: customerKur.stateFilter?.areaKur,
  //       creditScore: customerKur.stateFilter?.creditScore || null,
  //     }),
  //   );
  // };

  const handleChangeCreditScore = (value: UserCreditScore | null) => {
    dispatch(
      customerAction.setFilter({
        typeKur: customerKur.stateFilter?.typeKur || null,
        areaKur: customerKur.stateFilter?.areaKur,
        creditScore: value,
      }),
    );
  };

  const handleChangeArea = (value: Area[]) => {
    const payload: CustomerParams = {
      page: 1,
    };
    if (value.length > 0) {
      const ids = value.map((el) => el.id);
      const areas = ids.toString();
      payload.area_id = areas;
    } else {
      payload.area_id = undefined;
    }
    // dispatch(
    // customerAction.setFilter({
    // area_id: value,
    // typeKur: customerKur.stateFilter?.typeKur || '',
    // areaKur: value,
    // creditScore: customerKur.stateFilter?.creditScore || '',
    // }),
    // );
    dispatch(customerAction.setParams(payload));
  };

  const handleSearch = (value: string) => {
    dispatch(
      customerAction.setParams({
        page: 1,
        search: value,
      }),
    );
  };

  const handleChangeSort = (value: {
    orderBy: string | number;
    orderType: 'asc' | 'desc';
  }) => {
    dispatch(
      customerAction.setParams({
        page: 1,
        order_by: value.orderBy,
        order_type: value.orderType,
      }),
    );
  };

  // const handleApplyFilter = () => {
  //   const payloadParams = {
  //     ...customerKur.params,
  //     page: 1,
  //     kur_user_type_id: customerKur.stateFilter?.typeKur?.id,
  //     credit_score: customerKur.stateFilter?.creditScore?.id,
  //   };
  //   if (
  //     customerKur.stateFilter?.areaKur &&
  //     customerKur.stateFilter?.areaKur.length > 0
  //   ) {
  //     const ids = customerKur.stateFilter?.areaKur.map((el: Area) => el.id);
  //     const areas = ids.toString();
  //     payloadParams.area_ids = areas;
  //   } else {
  //     payloadParams.area_ids = undefined;
  //   }
  //   dispatch(customerAction.setParams(payloadParams));
  //   dispatch(customerAction.fetchData(payloadParams));
  // };

  const handleApplyFilter = () => {
    const payloadParams = {
      ...customerKur.params,
      page: 1,
      status: 6,
    };
    if (customerKur.stateFilter?.user_type_id) {
      payloadParams.user_type_id = customerKur.stateFilter?.user_type_id.id;
    }
    if (customerKur.stateFilter?.batch_id) {
      payloadParams.batch_id = customerKur.stateFilter?.batch_id;
    }
    if (
      customerKur.stateFilter?.area_id &&
      customerKur.stateFilter?.area_id.length > 0
    ) {
      const ids = customerKur.stateFilter?.area_id.map((el: Area) => el.id);
      const areas = ids.toString();
      payloadParams.area_id = areas;
    }
    dispatch(customerAction.setParams(payloadParams));
    dispatch(customerAction.fetchData(payloadParams));
  };

  const handleResetFilter = async () => {
    const params: CustomerParams = {
      ...customerKur.params,
      page: 1,
      count: 10,
      status: 6,
      user_type_id: null,
      batch_id: null,
      area_id: null,
    };
    await dispatch(
      customerAction.setFilter({
        area_id: [],
        user_type_id: null,
        batch_id: null,
        status: 6,
      }),
    );
    await dispatch(customerAction.setParams(params));
    await dispatch(customerAction.fetchData(params));
  };

  const debounceSearch = useCallback(debounce(handleSearch, 1000), []);

  const formHandleClose = async () => {
    // await dispatch(
    //   customerAction.setParams({
    //     page: 1,
    //     count: 10,
    //     search: '',
    //     order_by: 'id',
    //     order_type: 'desc',
    //   }),
    // );
    setFormData({ isEdit: false, initialData });
    await formModal.closeModal();
  };

  return (
    <Box p="20px" bgcolor="#F5F7FA">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <Typography data-testid="header-page" variant="titlePage">
              Merchant List
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <Box display="flex" gap="20px" flexWrap="wrap">
              <Box
                width="100%"
                sx={{ display: 'flex', gap: 2, alignContent: 'center' }}
              >
                {/* <Button
                  data-testid="button-add-customer"
                  sx={{ width: '180px' }}
                  startIcon={<AddIcon />}
                  onClick={() => {
                    handleOpenAdd();
                  }}
                >
                  Add Customer
                </Button> */}
                <Box
                  width="100%"
                  display="flex"
                  justifyContent="space-between"
                  gap="20px"
                >
                  <TextField
                    data-testid="search-customer"
                    placeholder="Search Merchant"
                    size="small"
                    sx={{ bgcolor: '#fafafa', maxWidth: '560px', flex: 1 }}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                    defaultValue={customerKur.params.search}
                    onChange={(e) => {
                      // setSearchKur(e.target.value);
                      debounceSearch(e.target.value);
                    }}
                  />
                  <Button
                    endIcon={<KeyboardArrowDownIcon />}
                    onClick={() => setOpenFilter((prev) => !prev)}
                  >
                    Filter
                  </Button>
                </Box>
              </Box>
            </Box>

            <Collapse in={openFilter} data-testid="filter-collapse-customer">
              <FilterUserMerchant
                onChangeValue={(value) => {
                  dispatch(
                    customerAction.setFilter({
                      ...customerKur.stateFilter,
                      ...value,
                    }),
                  );
                }}
              />
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
              data={
                customerKur.data?.map((data) => ({
                  ...data,
                  table_color:
                    data.nearest_due_date &&
                    (moment(data.nearest_due_date * 1000).isBetween(
                      moment(),
                      moment().add(1, 'weeks'),
                    ) ||
                      moment(data.nearest_due_date * 1000).isBefore(moment()))
                      ? '#F9EBE7'
                      : undefined,
                })) || []
              }
              headCells={headCell}
              page={customerKur.params.page}
              totalData={customerKur.total}
              count={customerKur.params.count}
              orderBy={customerKur.params.order_by}
              orderType={customerKur.params.order_type}
              onChangePage={(val) => handleChangePage(val)}
              onChangeSort={(val) => handleChangeSort(val)}
              disableNumber
              loading={customerKur.loading}
            />
          </Box>
        </Grid>
      </Grid>
      {/* <Modal open={formModal.open} title={formHead} onClose={formHandleClose}>
        <FormCustomer onClose={formHandleClose} formData={formData} />
      </Modal> */}
      <Modal
        open={createUserModal.open}
        onClose={() => {
          createUserModal.closeModal();
          setSelectedIdUser(undefined);
        }}
        title={selectedIdUser ? 'Update Merchant' : 'Create Merchant'}
      >
        <FormUserMerchant
          id={selectedIdUser}
          handleClose={(isSubmite) => {
            if (isSubmite) {
              dispatch(
                customerAction.fetchData({
                  status: 6,
                  page: customerKur.params.page,
                  search: customerKur.params.search,
                }),
              );
            }
            setSelectedIdUser(undefined);
            createUserModal.closeModal();
          }}
        />
      </Modal>
      <Modal
        open={topUpModal.open}
        onClose={topUpModal.closeModal}
        title="Top Up Limit"
      >
        <FormTopUpLimit
          id={selectedIdUser}
          handleClose={(isSubmite) => {
            if (isSubmite) {
              dispatch(
                customerAction.fetchData({
                  status: 6,
                  page: customerKur.params.page,
                  search: customerKur.params.search,
                }),
              );
            }
            topUpModal.closeModal();
          }}
          openModal={topUpModal.open}
        />
      </Modal>
      <Modal
        open={restructureModal.open}
        onClose={restructureModal.closeModal}
        title="Restructure"
      >
        <FormRestructureMerchant
          id={selectedIdUser}
          handleClose={(isSubmite) => {
            if (isSubmite) {
              dispatch(
                customerAction.fetchData({
                  status: 6,
                  page: customerKur.params.page,
                  search: customerKur.params.search,
                }),
              );
            }
            restructureModal.closeModal();
          }}
          openModal={topUpModal.open}
        />
      </Modal>
      <Modal
        open={printInvoiceModal.open}
        title="Generate Invoice PDF"
        onClose={() => {
          printInvoiceModal.closeModal();
          setSelected(null);
        }}
      >
        <PrintInvoice
          type="user"
          idSelected={selected?.id}
          name={selected?.name}
          onClose={() => {
            printInvoiceModal.closeModal();
            setSelected(null);
          }}
        />
      </Modal>
      <Modal
        open={assignAoModal.open}
        onClose={() => {
          assignAoModal.closeModal();
          setSelectedIdUser(undefined);
        }}
        title="Assign AO"
      >
        <FormAssignAo
          id={selectedIdUser}
          handleClose={(isSubmite) => {
            if (isSubmite) {
              dispatch(
                customerAction.fetchData({
                  status: 6,
                  page: customerKur.params.page,
                  search: customerKur.params.search,
                }),
              );
            }
            setSelectedIdUser(undefined);
            assignAoModal.closeModal();
          }}
        />
      </Modal>
    </Box>
  );
}
