/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import MenuList from 'components/MenuList';
import { HeadCells } from 'components/Table/types';
import { Add, KeyboardArrowDown, MoreVert, Search } from '@mui/icons-material';
import {
  Box,
  Stack,
  Card,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Menu,
  IconButton,
  Collapse,
  Grid,
  Autocomplete,
  Modal,
} from '@mui/material';
import Table from 'components/Table';
import moment from 'moment';
import { useEffect, useState } from 'react';
import useModal from 'hooks/useModal';
import FormLabel from 'components/FormLabel';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { useNavigate } from 'react-router-dom';
import numberSeperator from 'utils/numberSeperator';
import DeleteModal from 'components/Delete/freetext';
import { MerchantList } from 'models/merchantDepo/Merchant';
import {
  useDeleteMerchantDepo,
  useMerchantDepoList,
  useMerchantList,
} from '../hooks/useMerchant';
import {
  UseAreaListService,
  UseFilterMerchentDepoListService,
  UseTypeListService,
} from '../hooks/useConfigMerchant';

export default function MerchantsPages() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<(string | number)[]>([]);

  const merchantQuery = useMerchantDepoList();
  const typeMerchantList = UseTypeListService();
  const filterMerchantDepoList = UseFilterMerchentDepoListService();
  const deleteMerchant = useDeleteMerchantDepo();
  const queryArea = UseAreaListService();

  const openDateJoinFilter = useModal();
  const openEndDateJoinFilter = useModal();
  const showFilter = useModal();
  const modalDelete = useModal();

  const headCells: HeadCells<MerchantList>[] = [
    {
      id: 'rank',
      label: 'Rank',
      format: (value) => (value?.rank ? `#${value?.rank || '-'}` : '-'),
    },
    {
      id: 'Join Date',
      label: 'Join Date',
      width: 150,
      format: (value) =>
        value.join_date
          ? moment(value.join_date * 1000).format('DD MMM YYYY')
          : '-',
    },
    {
      id: 'merchant_name',
      label: 'Merchant Name',
      width: 350,
      format: (value) => {
        const isNew = value.is_new && (
          <Typography
            color="primary"
            component="span"
            fontWeight="bold"
            fontSize="14px"
          >
            [NEW]{' '}
          </Typography>
        );
        return (
          <Typography>
            {isNew}
            {value.merchant_name}
          </Typography>
        );
      },
    },
    {
      id: 'type',
      label: 'Type',
      format: (value) => value.type.replace('Andalan', 'Andalan Titipku'),
    },
    {
      id: 'limit',
      enableSort: true,
      label: 'Limit',
      format: (value) => {
        if (!value.limit) return <Typography>-</Typography>;
        return <Typography>Rp {numberSeperator(value.limit)}</Typography>;
      },
    },
    {
      id: 'balance',
      enableSort: true,
      label: 'Balance',
      format: (value) => {
        if (!value.balance && value.total_gmv === 0)
          return <Typography>-</Typography>;
        return <Typography>Rp {numberSeperator(value.balance)}</Typography>;
      },
    },
    {
      id: 'total_gmv',
      enableSort: true,
      label: 'Total GMV',
      format: (value) => {
        if (!value.total_gmv) return <Typography>-</Typography>;
        return <Typography>Rp {numberSeperator(value.total_gmv)}</Typography>;
      },
    },
    {
      id: 'Action',
      label: 'Action',
      format: (value) => (
        <MenuList
          menu={[
            {
              label: 'Detail',
              onClick: () => {
                navigate(`/depo/merchants/${value.jelajah_id}`);
              },
            },
            {
              label: 'Edit',
              onClick: () => {
                navigate(`/depo/merchants/form/${value.jelajah_id}`);
              },
            },
            {
              label: 'Delete',
              color: 'error',
              onClick: () => {
                setSelected([value.jelajah_id]);
                modalDelete.openModal();
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

  useEffect(() => {
    if (!modalDelete.open) {
      setSelected([]);
    }
  }, [modalDelete.open]);

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
                onClick={() => navigate('/depo/merchants/form')}
              >
                Add New
              </Button>
              <TextField
                placeholder="Search Merchant"
                size="small"
                sx={{ bgcolor: '#ebeff3', maxWidth: '560px', flex: 1 }}
                fullWidth
                value={merchantQuery.searchValue}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                onChange={(event) => {
                  merchantQuery.handleSearch(event.target.value);
                  merchantQuery.handleToSetSearchParams(
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
              onSubmit={merchantQuery.formik.handleSubmit}
            >
              <Grid item xs={12} md={5}>
                <FormLabel text="Merchant Name">
                  <Autocomplete
                    options={filterMerchantDepoList.listData.map((val) => ({
                      id: val.id,
                      name: val.merchant_name,
                    }))}
                    noOptionsText={
                      !filterMerchantDepoList.searchValue
                        ? 'Type to search merchant name'
                        : 'No option'
                    }
                    inputValue={filterMerchantDepoList.searchValue}
                    onInputChange={(_, newInputValue) => {
                      filterMerchantDepoList.handleSearch(newInputValue);
                    }}
                    loading={filterMerchantDepoList.isFetching}
                    getOptionLabel={(item) => item.name}
                    value={merchantQuery.formik.values.jelajah_id}
                    multiple
                    onChange={(e, value) => {
                      merchantQuery.formik.setFieldValue('jelajah_id', value);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="Merchant"
                        placeholder="Select Merchant Name"
                        // error={
                        //   formik.touched.area && Boolean(formik.errors.area)
                        // }
                      />
                    )}
                  />
                </FormLabel>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormLabel text="Type">
                  <Autocomplete
                    options={typeMerchantList.listData}
                    getOptionLabel={(option) =>
                      option.description.replace('Andalan', 'Andalan Titipku')
                    }
                    value={
                      typeMerchantList.listData.find(
                        (val) =>
                          val.id === merchantQuery.formik.values.depo_type_id,
                      ) || null
                    }
                    onChange={(e, value) =>
                      merchantQuery.formik.setFieldValue(
                        'depo_type_id',
                        value?.id,
                      )
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="Type"
                        placeholder="Select Status"
                        // error={
                        //   formik.touched.area && Boolean(formik.errors.area)
                        // }
                      />
                    )}
                  />
                </FormLabel>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormLabel text="Join Date">
                  <Stack direction="row" spacing={1} alignItems="start">
                    <Stack spacing={1} width="100%">
                      <DesktopDatePicker
                        value={
                          merchantQuery.formik.values.start_join_date || null
                        }
                        onChange={(value) => {
                          merchantQuery.formik.setFieldValue(
                            'start_join_date',
                            value,
                          );
                          openDateJoinFilter.toggleModal();
                        }}
                        inputFormat="DD/MM/YYYY"
                        maxDate={merchantQuery.formik.values.end_join_date}
                        open={openDateJoinFilter.open}
                        onOpen={openDateJoinFilter.toggleModal}
                        onClose={openDateJoinFilter.toggleModal}
                        renderInput={(params) => {
                          return (
                            <TextField
                              {...params}
                              name="date"
                              placeholder="Select date"
                              variant="outlined"
                              fullWidth
                              onClick={openDateJoinFilter.toggleModal}
                            />
                          );
                        }}
                      />
                      {merchantQuery.formik.errors.start_join_date && (
                        <Typography color="error.main">
                          {merchantQuery.formik.errors.start_join_date}
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
                          merchantQuery.formik.values.end_join_date || null
                        }
                        onChange={(value) => {
                          merchantQuery.formik.setFieldValue(
                            'end_join_date',
                            value,
                          );
                          openEndDateJoinFilter.toggleModal();
                        }}
                        inputFormat="DD/MM/YYYY"
                        maxDate={moment()}
                        minDate={merchantQuery.formik.values.start_join_date}
                        open={openEndDateJoinFilter.open}
                        onOpen={openEndDateJoinFilter.toggleModal}
                        onClose={openEndDateJoinFilter.toggleModal}
                        renderInput={(params) => {
                          return (
                            <TextField
                              {...params}
                              name="date"
                              placeholder="Select date"
                              variant="outlined"
                              fullWidth
                              onClick={openEndDateJoinFilter.toggleModal}
                            />
                          );
                        }}
                      />
                      {merchantQuery.formik.errors.end_join_date && (
                        <Typography color="error.main">
                          {merchantQuery.formik.errors.end_join_date}
                        </Typography>
                      )}
                    </Stack>
                  </Stack>
                </FormLabel>
              </Grid>
              <Grid item xs={12} md={5}>
                <FormLabel text="Area Name">
                  <Autocomplete
                    options={queryArea.listData.map((val) => ({
                      id: val.id,
                      name: val.title,
                    }))}
                    noOptionsText={
                      !queryArea.searchValue
                        ? 'Type to search area name'
                        : 'No option'
                    }
                    inputValue={queryArea.searchValue}
                    onInputChange={(_, newInputValue) => {
                      queryArea.handleSearch(newInputValue);
                    }}
                    loading={queryArea.isFetching}
                    getOptionLabel={(item) => item.name}
                    value={merchantQuery.formik.values.area_id}
                    onChange={(e, value) => {
                      merchantQuery.formik.setFieldValue('area_id', value);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="Merchant"
                        placeholder="Select Merchant Name"
                        // error={
                        //   formik.touched.area && Boolean(formik.errors.area)
                        // }
                      />
                    )}
                  />
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
                      merchantQuery.formik.resetForm();
                      merchantQuery.handleResetFilter({
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
            data={merchantQuery.listData.map((item) => {
              const tenPecent = (item.limit * 10) / 100;
              const fivePecent = (item.limit * 5) / 100;
              return {
                ...item,
                table_color:
                  item.type === 'Andalan' ||
                  (item.total_gmv === 0 && item.balance === 0)
                    ? '#fff'
                    : tenPecent >= item.balance
                    ? '#F9EBE7'
                    : fivePecent >= item.balance
                    ? '#FFF3CD'
                    : '#fff',
                id: item.jelajah_id,
              };
            })}
            selected={selected}
            setSelected={(e) => {
              setSelected(e);
            }}
            disableNumber
            enableCheckBox
            orderBy={merchantQuery.params.sort_by}
            orderType={merchantQuery.params.sort_type}
            loading={merchantQuery.isLoading}
            page={merchantQuery.data?.page || 0}
            count={merchantQuery.data?.count || 0}
            totalData={merchantQuery.data?.total || 0}
            onChangeSort={(value) => {
              merchantQuery.handleChangeParams({
                ...merchantQuery.params,
                sort_by: value.orderBy,
                sort_type: value.orderType,
              });
              merchantQuery.handleToSetSearchParams(
                'sort_by',
                // @ts-ignore
                value.orderBy || '',
              );
              merchantQuery.handleToSetSearchParams(
                'sort_type',
                value.orderType,
              );
            }}
            onChangePage={(value) => {
              merchantQuery.handleChangeParams({
                ...merchantQuery.params,
                page: value,
              });
              merchantQuery.handleToSetSearchParams('page', value.toString());
            }}
          />
        </Card>
      </Stack>
      <Modal open={modalDelete.open} onClose={modalDelete.closeModal}>
        <DeleteModal
          onClose={modalDelete.closeModal}
          headerText="Delete  Merchant"
          desc={
            <>Are you sure want to delete {selected.length} item Merchant?</>
          }
          onSubmit={() => {
            deleteMerchant.mutate(
              { ids: selected },
              {
                onSuccess: () => {
                  merchantQuery.refetch();
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
