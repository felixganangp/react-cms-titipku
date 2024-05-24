import { useEffect } from 'react';
import { Search } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  InputAdornment,
  Modal,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Table from 'components/Table';
import useCustomer from '../hooks/useCustomer';

const childModalStyle = {
  position: 'absolute',
  top: '48%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'fit-content',
};

type Props = {
  open: boolean;
  onClose: () => void;
  setSelected: (value: any) => void;
  status?: number | null;
};
export default function SelectCustomer({
  open,
  onClose,
  setSelected,
  status,
}: Props) {
  const queryCostomer = useCustomer({ status });

  useEffect(() => {
    if (!open) {
      queryCostomer.handleSearch('');
    }
  }, [open]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ ...childModalStyle }}>
        <Card
          sx={{ p: 2, maxHeight: '600px', minWidth: 550, overflow: 'auto' }}
        >
          <Stack spacing={2}>
            <Typography>Select Customer</Typography>
            <TextField
              placeholder="Search Customer"
              fullWidth
              value={queryCostomer.searchValue}
              onChange={(e) => {
                queryCostomer.handleSearch(e.target.value);
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
            <Table
              headCells={[
                {
                  id: 'user_number',
                  label: 'User Number',
                },
                {
                  id: 'merchant_name',
                  label: 'Merchant Name',
                },
                {
                  id: 'debtor_name',
                  label: 'Debtor Name',
                },
                {
                  id: 'phone_number',
                  label: 'Phone Number',
                },
                {
                  id: 'area_name',
                  label: 'Area',
                },
                {
                  id: 'Action',
                  label: 'Choose',
                  format: (value: any) => {
                    return (
                      <Button
                        size="small"
                        onClick={() => {
                          setSelected(value);
                          onClose();
                        }}
                      >
                        Choose
                      </Button>
                    );
                  },
                },
              ]}
              data={queryCostomer.listData}
              loading={queryCostomer.isLoading}
              page={queryCostomer.data?.page || 0}
              count={queryCostomer.data?.count || 0}
              totalData={queryCostomer.data?.total || 0}
              onChangePage={(value) => {
                queryCostomer.handleChangeParams({
                  ...queryCostomer.params,
                  page: value,
                });
              }}
            />
          </Stack>
        </Card>
      </Box>
    </Modal>
  );
}
