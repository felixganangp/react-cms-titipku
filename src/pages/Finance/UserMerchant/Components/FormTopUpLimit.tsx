/* eslint-disable radix */
import {
  Box,
  InputAdornment,
  Tab,
  Tabs,
  TextField,
  Autocomplete,
  Stack,
  Button,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import FormControl from 'components/FormLabel';
import numberSeperator from 'utils/numberSeperator';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import moment from 'moment';
import useModal from 'hooks/useModal';
import InputImage from 'components/InputImage';
import UseParams from 'hooks/useParams';
import bankData from 'data/list-bank.json';
import { useQuery } from '@tanstack/react-query';
import {
  getAllAreaFinancing,
  getAllCategoryFinancing,
} from 'service/Finance/config';
import * as yup from 'yup';
import { SteperHeader } from '../../Customer/Components/SteperHeader';
import useUserMerchant from '../hooks/useUserMerchant';
import { Type } from '../../hooks/constumer.config';

export default function FormTopUpLimit({
  id,
  handleClose,
  openModal,
}: {
  id?: string | number;
  handleClose: (isSubmited: boolean) => void;
  openModal?: boolean;
}) {
  const formik = useUserMerchant({
    id,
    handleClose,
    new_status: 6, // 6 for verify user,
    costumValidation: yup.object().shape({
      user_data: yup.object().shape({
        limit_plafon: yup
          .number()
          .nullable()
          .required('Limit plafon is required')
          .max(2147483647, 'Must be less than or equal to 2147483647')
          .min(1, 'Limit plafon must be greater than 0'),
        limit_cash: yup
          .number()
          .nullable()
          .required('Limit cash is required')
          .max(2147483647, 'Must be less than or equal to 2147483647')
          .min(1, 'Limit cash must be greater than 0'),
      }),
    }),
    config: {
      sendDocument: true,
    },
  });

  useEffect(() => {
    if (!openModal) {
      formik.resetForm();
    }
  }, [openModal]);
  return (
    <Box p="24px">
      <div id="top" />
      <Box mt={2} />
      <FormControl
        text="Limit plafon"
        required
        error={
          formik.touched.user_data?.limit_plafon &&
          Boolean(formik.errors.user_data?.limit_plafon)
        }
        helperText={
          formik.touched.user_data?.limit_plafon
            ? formik.errors.user_data?.limit_plafon
            : ''
        }
      >
        <TextField
          fullWidth
          placeholder="Input limit plafon"
          name="user_data.limit_plafon"
          onBlur={formik.handleBlur}
          onKeyDown={(evt) =>
            ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault()
          }
          error={
            formik.touched.user_data?.limit_plafon &&
            Boolean(formik.errors.user_data?.limit_plafon)
          }
          value={numberSeperator(formik.values.user_data?.limit_plafon || '')}
          onChange={(e) => {
            const value = e.target.value
              // @ts-ignore
              .replaceAll('.', '')
              .replace(/[^0-9.]/g, '')
              .replace(/(\..*?)\..*/g, '$1');

            formik.setFieldValue(
              'user_data.limit_plafon',
              parseInt(value || '0'),
            );
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">Rp</InputAdornment>
            ),
          }}
        />
      </FormControl>
      <FormControl
        text="Limit cash"
        required
        error={
          formik.touched.user_data?.limit_cash &&
          Boolean(formik.errors.user_data?.limit_cash)
        }
        helperText={
          formik.touched.user_data?.limit_cash
            ? formik.errors.user_data?.limit_cash
            : ''
        }
      >
        <TextField
          fullWidth
          placeholder="Input cash"
          name="user_data.limit_cash"
          onBlur={formik.handleBlur}
          value={numberSeperator(formik.values.user_data?.limit_cash || '')}
          onChange={(e) => {
            const value = e.target.value
              // @ts-ignore
              .replaceAll('.', '')
              .replace(/[^0-9.]/g, '')
              .replace(/(\..*?)\..*/g, '$1');

            formik.setFieldValue(
              'user_data.limit_cash',
              parseInt(value || '0'),
            );
          }}
          onKeyDown={(evt) =>
            ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault()
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">Rp</InputAdornment>
            ),
          }}
        />
      </FormControl>
      <FormControl
        text="Provision Installment Period"
        required
        error={
          // @ts-ignore
          formik.touched.user_data?.provision_installment_period &&
          // @ts-ignore
          Boolean(formik.errors.user_data?.provision_installment_period)
        }
        helperText={
          // @ts-ignore
          formik.touched.user_data?.provision_installment_period
            ? // @ts-ignore
              formik.errors.user_data?.provision_installment_period
            : ''
        }
      >
        <TextField
          fullWidth
          placeholder="Input provision installment period"
          name="user_data.provision_installment_period"
          onBlur={formik.handleBlur}
          onKeyDown={(evt) =>
            ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault()
          }
          error={
            // @ts-ignore
            formik.touched.user_data?.provision_installment_period &&
            // @ts-ignore
            Boolean(formik.errors.user_data?.provision_installment_period)
          }
          value={numberSeperator(
            // @ts-ignore
            formik.values.user_data?.provision_installment_period || '',
          )}
          onChange={(e) => {
            const value = e.target.value
              // @ts-ignore
              .replaceAll('.', '')
              .replace(/[^0-9.]/g, '')
              .replace(/(\..*?)\..*/g, '$1');

            formik.setFieldValue(
              'user_data.provision_installment_period',
              parseInt(value || '0'),
            );
          }}
        />
      </FormControl>
      <Stack direction="row" justifyContent="end" spacing={1}>
        <Button
          variant="text"
          color="error"
          onClick={() => {
            handleClose(false);
          }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          color="primary"
          disabled={!formik.isValid}
          onClick={() => {
            formik.handleSubmit();
          }}
        >
          Submit
        </Button>
      </Stack>
    </Box>
  );
}
