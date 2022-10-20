import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import React from 'react';
import Grid from '@mui/material/Grid';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import Checkbox from '@mui/material/Checkbox';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Table from '../../../components/Table';
import AccordionOnDetails from '../../../components/Accordion/Details';
import FileDownload from '../../../assets/file-download-outline.svg';
import {
  TitleWrapper,
  ContentWrapper,
  TableWrapper,
  TitlePage,
  ContentGrid,
  FieldBox,
  DescriptionBox,
  HorizontalContent,
  BackButton,
  FieldName,
  FieldContent,
  Menu,
  ChildMenu,
  SuperChildMenu,
  TablesProperty,
  Search,
  DownloadButton,
} from './details.styled';

interface RoleUserDetailsProps {
  id: number;
}

const listOfMenu = [
  {
    id: 1,
    name: 'Admin Panel',
    is_checked: false,
    child: [
      {
        id: 2,
        name: 'Role User',
        is_checked: false,
        child: [],
      },
      {
        id: 3,
        name: 'Role Access',
        is_checked: false,
        child: [],
      },
    ],
  },
  {
    id: 4,
    name: 'Products',
    is_checked: false,
    child: [
      {
        id: 5,
        name: 'Product Mangement',
        is_checked: false,
        child: [],
      },
      {
        id: 6,
        name: 'SKU Management',
        is_checked: false,
        child: [],
      },
      {
        id: 7,
        name: 'Category Management',
        is_checked: false,
        child: [],
      },
    ],
  },
  {
    id: 8,
    name: 'Lapak',
    is_checked: false,
    child: [
      {
        id: 9,
        name: 'Area',
        is_checked: false,
        child: [],
      },
      {
        id: 10,
        name: 'Lapak',
        is_checked: false,
        child: [],
      },
    ],
  },
  {
    id: 11,
    name: 'User',
    is_checked: false,
    child: [
      {
        id: 12,
        name: 'Nitiper',
        is_checked: false,
        child: [],
      },
      {
        id: 13,
        name: 'Jatiper',
        is_checked: false,
        child: [
          {
            id: 14,
            name: 'Jatiper Management',
            is_checked: false,
          },
          {
            id: 15,
            name: 'Jatiper Registration',
            is_checked: false,
          },
        ],
      },
    ],
  },
  {
    id: 16,
    name: 'Transaction',
    is_checked: false,
    child: [
      {
        id: 17,
        name: 'Transaction',
        is_checked: false,
        child: [],
      },
      {
        id: 18,
        name: 'Urgent Order',
        is_checked: false,
        child: [],
      },
    ],
  },
  {
    id: 19,
    name: 'Application',
    is_checked: false,
    child: [
      {
        id: 20,
        name: 'Notification',
        is_checked: false,
        child: [],
      },
      {
        id: 21,
        name: 'Banner',
        is_checked: false,
        child: [],
      },
      {
        id: 22,
        name: 'Event',
        is_checked: false,
        child: [],
      },
      {
        id: 23,
        name: 'Giveaway',
        is_checked: false,
        child: [],
      },
    ],
  },
  {
    id: 24,
    name: 'Promo & Voucher',
    is_checked: false,
    child: [
      {
        id: 25,
        name: 'Promo Product',
        is_checked: false,
        child: [],
      },
      {
        id: 26,
        name: 'Join Promo',
        is_checked: false,
        child: [],
      },
      {
        id: 27,
        name: 'Voucher',
        is_checked: false,
        child: [],
      },
      {
        id: 28,
        name: 'Mass Voucher',
        is_checked: false,
        child: [],
      },
      {
        id: 29,
        name: 'Giveaway',
        is_checked: false,
        child: [],
      },
    ],
  },
  {
    id: 30,
    name: 'Request',
    is_checked: false,
    child: [
      {
        id: 31,
        name: 'Withdraw Request',
        is_checked: false,
        child: [],
      },
      {
        id: 32,
        name: 'Join Promo Request',
        is_checked: false,
        child: [],
      },
      {
        id: 33,
        name: 'New Product Request',
        is_checked: false,
        child: [],
      },
      {
        id: 34,
        name: 'Master Data Config',
        is_checked: false,
        child: [],
      },
      {
        id: 35,
        name: 'App Service',
        is_checked: false,
        child: [],
      },
    ],
  },
];

export default function RoleUserDetails(props: RoleUserDetailsProps) {
  const { id } = props;

  const contentOfTable = [
    {
      name: 'Full Name 1',
      email: 'full.name@titipku.com',
      lastUpdate: 'January 8, 2022 12.00 AM',
    },
  ];

  const headOfTable = [
    {
      id: 'name',
      label: 'Name',
      align: 'left',
    },
    {
      id: 'email',
      label: 'Email Address',
      align: 'left',
    },
    {
      id: 'lastUpdate',
      label: 'Last Update',
      align: 'left',
    },
  ];

  return (
    <div>
      <Box p="20px" bgcolor="#F5F7FA">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card>
              <Menu>Role Access Management</Menu>
              <BackButton startIcon={<ArrowBackIosIcon />}>
                <TitlePage>Details</TitlePage>
              </BackButton>
            </Card>
          </Grid>
        </Grid>
        {/* BASIC INFO */}
        <TitleWrapper>
          <ExpandMore sx={{ marginRight: '5px' }} />
          <span>Basic Info</span>
        </TitleWrapper>
        <ContentWrapper>
          <ContentGrid container spacing={1}>
            <FieldBox>
              <Person2OutlinedIcon
                sx={{ color: '#008e58', marginRight: '4px' }}
              />
              <DescriptionBox>
                <FieldName>ID</FieldName>
                <FieldContent>1</FieldContent>
              </DescriptionBox>
            </FieldBox>

            <FieldBox>
              <Person2OutlinedIcon
                sx={{ color: '#008e58', marginRight: '4px' }}
              />
              <DescriptionBox>
                <FieldName>Role Access Name</FieldName>
                <FieldContent>Super Admin</FieldContent>
              </DescriptionBox>
            </FieldBox>

            <FieldBox>
              <Person2OutlinedIcon
                sx={{ color: '#008e58', marginRight: '4px' }}
              />
              <DescriptionBox>
                <FieldName>User</FieldName>
                <FieldContent>10</FieldContent>
              </DescriptionBox>
            </FieldBox>
          </ContentGrid>
        </ContentWrapper>
        {/* MENU ACCESS */}
        <TitleWrapper>
          <ExpandMore sx={{ marginRight: '5px' }} />
          <span>Menu Access</span>
        </TitleWrapper>
        <ContentWrapper>
          {listOfMenu.map((parentMenu) => (
            <AccordionOnDetails
              title={parentMenu.name}
              key={parentMenu.id}
              parent
              checked={parentMenu.is_checked}
            >
              {parentMenu.child.map((childMenu) =>
                childMenu.child.length === 0 ? (
                  <HorizontalContent>
                    <ChildMenu>{childMenu.name}</ChildMenu>
                    <Checkbox
                      checked={childMenu.is_checked}
                      sx={{ color: '#d5d5d5' }}
                    />
                  </HorizontalContent>
                ) : (
                  <AccordionOnDetails
                    title={childMenu.name}
                    key={childMenu.id}
                    parent={false}
                    checked={childMenu.is_checked}
                  >
                    {childMenu.child.map((superChildMenu) => (
                      <HorizontalContent key={superChildMenu.id}>
                        <SuperChildMenu>{superChildMenu.name}</SuperChildMenu>
                        <Checkbox
                          checked={superChildMenu.is_checked}
                          sx={{ color: '#d5d5d5' }}
                        />
                      </HorizontalContent>
                    ))}
                  </AccordionOnDetails>
                ),
              )}
            </AccordionOnDetails>
          ))}
        </ContentWrapper>

        <TitleWrapper>
          <ExpandMore sx={{ marginRight: '5px' }} />
          <span>Role User List</span>
        </TitleWrapper>
        <TableWrapper>
          <TablesProperty>
            <Search
              placeholder="Search for name or email"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <DownloadButton>
              <img
                style={{ width: '24px', height: '24px' }}
                src={FileDownload}
                alt="Download data"
              />
            </DownloadButton>
          </TablesProperty>
          <Table
            data={contentOfTable}
            selected={[]}
            headCells={headOfTable}
            page={1}
            totalPage={1}
            onChangePage={(e) => console.log(e)}
            enableCheckBox
          />
        </TableWrapper>
      </Box>
    </div>
  );
}
