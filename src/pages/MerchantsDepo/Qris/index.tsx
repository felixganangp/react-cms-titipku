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
import ModalComp from 'components/Modal';
import numberSeperator from 'utils/numberSeperator';
import { useNavigate } from 'react-router-dom';
import DeleteModal from 'components/Delete/freetext';
import { QrisList } from 'models/merchantDepo/Qris';
import { useDeleteQris, useQrisList } from '../hooks/useQris';
import { UseFilterMerchentDepoListService } from '../hooks/useConfigMerchant';
import ModalFormQris from './Components/ModalFormQris';

export default function MerchantsQrisPages() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<(string | number)[]>([]);
  const [editSelected, setEditSelected] = useState<
    (QrisList & { id: number; merchant_name: string }) | undefined
  >(undefined);

  const qrisQuery = useQrisList();
  const filterMerchantDepoList = UseFilterMerchentDepoListService();
  const deleteQris = useDeleteQris();

  const showFilter = useModal();
  const modalDelete = useModal();
  const modalForm = useModal();
  const startDateOpen = useModal();
  const endDateOpen = useModal();

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
      label: 'Amount',
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
              onClick: () => {
                setEditSelected(value);
                modalForm.toggleModal();
              },
            },
            {
              label: 'Delete',
              onClick: () => {
                setSelected([value.id]);
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
                onClick={() => modalForm.toggleModal()}
              >
                Add New
              </Button>
              <TextField
                placeholder="Search Item"
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
                    value={qrisQuery.formik.values.jelajah_id}
                    multiple
                    onChange={(e, value) => {
                      qrisQuery.formik.setFieldValue('jelajah_id', value);
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
                <FormLabel text="Date">
                  <Stack direction="row" spacing={1} alignItems="start">
                    <Stack spacing={1} width="100%">
                      <DesktopDatePicker
                        value={qrisQuery.formik.values.start_date || null}
                        inputFormat="DD/MM/YYYY"
                        onChange={(value) => {
                          qrisQuery.formik.setFieldValue('start_date', value);
                          startDateOpen.toggleModal();
                        }}
                        open={startDateOpen.open}
                        onOpen={startDateOpen.toggleModal}
                        onClose={startDateOpen.toggleModal}
                        maxDate={qrisQuery.formik.values.end_date}
                        renderInput={(params) => {
                          return (
                            <TextField
                              {...params}
                              name="grade"
                              placeholder="Select Grade"
                              variant="outlined"
                              fullWidth
                              onClick={startDateOpen.toggleModal}
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
                          endDateOpen.toggleModal();
                        }}
                        minDate={qrisQuery.formik.values.start_date}
                        maxDate={moment()}
                        open={endDateOpen.open}
                        onOpen={endDateOpen.toggleModal}
                        onClose={endDateOpen.toggleModal}
                        renderInput={(params) => {
                          return (
                            <TextField
                              {...params}
                              name="grade"
                              placeholder="Select Grade"
                              variant="outlined"
                              fullWidth
                              onClick={endDateOpen.toggleModal}
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
                      qrisQuery.formik.resetForm();
                      qrisQuery.handleResetFilter({
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
            data={qrisQuery.listData}
            selected={selected}
            setSelected={(e) => {
              setSelected(e);
            }}
            disableNumber
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
        title={!editSelected ? 'Add New QRIS' : 'Edit QRIS'}
        onClose={() => {
          modalForm.closeModal();
          setEditSelected(undefined);
        }}
      >
        <ModalFormQris
          data={editSelected}
          handleClose={(isSubmited) => {
            if (isSubmited) {
              qrisQuery.refetch();
            }
            setEditSelected(undefined);
            modalForm.closeModal();
          }}
        />
      </ModalComp>
    </Box>
  );
}
