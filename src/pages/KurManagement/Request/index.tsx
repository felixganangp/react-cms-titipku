/* eslint-disable no-nested-ternary */
import { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Card,
  Grid,
  Typography,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Autocomplete,
  Chip,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Table from 'components/Table';
import useModal from 'hooks/useModal';
import ArrowDown from '@mui/icons-material/KeyboardArrowDown';
import FormLabel from 'components/FormLabel';
import MenuList from 'components/MenuList';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { Link, useNavigate } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CalendarIcon from '@mui/icons-material/CalendarTodayOutlined';
import { RequestKUR } from 'models/kur/Request';
import { HeadCells } from 'components/Table/types';
import moment from 'moment';
import { areaAction } from 'store/slice/Area';
import { typeAction } from 'store/slice/kur/Type';
import { Area } from 'models/Area';
import { Type } from 'models/kur/Type';
import { requestKURAction } from 'store/slice/kur/Request';
import digitFormatter from 'utils/digitFormatter';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Modal from 'components/Modal';
import RefusalReason from './components/InputMessage';
import {
  CustomerStatus,
  FilterButton,
  FilterDataBox,
  InvoiceLabel,
  InvoiceStatus,
} from './request.styled';

export default function RequestKURPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const request = useAppSelector((state) => state.request);

  // define filter
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const areas = useAppSelector((state) => state.area.data);
  const types = useAppSelector((state) => state.typeKur.data);
  const [inputValueArea, setInputValueArea] = useState('');

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [openStartDate, setOpenStartDate] = useState<boolean>(false);
  const [openEndDate, setOpenEndDate] = useState<boolean>(false);

  useEffect(() => {
    dispatch(typeAction.fetchData());
    dispatch(areaAction.fetchData());
  }, []);

  // table
  useEffect(() => {
    dispatch(requestKURAction.fetchData(request.params));
  }, [request.params]);

  const handleSearch = (value: any) => {
    dispatch(
      requestKURAction.setDisplayParams({
        page: 1,
        search: value.value,
      }),
    );
  };

  const handleChangePage = (value: number) => {
    dispatch(
      requestKURAction.setParams({
        page: value,
      }),
    );
  };

  const handleChangeSort = (value: {
    orderBy: string | number;
    orderType: 'asc' | 'desc';
  }) => {
    dispatch(
      requestKURAction.setParams({
        page: 1,
        order_by: value.orderBy,
        order_type: value.orderType,
      }),
    );
  };

  const handleChangeType = (value: any) => {
    dispatch(
      requestKURAction.setDisplayParams({
        page: 1,
        kur_user_type_id: value ? value?.id : null,
      }),
    );
    dispatch(
      requestKURAction.setDisplayFilter({
        types: value,
      }),
    );
  };

  const handleChangePasar = (value: any) => {
    const areasId: (number | undefined)[] = [];
    if (value.length > 0) value.map((item: Area) => areasId.push(item.id));
    dispatch(
      requestKURAction.setDisplayParams({
        page: 1,
        area_ids: areasId.length > 0 ? areasId.join(',') : undefined,
      }),
    );
    dispatch(
      requestKURAction.setDisplayFilter({
        areas: value,
      }),
    );
  };

  const handleChangeStartDate = (value: any) => {
    dispatch(
      requestKURAction.setDisplayParams({
        page: 1,
        submit_date_start: Math.floor(new Date(value).getTime() / 1000),
      }),
    );
  };

  const handleChangeEndDate = (value: any) => {
    dispatch(
      requestKURAction.setDisplayParams({
        page: 1,
        submit_date_end: Math.floor(
          new Date(value).setHours(23, 59, 59, 59) / 1000,
        ),
      }),
    );
  };

  const handleApplyFilter = async () => {
    await dispatch(
      requestKURAction.setParams({
        ...request.params,
        ...request.displayParams,
      }),
    );
    // await dispatch(requestKURAction.fetchData(request.displayParams));
  };

  const handleResetFilter = async () => {
    setStartDate(null);
    setEndDate(null);
    await dispatch(
      requestKURAction.setParams({
        page: 1,
        area_ids: undefined,
        kur_user_type_id: undefined,
        submit_date_start: undefined,
        submit_date_end: undefined,
        search: '',
      }),
    );
    await dispatch(
      requestKURAction.setDisplayParams({
        page: 1,
        area_ids: undefined,
        kur_user_type_id: undefined,
        submit_date_start: undefined,
        submit_date_end: undefined,
        search: '',
      }),
    );
    await dispatch(
      requestKURAction.setDisplayFilter({
        areas: [],
        types: null,
      }),
    );
    await dispatch(
      requestKURAction.fetchData({
        page: 1,
        search: '',
        area_ids: undefined,
        kur_user_type_id: undefined,
        submit_date_start: undefined,
        submit_date_end: undefined,
      }),
    );
  };

  // action
  const rejectModal = useModal();
  const [selected, setSelected] = useState<RequestKUR | null>(null);
  const handleApproveRequest = (id: number | string) => {
    dispatch(requestKURAction.approveRequest({ id, detailsPage: false }));
  };
  const handleRejectRequest = (id: number | string, remarks: string) => {
    dispatch(
      requestKURAction.rejectRequest({ id, detailsPage: false, remarks }),
    );
    rejectModal.closeModal();
  };

  const headCell: HeadCells<RequestKUR>[] = [
    {
      id: 'kur_request_number',
      label: 'No Request',
      align: 'left',
      enableSort: true,
      format: (val) => (
        <Link to={`/kur/request/${val.id}`} style={{ textDecoration: 'none' }}>
          <InvoiceLabel>{val.kur_request_number}</InvoiceLabel>
        </Link>
      ),
    },
    {
      id: 'name',
      label: 'Name',
      align: 'left',
      width: '150px',
      enableSort: true,
      format: (val) => (
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="flex-start"
          alignItems="center"
          marginRight="5px"
        >
          <Box display="absolute">
            <CustomerStatus
              status={val.kur_user.kur_user_credit_score.id || 1}
            />
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="flex-start"
            flexWrap="wrap"
          >
            <Typography>{val.kur_user.name}</Typography>
          </Box>
        </Box>
      ),
    },
    {
      id: 'kur_type',
      label: 'KUR Type',
      align: 'left',
      format: (val) => (
        <Typography>{val.kur_user.kur_user_type.name}</Typography>
      ),
    },
    {
      id: 'request_amount',
      label: 'Request Amount',
      align: 'left',
      format: (val) => (
        <Typography>Rp {digitFormatter.format(val.amount)}</Typography>
      ),
    },
    {
      id: 'merchant_name',
      label: 'Merchant',
      align: 'left',
      enableSort: true,
      format: (val) => <Typography>{val.kur_user.user.name}</Typography>,
    },
    {
      id: 'area_name',
      label: 'Pasar',
      align: 'left',
      format: (val) => <Typography>{val.kur_user.user.area.name}</Typography>,
    },
    {
      id: 'created_at',
      label: 'Submit Date',
      align: 'left',
      format: (val) => (
        <Typography>
          {moment.unix(val.created_at).format('DD/MM/YYYY')}
        </Typography>
      ),
    },
    {
      id: 'status',
      label: 'Status',
      align: 'left',
      enableSort: true,
      format: (val) => (
        <InvoiceStatus status={val.status}>{val.status}</InvoiceStatus>
      ),
    },
    {
      id: 'menu',
      label: 'Action',
      align: 'left',
      width: '20px',
      format: (val) => (
        <div>
          <MenuList
            menu={
              val.status === 'pending'
                ? [
                    {
                      label: 'Details',
                      onClick: () => {
                        navigate(`/kur/request/${val.id}`);
                      },
                      dataId: `req-list-act-details`,
                    },
                    {
                      label: 'Approve',
                      onClick: () => {
                        handleApproveRequest(val.id);
                      },
                      dataId: `req-list-act-approve`,
                    },
                    {
                      label: 'Reject',
                      onClick: () => {
                        setSelected(val);
                        rejectModal.openModal();
                      },
                      dataId: `req-list-act-reject`,
                    },
                  ]
                : [
                    {
                      label: 'Details',
                      onClick: () => {
                        navigate(`/kur/request/${val.id}`);
                      },
                      dataId: `req-list-act-details`,
                    },
                  ]
            }
          >
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </MenuList>
        </div>
      ),
    },
  ];

  return (
    <>
      <Box p="20px" bgcolor="#F5F7FA">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card>
              <Typography variant="titlePage" data-testid="request-kur-title">
                Request KUR
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <FilterDataBox>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="100%"
                  justifyContent="space-between"
                >
                  <TextField
                    placeholder="Search item"
                    size="small"
                    sx={{ bgcolor: '#fafafa', maxWidth: '560px' }}
                    fullWidth
                    data-testid="search-request-kur"
                    defaultValue={request.displayParams.search}
                    value={request.displayParams.search}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                    onChange={(event) => handleSearch(event.target)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        handleApplyFilter();
                      }
                    }}
                  />
                  <FilterButton
                    endIcon={<ArrowDown />}
                    data-testid="request-kur-show-filter"
                    onClick={() => setOpenFilter(!openFilter)}
                  >
                    Filter
                  </FilterButton>
                </Box>
                <Box
                  display={openFilter ? 'flex' : 'none'}
                  flexDirection="row"
                  width="100%"
                  justifyContent="space-between"
                  gap="28px"
                  data-testid="request-kur-filter-box"
                >
                  <FormLabel text="Pasar">
                    <Autocomplete
                      data-testid="request-kur-filterpasar"
                      multiple
                      id="filterPasar"
                      options={areas}
                      onChange={(e, value) => {
                        handleChangePasar(value);
                      }}
                      getOptionLabel={(option) => `${option.title}`}
                      renderInput={(params) => {
                        return (
                          <TextField
                            {...params}
                            name="type"
                            placeholder="Select Pasar"
                            variant="outlined"
                          />
                        );
                      }}
                      renderTags={(value: Area[], getTagProps) =>
                        value.map((item: Area, index: number) => (
                          <Chip
                            label={item.title}
                            {...getTagProps({ index })}
                            key={`area-${item.id}`}
                          />
                        ))
                      }
                      isOptionEqualToValue={(item: Area) => {
                        const filtered = request?.displayFilter?.areas?.filter(
                          (el) => el.id === item.id,
                        );
                        if (filtered) return item.id === filtered[0]?.id;
                        return false;
                      }}
                      renderOption={(props, item) => (
                        <Box component="li" {...props} key={`area${item.id}`}>
                          {item.title}
                        </Box>
                      )}
                      value={request?.displayFilter?.areas}
                      inputValue={inputValueArea}
                      onInputChange={(_, newInput) => {
                        setInputValueArea(newInput);
                      }}
                    />
                  </FormLabel>
                  <FormLabel text="Type">
                    <Autocomplete
                      data-testid="request-kur-filtertype"
                      id="filterType"
                      options={types}
                      onChange={(e, value) => {
                        handleChangeType(value);
                      }}
                      isOptionEqualToValue={(item: Type) => {
                        return item.id === request.displayFilter?.types?.id;
                      }}
                      getOptionLabel={(item) => item.name}
                      value={request?.displayFilter?.types}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          name="type"
                          placeholder="Select Type of KUR"
                        />
                      )}
                    />
                  </FormLabel>
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    width="100%"
                    gap="14px"
                  >
                    <FormLabel
                      data-testid="request-kur-range-date"
                      text="Range Date"
                      error={startDate === null && endDate !== null}
                      helperText={
                        startDate === null &&
                        endDate !== null &&
                        'Start Date is required when End Date is filled'
                      }
                    >
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DesktopDatePicker
                          components={{
                            OpenPickerIcon: CalendarIcon,
                          }}
                          open={openStartDate}
                          onClose={() => {
                            setOpenStartDate(false);
                          }}
                          onOpen={() => {
                            setOpenStartDate(true);
                          }}
                          value={
                            request.displayParams.submit_date_start
                              ? new Date(
                                  request.displayParams.submit_date_start *
                                    1000,
                                )
                              : null
                          }
                          inputFormat="DD/MM/YYYY"
                          onChange={(value) => {
                            setStartDate(value);
                            handleChangeStartDate(value);
                          }}
                          renderInput={(params) => (
                            <TextField
                              sx={{ width: '100%' }}
                              {...params}
                              onClick={() => setOpenStartDate(true)}
                              inputProps={{
                                ...params.inputProps,
                                placeholder: 'Start Date',
                              }}
                            />
                          )}
                          maxDate={endDate}
                        />
                      </LocalizationProvider>
                    </FormLabel>
                    <Box
                      display="flex"
                      flexDirection="row"
                      justifyContent="flex-start"
                      alignItems="center"
                      marginTop="50px"
                    >
                      <div
                        style={{
                          width: '22px',
                          height: '1px',
                          backgroundColor: '#303030',
                        }}
                      />
                    </Box>
                    <FormLabel
                      text="&nbsp;"
                      error={startDate !== null && endDate === null}
                      helperText={
                        startDate !== null &&
                        endDate === null &&
                        'End Date is required when Start Date is filled'
                      }
                    >
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DesktopDatePicker
                          open={openEndDate}
                          components={{
                            OpenPickerIcon: CalendarIcon,
                          }}
                          onClose={() => {
                            setOpenEndDate(false);
                          }}
                          onOpen={() => {
                            setOpenEndDate(true);
                          }}
                          value={
                            request.displayParams.submit_date_end
                              ? new Date(
                                  request.displayParams.submit_date_end * 1000,
                                )
                              : null
                          }
                          inputFormat="DD/MM/YYYY"
                          onChange={(value) => {
                            setEndDate(value);
                            handleChangeEndDate(value);
                          }}
                          renderInput={(params) => (
                            <TextField
                              sx={{ width: '100%' }}
                              {...params}
                              onClick={() => setOpenEndDate(true)}
                              inputProps={{
                                ...params.inputProps,
                                placeholder: 'End Date',
                              }}
                            />
                          )}
                          minDate={startDate}
                        />
                      </LocalizationProvider>
                    </FormLabel>
                  </Box>
                </Box>
                <Box
                  display={openFilter ? 'flex' : 'none'}
                  flexDirection="row"
                  justifyContent="flex-end"
                  width="100%"
                  gap="20px"
                >
                  <Button variant="text" onClick={() => handleResetFilter()}>
                    Reset
                  </Button>
                  <FilterButton
                    data-testid="request-kur-apply-btn"
                    onClick={() => handleApplyFilter()}
                    disabled={
                      (startDate === null && endDate !== null) ||
                      (startDate !== null && endDate === null)
                    }
                  >
                    Apply
                  </FilterButton>
                </Box>
              </FilterDataBox>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Box
              data-testid="request-kur-table"
              bgcolor="#fff"
              p="7px"
              borderRadius="5px"
              boxShadow="0 3px 10px 0 rgba(0, 0, 0, 0.1)"
            >
              <Table
                data={request.data || []}
                headCells={headCell}
                totalData={request.total}
                loading={request.loading}
                count={request.params.count}
                page={request.params.page}
                orderBy={request.params.order_by}
                orderType={request.params.order_type}
                onChangePage={(page) => handleChangePage(page)}
                onChangeSort={(value) => handleChangeSort(value)}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Modal
        open={rejectModal.open}
        title="Refusal Reason"
        onClose={rejectModal.closeModal}
      >
        <RefusalReason
          onSubmitRefusal={handleRejectRequest}
          id={selected?.id || 0}
        />
      </Modal>
    </>
  );
}
