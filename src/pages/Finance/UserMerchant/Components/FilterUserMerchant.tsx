/* eslint-disable radix */
import FormControl from 'components/FormLabel';
import UseParams from 'hooks/useParams';
import {
  getAllAreaFinancing,
  getAllBatch,
  getAllCategoryFinancing,
} from 'service/Finance/config';
import {
  Autocomplete,
  Box,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Button,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useFormik } from 'formik';
import numberSeperator from 'utils/numberSeperator';
import DateTimePicker from 'components/DateTimePicker';
import React, { useMemo } from 'react';
import { Type } from '../../hooks/constumer.config';

export default function FilterUserMerchant({
  onChangeValue,
}: {
  onChangeValue: (value: any) => void;
}) {
  const areaParams = UseParams({ count: 25 });
  const areaQuery = useQuery({
    queryKey: ['/area', areaParams.params],
    queryFn: () => getAllAreaFinancing(areaParams.params),
    // enabled: Boolean(areaParams.searchValue),
    keepPreviousData: true,
  });
  const categoryParams = UseParams({ count: 25 });
  const categoryQuery = useQuery({
    queryKey: ['/jelajah-category', categoryParams.params],
    queryFn: () => getAllCategoryFinancing(categoryParams.params),
    // enabled: Boolean(categoryParams.searchValue),
    keepPreviousData: true,
  });
  const batchParams = UseParams({ count: 25 });
  const batchQuery = useQuery({
    queryKey: ['/financing/user/batch', batchParams.params],
    queryFn: () => getAllBatch(batchParams.params),
    // enabled: Boolean(areaParams.searchValue),
    keepPreviousData: true,
  });

  const formik = useFormik({
    initialValues: {
      area: [],
      category_jelajah: [],
      batch: [],
      user_type_id: null,
      min_limit_request: '',
      max_limit_request: '',
      min_limit_cash: '',
      max_limit_cash: '',
      min_date_created: null,
      max_date_created: null,
      min_date_joined: null,
      max_date_joined: null,
    },
    onSubmit: (values) => {
      const payload = {
        // @ts-ignore
        area_id: values.area.map((val) => val.id),
        // @ts-ignore
        category_jelajah_id: values.category_jelajah.map((val) => val.id),
        batch_id: values.batch,
        user_type_id: values.user_type_id,
        min_limit_request: values.min_limit_request,
        max_limit_request: values.max_limit_request,
        min_limit_cash: values.min_limit_cash,
        max_limit_cash: values.max_limit_cash,
        // @ts-ignore
        min_date_created: values.min_date_created?.unix(),
        // @ts-ignore
        max_date_created: values.max_date_created?.unix(),
        // @ts-ignore
        min_date_joined: values.min_date_joined?.unix(),
        // @ts-ignore
        max_date_joined: values.max_date_joined?.unix(),
      };

      Object.keys(payload).forEach((key) => {
        // @ts-ignore
        if (!payload[key]) {
          // @ts-ignore
          delete payload[key];
        }
      }); // eslint-disable-line

      console.log(payload);
    },
  });

  const errorHandle = useMemo(() => {
    const errors: any = {};
    if (formik.values.min_limit_request > formik.values.max_limit_request) {
      errors.limit_request = 'Minimal limit request cannot be greater';
    }
    if (formik.values.min_limit_cash > formik.values.max_limit_cash) {
      errors.limit_cash = 'Minimal limit cash cannot be greater';
    }
    if (
      (formik.values.min_limit_request || formik.values.max_limit_request) &&
      (!formik.values.min_limit_request || !formik.values.max_limit_request)
    ) {
      errors.limit_request = 'Please fill the limit request';
    }

    if (
      (formik.values.min_limit_cash || formik.values.max_limit_cash) &&
      (!formik.values.min_limit_cash || !formik.values.max_limit_cash)
    ) {
      errors.limit_cash = 'Please fill the limit cash';
    }

    if (
      (formik.values.min_date_created || formik.values.max_date_created) &&
      (!formik.values.min_date_created || !formik.values.max_date_created)
    ) {
      errors.date_created = 'Please fill the date created';
    }

    if (
      // @ts-ignore
      formik.values.min_date_created?.isAfter(formik.values.max_date_created)
    ) {
      errors.date_created = 'Minimal date cannot be greater than maximal date';
    }

    if (
      (formik.values.min_date_joined || formik.values.max_date_joined) &&
      (!formik.values.min_date_joined || !formik.values.max_date_joined)
    ) {
      errors.date_joined = 'Please fill the date joined';
    }

    // @ts-ignore
    if (formik.values.min_date_joined?.isAfter(formik.values.max_date_joined)) {
      errors.date_joined = 'Minimal date cannot be greater than maximal date';
    }

    return errors;
  }, [formik.values]);

  return (
    <Grid
      container
      spacing={2}
      component="form"
      mt={2}
      onSubmit={formik.handleSubmit}
    >
      <Grid item xs={12} md={3}>
        <FormControl
          text="Area"
          //   error={formik.touched?.area && Boolean(formik.errors?.area)}
          //   helperText={formik.touched?.area ? formik.errors?.area : ''}
        >
          <Autocomplete
            multiple
            options={
              areaQuery.data?.data.map((val) => ({
                id: val.id,
                name: val.title,
              })) || []
            }
            noOptionsText={
              !areaParams.searchValue ? 'Type to search area' : 'No option'
            }
            inputValue={areaParams.searchValue}
            onInputChange={(_, newInputValue) => {
              areaParams.handleSearch(newInputValue);
            }}
            loading={areaQuery.isFetching}
            getOptionLabel={(item) => item.name}
            value={formik.values.area}
            onChange={(e, value) => formik.setFieldValue('area', value)}
            onBlur={() => {
              formik.setFieldTouched('area');
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                name="area"
                placeholder="Example: Pasar Modern BSD"
                error={formik.touched?.area && Boolean(formik.errors?.area)}
              />
            )}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={3}>
        <FormControl
          text="Category"
          //   error={
          //     formik.touched?.category_jelajah &&
          //     Boolean(formik.errors?.category_jelajah)
          //   }
          //   helperText={
          //     formik.touched?.category_jelajah
          //       ? formik.errors?.category_jelajah
          //       : ''
          //   }
        >
          <Autocomplete
            multiple
            options={
              categoryQuery.data?.data.map((val) => ({
                id: val.id,
                name: decodeURIComponent(val.name),
              })) || []
            }
            noOptionsText={
              !categoryParams.searchValue
                ? 'Type to search category'
                : 'No option'
            }
            inputValue={categoryParams.searchValue}
            onInputChange={(_, newInputValue) => {
              categoryParams.handleSearch(newInputValue);
            }}
            loading={categoryQuery.isFetching}
            getOptionLabel={(item) => item.name}
            value={formik.values.category_jelajah}
            onChange={(e, value) =>
              formik.setFieldValue('category_jelajah', value)
            }
            onBlur={() => {
              formik.setFieldTouched('category_jelajah');
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                name="category_jelajah"
                placeholder="Example: Pasar Modern BSD"
                error={
                  formik.touched?.category_jelajah &&
                  Boolean(formik.errors?.category_jelajah)
                }
              />
            )}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={3}>
        <FormControl text="Batch">
          <Autocomplete
            multiple
            options={batchQuery.data?.data.map((val) => val.id) || []}
            noOptionsText={
              !batchParams.searchValue ? 'Type to search batch' : 'No option'
            }
            inputValue={batchParams.searchValue}
            onInputChange={(_, newInputValue) => {
              batchParams.handleSearch(newInputValue);
            }}
            loading={batchQuery.isFetching}
            // @ts-ignore
            getOptionLabel={(item) => item}
            value={
              // @ts-ignore
              formik.values.batch
            }
            onChange={(e, value) => formik.setFieldValue('batch', value)}
            onBlur={(e) => {
              formik.setFieldTouched('batch');
            }}
            // onBlur={() => {
            //   formik.setFieldTouched('area');
            // }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Select Batch number"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#fff',
                  },
                }}
                // error={
                //   formik.touched?.user_data?.area &&
                //   Boolean(
                //     formik.errors?.user_data?.area,
                //   )
                // }
              />
            )}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={3}>
        <FormControl
          text="User type"
          required
          error={
            formik.touched.user_type_id && Boolean(formik.errors.user_type_id)
          }
          helperText={
            formik.touched.user_type_id ? formik.errors.user_type_id : ''
          }
        >
          <Autocomplete
            options={Object.keys(Type)}
            // @ts-ignore
            getOptionLabel={(item) => Type[item]}
            value={formik.values.user_type_id}
            onChange={(e, value) => {
              formik.setFieldValue('user_type_id', value);
            }}
            onBlur={() => {
              formik.setFieldTouched('user_type_id');
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                name="user_type_id"
                placeholder="Select user type"
                error={
                  formik.touched.user_type_id &&
                  Boolean(formik.errors.user_type_id)
                }
              />
            )}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl
          text="limit request"
          error={
            (formik.touched?.min_limit_request ||
              formik.touched.max_limit_request) &&
            Boolean(errorHandle?.limit_request)
          }
          helperText={
            (formik.touched?.min_limit_request ||
              formik.touched.max_limit_request) &&
            errorHandle?.limit_request
          }
        >
          <Stack gap={1} direction="row" alignItems="center">
            <TextField
              fullWidth
              placeholder="Input Minimal limit request"
              name="min_limit_request"
              onBlur={formik.handleBlur}
              onKeyDown={(evt) =>
                ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault()
              }
              error={
                formik.touched?.min_limit_request &&
                Boolean(formik.errors?.min_limit_request)
              }
              value={numberSeperator(formik.values?.min_limit_request || '')}
              onChange={(e) => {
                const value = e.target.value
                  // @ts-ignore
                  .replaceAll('.', '')
                  .replace(/[^0-9.]/g, '')
                  .replace(/(\..*?)\..*/g, '$1');

                formik.setFieldValue(
                  'min_limit_request',
                  parseInt(value || '0'),
                );
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">Rp</InputAdornment>
                ),
              }}
            />
            <p>-</p>
            <TextField
              fullWidth
              placeholder="Input Maximal limit request"
              name="max_limit_request"
              onBlur={formik.handleBlur}
              onKeyDown={(evt) =>
                ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault()
              }
              error={
                formik.touched?.max_limit_request &&
                Boolean(formik.errors?.max_limit_request)
              }
              value={numberSeperator(formik.values?.max_limit_request || '')}
              onChange={(e) => {
                const value = e.target.value
                  // @ts-ignore
                  .replaceAll('.', '')
                  .replace(/[^0-9.]/g, '')
                  .replace(/(\..*?)\..*/g, '$1');

                formik.setFieldValue(
                  'max_limit_request',
                  parseInt(value || '0'),
                );
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">Rp</InputAdornment>
                ),
              }}
            />
          </Stack>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl
          text="limit cash"
          error={
            (formik.touched?.min_limit_cash || formik.touched.max_limit_cash) &&
            Boolean(errorHandle?.limit_cash)
          }
          helperText={
            (formik.touched?.min_limit_cash || formik.touched.max_limit_cash) &&
            errorHandle?.limit_cash
          }
        >
          <Stack gap={1} direction="row" alignItems="center">
            <TextField
              fullWidth
              placeholder="Input Minimal limit cash"
              name="min_limit_cash"
              onBlur={formik.handleBlur}
              onKeyDown={(evt) =>
                ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault()
              }
              error={
                formik.touched?.min_limit_cash &&
                Boolean(formik.errors?.min_limit_cash)
              }
              value={numberSeperator(formik.values?.min_limit_cash || '')}
              onChange={(e) => {
                const value = e.target.value
                  // @ts-ignore
                  .replaceAll('.', '')
                  .replace(/[^0-9.]/g, '')
                  .replace(/(\..*?)\..*/g, '$1');

                formik.setFieldValue('min_limit_cash', parseInt(value || '0'));
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">Rp</InputAdornment>
                ),
              }}
            />
            <p>-</p>
            <TextField
              fullWidth
              placeholder="Input Maximal limit cash"
              name="max_limit_cash"
              onBlur={formik.handleBlur}
              onKeyDown={(evt) =>
                ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault()
              }
              error={
                formik.touched?.max_limit_cash &&
                Boolean(formik.errors?.max_limit_cash)
              }
              value={numberSeperator(formik.values?.max_limit_cash || '')}
              onChange={(e) => {
                const value = e.target.value
                  // @ts-ignore
                  .replaceAll('.', '')
                  .replace(/[^0-9.]/g, '')
                  .replace(/(\..*?)\..*/g, '$1');

                formik.setFieldValue('max_limit_cash', parseInt(value || '0'));
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">Rp</InputAdornment>
                ),
              }}
            />
          </Stack>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl
          text="Date Created"
          error={Boolean(errorHandle?.date_created)}
          helperText={errorHandle?.date_created}
        >
          <Stack gap={1} direction="row" alignItems="center">
            <DateTimePicker
              onChange={(date) =>
                formik.setFieldValue('min_date_created', date)
              }
              value={formik.values.min_date_created}
            />

            <p>-</p>
            <DateTimePicker
              onChange={(date) =>
                formik.setFieldValue('max_date_created', date)
              }
              value={formik.values.max_date_created}
            />
          </Stack>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl
          text="Date Joined"
          error={Boolean(errorHandle?.date_joined)}
          helperText={errorHandle?.date_joined}
        >
          <Stack gap={1} direction="row" alignItems="center">
            <DateTimePicker
              onChange={(date) => formik.setFieldValue('min_date_joined', date)}
              value={formik.values.min_date_joined}
            />

            <p>-</p>
            <DateTimePicker
              onChange={(date) => formik.setFieldValue('max_date_joined', date)}
              value={formik.values.max_date_joined}
            />
          </Stack>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 2,
          }}
        >
          <Button
            onClick={() => {
              formik.resetForm();
            }}
            variant="text"
          >
            Reset
          </Button>
          <Button type="submit" disabled={Object.keys(errorHandle).length > 0}>
            Apply
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}
