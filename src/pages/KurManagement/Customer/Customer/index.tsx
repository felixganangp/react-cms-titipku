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

  // useEffect(() => {
  //   dispatch(customerAction.fetchData(customerKur.params));
  // }, [
  //   customerKur.params.search,
  //   customerKur.params.order_by,
  //   customerKur.params.order_type,
  //   customerKur.params.page,
  //   customerKur.params.status,
  // ]);

  useEffect(() => {
    dispatch(
      customerAction.fetchData({
        status: 6,
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

  // const [typeKurFilter, setTypeKurFilter] = useState<Type | null>(null);
  // const [areaKurFilter, setAreaKurFilter] = useState<Area[] | undefined>([]);
  // const [searchKur, setSearchKur] = useState<string>('');
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

  // const getInitialData = (val: Customer) => {
  //   const birthDate = new Date(0);
  //   birthDate.setUTCSeconds(val.birth_date);
  //   const date = birthDate.getDate();
  //   const month = birthDate.getMonth();
  //   const year = birthDate.getFullYear();
  //   const d = moment({ year, month, day: date });
  //   const convertBirthDate = moment(birthDate).format('MM/DD/YYYY');
  //   const findBank = bankData.data.filter((el) => el.name === val.user_bank);

  //   const findKtp = val.kur_user_document.filter(
  //     (el) => el.document_type === 'ktp',
  //   );
  //   const findKk = val.kur_user_document.filter(
  //     (el) => el.document_type === 'kk',
  //   );
  //   const findNpwp = val.kur_user_document.filter(
  //     (el) => el.document_type === 'npwp',
  //   );
  //   const findSKU = val.kur_user_document.filter(
  //     (el) => el.document_type === 'sku',
  //   );
  //   const merchantName: MerchantResp = {
  //     merchant_name: val.user.name,
  //     id: val.user.id,
  //   };

  //   const pasarName: Area = {
  //     id: val.user.area.id,
  //     title: val.user.area.name,
  //   };
  //   const initialDataPayload = {
  //     idCustomer: val.id?.toString(),
  //     name: val.name,
  //     userType: val.user_type,
  //     adminFee: val.admin_fee.toString(),
  //     dpdRate: val.dpd_rate.toString(),
  //     birthDate: d,
  //     phoneNumber: val.phone_number,
  //     email: val.email,
  //     addressKtp: val.registered_address,
  //     addressDomisili: val.living_address,
  //     pasarName,
  //     merchantName,
  //     nikKtp: findKtp[0].document_number,
  //     oldNikKtp: findKtp[0].document_number,
  //     imageNik: findKtp[0].document_filepath,
  //     kkNumber: findKk[0].document_number,
  //     oldKkNumber: findKk[0].document_number,
  //     imageKk: findKk[0].document_filepath,
  //     npwp: findNpwp[0].document_number,
  //     oldNpwp: findNpwp[0].document_number,
  //     imageNpwp: findNpwp[0].document_filepath,
  //     imageSKUsaha: findSKU[0].document_filepath,
  //     creditLimit: val.credit_limit.toString(),
  //     bankName: findBank[0],
  //     bankNumberPrimary: val.user_account_number,
  //     nobuAccountNumber: val.nobu_account_number,
  //     idImageNik: findKtp[0].id,
  //     idImageKk: findKk[0].id,
  //     idImageNpwp: findNpwp[0].id,
  //     idImageSKUsaha: findSKU[0].id,
  //     kurUserStatus: val.kur_user_status.id?.toString(),
  //   };
  //   return initialDataPayload;
  // };

  // const [formHead, setFormHead] = useState('');
  // const handleOpenEdit = (val: Customer) => {
  //   setFormHead('Edit Customer');
  //   const initialDataPayload = getInitialData(val);
  //   setFormData({
  //     isEdit: true,
  //     initialData: initialDataPayload,
  //   });
  //   formModal.openModal();
  // };
  // const handleOpenAdd = () => {
  //   setFormHead('Add Customer');
  //   formModal.openModal();
  // };

  // const convertStrCreditScore = (val: string) => {
  //   const splitStr = val.split(' ');
  //   const firstCharUpperCase = splitStr.map((el) => {
  //     return el.charAt(0).toUpperCase() + el.slice(1);
  //   });

  //   const result = firstCharUpperCase.join(' ');
  //   return result;
  // };

  // const handleHoldCustomer = async (val: Customer) => {
  //   let statusId;
  //   if (val.kur_user_status?.id === 3) {
  //     statusId = 1;
  //   }
  //   if (val.kur_user_status?.id === 1) {
  //     statusId = 3;
  //   }
  //   const newPayload: Customer = {
  //     ...val,
  //     kur_user_status: { ...val.kur_user_status, id: statusId },
  //   };
  //   const initialDataPayload = getInitialData(newPayload);
  //   await dispatch(customerAction.editCustomer(initialDataPayload));
  // };

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
      width: '410px',
      format: (val: Customer) => <div>{val.merchant_name}</div>,
    },
    {
      id: 'pasar',
      label: 'Pasar',
      align: 'left',
      format: (val: Customer) => <div>{val.merchant_name}</div>,
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
      label: 'Create Date',
      align: 'left',
      width: '100px',
      format: (val: Customer) => <div>{convertDate(val.created_at)}</div>,
    },
    // {
    //   id: 'kur_user_credit_score',
    //   label: 'Credit Score',
    //   align: 'left',
    //   width: '200px',
    //   enableSort: true,
    //   format: (val: Customer) => {
    //     const bgColor = getColorCreditScore(val.kur_user_credit_score.id);
    //     return (
    //       <Chip
    //         sx={{
    //           borderRadius: '8px',
    //           paddingX: '16px',
    //           paddingY: '8px',
    //           color: '#fff',
    //           backgroundColor: bgColor,
    //           fontSize: '12px',
    //           fontWeight: 500,
    //         }}
    //         label={convertStrCreditScore(val.kur_user_credit_score.name)}
    //       />
    //     );
    //   },
    // },
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
                  navigate(`/kur/customer/${val.id}`);
                },
                dataId: 'button-details-customer',
              },
              {
                label: `Edit`,
                onClick: () => {
                  console.log('edit');
                },
                dataId: 'button-edit-customer',
              },
              // {
              //   label: val.kur_user_status?.id === 3 ? 'Active' : 'Hold',
              //   color: val.kur_user_status?.id === 3 ? '#008e58' : '#c10000',
              //   onClick: () => {
              //     handleHoldCustomer(val);
              //   },
              //   dataId: 'button-hold-customer',
              // },
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
        typeKur: value,
        areaKur: customerKur.stateFilter?.areaKur,
        creditScore: customerKur.stateFilter?.creditScore || null,
      }),
    );
    // dispatch(
    //   customerAction.setParams({
    //     page: 1,
    //     kur_user_type_id: value?.id,
    //   }),
    // );
  };

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
      payload.area_ids = areas;
    } else {
      payload.area_ids = undefined;
    }
    dispatch(
      customerAction.setFilter({
        typeKur: customerKur.stateFilter?.typeKur || null,
        areaKur: value,
        creditScore: customerKur.stateFilter?.creditScore || null,
      }),
    );
    // dispatch(customerAction.setParams(payload));
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

  const handleApplyFilter = () => {
    const payloadParams = {
      ...customerKur.params,
      page: 1,
      kur_user_type_id: customerKur.stateFilter?.typeKur?.id,
      credit_score: customerKur.stateFilter?.creditScore?.id,
    };
    if (
      customerKur.stateFilter?.areaKur &&
      customerKur.stateFilter?.areaKur.length > 0
    ) {
      const ids = customerKur.stateFilter?.areaKur.map((el: Area) => el.id);
      const areas = ids.toString();
      payloadParams.area_ids = areas;
    } else {
      payloadParams.area_ids = undefined;
    }
    dispatch(customerAction.setParams(payloadParams));
    dispatch(customerAction.fetchData(payloadParams));
  };

  const handleResetFilter = async () => {
    const params: CustomerParams = {
      ...customerKur.params,
      page: 1,
      count: 10,
      order_by: 'id',
      order_type: 'desc',
      kur_user_type_id: undefined,
      credit_score: undefined,
      area_ids: undefined,
    };
    await dispatch(
      customerAction.setFilter({
        areaKur: [],
        typeKur: null,
        creditScore: null,
      }),
    );
    await dispatch(customerAction.setParams(params));
    await dispatch(customerAction.fetchData(params));
    // await handleApplyFilter();
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
                    placeholder="Search item"
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
                    options={typeKur.data}
                    onChange={(e, value) => {
                      // setTypeKurFilter(value);
                      handleChangeType(value);
                    }}
                    isOptionEqualToValue={(option: Type) => {
                      return option.id === customerKur.stateFilter?.typeKur?.id;
                    }}
                    getOptionLabel={(option) => `${option.name}`}
                    value={customerKur?.stateFilter?.typeKur}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="type"
                        placeholder="Select Type of KUR"
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
                <Grid item xs={4}>
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
                      // setTypeKurFilter(value);
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
                </Grid>
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
    </Box>
  );
}
