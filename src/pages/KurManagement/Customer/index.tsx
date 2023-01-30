import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
// import styled from '@emotion/styled';
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

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { customerAction } from 'store/slice/kur/Customer';
import { typeAction } from 'store/slice/kur/Type';
import { areaAction } from 'store/slice/Area';
import useModal from 'hooks/useModal';
import Table from 'components/Table';
import Modal from 'components/Modal';
import { Customer, CustomerParams } from 'models/kur/Customer';
import { Type } from 'models/kur/Type';
import { Area } from 'models/Area';
import debounce from 'utils/debounce';

import FormCustomer from './components/form';

export default function KurCustomer() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const customerKur = useAppSelector((state) => state.customerKur);
  const typeKur = useAppSelector((state) => state.typeKur);
  const areaKur = useAppSelector((state) => state.area);

  useEffect(() => {
    dispatch(customerAction.fetchData(customerKur.params));
  }, [customerKur.params]);

  useEffect(() => {
    dispatch(typeAction.fetchData());
    dispatch(areaAction.fetchData());
  }, []);

  const [typeKurFilter, setTypeKurFilter] = useState<Type | null>(null);
  const [areaKurFilter, setAreaKurFilter] = useState<Area[] | undefined>([]);
  const [searchKur, setSearchKur] = useState<string>('');

  const [openFilter, setOpenFilter] = useState(false);

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
      id: 'kur_user_number',
      label: 'Cust. ID',
      align: 'left',
    },
    {
      id: 'name',
      label: 'Name',
      align: 'left',
    },
    {
      id: 'kur_type',
      label: 'KUR Type',
      align: 'left',
      format: (val: Customer) => <div>{val.kur_user_type.name}</div>,
    },
    {
      id: 'create_date',
      label: 'Create Date',
      align: 'left',
      format: (val: Customer) => <div>{convertDate(val.created_at)}</div>,
    },
    {
      id: 'merchant',
      label: 'Merchant',
      align: 'left',
      format: (val: Customer) => <div>{val.user.name}</div>,
    },
    {
      id: 'pasar',
      label: 'Pasar',
      align: 'left',
      format: (val: Customer) => <div>{val.user.area.name}</div>,
    },
    // {
    //   id: 'credit_score',
    //   label: 'Credit Score',
    //   align: 'left',
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
              },
              {
                label: `Update`,
                onClick: () => {},
              },
              // {
              //   label: `Hold`,
              //   color: '#c10000',
              //   onClick: () => {},
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
    dispatch(
      customerAction.setParams({
        page: value,
      }),
    );
  };

  const handleChangeType = (value: Type | null) => {
    dispatch(
      customerAction.setParams({
        page: 1,
        kur_user_type_id: value?.id,
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
    dispatch(customerAction.setParams(payload));
  };

  const handleResetFilter = () => {
    setAreaKurFilter([]);
    setTypeKurFilter(null);
    setSearchKur('');
    dispatch(
      customerAction.setParams({
        page: 1,
        count: 10,
        search: '',
        kur_user_type_id: undefined,
        area_ids: undefined,
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
  const debounceSearch = useCallback(debounce(handleSearch, 1000), []);
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
                  sx={{ width: '12%' }}
                  startIcon={<AddIcon />}
                  onClick={formModal.openModal}
                >
                  Add Customer
                </Button>
                <Box
                  width="90%"
                  sx={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <TextField
                    data-testid="search-customer"
                    placeholder="Search item"
                    size="small"
                    sx={{ bgcolor: '#fafafa', maxWidth: '560px', width: '60%' }}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                    value={searchKur}
                    onChange={(e) => {
                      setSearchKur(e.target.value);
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
                <Grid item xs={6}>
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
                      setTypeKurFilter(value);
                      handleChangeType(value);
                    }}
                    isOptionEqualToValue={(option: Type) => {
                      return option.id === typeKurFilter?.id;
                    }}
                    getOptionLabel={(option) => `${option.name}`}
                    value={typeKurFilter}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="type"
                        placeholder="Select Type of KUR"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
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
                    data-testid="filter-pasar"
                    multiple
                    id="pasar-kur"
                    options={areaKur.data}
                    onChange={(e, value) => {
                      setAreaKurFilter(value);
                      handleChangeArea(value);
                    }}
                    // isOptionEqualToValue={(option: Area) => {
                    //   return option.id === areaKurFilter?.id;
                    // }}
                    getOptionLabel={(option) => `${option.title}`}
                    value={areaKurFilter}
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
                  <TextField
                    data-testid="filter-credit-score-customer"
                    placeholder="Credit Score"
                    size="small"
                    sx={{ bgcolor: '#fafafa' }}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
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
                    <Button>Apply</Button>
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
              selected={[]}
              headCells={headCell}
              page={customerKur.params.page}
              totalData={customerKur.total}
              count={customerKur.params.count}
              onChangePage={(val) => handleChangePage(val)}
              enableCheckBox
              disableNumber
            />
          </Box>
        </Grid>
      </Grid>
      <Modal
        open={formModal.open}
        title="Add Customer"
        onClose={formModal.closeModal}
      >
        <FormCustomer onClose={formModal.closeModal} />
      </Modal>
    </Box>
  );
}
