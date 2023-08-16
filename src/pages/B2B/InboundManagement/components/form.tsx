import {
  TextField,
  Button,
  Box,
  Typography,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Form, Formik, FieldArray, ErrorMessage } from 'formik';
import { object } from 'yup';
import { useState, useEffect } from 'react';
import NoImage from 'assets/no-image.svg';
import Plus from 'components/Icon/Plus';
import Minus from 'components/Icon/Minus';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import Trash from 'components/Icon/Trash';
import Calendar from 'components/Icon/Calendar';
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import useToast from 'hooks/useToast';
import FormLabel from 'components/FormLabel';
import moment from 'moment';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {
  CreateInbound,
  CreateInboundParams,
  InboundProductRequest,
} from 'models/b2b/Inbound';
import { Supplier } from 'models/b2b/Supplier';
import { InboundAction } from 'store/slice/b2b/Inbound';
import { productAction } from 'store/slice/b2b/Product';

const initalValues: CreateInboundParams = {
  supplier: null,
  code: '',
  date: null,
  description: '',
  products: [],
};

interface FormProps {
  onClose: () => void;
}

export default function FormInbound({ onClose }: FormProps) {
  const dispatch = useAppDispatch();
  const inboundSelector = useAppSelector((state) => state.inbound);
  const supplier = useAppSelector((state) => state.supplier);
  const product = useAppSelector((state) => state.product);
  const [initialValues, setInitialValues] = useState(initalValues);
  const [searchProduct, setSearchProduct] = useState('');

  useEffect(() => {
    setInitialValues(initalValues);
  }, []);

  useEffect(() => {
    dispatch(productAction.fetchData({ search: searchProduct }));
  }, [searchProduct]);

  // date picker
  const [openDate, setOpenDate] = useState<{
    open: boolean;
    touched: boolean;
  }>({ open: false, touched: false });

  const [errorRsp, setErrorRsp] = useState({ error: false, message: '' });

  return (
    <Box>
      <Formik
        initialValues={initialValues}
        validationSchema={object({
          supplier: yup.mixed().required('Supplier is required'),
          code: yup
            .string()
            .test(
              'len',
              'Maximal character length for inbound code / number is 50',
              (val: string | undefined) =>
                val === undefined || val?.length <= 50,
            ),
          date: yup.mixed().required('Date is required'),
          description: yup
            .string()
            .test(
              'len',
              'Maximal character for description is 500',
              (val: string | undefined) =>
                val === undefined || val?.length <= 500,
            ),
          products: yup
            .array()
            .required('Please select product')
            .of(
              yup.object().shape({
                name: yup.string(),
                id: yup.number(),
                image: yup.string(),
                quantity: yup
                  .number()
                  .min(1, 'Minimun quantity is 1')
                  .required('Please input quantity'),
                uom: yup.string(),
                supplier_price: yup
                  .number()
                  .min(1, 'Minimun supplier price is 1')
                  .required('Please input supplier price'),
              }),
            )
            .min(1, 'the error message if length === 0 | 1'),
        })}
        onSubmit={async (values, formikHelpers) => {
          const prodTemp: InboundProductRequest[] = [];
          values.products.forEach((val) => {
            const temp: InboundProductRequest = {
              id: val.id,
              supplier_price: val.supplier_price,
              quantity: +val.quantity,
            };
            prodTemp.push(temp);
          });

          const payload: CreateInbound = {
            supplier_id: +(values?.supplier || 0),
            code: values.code,
            date: moment(values.date).unix(),
            description: values.description,
            products: prodTemp,
          };
          try {
            await dispatch(InboundAction.createInbound(payload));
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
              <FormLabel
                text="Supplier Name"
                required
                error={touched.supplier && Boolean(errors.supplier)}
                helperText={
                  touched.supplier && errors.supplier && `${errors.supplier}`
                }
              >
                <Autocomplete
                  data-testid="form-category"
                  id="unit_measurement_id"
                  options={supplier.data}
                  onChange={(e, value) => {
                    setFieldValue('supplier', value?.id);
                  }}
                  // isOptionEqualToValue={(option, values) => {
                  //   return option.id === values.id;
                  // }}
                  getOptionLabel={(option) => option.name}
                  value={
                    supplier.data.filter(
                      (val) => val.id === values.supplier,
                    )[0] || null
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="supplier"
                      onBlur={handleBlur}
                      placeholder="Select Supplier Name"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: '#fff',
                        },
                      }}
                    />
                  )}
                />
              </FormLabel>
              <FormLabel
                text="Inbound Code/Number"
                error={touched.code && Boolean(errors.code)}
                helperText={touched.code && errors.code && `${errors.code}`}
              >
                <TextField
                  type="text"
                  name="code"
                  placeholder="Insert inbound code/number"
                  value={values.code}
                  fullWidth
                  onChange={handleChange}
                  onBlur={handleBlur}
                  inputProps={{
                    maxLength: 50,
                  }}
                />
              </FormLabel>
              <FormLabel
                text="Inbound Date"
                required
                error={
                  (openDate.touched && Boolean(errors.date)) ||
                  (!values.date && !isValid)
                }
                helperText={
                  (openDate.touched &&
                    Boolean(errors.date) &&
                    `${errors.date}`) ||
                  (!values.date && !isValid && `Date is required`)
                }
              >
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DesktopDatePicker
                    open={openDate.open}
                    onClose={() => {
                      if (values.date)
                        setOpenDate({ open: false, touched: false });
                      else setOpenDate({ open: false, touched: true });
                    }}
                    onOpen={() => {
                      setOpenDate({ open: true, touched: true });
                    }}
                    value={values.date}
                    inputFormat="MMMM DD, YYYY"
                    toolbarPlaceholder="Select Date"
                    onChange={(e) => {
                      setFieldValue('date', e, true);
                    }}
                    InputAdornmentProps={{ style: { display: 'none' } }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Calendar />
                        </InputAdornment>
                      ),
                    }}
                    renderInput={(params) => (
                      <TextField
                        sx={{ width: '100%' }}
                        {...params}
                        onClick={() =>
                          setOpenDate({ open: true, touched: true })
                        }
                        onFocus={() =>
                          setOpenDate({ open: false, touched: true })
                        }
                        onKeyDown={() =>
                          setOpenDate({ open: false, touched: true })
                        }
                        inputProps={{
                          ...params.inputProps,
                          placeholder: 'Select date',
                        }}
                      />
                    )}
                    maxDate={new Date()}
                  />
                </LocalizationProvider>
              </FormLabel>

              <FormLabel
                text="Description"
                error={touched.description && Boolean(errors.description)}
                helperText={
                  touched.description &&
                  errors.description &&
                  `${errors.description}`
                }
              >
                <TextField
                  type="text"
                  name="description"
                  placeholder="Insert some note"
                  value={values.description}
                  fullWidth
                  onChange={handleChange}
                  onBlur={handleBlur}
                  inputProps={{
                    maxLength: 500,
                  }}
                  multiline
                  rows={2}
                />
              </FormLabel>
              <Box
                height="auto"
                sx={{
                  border: 'solid 1px #e4e4e4',
                  borderRadius: '4px',
                  padding: '12px',
                }}
              >
                {/* table product */}
                <FieldArray name="products">
                  {({ push, remove }) => (
                    <Box>
                      <Autocomplete
                        options={product.products}
                        onChange={(e, value) => {
                          if (value?.id) {
                            push({
                              id: value?.id,
                              supplier_price: 0,
                              quantity: 0,
                              name: value?.name,
                              image: value?.image,
                              uom: value?.unit_measurement,
                            });
                          }
                        }}
                        onInputChange={(e, value) => {
                          setSearchProduct(value);
                        }}
                        getOptionLabel={(option) => `${option.name}`}
                        sx={{ width: '300px' }}
                        renderInput={(params) => (
                          <TextField {...params} placeholder="Select Product" />
                        )}
                      />
                      <table
                        style={{
                          marginTop: '10px',
                          fontSize: '14px',
                          fontFamily: 'Roboto',
                          borderSpacing: '0 20px',
                        }}
                        cellSpacing="0 20px"
                        cellPadding="5px"
                      >
                        <thead>
                          <tr
                            style={{
                              backgroundColor: '#ebeff3',
                              textAlign: 'left',
                            }}
                          >
                            <th style={{ fontWeight: '400' }}>No</th>
                            <th style={{ fontWeight: '400', width: '200px' }}>
                              Product/SKU
                            </th>
                            <th style={{ fontWeight: '400', width: '170px' }}>
                              Supplier Price
                            </th>
                            <th
                              colSpan={2}
                              style={{ fontWeight: '400', width: '200px' }}
                            >
                              Qty
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {values.products &&
                            values.products.length > 0 &&
                            values.products.map((prod, index) => (
                              <tr
                                key={index}
                                style={{
                                  position: 'relative',
                                }}
                              >
                                <td>{index + 1}</td>
                                <td>
                                  <Box
                                    display="flex"
                                    flexDirection="row"
                                    justifyContent="flex-start"
                                    alignItems="center"
                                    gap="24px"
                                    sx={{
                                      cursor: 'pointer',
                                    }}
                                  >
                                    <img
                                      onError={({ currentTarget }) => {
                                        currentTarget.onerror = null;
                                        currentTarget.src = NoImage;
                                      }}
                                      src={prod.image}
                                      style={{
                                        height: '48px',
                                        width: '48px',
                                        borderRadius: '50%',
                                      }}
                                      alt={prod.name}
                                    />
                                    <Box
                                      display="flex"
                                      flexDirection="row"
                                      justifyContent="flex-start"
                                      gap="8px"
                                    >
                                      <Typography>{prod.name}</Typography>
                                    </Box>
                                  </Box>
                                </td>
                                <td>
                                  <TextField
                                    type="number"
                                    name={`products[${index}].supplier_price`}
                                    placeholder="Insert Price"
                                    onChange={(event) => {
                                      handleChange(event);
                                      setErrorRsp({
                                        error: false,
                                        message: '',
                                      });
                                    }}
                                    onBlur={handleBlur}
                                    value={prod.supplier_price}
                                    fullWidth
                                    InputProps={{
                                      startAdornment: (
                                        <InputAdornment position="start">
                                          Rp
                                        </InputAdornment>
                                      ),
                                    }}
                                  />

                                  <ErrorMessage
                                    name={`products.${index}.supplier_price`}
                                  >
                                    {(msg) => (
                                      <div
                                        style={{
                                          color: '#c10000',
                                          fontSize: '12px',
                                          position: 'absolute',
                                          bottom: -7,
                                        }}
                                      >
                                        {msg}
                                      </div>
                                    )}
                                  </ErrorMessage>
                                </td>
                                <td>
                                  <Box
                                    sx={{
                                      display: 'flex',
                                      justifyContent: 'space-between',
                                      alignItems: 'center',
                                    }}
                                  >
                                    <TextField
                                      type="tel"
                                      name={`products[${index}].quantity`}
                                      placeholder=""
                                      onChange={(event) => {
                                        handleChange(event);
                                        setErrorRsp({
                                          error: false,
                                          message: '',
                                        });
                                      }}
                                      onBlur={handleBlur}
                                      value={prod.quantity}
                                      fullWidth
                                      InputProps={{
                                        inputProps: {
                                          style: {
                                            width: '40px',
                                            textAlign: 'center',
                                          },
                                        },
                                        style: {
                                          paddingLeft: '0px',
                                          paddingRight: '0px',
                                        },
                                        startAdornment: (
                                          <InputAdornment position="start">
                                            <IconButton
                                              disabled={
                                                values.products[index]
                                                  .quantity -
                                                  1 <=
                                                0
                                              }
                                              size="small"
                                              onClick={() =>
                                                setFieldValue(
                                                  `products[${index}].quantity`,
                                                  values.products[index]
                                                    .quantity - 1,
                                                )
                                              }
                                            >
                                              <Minus />
                                            </IconButton>
                                          </InputAdornment>
                                        ),
                                        endAdornment: (
                                          <InputAdornment position="end">
                                            <IconButton
                                              size="small"
                                              disabled={
                                                prod.quantity >= 2147483647
                                              }
                                              onClick={() =>
                                                setFieldValue(
                                                  `products[${index}].quantity`,
                                                  values.products[index]
                                                    .quantity + 1,
                                                )
                                              }
                                            >
                                              <Plus />
                                            </IconButton>
                                          </InputAdornment>
                                        ),
                                      }}
                                    />
                                    <Typography sx={{ marginLeft: '5px' }}>
                                      {prod.uom}
                                    </Typography>
                                  </Box>

                                  <ErrorMessage
                                    name={`products.${index}.quantity`}
                                  >
                                    {(msg) => (
                                      <div
                                        style={{
                                          color: '#c10000',
                                          fontSize: '12px',
                                          position: 'absolute',
                                          bottom: -7,
                                        }}
                                      >
                                        {msg}
                                      </div>
                                    )}
                                  </ErrorMessage>
                                </td>
                                <td>
                                  <IconButton
                                    sx={{ color: '#d27355' }}
                                    size="medium"
                                    onClick={() => remove(index)}
                                  >
                                    <Trash sx={{ fontSize: '33px' }} />
                                  </IconButton>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                      {values.products.length <= 0 && (
                        <Box
                          sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            alignItems: 'center',
                            marginTop: '10px',
                          }}
                        >
                          <Typography
                            sx={{ fontSize: '16px', fontWeight: 'bold' }}
                          >
                            No Product
                          </Typography>
                          <Typography sx={{ fontSize: '14px' }}>
                            Select products/SKUs to add inbound details.
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  )}
                </FieldArray>
              </Box>
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
                  !(isValid && dirty) ||
                  inboundSelector.loadingForm ||
                  errorRsp.error
                }
                color="primary"
              >
                {inboundSelector.loadingForm ? (
                  <CircularProgress size="1rem" />
                ) : (
                  'Save'
                )}
              </Button>
            </Box>
            {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
          </Form>
        )}
      </Formik>
    </Box>
  );
}
