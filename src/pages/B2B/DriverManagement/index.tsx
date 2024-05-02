import React, { useState, useEffect, useCallback } from 'react';
import {
  Grid,
  Typography,
  Box,
  TextField,
  InputAdornment,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Collapse,
  Modal,
  Autocomplete,
  Skeleton,
  Stack,
} from '@mui/material';
import Table from 'components/Table';
import { Add, MoreVert, Search } from '@mui/icons-material';
import YellowToast from 'components/YellowToast';
import MenuList from 'components/MenuList';
import DeleteModal from 'components/Delete/freetext';
import ModalComp from 'components/Modal';
import useModal from 'hooks/useModal';
import useToast from 'hooks/useToast';
import useGetDriver, { useDeleteDriver } from './hooks/useDriver';
import FormDriver from './components/Form';

export default function DriverManagement() {
  const driver = useGetDriver();
  const deleteDriver = useDeleteDriver();
  const [selected, setSelected] = useState<any>(null);
  const deleteModal = useModal();
  const formModal = useModal();
  const { openToast } = useToast();

  const headCell = [
    {
      id: 'name',
      label: 'Name',
      align: 'left',
      width: '27%',
    },
    {
      id: 'gender',
      label: 'Gender',
      align: 'left',
      width: '27%',
    },
    {
      id: 'phone_number',
      label: 'Phone Number',
      align: 'left',
      width: '27%',
      format: (val: any) => {
        if (val.phone_number && val.phone_number.startsWith('0')) {
          return <p>+62{val.phone_number.slice(1)}</p>;
        }
        return <p>+62{val.phone_number}</p>;
      },
    },
    {
      id: 'menu',
      label: '',
      align: 'left',
      format: (val: any) => (
        <>
          <MenuList
            menu={[
              {
                label: 'Edit',
                onClick: () => {
                  formModal.openModal();
                  setSelected(val);
                },
              },
              {
                label: 'Delete',
                disabled: val.product_count > 0,
                onClick: () => {
                  deleteModal.openModal();
                  setSelected(val);
                },
              },
            ]}
          >
            <IconButton>
              <MoreVert />
            </IconButton>
          </MenuList>
        </>
      ),
    },
  ];
  return (
    <Box p="20px" bgcolor="#f8f8f8">
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography fontSize="26px" fontWeight="600" fontFamily="Montserrat">
          Driver Management
        </Typography>
      </Stack>
      <Box mt={2} bgcolor="#fff" border="1px solid #EBEFF3">
        <Stack direction="row" gap={1} p={2}>
          <Button
            startIcon={<Add />}
            onClick={formModal.openModal}
            size="large"
          >
            Add Driver
          </Button>
          <TextField
            placeholder="Search Item"
            size="small"
            sx={{ flex: 1, bgcolor: '#f8f8f8', maxWidth: '560px' }}
            fullWidth
            value={driver.searchValue}
            // value={product.displayFilter.search}
            onChange={(e) => driver.handleSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Stack>
        <YellowToast />
        <Box p={2}>
          <Table
            data={driver.listData}
            headCells={headCell}
            loading={driver.isLoading}
            totalData={driver.data?.total}
            count={driver.params.count}
            page={driver.params.page}
            onChangePage={(page) =>
              driver.handleChangeParams({
                page,
              })
            }
            onChangeRowPerpage={(page) =>
              driver.handleChangeParams({
                count: page,
                page: 1,
              })
            }
          />
        </Box>
      </Box>
      <Modal open={deleteModal.open} onClose={deleteModal.closeModal}>
        <DeleteModal
          onClose={deleteModal.closeModal}
          headerText={`Delete Driver ${selected?.name}?`}
          desc={<>Are you sure want to delete this Driver?</>}
          onSubmit={() => {
            deleteDriver.mutate(selected.id, {
              onSuccess: () => {
                openToast({
                  severity: 'success',
                  headMsg: 'Success delete drive',
                });
                driver.refetch();
                deleteModal.closeModal();
              },
              onError: (err) => {
                openToast({
                  severity: 'error',
                  headMsg: 'Failed delete drive',
                });
              },
            });
          }}
        />
      </Modal>
      <ModalComp
        open={formModal.open}
        title={selected?.id ? 'Edit Driver' : 'Add Driver'}
        onClose={() => {
          formModal.closeModal();
          setSelected(null);
        }}
      >
        <FormDriver
          selected={selected}
          onClose={(isSubmitted) => {
            if (isSubmitted) {
              driver.refetch();
            }
            formModal.closeModal();
            setSelected(null);
          }}
        />
      </ModalComp>
    </Box>
  );
}
