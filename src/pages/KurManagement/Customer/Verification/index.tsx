/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable radix */
/* eslint-disable array-callback-return */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useCallback } from 'react';
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
  Menu,
  MenuItem,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import ArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuList from 'components/MenuList';
import moment from 'moment';
import digitFormatter from 'utils/digitFormatter';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { customerAction } from 'store/slice/kur/Customer';
import { typeAction } from 'store/slice/kur/Type';
import { creditScoreAction } from 'store/slice/kur/CreditScore';
import { areaAction } from 'store/slice/Area';
import useModal from 'hooks/useModal';
import Table from 'components/Table';
import Tabs from 'components/Tabs';
import Modal from 'components/Modal';
import {
  Customer,
  CustomerParams,
  CreateCustomer,
  UserCreditScore,
} from 'models/kur/Customer';
// import { Customer } from 'models/financing/Customer';
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

export default function KurCustomerVerification() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const customerKur = useAppSelector((state) => state.customerKur);
  const typeKur = useAppSelector((state) => state.typeKur);
  const areaKur = useAppSelector((state) => state.area);
  const creditScore = useAppSelector((state) => state.creditScore);

  // Batch Action
  const [selected, setSelected] = useState<(number | string)[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer[]>([]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleOpenBatchAction = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    dispatch(customerAction.fetchData(customerKur.params));
  }, [
    customerKur.params.search,
    customerKur.params.order_by,
    customerKur.params.order_type,
    customerKur.params.page,
    customerKur.params.status,
  ]);

  const initialData = {
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
  const [userTab, setUserTab] = useState(0);
  const [formData, setFormData] = useState<FormDataType>({
    isEdit: false,
    initialData,
  });

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

  const handleChangeKurHistoryTab = (
    event: React.SyntheticEvent,
    newValue: number,
  ) => {
    console.log(newValue);
    setUserTab(newValue);
    dispatch(
      customerAction.fetchData({
        status: newValue + 1,
      }),
    );
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
      id: 'limit_request',
      label: 'Limit Request',
      align: 'left',
      width: '200px',
      format: (val: Customer) => (
        <Typography>
          Rp {digitFormatter.format(val.limit_request_plafon)}
        </Typography>
      ),
    },
    {
      id: 'limit_request_cash',
      label: 'Limit Cash Request',
      align: 'left',
      width: '100px',
      format: (val: Customer) => (
        <Typography>
          Rp {digitFormatter.format(val.limit_request_cash)}
        </Typography>
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
      status?: number;
    } = {
      status: 1,
    };

    if (customerKur.params.status) {
      payload = {
        ...payload,
        status: customerKur.stateFilter?.status,
      };
    }

    dispatch(customerAction.setFilter(payload));

    dispatch(
      customerAction.setParams({
        ...customerKur.params,
        page: value,
      }),
    );
  };

  // const handleChangeCreditScore = (value: UserCreditScore | null) => {
  //   dispatch(
  //     customerAction.setFilter({
  //       typeKur: customerKur.stateFilter?.typeKur || null,
  //       areaKur: customerKur.stateFilter?.areaKur,
  //       creditScore: value,
  //     }),
  //   );
  // };

  // const handleChangeArea = (value: Area[]) => {
  //   const payload: CustomerParams = {
  //     page: 1,
  //   };
  //   if (value.length > 0) {
  //     const ids = value.map((el) => el.id);
  //     const areas = ids.toString();
  //     payload.area_ids = areas;
  //   } else {
  //     payload.area_ids = undefined;
  //   }
  //   dispatch(
  //     customerAction.setFilter({
  //       typeKur: customerKur.stateFilter?.typeKur || null,
  //       areaKur: value,
  //       creditScore: customerKur.stateFilter?.creditScore || null,
  //     }),
  //   );
  // };

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

  // const handleResetFilter = async () => {
  //   const params: CustomerParams = {
  //     ...customerKur.params,
  //     page: 1,
  //     count: 10,
  //     order_by: 'id',
  //     order_type: 'desc',
  //     kur_user_type_id: undefined,
  //     credit_score: undefined,
  //     area_ids: undefined,
  //   };
  //   await dispatch(
  //     customerAction.setFilter({
  //       areaKur: [],
  //       typeKur: null,
  //       creditScore: null,
  //     }),
  //   );
  //   await dispatch(customerAction.setParams(params));
  //   await dispatch(customerAction.fetchData(params));
  // };

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
                <Button
                  data-testid="button-add-customer"
                  sx={{ width: '180px' }}
                  startIcon={<AddIcon />}
                  onClick={() => {
                    console.log('add');
                  }}
                >
                  Add Customer
                </Button>
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
                  <Box>
                    <Button
                      disabled={selected.length === 0}
                      endIcon={<ArrowDownIcon />}
                      aria-controls={open ? 'basic-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                      onClick={handleOpenBatchAction}
                      sx={{
                        '&:disabled': {
                          bgcolor: '#e4e4e4',
                          color: '#797979',
                        },
                        marginRight: '15px',
                        fontWeight: 'bold',
                      }}
                    >
                      Batch Action
                    </Button>

                    <Menu
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      PaperProps={{ sx: { minWidth: 130 } }}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                    >
                      <MenuItem
                        onClick={() => {
                          console.log(selectedCustomer);
                        }}
                      >
                        Bi Checking
                      </MenuItem>
                    </Menu>

                    <Button
                      endIcon={<ArrowDownIcon />}
                      onClick={() => setOpenFilter((prev) => !prev)}
                    >
                      Filter
                    </Button>
                  </Box>
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
                      // handleChangeType(value);
                      console.log('changetype');
                    }}
                    // isOptionEqualToValue={(option: Type) => {
                    //   return option.id === customerKur.stateFilter?.typeKur?.id;
                    // }}
                    getOptionLabel={(option) => `${option.name}`}
                    // value={customerKur?.stateFilter?.typeKur}
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
                      // handleChangeArea(value);
                      console.log('changearea');
                    }}
                    getOptionLabel={(option) => {
                      return `${option.title}`;
                    }}
                    // inputValue={inputValueArea}
                    // onInputChange={(_, newInputValue) => {
                    //   setInputValueArea(newInputValue);
                    // }}
                    // value={customerKur?.stateFilter?.areaKur}
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
                    // onChange={(e, value) => {
                    //   handleChangeCreditScore(value);
                    // }}
                    // isOptionEqualToValue={(option: UserCreditScore) => {
                    //   return (
                    //     option.id === customerKur.stateFilter?.creditScore?.id
                    //   );
                    // }}
                    getOptionLabel={(option) => `${option.name}`}
                    // value={customerKur?.stateFilter?.creditScore}
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
                        // handleResetFilter();
                        console.log('reset');
                      }}
                      variant="text"
                    >
                      Reset
                    </Button>
                    {/* <Button onClick={handleApplyFilter}>Apply</Button> */}
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
            <Box>
              <Tabs.Container
                value={userTab}
                onChange={handleChangeKurHistoryTab}
                aria-label="basic tabs example"
                variant="fullWidth"
                sx={{ mb: 1 }}
              >
                <Tabs.Item label="New" />
                <Tabs.Item label="Bi-Checking" />
                <Tabs.Item label="CO" />
                <Tabs.Item label="Final Review" />
              </Tabs.Container>
            </Box>
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
              enableCheckBox={userTab === 0}
              selected={selected}
              setSelected={(array: (string | number)[]) => {
                setSelected(array);
                setSelectedCustomer(() => {
                  const addition: Customer[] = [];
                  array.map((id) => {
                    const obj: Customer | undefined = customerKur.data.find(
                      (item: any) => item.id === id,
                    );
                    if (
                      obj &&
                      selectedCustomer.findIndex((item) => item.id === id) ===
                        -1
                    )
                      return addition.push(obj);
                  });
                  const existing = selectedCustomer.filter(
                    (item) => array.indexOf(item.id) !== -1,
                  );
                  return [...existing, ...addition];
                });
              }}
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
