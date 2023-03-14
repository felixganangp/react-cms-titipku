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
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { debounce } from 'lodash';
import { Button } from '@mui/material';
import {
  ChildMenu,
  Control,
  HorizontalContent,
  Menu,
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
  editValue: RoleAccess | null;
}

export default function RoleAccessFormPage(props: RoleAccessFormProps) {
  const { open, onClose, editValue } = props;
  const dispatch = useAppDispatch();
  const selectRoleAccess = useAppSelector((state) => state.roleAccess);

  console.log('edit value', editValue);

  // handle form
  const [accessMenu, setAccessMenu] = useState<{ [id: number]: boolean }>({});
  const toast = useToast();
  const initialFormValue = {
    name: '',
    access: accessMenu,
  };
  const [initialValues, setInitialValues] = useState<{
    name: string;
    access: { [id: number]: boolean };
  }>(initialFormValue);

  useEffect(() => {
    if (!editValue) {
      setInitialValues(initialFormValue);
      setAccessMenu(accessMenu);
    } else {
      setInitialValues({
        name: editValue.name,
        access: accessMenu,
      });
    }
  }, [open, editValue]);

  const handleSubmitForm = (body: any) => {
    if (!editValue) {
      body.description = '';
      dispatch(roleAccessAction.add(body));
      toast.openToast({
        headMsg: 'Role Access Added',
        message: '',
        severity: 'success',
      });
    } else {
      body.id = editValue.id;
      body.is_exist = editValue.is_exist;
      body.description = '';
      dispatch(roleAccessAction.update(body));
      toast.openToast({
        headMsg: 'Role Access Edited',
        message: '',
        severity: 'success',
      });
    }
  };

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
          account_type: 'cms',
          controls,
        };

        await handleSubmitForm(body);
        dispatch(roleAccessAction.fetchData(selectRoleAccess.params));
        onClose();
      } catch (error) {
        let message = '';
        if (!editValue) {
          message = 'Failed to create new role access';
        } else {
          message = 'Failed to update role access';
        }
        toast.openToast({
          headMsg: 'Failed',
          message,
          severity: 'error',
        });
      }
    },
    validationSchema: yup.object({
      name: yup.string().required('Please input role name'),
    }),
    enableReinitialize: true,
  });

  const {
    handleSubmit,
    values,
    handleBlur,
    errors,
    touched,
    setFieldValue,
    isValid,
    dirty,
    resetForm,
  } = formik;

  // handle menu access
  const [accordionMenu, setAccordionMenu] = useState<any>([]);
  const listOfMenu = useAppSelector((state: any) => state.roleAccess.menuData);
  const collectItems = (obj: any) => Object.keys(obj).filter((k) => obj[k]);

  const handleChangeAccessMenu = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number,
  ) => {
    setAccessMenu({ ...accessMenu, [id]: !!event.target.checked });
  };

  useEffect(() => {
    // for checked attribute on checkbox
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const access: { [x: number]: boolean } = {};
    if (listOfMenu !== undefined) {
      for (let i = 0; i < listOfMenu.length; i += 1) {
        access[listOfMenu[i].id] = listOfMenu[i].is_checked;
        if (listOfMenu[i].sub_menu !== null) {
          for (let a = 0; a < listOfMenu[i].sub_menu.length; a += 1) {
            access[listOfMenu[i].sub_menu[a].id] =
              listOfMenu[i].sub_menu[a].is_checked;
          }
        }
      }
    }
    setAccessMenu({ ...access });
  }, [listOfMenu]);

  useEffect(() => {
    // defining parent menu / child menu,
    // use for checking child when parent is checked
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
    // checking child when parent is checked
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
    // checking another child from same parent
    // + checking parent when one of its child checked
    // + uncheck parent when no one child checked
    e: React.ChangeEvent<HTMLInputElement>,
    parentId: number,
    childId: number,
  ) => {
    let totalTrue = 0;
    const childIds = accordionMenu.filter(
      (group: { parent: number }) => group.parent === parentId,
    )[0].child;
    // eslint-disable-next-line array-callback-return
    childIds.some((id: number) => {
      if (accessMenu[id] === true && id !== childId) totalTrue += 1;
    });

    if (accessMenu[parentId] === false) {
      setAccessMenu({
        ...accessMenu,
        [parentId]: !!e.target.checked,
        [childId]: !!e.target.checked,
      });
    } else if (totalTrue < 1 && accessMenu[childId] === true) {
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
  const errorName = useAppSelector(
    (state: any) => state.roleAccess.errorName.data,
  );
  const nameIsExist = `Role Name is exist, please use another name`;

  const handleCheckName = async (value: string) => {
    dispatch(roleAccessAction.checkRoleName(value));
  };

  const checkingName = useCallback(debounce(handleCheckName, 80), []);

  const handleChangeRoleName = (value: string) => {
    checkingName(value);
  };

  console.log('listOfMenu ->', listOfMenu);

  return (
    <Dialog
      data-testid="role-access-modal"
      open={open}
      onClose={() => {
        onClose();
        resetForm();
      }}
    >
      <form onSubmit={handleSubmit}>
        <TitleWrapper>
          <Title data-testid="role-access-form-title">
            {editValue ? 'Edit Role Access' : 'Add New Role Access'}
          </Title>
          <CloseIcon
            onClick={() => {
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
              (touched.name &&
                errorName &&
                !errors.name &&
                ((!editValue && errorName) ||
                  (editValue &&
                    errorName &&
                    values.name.trim() !== initialValues.name)))
            }
            helperText={
              (touched.name && errors.name && `${errors.name}`) ||
              (touched.name &&
                errorName &&
                !errors.name &&
                ((!editValue && errorName) ||
                  (editValue &&
                    errorName &&
                    values.name.trim() !== initialValues.name)) &&
                `${nameIsExist}`)
            }
          >
            <TextField
              type="text"
              name="name"
              fullWidth
              placeholder="Input Role Name"
              inputProps={{
                maxLength: 50,
                'data-testid': 'role-form-field-name',
              }}
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
                data-testid={`role-access-form-acc-header-${parentMenu.menu}`}
                title={parentMenu.menu}
                key={parentMenu.id + parentMenu.menu}
                parent
                havingChild={parentMenu.sub_menu}
                headerContent={
                  <Control
                    style={{ marginRight: '0px' }}
                    label=""
                    control={
                      <Checkbox
                        inputProps={
                          {
                            'aria-label': `checkbox-parent-${parentMenu.id}`,
                          }
                          // as React.InputHTMLAttributes<HTMLInputElement>
                        }
                        key={parentMenu.id + parentMenu.menu}
                        checked={accessMenu[parentMenu.id]}
                        onChange={(e) => {
                          handleChangeChild(e, parentMenu.id);
                        }}
                      />
                    }
                  />
                }
              >
                <div>
                  {parentMenu.sub_menu !== null &&
                    parentMenu.sub_menu.map((menu: any) =>
                      menu.sub_menu !== null ? (
                        <HorizontalContent>
                          <Menu>{menu.menu}</Menu>
                          <Control
                            label=""
                            control={
                              <Checkbox
                                inputProps={{
                                  'aria-label': `checkbox-menu-${menu.id}`,
                                }}
                                key={menu.id + menu.menu}
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
                            key={menu.id + menu.menu}
                            parent={false}
                            havingChild={menu.sub_menu}
                            headerContent={
                              <Control
                                label=""
                                control={
                                  <Checkbox
                                    inputProps={{
                                      'aria-label': `checkbox-menu-${menu.id}`,
                                    }}
                                    key={menu.id + menu.menu}
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
                            }
                          >
                            {menu.child.map((childMenu: any) => (
                              <HorizontalContent key={childMenu.id}>
                                <ChildMenu>{childMenu.menu}</ChildMenu>
                                <Control
                                  label=""
                                  control={
                                    <Checkbox
                                      inputProps={{
                                        'aria-label': `checkbox-child-${childMenu.id}`,
                                      }}
                                      checked={accessMenu[childMenu.id]}
                                      key={childMenu.id + childMenu.menu}
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
                </div>
              </AccordionOnDetails>
            ))}
          </FormGroup>
        </ContentWrapper>
        <ActionWrapper>
          <Button
            variant="text"
            color="error"
            onClick={() => {
              resetForm();
              onClose();
            }}
          >
            Cancel
          </Button>
          <Button
            data-testid="role-access-submit-btn"
            color="primary"
            type="submit"
            disabled={
              !(
                isValid &&
                dirty &&
                !editValue &&
                !errorName &&
                collectItems(accessMenu).length > 0
              ) &&
              (!editValue ||
                (editValue &&
                  errorName &&
                  values.name !== initialValues.name) ||
                collectItems(accessMenu).length < 1)
            }
          >
            {editValue ? 'Save' : 'Add'}
          </Button>
        </ActionWrapper>
      </form>
    </Dialog>
  );
}
