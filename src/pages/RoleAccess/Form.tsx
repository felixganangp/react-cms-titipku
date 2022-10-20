import React from 'react';
import Dialog from '@mui/material/Dialog';
import FormControl from 'components/FormControl';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
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
import AccordionOnDetails from '../../components/Accordion/Details';

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

export default function RoleAccessForm(props: RoleAccessFormProps) {
  const { open, onClose, listOfMenu } = props;
  return (
    <div>
      <div>
        <Dialog open={open} onClose={() => onClose()}>
          <TitleWrapper>
            <Title>Add New Role User</Title>
            <CloseIcon onClick={() => onClose()} />
          </TitleWrapper>
          <ContentWrapper>
            <FormControl
              text="Role Name"
              error
              helperText="Please input role name"
              required
            >
              <TextField
                type="text"
                name="name"
                fullWidth
                placeholder="Input Role Name"
              />
            </FormControl>
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
                        <Checkbox />
                      </HorizontalContent>
                    ) : (
                      <Box style={{ paddingLeft: '26px' }}>
                        <AccordionOnDetails
                          title={menu.name}
                          key={menu.id}
                          parent={false}
                          checked={menu.is_checked}
                        >
                          {menu.child.map((childMenu) => (
                            <HorizontalContent key={childMenu.id}>
                              <ChildMenu>{childMenu.name}</ChildMenu>
                              <Checkbox />
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
            <CancelButton>Cancel</CancelButton>
            <SubmitButton>Add</SubmitButton>
          </ActionWrapper>
        </Dialog>
      </div>
    </div>
  );
}
