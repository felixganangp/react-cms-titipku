import {
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  Stack,
} from '@mui/material';
import { Form, Formik, FieldArray, ErrorMessage } from 'formik';
import { object } from 'yup';
import { useState, useEffect } from 'react';
import useModal from 'hooks/useModal';
import Autocomplete from '@mui/material/Autocomplete';
import TrashIcon from 'components/Icon/Trash';
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import FormLabel from 'components/FormLabel';
// import SelectItem from 'components/SelectItem';
import { customerAction } from 'store/slice/kur/Customer';
import { BiChecking, BiCheckingCustomer, Customer } from 'models/kur/Customer';
import SelectCustomer from '../../../../Finance/Components/SelectCustomer';

// const initalValues: BiCheckingCustomer[] = [];

interface CustBiChecking {
  customers: BiCheckingCustomer[];
}

const initalValues: CustBiChecking = {
  customers: [],
};

interface FormProps {
  onClose: () => void;
  biCheckingData: Customer[] | undefined;
}

export default function FormBiChecking({ biCheckingData, onClose }: FormProps) {
  const dispatch = useAppDispatch();
  const customer = useAppSelector((state) => state.customerKur);
  const customerModal = useModal();
  const customerSelect = useAppSelector(
    (state) => state.customerKur.customerSelect,
  );
  const [initialValues, setInitialValues] = useState(initalValues);
  const [searchCustomer, setSearchCustomer] = useState('');
  const statusBiChecking = [
    {
      id: 1,
      name: 'Conforming',
    },
    {
      id: 2,
      name: 'Conforming with notes',
    },
    {
      id: 3,
      name: 'Not Conforming',
    },
  ];

  useEffect(() => {
    // const temp: BiCheckingCustomer[] = [];
    const temp: BiCheckingCustomer[] = [];
    biCheckingData?.forEach((data) => {
      temp.push({
        debtor_name: data.debtor_name,
        customer_number: data.user_number,
        merchant_name: data.merchant_name,
        id: data.id,
        bi_checking_status_id: 1,
        bi_checking_status_notes: '',
        bi_checking_status: {
          id: 1,
          name: 'Conforming',
        },
      });
    });
    const value: CustBiChecking = {
      customers: temp,
    };

    setInitialValues(value);
  }, [biCheckingData]);

  const modalSelectCustomer = useModal();
  useEffect(() => {
    dispatch(
      customerAction.fetchCustomerSelect({
        status: 1,
        search: customerSelect.params.search,
      }),
    );
  }, [customerSelect.params.search]);

  const [errorRsp, setErrorRsp] = useState({ error: false, message: '' });

  return (
    <Box>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={object({
          customers: yup
            .array()
            .required('Please select merchant')
            .min(1, 'Please select merchant')
            .of(
              yup.object().shape({
                id: yup.number(),
                bi_checking_status_id: yup
                  .number()
                  .min(1, 'Please select status')
                  .required('Please select status'),
                bi_checking_status_notes: yup
                  .mixed()
                  .when('bi_checking_status_id', {
                    is: (value: number) => {
                      return value !== 1;
                    },
                    then: yup.string().required('Notes is required'),
                  }),
              }),
            ),
        })}
        onSubmit={async (values, formikHelpers) => {
          const payload: BiChecking[] = [];
          values.customers.forEach((val) => {
            const temp: BiChecking = {
              id: val.id || 0,
              bi_checking_status_id: val.bi_checking_status_id,
              bi_checking_status_notes: val.bi_checking_status_notes,
            };
            payload.push(temp);
          });

          try {
            await dispatch(customerAction.bulkBiChecking(payload));
            await formikHelpers.resetForm();
            values.customers = [];
            await onClose();
          } catch (error: any) {
            values.customers = [];
            const errMsg = error;
            setErrorRsp({ error: true, message: errMsg });
          }
          formikHelpers.resetForm();
        }}
      >
        {({
          errors,
          isValid,
          touched,
          dirty,
          setFieldValue,
          values,
          handleChange,
          handleBlur,
        }) => (
          <Form style={{ padding: '0px !important' }}>
            <Box sx={{ padding: '24px' }}>
              <FieldArray name="customers">
                {({ push, remove }) => (
                  <Stack mt={3} gap={1} alignItems="start">
                    {values.customers.length &&
                      values.customers.map((cust, index) => (
                        <Stack
                          key={index}
                          sx={{
                            py: 2,
                            px: 1,
                            borderRadius: '8px',
                            border: '1px solid #E4E4E4',
                            bgcolor: '#f8f8f8',
                            width: '100%',
                          }}
                          gap={1}
                        >
                          <Stack direction="row" gap={4}>
                            <Stack gap={1} width="90%">
                              <Typography>
                                {cust.customer_number} - {cust.debtor_name}
                              </Typography>
                              <Typography>{cust.merchant_name}</Typography>
                              <Box>
                                <FormLabel text="Status" required>
                                  <Autocomplete
                                    options={statusBiChecking}
                                    onChange={(e, value) => {
                                      setFieldValue(
                                        `customers[${index}].bi_checking_status`,
                                        value,
                                      );
                                      setFieldValue(
                                        `customers[${index}].bi_checking_status_id`,
                                        value?.id || 0,
                                      );
                                    }}
                                    getOptionLabel={(option) => option.name}
                                    value={cust.bi_checking_status}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        name={`customers.${index}.bi_checking_status_id`}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Select Bi Checking Status"
                                        sx={{
                                          '& .MuiOutlinedInput-root': {
                                            backgroundColor: '#fff',
                                          },
                                        }}
                                      />
                                    )}
                                  />
                                </FormLabel>

                                <ErrorMessage
                                  name={`customers.${index}.bi_checking_status_id`}
                                >
                                  {(msg) => (
                                    <div
                                      style={{
                                        color: '#c10000',
                                        fontSize: '12px',
                                      }}
                                    >
                                      {msg}
                                    </div>
                                  )}
                                </ErrorMessage>
                              </Box>
                              <Box>
                                <FormLabel text="Notes">
                                  <TextField
                                    type="text"
                                    name={`customers[${index}].bi_checking_status_notes`}
                                    placeholder="Insert notes"
                                    value={cust.bi_checking_status_notes}
                                    fullWidth
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    inputProps={{
                                      maxLength: 50,
                                    }}
                                    sx={{ backgroundColor: '#ffffff' }}
                                  />
                                </FormLabel>
                                <ErrorMessage
                                  name={`customers.${index}.bi_checking_status_notes`}
                                >
                                  {(msg) => (
                                    <div
                                      style={{
                                        color: '#c10000',
                                        fontSize: '12px',
                                      }}
                                    >
                                      {msg}
                                    </div>
                                  )}
                                </ErrorMessage>
                              </Box>
                            </Stack>
                            <IconButton
                              sx={{ width: '50px', height: '50px' }}
                              onClick={() => remove(index)}
                            >
                              <TrashIcon sx={{ fontSize: 30 }} />
                            </IconButton>
                          </Stack>
                        </Stack>
                      ))}

                    <Button
                      onClick={() => customerModal.toggleModal()}
                      type="button"
                      color="primary"
                    >
                      Add Merchant
                    </Button>
                    <SelectCustomer
                      open={customerModal.open}
                      onClose={customerModal.closeModal}
                      status={1}
                      setSelected={(e) => {
                        const isValueExist = values.customers.find(
                          (data) => data.id === e.id,
                        );
                        if (!isValueExist) {
                          push({
                            debtor_name: e?.debtor_name,
                            customer_number: e?.user_number,
                            id: e?.id,
                            bi_checking_status_id: 1,
                            bi_checking_status_notes: '',
                            bi_checking_status: {
                              id: 1,
                              name: 'Conforming',
                            },
                          });
                        }
                      }}
                    />
                  </Stack>
                )}
              </FieldArray>
            </Box>
            <Box
              width="100%"
              display="flex"
              gap="10px"
              justifyContent="end"
              sx={{
                padding: '24px',
                boxShadow: '3px 0px 10px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Button type="submit" disabled={!isValid} color="primary">
                Submit
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
