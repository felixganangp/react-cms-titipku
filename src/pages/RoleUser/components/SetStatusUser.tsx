import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { CreateRoleUser } from 'models/RoleUser';

import { roleAccessAction } from 'store/slice/RoleAccess';
import { useAppDispatch } from 'store/hooks';

interface DeleteConfirmTypes {
  onClose: () => void;
  data: CreateRoleUser | null;
}

export default function DeleteConfirm(props: DeleteConfirmTypes) {
  const dispatch = useAppDispatch();
  // const roleAccesses = useAppSelector((state) => state.roleAccess);

  const onChangeStatus = () => {
    if (props.data?.id) {
      dispatch(roleAccessAction.delete({ id: props.data.id }));
      props.onClose();
    }
  };
  console.log(props.data);
  return (
    <Box>
      <Box p={3}>
        <Typography>Are you sure to set to {data} this user?</Typography>
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
        <Button variant="text" onClick={props.onClose}>
          Cancel
        </Button>
        <Button color="error" onClick={onChangeStatus}>
          Set to Inactive
        </Button>
      </Box>
    </Box>
  );
}
