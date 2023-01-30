import React, { useState, useEffect } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Typography,
  TextField,
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  InputAdornment,
} from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { useFormik } from 'formik';
import * as yup from 'yup';

import FormLabel from 'components/FormLabel';
import InputImage from 'components/InputImage';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CreateCustomer } from 'models/kur/Customer';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
}

interface Props {
  onClose: () => void;
}
const initial: CreateCustomer = {
  // imageCustomer: '',
  idCustomer: '',
  name: '',
  kurType: null,
  adminFee: '',
  dpdRate: '',
  birthDate: null,
  phoneNumber: '',
  email: '',
  addressKtp: '',
  addressDomisili: '',
  lapakName: null,
  nikKtp: '',
  imageNik: '',
  kkNumber: '',
  imageKk: '',
  npwp: '',
  imageNpwp: '',
  imageSKUsaha: '',
};
function Form({ onClose }: Props) {
  const [valueTab, setValueTab] = useState(0);
  const [openCalendaer, setOpenCalendar] = useState(false);
  const [disabledAddressDom, setDisabledAddressDom] = useState(false);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setValueTab(newValue);
  };
  const [initialValues, setInitialValues] = useState(initial);
  const formik = useFormik({
    initialValues,
    onSubmit: async (value, { resetForm }) => {
      console.log(value);
      resetForm();
      onClose();
    },
    validationSchema: yup.object({
      name: yup.string().required('Name is required'),
      email: yup
        .string()
        .email('Please input a valid email address')
        .required('Email is required'),
      // kurType: yup.mixed().required('KUR Type is required'),
      adminFee: yup
        .number()
        .required('Admin fee is required')
        .min(1, 'Please input positive value admin fee')
        .max(99999999, 'Maximal admin fee is 99.999.999'),
      dpdRate: yup
        .number()
        .required('DPD rate is required')
        .min(1, 'Please input positive value DPD rate')
        .max(99999999, 'Maximal DPD rate is 99.999.999'),
      birthDate: yup.string().required('Birth Day is required'),
      phoneNumber: yup.string().required('Phone Number is required'),
      addressKtp: yup.string().required('Address (KTP) is required'),
      addressDomisili: yup.string().required('Address (Domicilie) is required'),
      nikKtp: yup.string().required('NIK KTP is required'),
      kkNumber: yup.string().required('Kartu Keluarga number is required'),
      npwp: yup.string().required('NPWP number is required'),
    }),
    enableReinitialize: true,
  });
  const {
    handleSubmit,
    values,
    handleBlur,
    handleChange,
    errors,
    touched,
    setFieldValue,
    isValid,
    dirty,
  } = formik;
  return (
    <Box>
      <Box sx={{ mx: 1 }}>
        <Tabs
          value={valueTab}
          onChange={handleChangeTab}
          aria-label="basic tabs example"
        >
          <Tab
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              color: '#8B95A5',
              marginRight: 1,
            }}
            label="1. Basic Info"
            {...a11yProps(0)}
          />
          <Tab
            disabled={
              !(
                values.name &&
                values.adminFee &&
                values.birthDate &&
                values.phoneNumber &&
                values.email &&
                values.addressKtp &&
                values.addressDomisili &&
                +values.adminFee > 1
              )
            }
            sx={{ borderBottom: 1, borderColor: 'divider', color: '#8B95A5' }}
            label="2. KUR Document"
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
      <form onSubmit={handleSubmit}>
        <TabPanel value={valueTab} index={0}>
          <Box sx={{ px: 3 }}>
            {/** CUSTOMER IMAGE */}
            {/* <Box sx={{ marginTop: 2 }}>
              <FormLabel
                // error={values.imageCustomer.length < 1}
                // helperText={
                //   values.imageCustomer.length < 1 &&
                //   'Product Image(s) are mandatory'
                // }
                text=""
              >
                <InputImage
                  label=""
                  value={values.imageCustomer}
                  onChange={(e: any) => setFieldValue('imageCustomer', e)}
                  imageCustomer
                />
              </FormLabel>
            </Box> */}
            <Box
              sx={{ display: 'flex', gap: 1, marginBottom: 2, marginTop: 3 }}
            >
              <Typography>
                <ErrorIcon sx={{ fontSize: '20px' }} />
              </Typography>
              <Typography sx={{ color: '#232933', fontSize: '14px' }}>
                All forms must be filled
              </Typography>
            </Box>
            <Box>
              {/** NAME */}
              <FormLabel
                text="Name"
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name && `${errors.name}`}
              >
                <TextField
                  type="text"
                  name="name"
                  placeholder="Input customer name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                />
              </FormLabel>
              {/** KUR TYPE */}
              <FormLabel
                text="KUR Type"
                error={touched.kurType && Boolean(errors.kurType)}
                helperText={
                  touched.kurType && errors.kurType && `${errors.kurType}`
                }
              >
                <Autocomplete
                  id="kur-type"
                  options={[]}
                  onChange={(e, value) => {
                    setFieldValue('kurType', value);
                  }}
                  isOptionEqualToValue={(option: any) => {
                    return option.id === values;
                  }}
                  getOptionLabel={(option) => `${option}`}
                  value={values.kurType}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="kurType"
                      onBlur={handleBlur}
                      placeholder="Select KUR Type"
                    />
                  )}
                />
              </FormLabel>
              {/** ADMIN FEE */}
              <FormLabel
                text="Admin Fee (%)"
                error={touched.adminFee && Boolean(errors.adminFee)}
                helperText={
                  touched.adminFee && errors.adminFee && `${errors.adminFee}`
                }
              >
                <TextField
                  type="number"
                  name="adminFee"
                  placeholder="Input admin fee"
                  value={values.adminFee}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">%</InputAdornment>
                    ),
                  }}
                />
              </FormLabel>
              {/** DPD RATE */}
              <FormLabel
                text="DPD Rate (%)"
                error={touched.dpdRate && Boolean(errors.dpdRate)}
                helperText={
                  touched.dpdRate && errors.dpdRate && `${errors.dpdRate}`
                }
              >
                <TextField
                  type="number"
                  name="dpdRate"
                  placeholder="Input DPD rate"
                  value={values.dpdRate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">%</InputAdornment>
                    ),
                  }}
                />
              </FormLabel>
              {/** BIRTH DATE */}
              <FormLabel
                text="Birth Date"
                error={touched.birthDate && Boolean(errors.birthDate)}
                helperText={
                  touched.birthDate && errors.birthDate && `${errors.birthDate}`
                }
              >
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DesktopDatePicker
                    open={openCalendaer}
                    onClose={() => {
                      setOpenCalendar(false);
                    }}
                    onOpen={() => {
                      setOpenCalendar(true);
                    }}
                    inputFormat="DD/MM/YYYY"
                    value={values.birthDate}
                    onChange={(e) => {
                      setFieldValue('birthDate', e);
                    }}
                    renderInput={(params) => (
                      <TextField
                        sx={{ width: '100%' }}
                        {...params}
                        onClick={() => setOpenCalendar(true)}
                      />
                    )}
                  />
                </LocalizationProvider>
              </FormLabel>
              {/** PHONE NUMBER */}
              <FormLabel
                text="Phone Number"
                error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                helperText={
                  touched.phoneNumber &&
                  errors.phoneNumber &&
                  `${errors.phoneNumber}`
                }
              >
                <TextField
                  type="text"
                  name="phoneNumber"
                  placeholder="Input Phone Number"
                  value={values.phoneNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                />
              </FormLabel>
              {/** EMAIL */}
              <FormLabel
                text="Email"
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email && `${errors.email}`}
              >
                <TextField
                  type="text"
                  name="email"
                  placeholder="Input email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                />
              </FormLabel>
              {/** ADDRESS KTP */}
              <FormLabel
                text="Address (KTP)"
                error={touched.addressKtp && Boolean(errors.addressKtp)}
                helperText={
                  touched.addressKtp &&
                  errors.addressKtp &&
                  `${errors.addressKtp}`
                }
              >
                <TextField
                  type="text"
                  name="addressKtp"
                  placeholder="Input address ktp"
                  value={values.addressKtp}
                  multiline
                  rows={4}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                />
              </FormLabel>
              {/** ADDRESS DOMICILE */}
              <FormLabel
                text="Address (Domicile)"
                error={
                  touched.addressDomisili && Boolean(errors.addressDomisili)
                }
                helperText={
                  touched.addressDomisili &&
                  errors.addressDomisili &&
                  `${errors.addressDomisili}`
                }
              >
                <>
                  <TextField
                    type="text"
                    name="addressDomisili"
                    placeholder="Input address domicile"
                    value={values.addressDomisili}
                    multiline
                    rows={4}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                    disabled={disabledAddressDom}
                  />
                  <FormControlLabel
                    label={
                      <Typography sx={{ fontSize: '14px' }}>
                        Address as shown in ID (KTP)
                      </Typography>
                    }
                    onChange={() => {
                      setDisabledAddressDom((prev) => !prev);
                      setFieldValue('addressDomisili', values.addressKtp);
                    }}
                    // label="Address as shown in ID (KTP)"
                    sx={{ fontSize: '14px' }}
                    control={
                      <Checkbox checked={disabledAddressDom} size="small" />
                    }
                  />
                </>
              </FormLabel>
            </Box>
          </Box>
          {/** BUTTON NEXT */}
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
            <Button variant="text" color="error" onClick={onClose}>
              Cancel
            </Button>
            <Button
              disabled={
                !(
                  values.name &&
                  values.adminFee &&
                  values.birthDate &&
                  values.phoneNumber &&
                  values.email &&
                  values.addressKtp &&
                  values.addressDomisili &&
                  +values.adminFee > 1
                )
              }
              onClick={(e) => handleChangeTab(e, 1)}
              // type="submit"
            >
              Next
            </Button>
          </Box>
        </TabPanel>
        <TabPanel value={valueTab} index={1}>
          <Box sx={{ px: 3, marginTop: 3 }}>
            {/** LAPAK / PASAR */}
            <Grid container spacing={2}>
              <Grid item xs={7}>
                <FormLabel
                  text="Cari Pasar"
                  error={touched.lapakName && Boolean(errors.lapakName)}
                  helperText={
                    touched.lapakName &&
                    errors.lapakName &&
                    `${errors.lapakName}`
                  }
                >
                  <Autocomplete
                    id="lapak-name"
                    options={[]}
                    onChange={(e, value) => {
                      setFieldValue('lapakName', value);
                    }}
                    isOptionEqualToValue={(option: any) => {
                      return option.id === values;
                    }}
                    getOptionLabel={(option) => `${option}`}
                    value={values.lapakName}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="lapakName"
                        onBlur={handleBlur}
                        placeholder="Select KUR Type"
                      />
                    )}
                  />
                </FormLabel>
              </Grid>
              <Grid item xs={5}>
                <FormLabel
                  text="Pasar"
                  // error={touched.name && Boolean(errors.name)}
                  // helperText={touched.name && errors.name && `${errors.name}`}
                >
                  <TextField
                    type="text"
                    disabled
                    // name="name"
                    placeholder="Pasar"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                  />
                </FormLabel>
              </Grid>
            </Grid>
            {/** NIK KTP */}
            <FormLabel
              text="Nomor Induk Kependudukan (KTP)"
              error={touched.nikKtp && Boolean(errors.nikKtp)}
              helperText={touched.nikKtp && errors.nikKtp && `${errors.nikKtp}`}
            >
              <TextField
                type="text"
                name="nikKtp"
                placeholder="Input NIK KTP"
                value={values.nikKtp}
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
              />
            </FormLabel>
            {/** IMAGE KTP */}
            <FormLabel
              text="Nomor Induk Kependudukan (KTP)"
              error={touched.nikKtp && Boolean(errors.nikKtp)}
              helperText={touched.nikKtp && errors.nikKtp && `${errors.nikKtp}`}
            >
              <InputImage
                label="Image KTP"
                value={values.imageNik}
                onChange={(e: any) => setFieldValue('imageNik', e)}
              />
            </FormLabel>
            {/** KK NUMBER */}
            <FormLabel
              text="Nomor Kartu Keluarga"
              error={touched.kkNumber && Boolean(errors.kkNumber)}
              helperText={
                touched.kkNumber && errors.kkNumber && `${errors.kkNumber}`
              }
            >
              <TextField
                type="text"
                name="kkNumber"
                placeholder="Input Kartu Keluarga number"
                value={values.kkNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
              />
            </FormLabel>
            {/** IMAGE KK (C1) */}
            <FormLabel
              text="Nomor Induk Kependudukan (KTP)"
              error={touched.nikKtp && Boolean(errors.nikKtp)}
              helperText={touched.nikKtp && errors.nikKtp && `${errors.nikKtp}`}
            >
              <InputImage
                label="Image KK"
                value={values.imageKk}
                onChange={(e: any) => setFieldValue('imageKk', e)}
              />
            </FormLabel>
            {/** NPWP */}
            <FormLabel
              text="Nomor NPWP"
              error={touched.npwp && Boolean(errors.npwp)}
              helperText={touched.npwp && errors.npwp && `${errors.npwp}`}
            >
              <TextField
                type="text"
                name="npwp"
                placeholder="Input NPWP number"
                value={values.npwp}
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
              />
            </FormLabel>
            {/** NPWP IMAGE */}
            <FormLabel
              text="Nomor Induk Kependudukan (KTP)"
              error={touched.nikKtp && Boolean(errors.nikKtp)}
              helperText={touched.nikKtp && errors.nikKtp && `${errors.nikKtp}`}
            >
              <InputImage
                label="Image NPWP"
                value={values.imageNpwp}
                onChange={(e: any) => setFieldValue('imageNpwp', e)}
              />
            </FormLabel>
            {/** SURAT KETERANGAN USAHA IMAGE */}
            <FormLabel
              text="Nomor Induk Kependudukan (KTP)"
              error={touched.nikKtp && Boolean(errors.nikKtp)}
              helperText={touched.nikKtp && errors.nikKtp && `${errors.nikKtp}`}
            >
              <InputImage
                label="Image Surat Keterangan Usaha"
                value={values.imageSKUsaha}
                onChange={(e: any) => setFieldValue('imageSKUsaha', e)}
              />
            </FormLabel>
          </Box>
          {/** BUTTON SAVE */}
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
              color="primary"
              onClick={() => setValueTab(0)}
            >
              Previous
            </Button>
            <Button
              disabled={!(isValid && dirty)}
              // onClick={(e) => handleChangeTab(e, 1)}
              type="submit"
            >
              Save
            </Button>
          </Box>
        </TabPanel>
      </form>
    </Box>
  );
}

export default Form;
