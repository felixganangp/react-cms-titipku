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
import InputFile from 'components/InputFile';
import { SteperHeader } from '../../Customer/Components/SteperHeader';
import useUserMerchant from '../hooks/useUserMerchant';
import { Type } from '../../hooks/constumer.config';

const fileSize = yup.mixed().test('fileSize', 'Max size 3mb', function (value) {
  const file = value || null; // Assuming the value is an array of files
  if (!file) return true; // No file, so validation passes
  return file?.size <= 1024 * 1024 * 3; // 1 MB
});

export default function FormVerifyUserMerchant({
  id,
  handleClose,
  openModal,
}: {
  id?: string | number;
  handleClose: (isSubmited: boolean) => void;
  openModal?: boolean;
}) {
  const [step, setStep] = useState<number>(1);

  const formik = useUserMerchant({
    id,
    handleClose,
    new_status: 6, // 6 for verify user,
    costumValidation: yup.object().shape({
      user_data: yup.object().shape({
        limit_request_plafon: yup
          .number()
          .required('Limit request plafon is required')
          .max(2147483647, 'Must be less than or equal to 2147483647')
          .min(0, 'Limit request plafon must be greater than 0'),
        limit_request_cash: yup
          .number()
          .required('Limit request cash is required')
          .max(2147483647, 'Must be less than or equal to 2147483647')
          .min(0, 'Limit request cash must be greater than 0'),
        limit_plafon: yup
          .number()
          .nullable()
          .required('Limit plafon is required')
          .max(2147483647, 'Must be less than or equal to 2147483647')
          .min(0, 'Limit plafon must be greater than 0'),
        limit_cash: yup
          .number()
          .nullable()
          .required('Limit cash is required')
          .max(2147483647, 'Must be less than or equal to 2147483647')
          .min(9, 'Limit cash must be greater than 0'),
        interest_rate: yup
          .number()
          .nullable()
          .required('Interest rate is required')
          .max(100, 'Must be less than or equal to 100')
          .min(0, 'Interest rate must be greater than 0'),
      }),
      document: yup.object().shape({
        nik_image: fileSize,
        npwp_image: fileSize,
        nib_image: fileSize,
        sku_image: fileSize,
        divorce_papers_image: fileSize,
        marriage_papers_image: fileSize,
        kk_image: fileSize,
        kur_form: fileSize,
        financing_form: fileSize,
      }),
    }),
    config: {
      sendDocument: true,
      removeUserTypeId: true,
    },
  });

  const backButton = () => {
    switch (step) {
      case 1:
        return {
          label: 'Cancel',
          onClick: () => {
            handleClose(false);
            // confirmCancelModal.on();
          },
        };
      default:
        return {
          label: 'Back',
          onClick: () => setStep(step - 1),
        };
    }
  };

  const nextButton = () => {
    switch (step) {
      case 1:
        return {
          label: 'Next',
          onClick: () => {
            // setStep(step + 1);
            formik.validateForm().then((errors) => {
              if (errors?.user_data) {
                Object.keys(errors.user_data).forEach((val: string) => {
                  formik.setFieldTouched(`user_data.${val}`);
                });
              } else {
                setStep(step + 1);
              }
            });
          },
          disabled: Boolean(formik.errors?.user_data),
        };
      case 2:
        return {
          label: formik.isLoading ? 'Loading...' : 'Submit',
          disabled: Boolean(formik.errors?.document) || formik.isLoading,
          onClick: () => {
            // console.log(formik.errors);
            // onCancelRef.current = true;
            formik.handleSubmit();
          },
        };
      default:
        return {
          label: 'Next',
          onClick: () => setStep(step + 1),
        };
    }
  };

  useEffect(() => {
    const element = document.getElementById('to');

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, [step]);

  useEffect(() => {
    if (!openModal) {
      formik.resetForm();
      setStep(1);
    }
  }, [openModal]);
  return (
    <Box p="24px">
      <div id="top" />
      <SteperHeader currentStep={step} stepList={['Financing', 'Document']} />
      <Box mt={2} />
      <Box display={step === 1 ? 'block' : 'none'}>
        <FormControl
          text="Limit request plafon"
          required
          error={
            formik.touched.user_data?.limit_request_plafon &&
            Boolean(formik.errors.user_data?.limit_request_plafon)
          }
          helperText={
            formik.touched.user_data?.limit_request_plafon
              ? formik.errors.user_data?.limit_request_plafon
              : ''
          }
        >
          <TextField
            fullWidth
            placeholder="Input request plafon"
            name="'user_data.limit_request_plafon"
            onBlur={formik.handleBlur}
            onKeyDown={(evt) =>
              ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault()
            }
            error={
              formik.touched.user_data?.limit_request_plafon &&
              Boolean(formik.errors.user_data?.limit_request_plafon)
            }
            value={numberSeperator(
              formik.values.user_data?.limit_request_plafon || '',
            )}
            onChange={(e) => {
              const value = e.target.value
                // @ts-ignore
                .replaceAll('.', '')
                .replace(/[^0-9.]/g, '')
                .replace(/(\..*?)\..*/g, '$1');

              formik.setFieldValue(
                'user_data.limit_request_plafon',
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
          text="Limit request cash"
          required
          error={
            formik.touched.user_data?.limit_request_cash &&
            Boolean(formik.errors.user_data?.limit_request_cash)
          }
          helperText={
            formik.touched.user_data?.limit_request_cash
              ? formik.errors.user_data?.limit_request_cash
              : ''
          }
        >
          <TextField
            fullWidth
            placeholder="Input limit cash"
            name="user_data.limit_request_cash"
            onBlur={formik.handleBlur}
            value={numberSeperator(
              formik.values.user_data?.limit_request_cash || '',
            )}
            onChange={(e) => {
              const value = e.target.value
                // @ts-ignore
                .replaceAll('.', '')
                .replace(/[^0-9.]/g, '')
                .replace(/(\..*?)\..*/g, '$1');

              formik.setFieldValue(
                'user_data.limit_request_cash',
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
          text="Interest Rate"
          required
          error={
            formik.touched.user_data?.interest_rate &&
            Boolean(formik.errors.user_data?.interest_rate)
          }
          helperText={
            formik.touched.user_data?.interest_rate
              ? formik.errors.user_data?.interest_rate
              : ''
          }
        >
          <TextField
            fullWidth
            placeholder="Input Interest Rate"
            name="user_data.interest_rate"
            onBlur={formik.handleBlur}
            value={formik.values.user_data?.interest_rate}
            onChange={formik.handleChange}
            type="number"
            onKeyDown={(evt) =>
              ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault()
            }
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
          />
        </FormControl>
      </Box>
      <Box display={step === 2 ? 'block' : 'none'}>
        {Object.keys(formik.values.document).map((key) => {
          if (key.includes('image')) {
            return (
              // eslint-disable-next-line react/jsx-key
              <FormControl
                text={key
                  .replaceAll('_', ' ')
                  .replaceAll('image', '')
                  .toLocaleUpperCase()}
                error={
                  // @ts-ignore
                  formik.touched?.document?.[key] &&
                  // @ts-ignore
                  Boolean(formik.errors?.document?.[key])
                }
                helperText={
                  // @ts-ignore
                  formik.touched?.document?.[key]
                    ? // @ts-ignore
                      formik.errors?.document?.[key]
                    : ''
                }
              >
                <InputImage
                  label="an Image"
                  // @ts-ignore
                  value={formik.values?.document?.[key]}
                  onChange={(e: unknown) => {
                    formik.setFieldValue(`document.${key}`, e);
                    formik.setFieldTouched(`document.${key}`);
                  }}
                  onClear={() => formik.setFieldValue(`document.${key}`, null)}
                  // width={720}
                  // height={720}
                />
              </FormControl>
            );
          }

          if (key.includes('form')) {
            return (
              // eslint-disable-next-line react/jsx-key
              <FormControl
                text={key
                  .replaceAll('_', ' ')
                  .replaceAll('form', '')
                  .toLocaleUpperCase()}
                error={
                  // @ts-ignore
                  formik.touched?.document?.[key] &&
                  // @ts-ignore
                  Boolean(formik.errors?.document?.[key])
                }
                helperText={
                  // @ts-ignore
                  formik.touched?.document?.[key]
                    ? // @ts-ignore
                      formik.errors?.document?.[key]
                    : ''
                }
              >
                <>
                  <InputFile
                    // @ts-ignore
                    value={formik.values?.document?.[key] || null}
                    onChange={(e: File) => {
                      formik.setFieldValue(`document.${key}`, e);
                      formik.setFieldTouched(`document.${key}`).then(() => {
                        formik.validateForm();
                      });
                    }}
                  />
                </>
              </FormControl>
            );
          }
          return <></>;
        })}
      </Box>
      <Stack direction="row" justifyContent="end" spacing={1}>
        <Button variant="text" color="error" onClick={backButton().onClick}>
          {backButton().label}
        </Button>
        <Button
          type="submit"
          color="primary"
          disabled={nextButton()?.disabled}
          onClick={nextButton().onClick}
        >
          {nextButton().label}
        </Button>
      </Stack>
    </Box>
  );
}
