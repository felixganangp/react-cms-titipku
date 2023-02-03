import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { CreateRoleUser, CreateRoleUserPayload } from 'models/RoleUser';

import { roleUserAction } from 'store/slice/RoleUser';
import { useAppDispatch } from 'store/hooks';

interface DeleteConfirmTypes {
  onClose: () => void;
  data: CreateRoleUser | null;
}

const typeChangeStatus = (id: number | undefined) => {
  let nameChange = 'status_name';
  let colorChange = '#cecece';

  if (id === 1) {
    nameChange = 'Inactive';
    colorChange = '#c10000';
  }

  if (id === 2) {
    nameChange = 'Active';
    colorChange = '#008e58';
  }

  return { nameChange, colorChange };
};
export default function DeleteConfirm(props: DeleteConfirmTypes) {
  const dispatch = useAppDispatch();
  // const roleAccesses = useAppSelector((state) => state.roleAccess);

  const onChangeStatus = () => {
    if (props.data?.id) {
      const { roleAccess, name, ...newData } = props.data;

      const payload: CreateRoleUserPayload = {
        ...newData,
        id_status: props.data.id_status === 1 ? 2 : 1,
        full_name: name,
        id_role: roleAccess?.id,
      };
      dispatch(roleUserAction.editStatusRoleUser(payload));
      props.onClose();
    }
  };

  return (
    <Box>
      <Box p={3}>
        <Typography>
          Are you sure to set to{' '}
          {typeChangeStatus(props.data?.id_status).nameChange} this user?
        </Typography>
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
        <Button
          variant="text"
          onClick={props.onClose}
          color={props.data?.id_status === 2 ? 'error' : 'success'}
        >
          Cancel
        </Button>
        <Button
          color={props.data?.id_status === 2 ? 'success' : 'error'}
          onClick={onChangeStatus}
        >
          Set to {typeChangeStatus(props.data?.id_status).nameChange}
        </Button>
      </Box>
    </Box>
  );
}
