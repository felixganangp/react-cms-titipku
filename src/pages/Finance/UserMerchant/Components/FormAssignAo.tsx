import UseParams from 'hooks/useParams';
import { getAllOfficer } from 'service/Finance/config';
import { Autocomplete, Box, Button, Stack, TextField } from '@mui/material';
import FormControl from 'components/FormLabel';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { putCreateUser } from 'service/Finance/customer';
import useToast from 'hooks/useToast';

export default function FormAssignAo({
  id,
  handleClose,
  openModal,
}: {
  id?: string | number;
  handleClose: (isSubmited: boolean) => void;
  openModal?: boolean;
}) {
  const { openToast } = useToast();
  const updateUser = useMutation(putCreateUser);
  const areaParams = UseParams({ count: 25 });
  const officeQuery = useQuery({
    queryKey: ['/user/officer/', areaParams.params],
    queryFn: () => getAllOfficer(areaParams.params),
    // enabled: Boolean(areaParams.searchValue),
    keepPreviousData: true,
  });
  const formik = useFormik({
    initialValues: {
      ao_officer_id: null,
    },
    onSubmit: async (values) => {
      const formData = new FormData();
      await formData.append(
        'user_data',
        JSON.stringify(
          {
            // @ts-ignore
            ao_officer_id: values.ao_officer_id.id,
          },
          null,
          2,
        ),
      );
      updateUser.mutate(
        { id: String(id), data: formData },
        {
          onSuccess: () => {
            openToast({
              severity: 'success',
              headMsg: 'Success assign AO Officer',
            });
            handleClose(true);
          },
          onError: (err) => {
            openToast({
              severity: 'error',
              headMsg: 'Error assign AO Officer',
            });
          },
        },
      );
    },
    validationSchema: yup.object().shape({
      ao_officer_id: yup.mixed().required('AO Officer is required'),
    }),
  });
  return (
    <Box p="24px">
      <Box mt={2} />
      <FormControl
        text="AO"
        error={
          formik.touched?.ao_officer_id && Boolean(formik.errors?.ao_officer_id)
        }
        helperText={
          formik.touched?.ao_officer_id ? formik.errors?.ao_officer_id : ''
        }
      >
        <Autocomplete
          options={
            officeQuery.data?.data.map((val) => ({
              id: val.id,
              name: `${val.name} (${val.username})`,
            })) || []
          }
          noOptionsText={
            !areaParams.searchValue ? 'Type to search officer' : 'No option'
          }
          inputValue={areaParams.searchValue}
          onInputChange={(_, newInputValue) => {
            areaParams.handleSearch(newInputValue);
          }}
          loading={officeQuery.isFetching}
          getOptionLabel={(item) => item.name}
          value={formik.values?.ao_officer_id}
          onChange={(e, value) => formik.setFieldValue('ao_officer_id', value)}
          onBlur={() => {
            formik.setFieldTouched('user_data.area');
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              name="user_data.area"
              placeholder="Select AO Officer"
              error={
                formik.touched?.ao_officer_id &&
                Boolean(formik.errors?.ao_officer_id)
              }
            />
          )}
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
