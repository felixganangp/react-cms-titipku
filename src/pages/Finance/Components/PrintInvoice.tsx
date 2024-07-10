import FormControl from 'components/FormLabel';
import { Box, Button, CircularProgress, TextField } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import useToast from 'hooks/useToast';
import { base64toOpen } from 'utils/base64toDownload';
import useModal from 'hooks/useModal';
import { UseGetInvoicePDFCustomeDate } from '../hooks/useInvoiceService';

type PrintPros = {
  onClose: (isSubmited: boolean) => void;
  idSelected: any;
  name: string;
  type: 'invoice' | 'user';
};
export default function PrintInvoice(props: PrintPros) {
  const { openToast } = useToast();
  const [date, setDate] = useState(null);
  const openDateSelect = useModal();
  const { mutate, isLoading } = UseGetInvoicePDFCustomeDate();

  const handlePrint = () => {
    mutate(
      {
        id: props.idSelected,
        type: props.type,
        params: {
          // @ts-ignore
          date: date?.unix() || undefined,
        },
      },
      {
        onSuccess: (data) => {
          // setLoading(false);
          openToast({
            headMsg: 'Success to generate PDF',
            severity: 'success',
          });
          base64toOpen(data.data, `${props.name}.pdf`);
          setDate(null);
          props?.onClose(true);
        },
        onError: (error) => {
          openToast({
            headMsg: 'Failed to generate PDF',
            severity: 'error',
          });
          // setLoading(false);
        },
      },
    );
  };
  return (
    <Box>
      <Box p="24px">
        <FormControl text="Loan Amount" required>
          <DesktopDatePicker
            value={date}
            inputFormat="MMM DD, YYYY"
            onChange={(value) => {
              setDate(value);
              openDateSelect.toggleModal();
            }}
            open={openDateSelect.open}
            onOpen={openDateSelect.toggleModal}
            onClose={openDateSelect.toggleModal}
            disableFuture
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  name="grade"
                  placeholder="Select Grade"
                  variant="outlined"
                  fullWidth
                  autoComplete="off"
                  onClick={openDateSelect.toggleModal}
                />
              );
            }}
          />
        </FormControl>
      </Box>
      <Box
        width="100%"
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
          variant="text"
          color="error"
          onClick={() => props.onClose(false)}
        >
          Cancel
        </Button>
        <Button
          color="primary"
          onClick={handlePrint}
          disabled={isLoading}
          startIcon={isLoading ? <CircularProgress size={20} /> : null}
        >
          Print
        </Button>
      </Box>
    </Box>
  );
}
