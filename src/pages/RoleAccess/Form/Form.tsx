import React, { useEffect, useState } from 'react';
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
import { useAppDispatch } from 'store/hooks';
import { 
  ActionWrapper,
  CancelButton,
  ChildMenu,
  ContentWrapper,
  Control,
  HorizontalContent,
  Menu,
  SubmitButton,
  Title,
  TitleWrapper,
} from './form.styled';
import { roleAccessAction, selectMenu } from '../../../store/slice/RoleAccess';
import { useSelector } from 'react-redux';
import RoleAccess from '../../../models/RoleAccess';

interface RoleAccessFormProps {
  open: boolean;
  onClose(): void;
  initialValues: { name: string; access: { [id: number]: boolean } };
  categorizedMenu: {
    parent: number;
    menu: number[];
  }[];
}

export default function RoleAccessForm(props: RoleAccessFormProps) {
  const dispatch = useAppDispatch();
  const { open, onClose, initialValues, categorizedMenu } = props;
  const [accordionMenu, setAccordionMenu] = useState<any>([]);
  const listOfMenu = useSelector((state: any) => state.roleAccess.menuData);

  const collectItems = (obj: any) => Object.keys(obj).filter(k => obj[k]);

  // handle menu access
  const [accessMenu, setAccessMenu] = useState<{ [id: number]: boolean }>({});
  const handleChangeAccessMenu = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number,
  ) => {
    setAccessMenu({ ...accessMenu, [id]: !!event.target.checked });
  };

  useEffect(() => {
    const access: { [x: number]: boolean } = {};
    if (listOfMenu !== undefined) {
      for (let i = 0; i < listOfMenu.length; i += 1) {
        access[listOfMenu[i].id] = false;
        if (listOfMenu[i].sub_menu !== null) {
          for (let a = 0; a < listOfMenu[i].sub_menu.length; a += 1) {
            access[listOfMenu[i].sub_menu[a].id] = false;
          }
        }
      }
    }
    setAccessMenu({ ...access });
  }, [listOfMenu]);

  useEffect(() => {
    const mappedData = [];
    if (listOfMenu !== undefined || listOfMenu.length > 0) {
      for (let i = 0; i < listOfMenu.length; i += 1) {
        if (listOfMenu[i].sub_menu !== null) {
          mappedData.push({
            parent: listOfMenu[i].id,
            child: listOfMenu[i].sub_menu.map((child: any) => child.id),
          });
        } else {
          mappedData.push({
            parent: listOfMenu[i].id,
          });
        }
      }
    }
    setAccordionMenu(mappedData);
  }, [listOfMenu]);

  const handleChangeChild = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
  ) => {
    const changedChild: { [id: number]: boolean } = {};
    console.log('changed child, parent id', id);
    for (let i = 0; i < accordionMenu.length; i += 1) {
      if (accordionMenu[i].parent === id) {
        if (accordionMenu[i].child) {
          for (let j = 0; j < accordionMenu[i].child.length; j += 1) {
            changedChild[accordionMenu[i].child[j]] = !!e.target.checked;
          }
        }
        setAccessMenu({
          ...accessMenu,
          ...changedChild,
          [id]: !!e.target.checked,
        });
      }
    }
  };

  const handleChangeParentChild = (
    e: React.ChangeEvent<HTMLInputElement>,
    parentId: number,
    childId: number,
  ) => {
    if (accessMenu[parentId] === false) {
      setAccessMenu({
        ...accessMenu,
        [parentId]: !!e.target.checked,
        [childId]: !!e.target.checked,
      });
    } else {
      setAccessMenu({
        ...accessMenu,
        [childId]: !!e.target.checked,
      });
    }
  };

  // formik
  const toast = useToast();
  const formik = useFormik({
    initialValues,
    onSubmit: async (value) => {
      const controls = [];
      let body: RoleAccess;
      try {
        for (const key in accessMenu) {
          controls.push({
            id: parseInt(key),
            activation: accessMenu[key],
          });
        }

        body = {
          name: value.name,
          description: '',
          account_type: 'cms',
          controls,
        }
        dispatch(roleAccessAction.add(body));

        toast.openToast({
          headMsg: 'Success',
          message: 'toast message',
          severity: 'success',
        });

        onClose();

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
    dirty,
  } = formik;

  return (
    <div>
      <div>
        <Dialog open={open} onClose={() => onClose()}>
          <TitleWrapper>
            <Title>Add New Role Access</Title>
            <CloseIcon onClick={() => onClose()} />
          </TitleWrapper>
          <form onSubmit={handleSubmit}>
          <Box sx={{ padding: '24px', margin: 0 }}>
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
                {listOfMenu.map((parentMenu: any) => (
                  <AccordionOnDetails
                    title={parentMenu.menu}
                    key={parentMenu.id}
                    parent
                    havingChild={parentMenu.sub_menu}
                    headerContent={
                      <Control
                        style={{ marginRight: '0px' }}
                        label=""
                        key={parentMenu.id}
                        control={
                          <Checkbox
                            checked={accessMenu[parentMenu.id]}
                            onChange={(e) => {
                              handleChangeChild(e, parentMenu.id);
                            }}
                          />
                        }
                      />
                    }
                  >
                    {parentMenu.sub_menu !== null && parentMenu.sub_menu.map((menu: any) =>
                      menu.sub_menu !== null ? (
                        <HorizontalContent>
                          <Menu>{menu.menu}</Menu>
                          <Control
                            label=""
                            key={menu.id}
                            control={
                              <Checkbox
                                checked={accessMenu[menu.id]}
                                onChange={(e) => {
                                  handleChangeParentChild(
                                    e,
                                    parentMenu.id,
                                    menu.id,
                                  );
                                }}
                              />
                            }
                          />
                        </HorizontalContent>
                      ) : (
                        <Box style={{ paddingLeft: '18px' }}>
                          <AccordionOnDetails
                            title={menu.menu}
                            key={menu.id}
                            parent={false}
                            havingChild={menu.sub_menu}
                            headerContent={
                              <Control
                                label=""
                                key={menu.id}
                                control={
                                  <Checkbox
                                    checked={accessMenu[menu.id]}
                                    onChange={(e) => {
                                      handleChangeParentChild(
                                        e,
                                        parentMenu.id,
                                        menu.id,
                                      );
                                      // handleChangeAccessMenu(e, menu.id);
                                    }}
                                  />
                                }
                              />
                            }
                          >
                            {menu.child.map((childMenu: any) => (
                              <HorizontalContent key={childMenu.id}>
                                <ChildMenu>{childMenu.menu}</ChildMenu>
                                <Control
                                  label=""
                                  key={childMenu.id}
                                  control={
                                    <Checkbox
                                      checked={accessMenu[childMenu.id]}
                                      onChange={(e) =>
                                        handleChangeAccessMenu(e, childMenu.id)
                                      }
                                    />
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
                <CancelButton onClick={() => onClose()}>Cancel</CancelButton>
                <SubmitButton 
                  type="submit" 
                  disabled={!(isValid && dirty && collectItems(accessMenu).length > 0)}
                >
                  Add
                </SubmitButton>
              </Box>
            </form>
        </Dialog>
      </div>
    </div>
  );
}
