import React from 'react';
import styled from '@emotion/styled';
import {
  Card,
  Box,
  Grid,
  Button,
  TextField,
  Typography,
  InputAdornment,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { skuManagementAction } from 'store/slice/SkuManagement';
import useModal from 'hooks/useModal';
import Table from 'components/Table';
import Modal from 'components/Modal';

import { Image } from './SkuManagement.styled';
import FormSku from './components/form';

// type Props = {};

export default function SkuManagement() {
  // {}: Props
  // const dispatch = useAppDispatch();
  const skus = useAppSelector((state: any) => state.skuManagement.data);
  // React.useEffect(() => {
  //   dispatch(skuManagementAction.fetchData());
  // }, []);
  const formModal = useModal();

  const headCell = [
    {
      id: 'image',
      label: 'Image',
      align: 'center',
      format: (val: any) => (
        <div
          aria-hidden="true"
          style={{
            cursor: 'pointer',
            height: '100%',
            position: 'relative',
          }}
        >
          <Image src={val.image} alt={val.sku_name} />
        </div>
      ),
    },
    {
      id: 'sku_name',
      label: 'SKU Name',
      align: 'center',
    },
    {
      id: 'origin',
      label: 'Origin',
      align: 'center',
    },
    {
      id: 'weight',
      label: 'Weight Per Pcs (Gram)',
      align: 'center',
    },
    {
      id: 'available_stock',
      label: 'Available Stock',
      align: 'center',
    },
    {
      id: 'last_supply_date',
      label: 'Last Supply Date',
      align: 'center',
    },
    {
      id: 'action',
      label: 'Action',
      align: 'center',
    },
  ];
  return (
    <Box p="20px" bgcolor="#F5F7FA">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <Typography variant="titlePage">SKU</Typography>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <Box display="flex" gap="20px" flexWrap="wrap">
              <Button startIcon={<AddIcon />} onClick={formModal.openModal}>
                Add New
              </Button>
              <TextField
                placeholder="Search for SKU name"
                size="small"
                sx={{ bgcolor: '#ebeff3', maxWidth: '560px' }}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Box
            bgcolor="#fff"
            p="7px"
            borderRadius="5px"
            boxShadow="0 3px 10px 0 rgba(0, 0, 0, 0.1)"
          >
            <Table
              data={skus}
              selected={[]}
              headCells={headCell}
              page={1}
              totalData={10}
              onChangePage={(e) => console.log(e)}
              // loading
              enableCheckBox
            />
          </Box>
        </Grid>
      </Grid>
      <Modal
        open={formModal.open}
        title="Input New SKU"
        onClose={formModal.closeModal}
      >
        <FormSku onClose={formModal.closeModal} />
      </Modal>
    </Box>
  );
}
