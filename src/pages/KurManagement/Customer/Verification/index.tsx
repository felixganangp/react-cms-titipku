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
  ReviewCustomer,
  VerifyCustomer,
} from 'models/kur/Customer';
import * as customerService from 'service/Kur/Customer';
import { Type } from 'models/kur/Type';
import { Area } from 'models/Area';
import debounce from 'utils/debounce';
import useToast from 'hooks/useToast';
import FormCustomer from 'pages/Finance/Customer/Components/Form';
import FormBiChecking from './components/form-bi-checking';
import FormCustomerReview from './components/form-customer-review';
import Verify from './components/verify';

interface FormDataType {
  isEdit: boolean;
  initialData: CreateCustomer;
}

interface FormReview {
  title: string;
  status: number;
}

export default function KurCustomerVerification() {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const customerKur = useAppSelector((state) => state.customerKur);
  const areaKur = useAppSelector((state) => state.area);
  const creditScore = useAppSelector((state) => state.creditScore);
  const [formReview, setFormReview] = useState<FormReview>({
    title: '',
    status: 3,
  });

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

  const [userTab, setUserTab] = useState(0);

  const formBiChecking = useModal();
  const formCustomerReview = useModal();
  const verifyModal = useModal();

  const createUserModal = useModal();
  const [selectedIdUser, setSelectedIdUser] = useState<number | undefined>();

  // Batch Action
  const [selected, setSelected] = useState<(number | string)[]>([]);
  const [selectedSingle, setSelectedSingle] = useState<number | undefined>(0);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer[]>([]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleOpenBatchAction = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSubmitVerify = async () => {
    const payload: VerifyCustomer = {
      new_status: 6,
      id: selectedSingle,
    };
    dispatch(customerAction.verifyCustomer(payload));
    verifyModal.closeModal();
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

  const [inputValueArea, setInputValueArea] = useState('');
  const [openFilter, setOpenFilter] = useState(false);
  useEffect(() => {
    dispatch(typeAction.fetchData());
    dispatch(areaAction.fetchData());
    dispatch(creditScoreAction.fetchData());
  }, []);

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
    setUserTab(newValue);
    dispatch(
      customerAction.setParams({
        status: newValue === 4 ? 7 : newValue + 1,
      }),
    );
    dispatch(customerAction.fetchData({ area_id: '', ...customerKur.params }));
  };
  const headCell = [
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
      format: (val: Customer) => (
        <div>{moment(val.created_at * 1000).format('DD/MM/YYYY')}</div>
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
      id: 'batch_id',
      label: 'Batch',
      align: 'left',
      width: '100px',
      format: (val: Customer) => <Typography>{val.batch_id}</Typography>,
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
                label: 'Edit',
                onClick: () => {
                  createUserModal.openModal();
                  setSelectedIdUser(val.id);
                },
                dataId: 'button-edit-customer',
              },
              {
                label: 'Details',
                onClick: () => {
                  navigate(`/finance/customer/${val.id}`);
                },
                dataId: 'button-details-customer',
              },
              {
                label: `Komite Review`,
                onClick: () => {
                  setSelectedSingle(val.id);
                  setFormReview({ status: 3, title: 'Komite Review' });
                  formCustomerReview.openModal();
                },
                dataId: 'button-review-customer',
                hide: val.user_status_id !== 2,
              },
              {
                label: `Bi Checking`,
                onClick: () => {
                  setSelectedCustomer([val]);
                  formBiChecking.openModal();
                },
                dataId: 'button-review-customer',
                hide: val.user_status_id !== 1,
              },
              {
                label: `Verify`,
                onClick: () => {
                  setSelectedSingle(val.id);
                  verifyModal.openModal();
                },
                dataId: 'button-review-customer',
                hide: val.user_status_id !== 4,
              },
              {
                label: `Reject`,
                onClick: () => {
                  setSelectedSingle(val.id);
                  setFormReview({ status: 7, title: 'Reject User' });
                  formCustomerReview.openModal();
                },
                dataId: 'button-review-customer',
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
    dispatch(
      customerAction.setParams({
        ...customerKur.params,
        page: value,
      }),
    );
  };

  const handleChangeBatch = (value: number | null) => {
    dispatch(
      customerAction.setFilter({
        status: customerKur.stateFilter?.status || undefined,
        area_id: customerKur.stateFilter?.area_id,
        user_type_id: customerKur.stateFilter?.user_type_id || null,
        batch_id: value,
      }),
    );
  };

  const handleChangeArea = (value: Area[]) => {
    dispatch(
      customerAction.setFilter({
        status: customerKur.stateFilter?.status || undefined,
        area_id: value,
        user_type_id: customerKur.stateFilter?.user_type_id || null,
        batch_id: customerKur.stateFilter?.batch_id || null,
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
    };
    if (customerKur.stateFilter?.user_type_id) {
      payloadParams.user_type_id = customerKur.stateFilter?.user_type_id.id;
    }
    if (customerKur.stateFilter?.batch_id) {
      payloadParams.batch_id = customerKur.stateFilter?.batch_id;
    } else {
      payloadParams.batch_id = undefined;
    }
    if (
      customerKur.stateFilter?.area_id &&
      customerKur.stateFilter?.area_id.length > 0
    ) {
      const ids = customerKur.stateFilter?.area_id.map((el: Area) => el.id);
      const areas = ids.toString();
      payloadParams.area_id = areas;
    } else {
      payloadParams.area_id = null;
    }
    dispatch(customerAction.setParams(payloadParams));
    dispatch(customerAction.fetchData(payloadParams));
  };

  const handleResetFilter = async () => {
    const params: CustomerParams = {
      ...customerKur.params,
      page: 1,
      count: 10,
      user_type_id: undefined,
      batch_id: undefined,
      area_id: undefined,
    };
    await dispatch(
      customerAction.setFilter({
        area_id: [],
        user_type_id: null,
        batch_id: null,
        status: 1,
      }),
    );
    await dispatch(customerAction.setParams(params));
    await dispatch(customerAction.fetchData(params));
  };

  const debounceSearch = useCallback(debounce(handleSearch, 1000), []);

  const handleBiChecking = () => {
    formBiChecking.openModal();
  };

  const formHandleCloseBiChecking = async () => {
    await formBiChecking.closeModal();
    setSelectedCustomer([]);
  };

  const formHandleCloseReview = async () => {
    await formCustomerReview.closeModal();
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
                    createUserModal.openModal();
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
                    placeholder="Search customer"
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
                        onClick={
                          // formBiChecking.openModal();
                          handleBiChecking
                        }
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
                    getOptionLabel={(option) => {
                      return `${option.title}`;
                    }}
                    inputValue={inputValueArea}
                    onInputChange={(_, newInputValue) => {
                      setInputValueArea(newInputValue);
                    }}
                    value={customerKur?.stateFilter?.area_id}
                    limitTags={3}
                    renderInput={(params) => {
                      return (
                        <>
                          <TextField
                            {...params}
                            name="type"
                            placeholder="Select Pasar"
                            variant="outlined"
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
                    Batch
                  </Typography>
                  <TextField
                    placeholder="Batch customer"
                    size="small"
                    type="number"
                    sx={{ bgcolor: '#fafafa', maxWidth: '560px', flex: 1 }}
                    fullWidth
                    defaultValue={customerKur.params.batch_id}
                    value={customerKur?.stateFilter?.batch_id || ''}
                    onChange={(e) => {
                      handleChangeBatch(+e.target.value);
                    }}
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
                <Tabs.Item label="Komite Review" />
                <Tabs.Item label="Final Review" />
                <Tabs.Item label="Reject" />
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
      <Modal
        open={formBiChecking.open}
        title="Bi Checking"
        onClose={formHandleCloseBiChecking}
      >
        <FormBiChecking
          onClose={formHandleCloseBiChecking}
          biCheckingData={selectedCustomer}
        />
      </Modal>
      <Modal
        open={formCustomerReview.open}
        title={formReview.title}
        onClose={formHandleCloseReview}
      >
        <FormCustomerReview
          id={selectedSingle}
          status={formReview.status}
          onClose={formHandleCloseReview}
        />
      </Modal>
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
      <Modal
        open={verifyModal.open}
        onClose={verifyModal.closeModal}
        title="Verify Customer"
      >
        <Verify
          onSubmit={handleSubmitVerify}
          onClose={verifyModal.closeModal}
        />
      </Modal>
    </Box>
  );
}
