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

// import FormCustomer from '../Verification/components/form';

interface FormDataType {
  isEdit: boolean;
  initialData: CreateCustomer;
}

export default function KurCustomer() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const customerKur = useAppSelector((state) => state.customerKur);
  const typeKur = useAppSelector((state) => state.typeKur);
  const areaKur = useAppSelector((state) => state.area);
  const creditScore = useAppSelector((state) => state.creditScore);
  const createUserModal = useModal();
  const [selectedIdUser, setSelectedIdUser] = useState<number | undefined>();

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
  useEffect(() => {
    if (
      customerKur.stateFilter?.areaKur &&
      customerKur.stateFilter?.areaKur.length > 0
    ) {
      setOpenFilter(true);
    }
    dispatch(typeAction.fetchData());
    dispatch(areaAction.fetchData());
    dispatch(creditScoreAction.fetchData());
  }, []);

  const [inputValueArea, setInputValueArea] = useState('');

  const formModal = useModal();

  const convertDate = (date: number) => {
    const d = new Date(0); // The 0 there is the key, which sets the date to the epoch
    d.setUTCSeconds(date);
    const day = d.getDate();
    let month = d.getMonth().toString();
    const year = d.getFullYear();
    if (+month < 10) {
      month = `${month}`;
    }
    const result = `${day}/${month + 1}/${year}`;
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
      width: '200px',
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
      format: (val: Customer) => <div>{val.merchant_name}</div>,
    },
    {
      id: 'pasar',
      label: 'Pasar',
      align: 'left',
      format: (val: Customer) => <div>{val.area_name}</div>,
    },
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
      label: 'Created Date',
      align: 'left',
      width: '100px',
      format: (val: Customer) => <div>{convertDate(val.created_at)}</div>,
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
      id: 'limit_invoice',
      label: 'Limit Invoice',
      align: 'left',
      width: '200px',
      format: (val: Customer) => (
        <Typography>Rp {digitFormatter.format(val.limit_plafon)}</Typography>
      ),
    },
    {
      id: 'limit_cash',
      label: 'Limit Cash',
      align: 'left',
      width: '100px',
      format: (val: Customer) => (
        <Typography>Rp {digitFormatter.format(val.limit_cash)}</Typography>
      ),
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
              KUR Customer
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
                    placeholder="Search Customer"
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
              <Grid container spacing={2} sx={{ marginTop: '2rem' }}>
                <Grid item xs={4}>
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
                    options={customerType}
                    onChange={(e, value) => {
                      handleChangeType(value);
                    }}
                    isOptionEqualToValue={(option: Type) => {
                      return (
                        option.id === customerKur.stateFilter?.user_type_id?.id
                      );
                    }}
                    getOptionLabel={(option) => `${option.name}`}
                    value={customerKur?.stateFilter?.user_type_id}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="type"
                        placeholder="Select Customer Type"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={4}>
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
                    data-testid="filter-pasar-customer"
                    multiple
                    id="pasar-kur"
                    options={areaKur.data}
                    onChange={(e, value) => {
                      handleChangeArea(value);
                    }}
                    // isOptionEqualToValue={(option: Area) => {
                    //   const filtered =
                    //     customerKur?.stateFilter?.areaKur?.filter(
                    //       (el: Area) => el.id === option.id,
                    //     );
                    //   if (filtered) {
                    //     return option.id === filtered[0]?.id;
                    //   }
                    //   return false;
                    // }}
                    getOptionLabel={(option) => {
                      return `${option.title}`;
                    }}
                    inputValue={inputValueArea}
                    onInputChange={(_, newInputValue) => {
                      setInputValueArea(newInputValue);
                    }}
                    // @ts-ignore
                    value={customerKur?.stateFilter?.areaKur}
                    limitTags={3}
                    renderInput={(params) => {
                      return (
                        <>
                          <TextField
                            {...params}
                            name="type"
                            placeholder="Select Pasar"
                            variant="outlined"
                            // InputProps={{
                            //   ...params.InputProps,
                            //   startAdornment: !areaKurFilter && (
                            //     <InputAdornment position="start">
                            //       <SearchIcon />
                            //     </InputAdornment>
                            //   ),
                            // }}
                          />
                        </>
                      );
                    }}
                    renderTags={(value: Area[], getTagProps) =>
                      value.map((option: Area, index: number) => (
                        <Chip
                          // variant="outlined"
                          label={option.title}
                          {...getTagProps({ index })}
                          key={`area_tag_${option.id}`}
                        />
                      ))
                    }
                    renderOption={(props, option) => (
                      <Box component="li" {...props} key={`area ${option.id}`}>
                        {option.title}
                      </Box>
                    )}
                  />
                </Grid>
                {/* <Grid item xs={4}>
                  <Typography
                    sx={{
                      fontSize: '14px',
                      fontWeight: '500',
                      marginBottom: 1,
                    }}
                  >
                    Credit Score
                  </Typography>
                  <Autocomplete
                    data-testid="filter-credit-score-customer"
                    id="type"
                    options={creditScore.data}
                    onChange={(e, value) => {
                      handleChangeCreditScore(value);
                    }}
                    isOptionEqualToValue={(option: UserCreditScore) => {
                      return (
                        option.id === customerKur.stateFilter?.creditScore?.id
                      );
                    }}
                    getOptionLabel={(option) => `${option.name}`}
                    value={customerKur?.stateFilter?.creditScore}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="type"
                        placeholder="Select Credit Score"
                      />
                    )}
                  />
                </Grid> */}
                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      gap: 2,
                    }}
                  >
                    <Button
                      onClick={() => {
                        handleResetFilter();
                      }}
                      variant="text"
                    >
                      Reset
                    </Button>
                    <Button onClick={handleApplyFilter}>Apply</Button>
                  </Box>
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
              data={customerKur.data}
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
        onClose={createUserModal.closeModal}
        title={selectedIdUser ? 'Update Customer' : 'Create Customer'}
      >
        <FormCustomer
          id={selectedIdUser}
          handleClose={(isSubmite) => {
            if (isSubmite) {
              dispatch(customerAction.fetchData(customerKur.params));
            }
            createUserModal.closeModal();
          }}
        />
      </Modal>
    </Box>
  );
}
