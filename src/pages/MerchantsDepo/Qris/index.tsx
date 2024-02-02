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
import { useState } from 'react';
import useModal from 'hooks/useModal';
import FormLabel from 'components/FormLabel';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import ModalComp from 'components/Modal';
import numberSeperator from 'utils/numberSeperator';
import { useNavigate } from 'react-router-dom';
import DeleteModal from 'components/Delete/freetext';
import { QrisList } from 'models/MerchantDepo/Qris';
import { useDeleteQris, useQrisList } from '../Hooks/useQris';
import { UseFilterMerchentDepoListService } from '../Hooks/useConfigMerchant';
import ModalFormQris from './Components/ModalFormQris';

export default function MerchantsQrisPages() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<(string | number)[]>([]);

  const qrisQuery = useQrisList();
  const filterMerchantDepoList = UseFilterMerchentDepoListService();
  const deleteQris = useDeleteQris();

  const showFilter = useModal();
  const modalDelete = useModal();
  const modalForm = useModal();

  const headCells: HeadCells<QrisList>[] = [
    {
      id: 'Date',
      label: 'Date',
      format: (value) =>
        moment(value.transaction_date * 1000).format('DD MMM YYYY'),
    },
    {
      id: 'merchant_name',
      label: 'Merchant Name',
    },
    {
      id: 'Amount',
      label: 'Limit',
      format: (value) => `Rp ${numberSeperator(value.amount)}`,
    },
    {
      id: 'Action',
      label: 'Action',
      format: (value) => (
        <MenuList
          menu={[
            {
              label: 'Edit',
              onClick: () => {},
            },
            {
              label: 'Delete',
              onClick: () => {
                setSelected([value.id]);
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
                onClick={() => modalForm.toggleModal()}
              >
                Add New
              </Button>
              <TextField
                placeholder="Search for Invoice Number"
                size="small"
                sx={{ bgcolor: '#ebeff3', maxWidth: '560px', flex: 1 }}
                fullWidth
                value={qrisQuery.searchValue}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                onChange={(event) => {
                  qrisQuery.handleSearch(event.target.value);
                  qrisQuery.handleToSetSearchParams(
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
              onSubmit={qrisQuery.formik.handleSubmit}
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
                    value={filterMerchantDepoList.listData
                      .map((val) => ({
                        id: val.id,
                        name: val.merchant_name,
                      }))
                      .filter((val) =>
                        // @ts-ignore
                        qrisQuery.formik.values.jelajah_id.includes(val.id),
                      )}
                    multiple
                    onChange={(e, value) => {
                      qrisQuery.formik.setFieldValue(
                        'jelajah_id',
                        value.map((val) => val.id),
                      );
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
              <Grid item xs={12} md={4}>
                <FormLabel text="Join Date">
                  <Stack direction="row" spacing={1} alignItems="start">
                    <Stack spacing={1} width="100%">
                      <DesktopDatePicker
                        value={qrisQuery.formik.values.start_date || null}
                        inputFormat="DD/MM/YYYY"
                        onChange={(value) => {
                          qrisQuery.formik.setFieldValue('start_date', value);
                        }}
                        maxDate={qrisQuery.formik.values.end_date}
                        // maxDate={formik.values.max_date_created}
                        renderInput={(params) => {
                          return (
                            <TextField
                              {...params}
                              name="grade"
                              placeholder="Select Grade"
                              variant="outlined"
                              fullWidth
                            />
                          );
                        }}
                      />
                      {qrisQuery.formik.errors.start_date && (
                        <Typography color="error.main">
                          {qrisQuery.formik.errors.start_date}
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
                        value={qrisQuery.formik.values.end_date || null}
                        inputFormat="DD/MM/YYYY"
                        onChange={(value) => {
                          qrisQuery.formik.setFieldValue('end_date', value);
                        }}
                        minDate={qrisQuery.formik.values.start_date}
                        // maxDate={formik.values.max_date_created}
                        renderInput={(params) => {
                          return (
                            <TextField
                              {...params}
                              name="grade"
                              placeholder="Select Grade"
                              variant="outlined"
                              fullWidth
                            />
                          );
                        }}
                      />
                      {qrisQuery.formik.errors.end_date && (
                        <Typography color="error.main">
                          {qrisQuery.formik.errors.end_date}
                        </Typography>
                      )}
                    </Stack>
                  </Stack>
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
                      // qrisQuery.formik.resetForm();
                      // qrisQuery.handleResetFilter({
                      //   whiteList: ['search'],
                      // });
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
            data={qrisQuery.listData}
            selected={selected}
            setSelected={(e) => {
              setSelected(e);
            }}
            enableCheckBox
            orderBy={qrisQuery.params.order_by}
            orderType={qrisQuery.params.order_type}
            loading={qrisQuery.isLoading}
            page={qrisQuery.data?.page || 0}
            count={qrisQuery.data?.count || 0}
            totalData={qrisQuery.data?.total || 0}
            onChangePage={(value) => {
              qrisQuery.handleChangeParams({
                ...qrisQuery.params,
                page: value,
              });
              qrisQuery.handleToSetSearchParams('page', value.toString());
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
            deleteQris.mutate(
              { ids: selected },
              {
                onSuccess: () => {
                  qrisQuery.refetch();
                  modalDelete.closeModal();
                },
              },
            );
          }}
        />
      </Modal>
      <ModalComp
        open={modalForm.open}
        title="Create Qris"
        onClose={modalForm.closeModal}
      >
        <ModalFormQris />
      </ModalComp>
    </Box>
  );
}
