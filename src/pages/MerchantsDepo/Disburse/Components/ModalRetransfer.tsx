import { useMemo } from 'react';
import {
  Box,
  Typography,
  Stack,
  Button,
  CircularProgress,
} from '@mui/material';
import numberSeperator from 'utils/numberSeperator';
import { DisburseList } from 'models/merchantDepo/disburse';
// eslint-disable-next-line import/no-cycle
import { useDisburseDetails, useUpdateDisburse } from '../../hooks/useDisburse';

export default function ModalRetransfer({
  onCLose,
  id,
  selectedData,
}: {
  onCLose: () => void;
  id: number | string | null;
  selectedData?: DisburseList;
}) {
  const updateDisburse = useUpdateDisburse();
  // @ts-ignore
  const { details } = useDisburseDetails(id);

  return (
    <Box>
      <Box p={4}>
        <Stack spacing={1}>
          <Stack spacing={0.5}>
            <Typography color="primary" fontSize={14}>
              Merchant Name
            </Typography>
            <Typography fontSize={18} fontWeight={500}>
              {selectedData?.merchant_name}
            </Typography>
          </Stack>
          <Stack spacing={0.5}>
            <Typography color="primary" fontSize={14}>
              Transfer to
            </Typography>
            <Typography fontSize={18} fontWeight={500}>
              {details?.bank_account_name} - {details?.bank_name} ={' '}
              {details?.bank_account_number}
            </Typography>
          </Stack>
          <Stack spacing={0.5}>
            <Typography color="primary" fontSize={14}>
              Amount Transferred
            </Typography>
            <Typography fontSize={18} fontWeight={500}>
              Rp. {numberSeperator(selectedData?.transfer_amount || 0)}
            </Typography>
          </Stack>
          <Stack
            border="solid 1px #e4e4e4"
            p="10px 20px"
            borderRadius="5px"
            bgcolor="#f9ebe7"
            spacing={0.1}
            mt={1.5}
          >
            <Typography fontSize="14" fontWeight="500" color="error.main">
              Error Info
            </Typography>
            <Typography fontSize="14">
              <b>Reason :</b> {details?.failure_message}
            </Typography>
          </Stack>
        </Stack>
      </Box>
      <Box
        display="flex"
        gap="10px"
        justifyContent="end"
        // mt="50px"
        sx={{
          padding: '24px',
          boxShadow: '3px 0px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Button
          sx={{ borderRadius: '2px', width: '100px' }}
          variant="text"
          color="error"
          onClick={() => {
            onCLose();
          }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          // @ts-ignore
          color="primary"
          sx={{ borderRadius: '2px', width: '100px' }}
          disabled={updateDisburse.isLoading}
          startIcon={updateDisburse.isLoading && <CircularProgress size={20} />}
          onClick={() => {
            updateDisburse.mutate(
              { data: { status: 6 }, id: selectedData?.id },
              {
                onSuccess: () => {
                  onCLose();
                },
              },
            );
          }}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
}
