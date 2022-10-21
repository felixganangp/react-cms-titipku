import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import AccordionOnDetails from 'components/Accordion/Details';
import { useFormik } from 'formik';
import * as yup from 'yup';
import useToast from 'hooks/useToast';
import FormLabel from 'components/FormLabel';
import { FormControlLabel } from '@mui/material';
import {
  ActionWrapper,
  CancelButton,
  ChildMenu,
  ContentWrapper,
  HorizontalContent,
  Menu,
  SubmitButton,
  Title,
  TitleWrapper,
} from './form.styled';

interface RoleAccessFormProps {
  open: boolean;
  onClose(): void;
  listOfMenu: {
    id: number;
    name: string;
    is_checked: boolean;
    child: {
      id: number;
      name: string;
      is_checked: boolean;
      child: {
        id: number;
        name: string;
        is_checked: boolean;
      }[];
    }[];
  }[];
}

const initial = {
  name: '',
  access: {},
};

export default function RoleAccessForm(props: RoleAccessFormProps) {
  const { open, onClose, listOfMenu } = props;
  // formik
  const [initialValues, setInitialValues] = useState(initial);
  const toast = useToast();
  const formik = useFormik({
    initialValues,
    onSubmit: async (value) => {
      try {
        toast.openToast({
          headMsg: 'Success',
          message: 'toast message',
          severity: 'success',
        });
      } catch (error) {
        toast.openToast({
          headMsg: 'Failed',
          message: 'toast message',
          severity: 'error',
        });
      }
    },
    validationSchema: yup.object({
      name: yup.string().required('Role name is required'),
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

  // handle menu access
  const [accessMenu, setAccessMenu] = useState<{ [id: number]: boolean }>({});
  const handleChangeAccessMenu = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
  ) => {
    setAccessMenu({ ...accessMenu, [id]: !!e.target.checked });
  };

  console.log('access menu', accessMenu);

  return (
    <div>
      <div>
        <Dialog open={open} onClose={() => onClose()}>
          <TitleWrapper>
            <Title>Add New Role User</Title>
            <CloseIcon onClick={() => onClose()} />
          </TitleWrapper>
          <ContentWrapper>
            <form onSubmit={handleSubmit}>
              <FormLabel
                text="Role Name"
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name && `${errors.name}`}
                required
              >
                <TextField
                  type="text"
                  name="name"
                  fullWidth
                  placeholder="Input Role Name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </FormLabel>
              <FormGroup>
                {listOfMenu.map((parentMenu) => (
                  <AccordionOnDetails
                    title={parentMenu.name}
                    key={parentMenu.id}
                    parent
                    checked={parentMenu.is_checked}
                  >
                    {parentMenu.child.map((menu) =>
                      menu.child.length === 0 ? (
                        <HorizontalContent>
                          <Menu>{menu.name}</Menu>
                          <FormControlLabel
                            sx={{ marginRight: '0px' }}
                            label=""
                            key={menu.id}
                            control={<Checkbox checked={accessMenu[menu.id]} />}
                            onChange={(e: any) =>
                              handleChangeAccessMenu(e, menu.id)
                            }
                          />
                        </HorizontalContent>
                      ) : (
                        <Box style={{ paddingLeft: '18px' }}>
                          <AccordionOnDetails
                            title={menu.name}
                            key={menu.id}
                            parent={false}
                            checked={menu.is_checked}
                          >
                            {menu.child.map((childMenu) => (
                              <HorizontalContent key={childMenu.id}>
                                <ChildMenu>{childMenu.name}</ChildMenu>
                                <FormControlLabel
                                  label=""
                                  sx={{ marginRight: '0px' }}
                                  key={childMenu.id}
                                  control={
                                    <Checkbox
                                      checked={accessMenu[childMenu.id]}
                                    />
                                  }
                                  onChange={(e: any) =>
                                    handleChangeAccessMenu(e, childMenu.id)
                                  }
                                />
                              </HorizontalContent>
                            ))}
                          </AccordionOnDetails>
                        </Box>
                      ),
                    )}
                  </AccordionOnDetails>
                ))}
              </FormGroup>
            </form>
          </ContentWrapper>
          <ActionWrapper>
            <CancelButton>Cancel</CancelButton>
            <SubmitButton>Add</SubmitButton>
          </ActionWrapper>
        </Dialog>
      </div>
    </div>
  );
}
