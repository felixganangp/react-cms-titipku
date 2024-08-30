/* eslint-disable radix */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useCallback, useEffect, useState } from 'react';
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
  styled,
  Switch,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Delete } from '@mui/icons-material';
import numberSeperator from 'utils/numberSeperator';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import bankData from 'data/list-bank.json';

import { useFormik } from 'formik';
import useModal from 'hooks/useModal';
import moment from 'moment';
import InputMultiImages from 'components/InputMultiImages';
import useToast from 'hooks/useToast';
import DateTimePicker from 'components/DateTimePicker';
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
  const openDateSelect = useModal();
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
      interest_rate: 0,
      is_sharing_margin: false,
      sharing_margin: 0,
    },
    validationSchema: yup.object({
      user: yup.object().nullable().required('Required'),
      loan_amount: yup
        .string()
        .min(2, 'Please enter a minimum required amount.')
        .required('Required'),
      transfer_date: yup.mixed().nullable().required('Required'),
      interest_rate: yup.mixed().when('is_sharing_margin', {
        is: (val: any) => val === false,
        then: yup.number().nullable().required('Required').min(0),
      }),
      sharing_margin: yup.number().when('is_sharing_margin', {
        is: (val: any) => val === true,
        then: yup
          .number()
          .typeError('Must be a number')
          .required('Required')
          .min(1),
      }),
      destination_bank: yup.mixed().when('invoice_type_id', {
        is: (val: any) => val === '1',
        then: yup.object().nullable().required('Required'),
      }),
      destination_bank_account: yup.number().when('invoice_type_id', {
        is: (val: any) => val === '1',
        then: yup.number().typeError('Must be a number').required('Required'),
      }),
      bank_transfer_fee: yup.string().when('invoice_type_id', {
        is: (val: any) => val === '1',
        then: yup.string().required('Required'),
      }),
      installment_period: yup.string().when('invoice_type_id', {
        is: (val: any) => val === '2',
        then: yup.string().required('Required'),
      }),
      provision_installment_period: yup.number().when('user', {
        is: (val: any) => val?.need_provision,
        then: yup
          .number()
          .min(0, 'Min 0 period')
          .max(36, 'Max 36 period')
          .required('Required'),
      }),
      nota_image: yup.mixed().when('invoice_type_id', {
        is: (val: any) => val === '1',
        then: yup.mixed().required('Required'),
      }),
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
            case 'nota_image':
              // @ts-ignore
              if (values[key]) {
                // @ts-ignore
                await values[key].forEach((item: any) => {
                  // @ts-ignore
                  fd.append('nota_image', item);
                });
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
              // @ts-ignore
              message: error || '',
            });
          },
        });
      } catch (error) {
        toast.openToast({
          severity: 'error',
          headMsg: 'Failed create invoice',
        });
      }
    },
  });

  console.log(formik.errors);

  const setInstallmentSimulation = useCallback(
    debounce((value: number) => {
      simulationInstalment.mutate(
        {
          // @ts-ignore
          amount: formik.values.loan_amount,
          period: value,
          start_date: moment(formik.values.transfer_date).unix(),
          interest_rate: formik.values.interest_rate,
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

  useEffect(() => {
    if (
      formik.values.loan_amount &&
      formik.values.transfer_date &&
      formik.values.installment_period
    ) {
      // @ts-ignore
      setInstallmentSimulation(formik.values.installment_period as number);
    }
  }, [
    formik.values.loan_amount,
    formik.values.transfer_date,
    formik.values.installment_period,
    formik.values.interest_rate,
  ]);

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
            <FormControlLabel value="3" control={<Radio />} label="Provisi" />
            <FormControlLabel
              value="4"
              control={<Radio />}
              label="Provisi Cash"
            />
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
                        formik.values.user?.available_limit_plafon
                      : // @ts-ignore
                        formik.values.user?.available_limit_cash) || 0,
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
        {formik.values.invoice_type_id === '1' ||
        formik.values.invoice_type_id === '2' ? (
          <>
            <FormControl text="Sharing Margin">
              {/* eslint-disable-next-line @typescript-eslint/no-use-before-define */}
              <SwitchCostum
                checked={formik.values.is_sharing_margin}
                name="is_sharing_margin"
                onBlur={formik.handleBlur}
                onChange={(e) => {
                  formik.handleChange(e);
                }}
              />
            </FormControl>
            {formik.values.is_sharing_margin && (
              <FormControl
                text="Sharing Margin Amount"
                required
                error={
                  formik.touched.sharing_margin &&
                  Boolean(formik.errors.sharing_margin)
                }
                helperText={
                  formik.touched.sharing_margin &&
                  formik.errors.sharing_margin &&
                  `${formik.errors.sharing_margin}`
                }
              >
                <TextField
                  type="text"
                  name="sharing_margin"
                  placeholder="Insert Sharing Margin Amount"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">Rp</InputAdornment>
                    ),
                  }}
                  fullWidth
                  autoComplete="off"
                  value={numberSeperator(formik.values.sharing_margin || '')}
                  onBlur={(e) => {
                    formik.handleBlur(e);
                  }}
                  onChange={(e) => {
                    const value = e.target.value
                      .replace(/[^0-9.]/g, '')
                      .replace(/(\..*?)\..*/g, '$1');

                    formik.setFieldValue('sharing_margin', value);
                  }}
                />
              </FormControl>
            )}
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
                name="loan_amount"
                placeholder="Insert Loan Amount"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">Rp</InputAdornment>
                  ),
                }}
                fullWidth
                autoComplete="off"
                value={numberSeperator(formik.values.loan_amount || '')}
                onBlur={(e) => {
                  formik.handleBlur(e);
                  const maxValue =
                    formik.values.invoice_type_id === '1'
                      ? // @ts-ignore
                        formik.values.user?.limit_plafon
                      : // @ts-ignore
                        formik.values.user?.limit_cash || 0;

                  if (parseInt(formik.values.loan_amount) > maxValue) {
                    setTimeout(() => {
                      formik.setFieldError(
                        'loan_amount',
                        `Maximal ${numberSeperator(maxValue)}`,
                      );
                    }, 100);
                  }
                }}
                onChange={(e) => {
                  const value = e.target.value
                    .replace(/[^0-9.]/g, '')
                    .replace(/(\..*?)\..*/g, '$1');

                  formik.setFieldValue('loan_amount', value);

                  const maxValue =
                    formik.values.invoice_type_id === '1'
                      ? // @ts-ignore
                        formik.values.user?.limit_plafon
                      : // @ts-ignore
                        formik.values.user?.limit_cash || 0;

                  if (parseInt(value) > maxValue) {
                    setTimeout(() => {
                      formik.setFieldError(
                        'loan_amount',
                        `Maximal ${numberSeperator(maxValue)}`,
                      );
                    }, 100);
                  }
                }}
              />
            </FormControl>
            <FormControl
              text="Date"
              required
              error={
                formik.touched.transfer_date &&
                Boolean(formik.errors.transfer_date)
              }
              helperText={
                formik.touched.transfer_date &&
                formik.errors.transfer_date &&
                `${formik.errors.transfer_date}`
              }
            >
              <DateTimePicker
                onChange={(value) => {
                  formik.setFieldValue('transfer_date', value);
                }}
                value={formik.values.transfer_date}
              />
            </FormControl>
            {formik.values.invoice_type_id === '1' && (
              <>
                <FormControl
                  text="Bank Name"
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
                      return (
                        option.name === formik.values.destination_bank?.name
                      );
                    }}
                    getOptionLabel={(option) => `${option.name}`}
                    value={formik.values.destination_bank}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="bankName"
                        onBlur={formik.handleBlur}
                        placeholder="Seleck bank"
                      />
                    )}
                  />
                </FormControl>
                <FormControl
                  text="Bank Account"
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
                    value={numberSeperator(
                      formik.values.bank_transfer_fee || '',
                    )}
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
            {!formik.values.is_sharing_margin && (
              <FormControl
                text="Admin Fee"
                required
                error={
                  formik.touched.interest_rate &&
                  Boolean(formik.errors.interest_rate)
                }
                helperText={
                  formik.touched.interest_rate &&
                  formik.errors.interest_rate &&
                  `${formik.errors.interest_rate}`
                }
              >
                <TextField
                  type="text"
                  name="interest_rate"
                  placeholder="Insert Admin Fee"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">%</InputAdornment>
                    ),
                  }}
                  fullWidth
                  autoComplete="off"
                  value={numberSeperator(formik.values.interest_rate || '')}
                  onChange={(e) => {
                    const value = e.target.value
                      .replace(/[^0-9.]/g, '')
                      .replace(/(\..*?)\..*/g, '$1');

                    formik.setFieldValue('interest_rate', value);
                  }}
                />
              </FormControl>
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
                            <Typography>Due Date</Typography>
                            <Typography>
                              {moment(item.due_date * 1000).format(
                                'DD-MM-YYYY',
                              )}
                            </Typography>
                          </Stack>
                          <Stack>
                            <Typography>Installment per Month</Typography>
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
            {/* @ts-ignore */}
            {((formik.values.user?.need_provision_cash &&
              formik.values.invoice_type_id === '2') ||
              // @ts-ignore
              (formik.values.user?.need_provision_normal &&
                formik.values.invoice_type_id === '1')) && (
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
            )}
            {formik.values.invoice_type_id === '1' && (
              <FormControl
                text="Note Image"
                required
                error={
                  formik.touched.nota_image && Boolean(formik.errors.nota_image)
                }
                helperText={
                  formik.touched.nota_image &&
                  formik.errors.nota_image &&
                  `${formik.errors.nota_image}`
                }
              >
                <InputMultiImages
                  label="Please upload an Image  "
                  // @ts-ignore
                  values={formik.values.nota_image}
                  onChange={(e: any) => {
                    console.log(e);
                    formik.setFieldValue('nota_image', e);
                  }}
                />
                {/* <InputImage
              label="Please upload an Image  "
              width={200}
              height={200}
              value={formik.values.nota_image}
              onChange={(e) => {
                formik.setFieldValue('nota_image', e);
              }}
            /> */}
              </FormControl>
            )}
          </>
        ) : (
          <>
            <FormControl
              text="Provision Installment Period"
              required
              error={
                formik.touched.provision_installment_period &&
                Boolean(formik.errors.provision_installment_period)
              }
              helperText={
                formik.touched.provision_installment_period
                  ? formik.errors.provision_installment_period
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
          </>
        )}
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
        <Button
          type="submit"
          color="primary"
          disabled={!formik.isValid || createInvoice.isLoading}
        >
          Submit
        </Button>
      </Box>
      <SelectCustomer
        open={customerModal.open}
        onClose={customerModal.closeModal}
        setSelected={(e) => {
          formik.setFieldValue('user', e);
          formik.setFieldValue('destination_bank_account', e.bank_account);
          formik.setFieldValue('interest_rate', e.interest_rate);
          formik.setFieldValue(
            'destination_bank',
            bankData.data.find((item) => item.code === e.bank_name),
          );
        }}
      />
    </Box>
  );
}

const SwitchCostum = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255,255,255,.35)'
        : 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
  },
}));
