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
import CircularProgress from '@mui/material/CircularProgress';
import TrashIcon from 'components/Icon/Trash';
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import FormLabel from 'components/FormLabel';
import SelectItem from 'components/SelectItem';
import { customerAction } from 'store/slice/kur/Customer';
import { BiChecking, BiCheckingCustomer, Customer } from 'models/kur/Customer';

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
  //  customer select;
  useEffect(() => {
    dispatch(customerAction.fetchCustomerSelect(customerSelect.params));
  }, [customerSelect.params]);

  useEffect(() => {
    dispatch(customerAction.fetchData({ search: searchCustomer }));
  }, [searchCustomer]);

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
            .of(
              yup.object().shape({
                id: yup.number(),
                bi_checking_status_id: yup
                  .number()
                  .min(1, 'Please select status')
                  .required('Please select status'),
                bi_checking_status_notes: yup
                  .string()
                  .test(
                    'len',
                    'Maximal character length for notes are 5',
                    (val: string | undefined) =>
                      val === undefined || val?.length <= 5,
                  ),
              }),
            )
            .min(1, 'Please select merchant'),
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
            await onClose();
          } catch (error: any) {
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
                                {cust.debtor_name}({cust.customer_number})
                              </Typography>
                              <Typography>{cust.customer_number}</Typography>
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
                                    // value={cust.bi_checking_status_notes}
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
                      onClick={modalSelectCustomer.openModal}
                      type="button"
                      color="primary"
                    >
                      Add Merchant
                    </Button>
                    {/* pop up select */}
                    <SelectItem
                      open={modalSelectCustomer.open}
                      onClose={() => {
                        modalSelectCustomer.closeModal();
                        dispatch(
                          customerAction.setParamsCustomerSelect({
                            page: 1,
                            search: '',
                          }),
                        );
                      }}
                      onChangeSearch={(e) => {
                        dispatch(
                          customerAction.setParamsCustomerSelect({
                            page: 1,
                            search: e,
                          }),
                        );
                      }}
                      onSubmit={(e) => {
                        const obj = customerSelect.data.find(
                          (o) => o.id === e[0],
                        );
                        push({
                          debtor_name: obj?.debtor_name,
                          customer_number: obj?.user_number,
                          id: obj?.id,
                          bi_checking_status_id: 1,
                          bi_checking_status_notes: '',
                          bi_checking_status: {
                            id: 1,
                            name: 'Conforming',
                          },
                        });
                      }}
                      loading={customerSelect.isLoading}
                      title="Customer"
                      // multiple
                      value={[]}
                      data={customerSelect.data}
                      hidenData={[
                        ...values.customers.map((val) => val.id || 0),
                      ]}
                      renderItem={(val) => (
                        <Stack direction="column" gap={1} alignItems="center">
                          <Typography>{val.debtor_name}</Typography>
                          <Typography>{val.merchant_name}</Typography>
                        </Stack>
                      )}
                      showMore={
                        Math.ceil(
                          customerSelect.totalCustomer /
                            (customerSelect.params?.count || 0),
                        ) > (customerSelect.params?.page || 0)
                      }
                      onShowmore={() => {
                        dispatch(
                          customerAction.setParamsCustomerSelect({
                            page: 1 + (customerSelect.params?.page || 0),
                          }),
                        );
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
              <Button
                type="submit"
                disabled={
                  !(isValid && dirty) || customer.loadingForm || errorRsp.error
                }
                color="primary"
              >
                Save
              </Button>
            </Box>
            {/* <pre>{JSON.stringify(values.customers, null, 2)}</pre> */}
          </Form>
        )}
      </Formik>
    </Box>
  );
}
