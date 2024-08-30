/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import MenuList from 'components/MenuList';
import { HeadCells } from 'components/Table/types';
import {
  Add,
  CalendarMonth,
  CalendarMonthSharp,
  Event,
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
import DateRangePicker from 'components/DateRangePicker';
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
      id: 'nearest_due_date',
      label: 'Nearest Due Date',
      align: 'left',
      width: '100px',
      format: (val) => (
        <div>
          {val.nearest_due_date
            ? moment(val.nearest_due_date * 1000).format('DD MMM YYYY')
            : '-'}
        </div>
      ),
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
                    options={filterMerchantDepoList.listData
                      .map((val) => ({
                        id: val.id,
                        name: val.merchant_name,
                      }))
                      .filter(
                        (val) =>
                          !merchantQuery.formik.values.jelajah_id
                            // @ts-ignore
                            ?.map((i) => i.id)
                            ?.includes(val.id),
                      )}
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
                    multiple
                    value={
                      typeMerchantList.listData.filter((val) =>
                        merchantQuery.formik.values.depo_type_id?.includes(
                          // @ts-ignore
                          val.id,
                        ),
                      ) || null
                    }
                    onChange={(e, value) =>
                      merchantQuery.formik.setFieldValue(
                        'depo_type_id',
                        value.map((val) => val.id),
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
                  <DateRangePicker
                    endSelectDate={moment()}
                    date={[
                      // @ts-check
                      merchantQuery.formik.values.start_join_date,
                      // @ts-check
                      merchantQuery.formik.values.end_join_date,
                    ]}
                    onChange={(value) => {
                      merchantQuery.formik.setFieldValue(
                        'start_join_date',
                        value[0],
                      );
                      merchantQuery.formik.setFieldValue(
                        'end_join_date',
                        value[1],
                      );
                    }}
                  />
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
              <Grid item xs={12} md={3}>
                <FormLabel text="Condition">
                  <Autocomplete
                    options={['New', '100%', 'Less than 10%', 'Less than 5%']}
                    value={merchantQuery.formik.values.condition}
                    isOptionEqualToValue={(option, value) => option === value}
                    onChange={(e, value) =>
                      merchantQuery.formik.setFieldValue('condition', value)
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="Condition"
                        placeholder="Select condition"
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

              const isdueDate =
                moment(item.nearest_due_date * 1000).isBetween(
                  moment(),
                  moment().add(1, 'weeks'),
                ) || moment(item.nearest_due_date * 1000).isBefore(moment());
              return {
                ...item,
                table_color:
                  item.type === 'Andalan' ||
                  (item.total_gmv === 0 && item.balance === 0)
                    ? '#fff'
                    : item.balance <= fivePecent || isdueDate
                    ? '#F9EBE7'
                    : item.balance <= tenPecent
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
