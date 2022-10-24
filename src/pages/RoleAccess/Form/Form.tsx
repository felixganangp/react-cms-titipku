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

interface RoleAccessFormProps {
  open: boolean;
  onClose(): void;
  initialValues: { name: string; access: { [id: number]: boolean } };
  categorizedMenu: {
    parent: number;
    menu: number[];
  }[];
}

const listOfMenu = [
  {
    id: 1,
    name: 'Admin Panel',
    is_checked: false,
    child: [
      {
        id: 101,
        name: 'Role User',
        is_checked: false,
        child: [],
      },
      {
        id: 102,
        name: 'Role Access',
        is_checked: false,
        child: [],
      },
    ],
  },
  {
    id: 2,
    name: 'Products',
    is_checked: false,
    child: [
      {
        id: 201,
        name: 'Product Mangement',
        is_checked: false,
        child: [],
      },
      {
        id: 202,
        name: 'SKU Management',
        is_checked: false,
        child: [],
      },
      {
        id: 203,
        name: 'Category Management',
        is_checked: false,
        child: [],
      },
    ],
  },
  {
    id: 3,
    name: 'Lapak',
    is_checked: false,
    child: [
      {
        id: 301,
        name: 'Area',
        is_checked: false,
        child: [],
      },
      {
        id: 302,
        name: 'Lapak',
        is_checked: false,
        child: [],
      },
    ],
  },
  {
    id: 4,
    name: 'User',
    is_checked: false,
    child: [
      {
        id: 401,
        name: 'Nitiper',
        is_checked: false,
        child: [],
      },
      {
        id: 402,
        name: 'Jatiper',
        is_checked: false,
        child: [
          {
            id: 40201,
            name: 'Jatiper Management',
            is_checked: false,
          },
          {
            id: 40202,
            name: 'Jatiper Registration',
            is_checked: false,
          },
        ],
      },
    ],
  },
  {
    id: 5,
    name: 'Transaction',
    is_checked: false,
    child: [
      {
        id: 501,
        name: 'Transaction',
        is_checked: false,
        child: [],
      },
      {
        id: 502,
        name: 'Urgent Order',
        is_checked: false,
        child: [],
      },
    ],
  },
  {
    id: 6,
    name: 'Application',
    is_checked: false,
    child: [
      {
        id: 601,
        name: 'Notification',
        is_checked: false,
        child: [],
      },
      {
        id: 602,
        name: 'Banner',
        is_checked: false,
        child: [],
      },
      {
        id: 603,
        name: 'Event',
        is_checked: false,
        child: [],
      },
      {
        id: 604,
        name: 'Giveaway',
        is_checked: false,
        child: [],
      },
    ],
  },
  {
    id: 7,
    name: 'Promo & Voucher',
    is_checked: false,
    child: [
      {
        id: 701,
        name: 'Promo Product',
        is_checked: false,
        child: [],
      },
      {
        id: 702,
        name: 'Join Promo',
        is_checked: false,
        child: [],
      },
      {
        id: 703,
        name: 'Voucher',
        is_checked: false,
        child: [],
      },
      {
        id: 704,
        name: 'Mass Voucher',
        is_checked: false,
        child: [],
      },
      {
        id: 705,
        name: 'Giveaway',
        is_checked: false,
        child: [],
      },
    ],
  },
  {
    id: 8,
    name: 'Request',
    is_checked: false,
    child: [
      {
        id: 801,
        name: 'Withdraw Request',
        is_checked: false,
        child: [],
      },
      {
        id: 802,
        name: 'Join Promo Request',
        is_checked: false,
        child: [],
      },
      {
        id: 803,
        name: 'New Product Request',
        is_checked: false,
        child: [],
      },
      {
        id: 804,
        name: 'Master Data Config',
        is_checked: false,
        child: [],
      },
      {
        id: 805,
        name: 'App Service',
        is_checked: false,
        child: [],
      },
    ],
  },
];

export default function RoleAccessForm(props: RoleAccessFormProps) {
  const { open, onClose, initialValues, categorizedMenu } = props;

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
        if (listOfMenu[i].child.length > 0) {
          for (let a = 0; a < listOfMenu[i].child.length; a += 1) {
            access[listOfMenu[i].child[a].id] = false;
            if (listOfMenu[i].child[a].child.length > 0) {
              for (let b = 0; b < listOfMenu[i].child[a].child.length; b += 1) {
                access[listOfMenu[i].child[a].child[b].id] = false;
              }
            }
          }
        }
      }
    }
    setAccessMenu({ ...access });
  }, []);

  const handleChangeChild = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
  ) => {
    const changedChild: { [id: number]: boolean } = {};
    for (let i = 0; i < categorizedMenu.length; i += 1) {
      if (categorizedMenu[i].parent === id) {
        for (let j = 0; j < categorizedMenu[i].menu.length; j += 1) {
          changedChild[categorizedMenu[i].menu[j]] = !!e.target.checked;
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
                              // handleChangeAccessMenu(e, parentMenu.id);
                            }}
                          />
                        }
                      />
                    }
                  >
                    {parentMenu.child.map((menu) =>
                      menu.child.length === 0 ? (
                        <HorizontalContent>
                          <Menu>{menu.name}</Menu>
                          <Control
                            label=""
                            key={menu.id}
                            control={
                              <Checkbox
                                checked={accessMenu[menu.id]}
                                onChange={(e) => {
                                  // handleChangeAccessMenu(e, parentMenu.id);
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
                            title={menu.name}
                            key={menu.id}
                            parent={false}
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
                            {menu.child.map((childMenu) => (
                              <HorizontalContent key={childMenu.id}>
                                <ChildMenu>{childMenu.name}</ChildMenu>
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
