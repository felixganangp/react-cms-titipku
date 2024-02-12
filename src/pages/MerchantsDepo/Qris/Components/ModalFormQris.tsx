import { useEffect, useState } from 'react';
import numberSeperator from 'utils/numberSeperator';
import {
  Autocomplete,
  Box,
  Button,
  InputAdornment,
  TextField,
} from '@mui/material';
import FormControl from 'components/FormLabel';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import useModal from 'hooks/useModal';
import moment from 'moment';
import { QrisForm } from 'models/merchantDepo/Qris';

import { UseFilterMerchentDepoListService } from '../../hooks/useConfigMerchant';
import { usePostQrisService, useUpdateQrisService } from '../../hooks/useQris';

type ModalFormQrisProps = {
  handleClose: (isSubmited?: boolean) => void;
  data?: QrisForm & { id: number; merchant_name: string };
};

export default function ModalFormQris({
  handleClose,
  data,
}: ModalFormQrisProps) {
  const [stepSaveSearch, setStepSaveSearch] = useState({
    merchantList: 0,
  });
  const isUpdate = Boolean(data);
  const filterMerchantDepoList = UseFilterMerchentDepoListService({
    count: 20,
  });
  const openDatePicker = useModal();
  const createQris = usePostQrisService();
  const updateQris = useUpdateQrisService();

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
      transaction_date: Yup.mixed().required('This field is required'),
      jelajah_id: Yup.mixed().required('This field is required'),
    }),
  });

  useEffect(() => {
    if (data) {
      formik.setValues({
        // @ts-ignore
        jelajah_id: { id: data.jelajah_id, name: data.merchant_name },
        // @ts-ignore
        amount: data.amount,
        // @ts-ignore
        transaction_date: moment.unix(data.transaction_date),
      });
    }
  }, [data]);
  return (
    <Box component="form" onSubmit={formik.handleSubmit}>
      <Box p="24px">
        <FormControl
          text="Merchant Name"
          required
          error={formik.touched.jelajah_id && Boolean(formik.errors.jelajah_id)}
          helperText={
            formik.touched.jelajah_id &&
            formik.errors.jelajah_id &&
            `${formik.errors.jelajah_id}`
          }
        >
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
              if (stepSaveSearch.merchantList === 0) {
                filterMerchantDepoList.setSearchValue(newInputValue);
                setStepSaveSearch({ ...stepSaveSearch, merchantList: 1 });
              } else {
                filterMerchantDepoList.handleSearch(newInputValue);
              }
            }}
            loading={filterMerchantDepoList.isFetching}
            getOptionLabel={(item) => item.name}
            value={formik.values.jelajah_id}
            onChange={(e, value) => {
              formik.setFieldValue('jelajah_id', value?.id);
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
        </FormControl>
        <FormControl
          text="Value"
          required
          error={formik.touched.amount && Boolean(formik.errors.amount)}
          helperText={
            formik.touched.amount &&
            formik.errors.amount &&
            `${formik.errors.amount}`
          }
        >
          <TextField
            type="text"
            name="amount"
            placeholder="Insert Amount"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">Rp</InputAdornment>
              ),
            }}
            fullWidth
            autoComplete="off"
            value={numberSeperator(formik.values.amount || '')}
            onChange={(e) => {
              const value = e.target.value
                .replace(/[^0-9.]/g, '')
                .replace(/(\..*?)\..*/g, '$1');

              formik.setFieldValue('amount', value);
            }}
            onBlur={formik.handleBlur}
          />
        </FormControl>
        <FormControl
          text="Transaction Date"
          required
          error={
            formik.touched.transaction_date &&
            Boolean(formik.errors.transaction_date)
          }
          helperText={
            formik.touched.transaction_date &&
            formik.errors.transaction_date &&
            `${formik.errors.transaction_date}`
          }
        >
          <DesktopDatePicker
            value={formik.values.transaction_date || null}
            onChange={(value) => {
              formik.setFieldValue('transaction_date', value);
              openDatePicker.toggleModal();
            }}
            inputFormat="DD/MM/YYYY"
            maxDate={moment()}
            open={openDatePicker.open}
            onOpen={openDatePicker.toggleModal}
            onClose={openDatePicker.toggleModal}
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  name="grade"
                  placeholder="Select Grade"
                  variant="outlined"
                  fullWidth
                  onClick={openDatePicker.toggleModal}
                />
              );
            }}
          />
        </FormControl>
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
          variant="text"
          color="error"
          sx={{ borderRadius: '5px' }}
          onClick={() => {
            handleClose(false);
            formik.resetForm();
          }}
        >
          Cancel
        </Button>
        <Button
          sx={{ borderRadius: '5px' }}
          type="submit"
          color="primary"
          disabled={
            !formik.isValid || createQris.isLoading || updateQris.isLoading
          }
        >
          {isUpdate ? 'Update' : 'Submit'}
        </Button>
      </Box>
    </Box>
  );
}
