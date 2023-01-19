/* eslint-disable no-restricted-syntax */
/* eslint-disable radix */
/* eslint-disable guard-for-in */
import React, { useEffect, useState, useCallback } from 'react';
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
import { useAppDispatch } from 'store/hooks';
import { useSelector } from 'react-redux';
import { debounce } from 'lodash';
import {
  CancelButton,
  ChildMenu,
  Control,
  HorizontalContent,
  Menu,
  SubmitButton,
  Title,
  TitleWrapper,
  ActionWrapper,
  ContentWrapper,
} from './form.styled';
import { roleAccessAction } from '../../../store/slice/RoleAccess';
// eslint-disable-next-line import/no-named-as-default
import RoleAccess from '../../../models/RoleAccess';

interface RoleAccessFormProps {
  open: boolean;
  onClose(): void;
  isEdit: boolean;
}

export default function RoleAccessForm(props: RoleAccessFormProps) {
  const { open, onClose, isEdit } = props;
  const dispatch = useAppDispatch();

  // form
  const [accessMenu, setAccessMenu] = useState<{ [id: number]: boolean }>({});
  const [defaultMenu, setDefaultMenu] = useState<{ [id: number]: boolean }>({});
  const toast = useToast();
  const initialFormValue = {
    name: '',
    access: defaultMenu,
  };
  const [initialValues, setInitialValues] = useState<{
    name: string;
    access: { [id: number]: boolean };
  }>(initialFormValue);

  useEffect(() => {
    if (!isEdit) {
      setInitialValues(initialFormValue);
      setAccessMenu(defaultMenu);
    }
  }, [open, isEdit]);

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
        };
        dispatch(roleAccessAction.add(body));
        toast.openToast({
          headMsg: 'Success add Role Access',
          message: 'Succesfully add new role access',
          severity: 'success',
        });
        onClose();
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        resetForm({ name: '', access: defaultMenu });
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
    resetForm,
  } = formik;

  // handle menu access
  const [accordionMenu, setAccordionMenu] = useState<any>([]);
  const listOfMenu = useSelector((state: any) => state.roleAccess.menuData);
  const collectItems = (obj: any) => Object.keys(obj).filter((k) => obj[k]);

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
    if (!isEdit) setDefaultMenu({ ...access });
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

  // validation role name exist
  const errorName = useSelector(
    (state: any) => state.roleAccess.errorName.data,
  );
  const nameIsExist = `Role Name is exist, please use another name`;

  const handleCheckName = async (value: string) => {
    dispatch(roleAccessAction.checkRoleName(value));
  };

  const checkingName = useCallback(debounce(handleCheckName, 100), []);

  const handleChangeRoleName = (value: string) => {
    checkingName(value);
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        setAccessMenu(defaultMenu);
        // setInitialValues(initialFormValue);
        onClose();
        resetForm();
      }}
    >
      <form onSubmit={handleSubmit}>
        <TitleWrapper>
          <Title>Add New Role Access</Title>
          <CloseIcon
            onClick={() => {
              setAccessMenu(defaultMenu);
              // setInitialValues(initialFormValue);
              onClose();
              resetForm();
            }}
          />
        </TitleWrapper>
        <ContentWrapper>
          <FormLabel
            text="Role Name"
            required
            error={
              (touched.name && Boolean(errors.name)) ||
              (touched.name && errorName)
            }
            helperText={
              (touched.name && errors.name && `${errors.name}`) ||
              (touched.name && errorName && nameIsExist)
            }
          >
            <TextField
              type="text"
              name="name"
              fullWidth
              placeholder="Input Role Name"
              value={values.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFieldValue('name', e.target.value);
                if (!errors.name) handleChangeRoleName(e.target.value);
              }}
              onBlur={(
                e: React.FocusEvent<
                  HTMLInputElement | HTMLTextAreaElement,
                  Element
                >,
              ) => {
                handleBlur(e);
                if (!errors.name) handleChangeRoleName(e.target.value);
              }}
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
                {parentMenu.sub_menu !== null &&
                  parentMenu.sub_menu.map((menu: any) =>
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
        </ContentWrapper>
        <ActionWrapper>
          <CancelButton
            onClick={() => {
              setAccessMenu(defaultMenu);
              resetForm();
              onClose();
            }}
          >
            Cancel
          </CancelButton>
          <SubmitButton
            type="submit"
            disabled={
              !(
                isValid &&
                dirty &&
                !errorName &&
                collectItems(accessMenu).length > 0
              )
            }
          >
            Add
          </SubmitButton>
        </ActionWrapper>
      </form>
    </Dialog>
  );
}
