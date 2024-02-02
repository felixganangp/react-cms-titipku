import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Autocomplete,
  Box,
  Button,
  InputAdornment,
  TextField,
} from '@mui/material';
import FormControl from 'components/FormLabel';

type ModalFormMerchantDepoProps = {
  handleClose: (isSubmited?: boolean) => void;
  data: any;
};
export default function ModalFormMerchantDepo({
  handleClose,
  data,
}: ModalFormMerchantDepoProps) {
  const formik = useFormik({
    initialValues: {
      jelajah_id: null,
      amount: null,
      transaction_date: null,
    },
    onSubmit: (values) => {
      const payload = {
        ...values,
        // @ts-ignore
        amount: parseInt(values?.amount || 0, 10),
        // @ts-ignore
        transaction_date: values.transaction_date?.unix(),
      };
      // @ts-ignore
      if (isUpdate) {
        updateQris.mutate(
          // @ts-ignore
          { data: payload, id: data?.id },
          {
            onSuccess: () => {
              handleClose(true);
            },
          },
        );
      } else {
        // @ts-ignore
        createQris.mutate(payload, {
          onSuccess: () => {
            handleClose(true);
          },
        });
      }
    },
    validationSchema: Yup.object().shape({
      amount: Yup.number()
        .nullable()
        .min(1, 'Cant be less than 1')
        .max(2147483647, 'Must be less than or equal to 2147483647')
        .required('This field is required'),
    }),
  });
  return (
    <Box component="form" onSubmit={formik.handleSubmit}>
      <Box p="24px">
        <FormControl text="Merchant Name" required>
          <TextField
            type="text"
            name="amount"
            placeholder="Insert Amount"
            fullWidth
            autoComplete="off"
            disabled
            // value={numberSeperator(formik.values.amount || '')}
          />
        </FormControl>
        <FormControl text="Last Month GMV" required>
          <TextField
            type="text"
            name="amount"
            placeholder="Insert Amount"
            fullWidth
            autoComplete="off"
            disabled
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">Rp</InputAdornment>
              ),
            }}
            // value={numberSeperator(formik.values.amount || '')}
          />
        </FormControl>
        <FormControl text="Last Month Transaction" required>
          <TextField
            type="text"
            name="amount"
            placeholder="Insert Last Month Transaction"
            fullWidth
            autoComplete="off"
            disabled

            // value={numberSeperator(formik.values.amount || '')}
          />
        </FormControl>
      </Box>
    </Box>
  );
}
