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
import {
  useUpdateDisburse,
  useUpdateStatusDisburse,
} from '../../hooks/useDisburse';

export default function ModalConfirmTransfer({
  data,
  type,
  onCLose,
}: {
  data?: DisburseList;
  type: string;
  onCLose: () => void;
}) {
  const updateDisburse = useUpdateDisburse();

  const handleUpdateStatus = useMemo(() => {
    const result = {
      idStatus: 6,
      label: 'Send',
      color: 'primary',
    };
    switch (type) {
      case 'Decline':
        result.idStatus = 3;
        result.label = 'Decline';
        result.color = 'error';
        break;

      default:
        break;
    }

    return result;
  }, [type]);

  return (
    <Box>
      <Box p={4}>
        <Stack spacing={1}>
          <Stack spacing={0.5}>
            <Typography color="primary" fontSize={14}>
              Merchant Name
            </Typography>
            <Typography fontSize={18} fontWeight={500}>
              {data?.merchant_name}
            </Typography>
          </Stack>
          <Stack spacing={0.5}>
            <Typography color="primary" fontSize={14}>
              Transfer to
            </Typography>
            <Typography fontSize={18} fontWeight={500}>
              {data?.account_number}
            </Typography>
          </Stack>
          <Stack spacing={0.5}>
            <Typography color="primary" fontSize={14}>
              Amount Transferred
            </Typography>
            <Typography fontSize={18} fontWeight={500}>
              Rp. {numberSeperator(data?.transfer_amount || 0)}
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
          color={handleUpdateStatus.color}
          sx={{ borderRadius: '2px', width: '100px' }}
          disabled={updateDisburse.isLoading}
          startIcon={updateDisburse.isLoading && <CircularProgress size={20} />}
          onClick={() => {
            updateDisburse.mutate(
              { data: { status: handleUpdateStatus.idStatus }, id: data?.id },
              {
                onSuccess: () => {
                  onCLose();
                },
              },
            );
          }}
        >
          {handleUpdateStatus.label}
        </Button>
      </Box>
    </Box>
  );
}
