import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import useToast from 'hooks/useToast';
import FormLabel from 'components/FormLabel';
import InputImage from 'components/InputMultiImages';

interface FormProps {
  onClose: () => void;
}

const initial = {
  name: '',
  email: '',
  roleAccess: null,
  imageUrl: [],
  imageUrlRejected: [],
};

export default function Form({ onClose }: FormProps) {
  const [selectedImg, setSelectedImg] = useState([]);

  const [initialValues, setInitialValues] = useState(initial);
  const handleClose = () => {
    onClose();
  };
  const toast = useToast();
  const formik = useFormik({
    initialValues,
    onSubmit: async (value) => {
      try {
        toast.openToast({
          headMsg: 'Success',
          message: 'please connect api first',
          severity: 'success',
        });
      } catch (error) {
        toast.openToast({
          headMsg: 'Failed',
          message: 'please connect api first',
          severity: 'error',
        });
      }
    },
    validationSchema: yup.object({
      name: yup.string().required('Name is required'),
      email: yup.string().required('Name is required'),
      roleAccess: yup.string().required('Name is required'),
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
  } = formik;
  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Box sx={{ padding: '24px', margin: 0 }}>
          <FormLabel
            text="SKU Name"
            error={touched.name && Boolean(errors.name)}
            helperText={touched.name && errors.name && `${errors.name}`}
            required
          >
            <TextField
              type="text"
              name="name"
              placeholder="Input SKU name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
            />
          </FormLabel>
          <FormLabel
            error={values.imageUrl.length < 1}
            helperText={
              values.imageUrl.length < 1 && 'Product Image(s) are mandatory'
            }
            text="Images (Foto)"
            required
          >
            <InputImage
              label="SKU"
              maxImage={3}
              values={values.imageUrl}
              onChange={(e: any) => setFieldValue('imageUrl', e)}
            />
          </FormLabel>
          <FormLabel
            text="Origin"
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email && `${errors.email}`}
            required
          >
            <TextField
              type="text"
              name="origin"
              placeholder="Insert Origin"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
            />
          </FormLabel>
          <FormLabel
            text="Variety"
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email && `${errors.email}`}
          >
            <TextField
              type="text"
              name="variety"
              placeholder="Insert Variety"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
            />
          </FormLabel>
          <FormLabel
            text="Diameter"
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email && `${errors.email}`}
          >
            <TextField
              type="text"
              name="diameter"
              placeholder="Insert Diameter"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
            />
          </FormLabel>
          <FormLabel
            text="Length"
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email && `${errors.email}`}
          >
            <TextField
              type="text"
              name="length"
              placeholder="Insert Length"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
            />
          </FormLabel>
          <FormLabel
            text="Weight Per Pcs"
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email && `${errors.email}`}
            required
          >
            <TextField
              type="text"
              name="weight"
              placeholder="Insert Weight Per Pcs"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
            />
          </FormLabel>
          <FormLabel
            text="Color"
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email && `${errors.email}`}
          >
            <TextField
              type="text"
              name="color"
              placeholder="Insert Color"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
            />
          </FormLabel>
          <FormLabel
            text="Shape"
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email && `${errors.email}`}
          >
            <TextField
              type="text"
              name="shape"
              placeholder="Insert Shape"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
            />
          </FormLabel>
          <FormLabel
            text="Uniformity"
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email && `${errors.email}`}
          >
            <TextField
              type="text"
              name="uniformity"
              placeholder="Insert Uniformity"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
            />
          </FormLabel>
          <FormLabel
            text="Firmness"
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email && `${errors.email}`}
          >
            <TextField
              type="text"
              name="firmness"
              placeholder="Insert Firmness"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
            />
          </FormLabel>
          <FormLabel
            text="Quality Criteria"
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email && `${errors.email}`}
            required
          >
            <TextField
              type="text"
              name="quality_criteria"
              placeholder="Insert Quality Criteria"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
            />
          </FormLabel>
          <FormLabel
            text="Handling Instruction"
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email && `${errors.email}`}
          >
            <TextField
              type="text"
              name="handling_instruction"
              placeholder="Insert Handling Instruction"
              value={values.email}
              multiline
              rows={4}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
            />
          </FormLabel>
          <FormLabel
            text="Reject"
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email && `${errors.email}`}
            required
          >
            <TextField
              type="text"
              name="reject"
              placeholder="Insert Reject"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
            />
          </FormLabel>
          <FormLabel text="Reject Photo (Foto Ditolak)">
            <InputImage
              label="SKU"
              maxImage={3}
              values={values.imageUrlRejected}
              onChange={(e: any) => setFieldValue('imageUrlRejected', e)}
            />
          </FormLabel>
          {/* <FormLabel
            text="Role Access"
            error={touched.roleAccess && Boolean(errors.roleAccess)}
            helperText={
              touched.roleAccess && errors.roleAccess && `${errors.roleAccess}`
            }
          >
            <Autocomplete
              id="role"
              options={[]}
              onChange={(e, value) => {
                setFieldValue('roleAccess', value);
              }}
              isOptionEqualToValue={(option) => option === values.roleAccess}
              getOptionLabel={(option) => `${option}`}
              value={values.roleAccess}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="roleAccess"
                  onBlur={handleBlur}
                  placeholder="Select Role Access"
                />
              )}
            />
          </FormLabel> */}
        </Box>
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
          <Button variant="text" color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isValid}>
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
}
