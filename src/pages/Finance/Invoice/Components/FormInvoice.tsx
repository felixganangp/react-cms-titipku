/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useCallback, useState } from 'react';
import FormControl from 'components/FormLabel';
import {
  Box,
  Button,
  ButtonBase,
  FormControlLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Modal,
  Stack,
  IconButton,
  Autocomplete,
  debounce,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Delete } from '@mui/icons-material';
import numberSeperator from 'utils/numberSeperator';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import bankData from 'data/list-bank.json';

import { useFormik } from 'formik';
import useModal from 'hooks/useModal';
import moment from 'moment';
import InputImage from 'components/InputImage';
import useToast from 'hooks/useToast';
import * as yup from 'yup';

import SelectCustomer from '../../Components/SelectCustomer';
import { KurType } from '../../hooks/useConfigFinance';
import {
  UseCreateInvoice,
  UseGetInstalmentSimulation,
} from '../../hooks/useInvoiceService';

type FormInvoiceProps = {
  onClose: (isSubmited: boolean) => void;
};

export default function FormInvoice(props: FormInvoiceProps) {
  const toast = useToast();
  const [simulation, setSimulation] = useState([]);
  const customerModal = useModal();
  const simulationInstalment = UseGetInstalmentSimulation();
  const createInvoice = UseCreateInvoice();

  const formik = useFormik({
    initialValues: {
      invoice_type_id: '1',
      user: null,
      loan_amount: '',
      transfer_date: null,
      destination_bank: null,
      destination_bank_account: '',
      bank_transfer_fee: '',
      installment_period: '',
      provision_installment_period: '',
      nota_image: '',
    },
    validationSchema: yup.object({
      user: yup.object().nullable().required('Required'),
      loan_amount: yup.string().required('Required'),
      transfer_date: yup.mixed().nullable().required('Required'),
      destination_bank: yup.mixed().when('invoice_type_id', {
        is: (val: any) => val === '1',
        then: yup.object().required('Required'),
      }),
      destination_bank_account: yup.string().when('invoice_type_id', {
        is: (val: any) => val === '1',
        then: yup.string().required('Required'),
      }),
      bank_transfer_fee: yup.string().when('invoice_type_id', {
        is: (val: any) => val === '1',
        then: yup.string().required('Required'),
      }),
      installment_period: yup.string().when('invoice_type_id', {
        is: (val: any) => val === '2',
        then: yup.string().required('Required'),
      }),
      provision_installment_period: yup
        .number()
        .max(12, 'Max 36 period')
        .required('Required'),
      nota_image: yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        const fd = new FormData();
        const promises = Object.keys(values).map(async (key) => {
          switch (key) {
            case 'transfer_date':
              // @ts-ignore
              await fd.append('transfer_date', moment(values[key]).unix());
              break;
            case 'user':
              // @ts-ignore
              await fd.append('user_id', values.user.id);
              break;
            case 'destination_bank':
              // @ts-ignore
              if (values[key]?.code) {
                // @ts-ignore
                await fd.append('destination_bank', values[key].code);
              }
              break;
            default:
              // @ts-ignore
              if (values[key]) {
                // @ts-ignore
                await fd.append(key, values[key]);
              }
              break;
          }
        });

        await Promise.all(promises);
        createInvoice.mutate(fd, {
          onSuccess: (data) => {
            props.onClose(true);
            formik.resetForm();
            toast.openToast({
              severity: 'success',
              headMsg: 'Success create invoice',
            });
          },
          onError: (error) => {
            toast.openToast({
              severity: 'error',
              headMsg: 'Failed create invoice',
            });
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
  });

  const setInstallmentSimulation = useCallback(
    debounce((value: number) => {
      simulationInstalment.mutate(
        {
          // @ts-ignore
          amount: formik.values.loan_amount,
          period: value,
          start_date: moment(formik.values.transfer_date).unix(),
        },
        {
          onSuccess: (data) => {
            // @ts-ignore
            setSimulation(data.data || []);
          },
        },
      );
    }, 2000),
    [formik.values],
  );

  return (
    <Box component="form" onSubmit={formik.handleSubmit}>
      <Box p="24px">
        <FormControl
          text="Name"
          required
          // error={touched.name && Boolean(errors.name)}
          // helperText={touched.name && errors.name && `${errors.name}`}
        >
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="invoice_type_id"
            value={formik.values.invoice_type_id}
            onChange={formik.handleChange}
          >
            <FormControlLabel value="1" control={<Radio />} label="Normal" />
            <FormControlLabel value="2" control={<Radio />} label="Cash" />
          </RadioGroup>
        </FormControl>
        <FormControl
          text="Merchant"
          required
          error={formik.touched.user && Boolean(formik.errors.user)}
          helperText={
            formik.touched.user && formik.errors.user && `${formik.errors.user}`
          }
        >
          {formik.values.user ? (
            <Stack alignItems="center" direction="row" spacing="20px">
              <Stack flex="1">
                <Typography>
                  {/* @ts-ignore */}
                  {KurType?.[formik.values.user.user_type_id]}
                </Typography>
                {/* @ts-ignore */}
                <Typography>{formik.values.user.merchant_name}</Typography>
              </Stack>
              <Stack>
                <Typography>Available Limit</Typography>
                <Typography color="primary.main">
                  {/* @ts-ignore */}
                  Rp.{' '}
                  {numberSeperator(
                    (formik.values.invoice_type_id === '1'
                      ? // @ts-ignore
                        formik.values.user?.limit_plafon
                      : // @ts-ignore
                        formik.values.user?.limit_cash) || 0,
                  )}
                </Typography>
              </Stack>
              <IconButton
                onClick={() => {
                  formik.setFieldValue('user', null);
                }}
              >
                <Delete color="error" />
              </IconButton>
            </Stack>
          ) : (
            <TextField
              disabled
              fullWidth
              placeholder="Select Merchant"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <ButtonBase onClick={() => customerModal.toggleModal()}>
                      <Box
                        bgcolor="primary.main"
                        p="5px"
                        borderRadius="4px"
                        display="flex"
                        alignContent="center"
                        justifyContent="center"
                      >
                        <AddIcon sx={{ color: '#fff' }} />
                      </Box>
                    </ButtonBase>
                  </InputAdornment>
                ),
              }}
            />
          )}
        </FormControl>
        <FormControl
          text="Loan Amount"
          required
          error={
            formik.touched.loan_amount && Boolean(formik.errors.loan_amount)
          }
          helperText={
            formik.touched.loan_amount &&
            formik.errors.loan_amount &&
            `${formik.errors.loan_amount}`
          }
        >
          <TextField
            type="text"
            name="selling_price"
            placeholder="Insert Loan Amount"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">Rp</InputAdornment>
              ),
            }}
            fullWidth
            autoComplete="off"
            value={numberSeperator(formik.values.loan_amount || '')}
            onChange={(e) => {
              const value = e.target.value
                .replace(/[^0-9.]/g, '')
                .replace(/(\..*?)\..*/g, '$1');

              formik.setFieldValue('loan_amount', value);
            }}
          />
        </FormControl>
        <FormControl
          text="Date"
          required
          error={
            formik.touched.transfer_date && Boolean(formik.errors.transfer_date)
          }
          helperText={
            formik.touched.transfer_date &&
            formik.errors.transfer_date &&
            `${formik.errors.transfer_date}`
          }
        >
          <DesktopDatePicker
            value={formik.values.transfer_date}
            inputFormat="MMM DD, YYYY"
            onChange={(value) => {
              formik.setFieldValue('transfer_date', value);
            }}
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  name="grade"
                  placeholder="Select Grade"
                  variant="outlined"
                  fullWidth
                />
              );
            }}
          />
        </FormControl>
        {formik.values.invoice_type_id === '1' && (
          <>
            <FormControl
              text="Destination Bank"
              error={
                formik.touched.destination_bank &&
                Boolean(formik.errors.destination_bank)
              }
              helperText={
                formik.touched.destination_bank &&
                formik.errors.destination_bank &&
                `${formik.errors.destination_bank}`
              }
            >
              <Autocomplete
                data-testid="form-customer-list-bank"
                id="list-bank"
                options={bankData.data}
                onChange={(e, value) => {
                  formik.setFieldValue('destination_bank', value);
                }}
                isOptionEqualToValue={(option: {
                  name: string;
                  code: string;
                }) => {
                  // @ts-ignore
                  return option.name === formik.values.destination_bank?.name;
                }}
                getOptionLabel={(option) => `${option.name}`}
                value={formik.values.destination_bank}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name="bankName"
                    onBlur={formik.handleBlur}
                    placeholder="Select your bank"
                  />
                )}
              />
            </FormControl>
            <FormControl
              text="Destination Bank Account"
              error={
                formik.touched.destination_bank_account &&
                Boolean(formik.errors.destination_bank_account)
              }
              helperText={
                formik.touched.destination_bank_account &&
                formik.errors.destination_bank_account &&
                `${formik.errors.destination_bank_account}`
              }
            >
              <TextField
                fullWidth
                placeholder="Insert destination bank"
                value={formik.values.destination_bank_account}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="destination_bank_account"
              />
            </FormControl>
            <FormControl
              text="Bank Transfer Fee"
              required
              error={
                formik.touched.bank_transfer_fee &&
                Boolean(formik.errors.bank_transfer_fee)
              }
              helperText={
                formik.touched.bank_transfer_fee &&
                formik.errors.bank_transfer_fee &&
                `${formik.errors.bank_transfer_fee}`
              }
            >
              <TextField
                type="text"
                name="selling_price"
                placeholder="Insert Price"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">Rp</InputAdornment>
                  ),
                }}
                fullWidth
                autoComplete="off"
                value={numberSeperator(formik.values.bank_transfer_fee || '')}
                onChange={(e) => {
                  const value = e.target.value
                    .replace(/[^0-9.]/g, '')
                    .replace(/(\..*?)\..*/g, '$1');

                  formik.setFieldValue('bank_transfer_fee', value);
                }}
              />
            </FormControl>
          </>
        )}
        {formik.values.invoice_type_id === '2' && (
          <>
            <FormControl
              text="Installment Period"
              required
              error={
                formik.touched.installment_period &&
                Boolean(formik.errors.installment_period)
              }
              helperText={
                formik.touched.installment_period &&
                formik.errors.installment_period &&
                `${formik.errors.installment_period}`
              }
            >
              <>
                <TextField
                  fullWidth
                  placeholder="Insert Installment Period"
                  value={formik.values.installment_period}
                  onChange={(e) => {
                    formik.handleChange(e);
                    const { value } = e.target;

                    if (
                      formik.values.loan_amount &&
                      formik.values.transfer_date
                    ) {
                      // @ts-ignore
                      setInstallmentSimulation(value as number);
                    }
                  }}
                  onBlur={formik.handleBlur}
                  name="installment_period"
                  type="number"
                  // @ts-ignore
                  onWheel={(e) => e.target?.blur()}
                />
                <Stack spacing={2} mt={2}>
                  {simulationInstalment.isLoading && (
                    <Typography>Loading...</Typography>
                  )}
                  {simulation.map((item: any, index: number) => (
                    <Stack
                      key={index}
                      alignItems="center"
                      justifyContent="space-between"
                      direction="row"
                      spacing={2}
                      p={1}
                      bgcolor="#dedede"
                    >
                      <Stack>
                        <Typography>Due Data</Typography>
                        <Typography>
                          {moment(item.due_date * 1000).format('DD-MM-YYYY')}
                        </Typography>
                      </Stack>
                      <Stack>
                        <Typography>Installment per Amount</Typography>
                        <Typography>
                          Rp. {numberSeperator(item?.amount || 0)}
                        </Typography>
                      </Stack>
                    </Stack>
                  ))}
                </Stack>
              </>
            </FormControl>
          </>
        )}

        <FormControl
          text="Provision Installment Period"
          required
          error={
            formik.touched.provision_installment_period &&
            Boolean(formik.errors.provision_installment_period)
          }
          helperText={
            formik.touched.provision_installment_period &&
            formik.errors.provision_installment_period &&
            `${formik.errors.provision_installment_period}`
          }
        >
          <TextField
            fullWidth
            placeholder="Insert Provision Installment Period"
            value={formik.values.provision_installment_period}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="provision_installment_period"
            type="number"
            // @ts-ignore
            onWheel={(e) => e.target?.blur()}
          />
        </FormControl>
        <FormControl
          text="Note Image"
          required
          error={formik.touched.nota_image && Boolean(formik.errors.nota_image)}
          helperText={
            formik.touched.nota_image &&
            formik.errors.nota_image &&
            `${formik.errors.nota_image}`
          }
        >
          <InputImage
            label="Please upload an Image  "
            width={200}
            height={200}
            value={formik.values.nota_image}
            onChange={(e) => {
              formik.setFieldValue('nota_image', e);
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
          onClick={() => {
            props.onClose(false);
            formik.resetForm();
          }}
        >
          Cancel
        </Button>
        <Button type="submit" color="primary">
          Submit
        </Button>
      </Box>
      <SelectCustomer
        open={customerModal.open}
        onClose={customerModal.closeModal}
        setSelected={(e) => {
          formik.setFieldValue('user', e);
        }}
      />
    </Box>
  );
}
