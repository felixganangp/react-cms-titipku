import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { RoleAccess } from 'models/RoleAccess';

import { roleAccessAction } from 'store/slice/RoleAccess';
import { useAppDispatch } from 'store/hooks';

interface DeleteConfirmTypes {
  onClose: () => void;
  onCancel: () => void;
  data: RoleAccess | null;
}

export default function DeleteConfirm(props: DeleteConfirmTypes) {
  const dispatch = useAppDispatch();
  // const roleAccesses = useAppSelector((state) => state.roleAccess);

  const onDelete = () => {
    if (props.data?.id) {
      dispatch(roleAccessAction.delete({ id: props.data.id }));
      props.onClose();
    }
  };
  return (
    <Box>
      <Box p={3}>
        <Typography>Are you sure to delete this role?</Typography>
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
          onClick={() => {
            props.onCancel();
          }}
        >
          Cancel
        </Button>
        <Button color="error" onClick={onDelete}>
          Delete
        </Button>
      </Box>
    </Box>
  );
}
