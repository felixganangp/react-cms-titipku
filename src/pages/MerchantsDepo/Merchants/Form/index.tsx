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
} from '@mui/material';
import Table from 'components/Table';
import moment from 'moment';
import { useEffect, useState } from 'react';
import useModal from 'hooks/useModal';
import FormLabel from 'components/FormLabel';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { useNavigate, useParams } from 'react-router-dom';
import numberSeperator from 'utils/numberSeperator';
import { useMutation } from '@tanstack/react-query';
import { postMerchant } from 'service/MerchantDepo/Merchant';
import Modal from 'components/Modal';
import { useMerchantList } from '../../hooks/useMerchant';
import ModalFormMerchantDepo from './components/ModalForm';
import {
  UseFilterMerchentListService,
  UseAreaListService,
} from '../../hooks/useConfigMerchant';

export default function MerchantForm() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<(string | number)[]>([]);
  const { id } = useParams();
  const [selectedData, setSelectedData] = useState<{
    id: number;
    last_month_total_trx: number;
    last_month_gmv: number;
    merchant_name: string;
    area_name: string;
  }>();

  const merchantQuery = useMerchantList();
  const areaQuery = UseAreaListService();
  const filterMerchantQuery = UseFilterMerchentListService();

  const showFilter = useModal();
  const modalForm = useModal();

  const { mutate } = useMutation(postMerchant);
  useEffect(() => {
    if (id) {
      modalForm.openModal();
    }
  }, [id]);

  const headCells: HeadCells<any>[] = [
    // {
    //   id: 'rank',
    //   label: 'Rank',
    //   format: (value) => `#${value.rank}`,
    // },
    {
      id: 'Join Date',
      label: 'Join Date',
      format: (value) => moment(value.join_date * 1000).format('DD MMM YYYY'),
    },
    {
      id: 'merchant_name',
      label: 'Merchant Name',
      width: '200px',
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
      id: 'last_month_gmv',
      enableSort: true,
      label: 'Last Month GMV',
      format: (value) => {
        if (!value.last_month_gmv) return <Typography>-</Typography>;
        return (
          <Typography>Rp {numberSeperator(value.last_month_gmv)}</Typography>
        );
      },
    },
    {
      id: 'last_month_total_trx',
      enableSort: true,
      label: 'Last Month Total Transaction',
      format: (value) => {
        if (!value.last_month_total_tx) return <Typography>-</Typography>;
        return (
          <Typography>
            Rp {numberSeperator(value.last_month_total_tx)}
          </Typography>
        );
      },
    },
  ];

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
                <FormLabel text="Pasar">
                  <Autocomplete
                    options={areaQuery.listData.map((val) => ({
                      id: val.id,
                      name: val.title,
                    }))}
                    noOptionsText={
                      !areaQuery.searchValue
                        ? 'Type to search area name'
                        : 'No option'
                    }
                    inputValue={areaQuery.searchValue}
                    onInputChange={(_, newInputValue) => {
                      areaQuery.handleSearch(newInputValue);
                    }}
                    loading={areaQuery.isFetching}
                    getOptionLabel={(item) => item.name}
                    value={
                      areaQuery.listData
                        .map((val) => ({
                          id: val.id,
                          name: val.title,
                        }))
                        .find(
                          (val) =>
                            // @ts-ignore
                            merchantQuery.formik.values.area_id === val.id,
                        ) || null
                    }
                    onChange={(e, value) => {
                      merchantQuery.formik.setFieldValue('area_id', value?.id);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="Area"
                        placeholder="Select Pasar"
                        // error={
                        //   formik.touched.area && Boolean(formik.errors.area)
                        // }
                      />
                    )}
                  />
                </FormLabel>
              </Grid>
              <Grid item xs={12} md={5}>
                <FormLabel text="Merchant Name">
                  <Autocomplete
                    options={filterMerchantQuery.listData.map((val) => ({
                      id: val.id,
                      name: val.merchant_name,
                    }))}
                    noOptionsText={
                      !filterMerchantQuery.searchValue
                        ? 'Type to search merchant name'
                        : 'No option'
                    }
                    inputValue={filterMerchantQuery.searchValue}
                    onInputChange={(_, newInputValue) => {
                      filterMerchantQuery.handleSearch(newInputValue);
                    }}
                    loading={filterMerchantQuery.isFetching}
                    getOptionLabel={(item) => item.name}
                    value={filterMerchantQuery.listData
                      .map((val) => ({
                        id: val.id,
                        name: val.merchant_name,
                      }))
                      .filter((val) =>
                        // @ts-ignore
                        merchantQuery.formik.values.jelajah_id.includes(val.id),
                      )}
                    multiple
                    onChange={(e, value) => {
                      merchantQuery.formik.setFieldValue(
                        'jelajah_id',
                        value.map((val) => val.id),
                      );
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="Merchant"
                        placeholder="Name of Merchant"
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
            data={merchantQuery.listData.map((item) => ({
              ...item,
            }))}
            selected={selected}
            setSelected={(e) => {
              setSelected(e);
            }}
            enableRadio
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
          <Stack direction="row" gap={2}>
            <Button variant="text" color="error" onClick={() => navigate(-1)}>
              Back
            </Button>
            <Button
              sx={{ borderRadius: '4px' }}
              disabled={selected.length === 0}
              // onClick={showFilter.toggleModal}
              onClick={() => {
                modalForm.openModal();
                const curent = merchantQuery.listData.find(
                  (item) => item.id === selected[0],
                );
                if (curent === undefined) return;
                setSelectedData({
                  id: curent.id,
                  area_name: curent.area_name,
                  last_month_total_trx: curent.last_month_total_trx,
                  last_month_gmv: curent.last_month_gmv,
                  merchant_name: curent.merchant_name,
                });
              }}
            >
              Next
            </Button>
          </Stack>
        </Card>
      </Stack>
      <Modal
        open={modalForm.open}
        title="Create Invoice"
        onClose={!id ? modalForm.closeModal : () => navigate(-1)}
      >
        <ModalFormMerchantDepo
          id={id}
          initCreateData={selectedData}
          handleClose={!id ? modalForm.closeModal : () => navigate(-1)}
        />
      </Modal>
    </Box>
  );
}
