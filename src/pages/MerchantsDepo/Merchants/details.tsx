import { useState } from 'react';
import AccordionOnDetails from 'components/Accordion/SubDetailsPagesWrapper';
import DescriptionDetail from 'components/DescDetails';
import {
  ArrowBack,
  Person2Outlined,
  CalendarToday,
  KeyboardArrowDown,
  MoreVert,
} from '@mui/icons-material';
import {
  Box,
  Card,
  Button,
  Grid,
  IconButton,
  Stack,
  Typography,
  Autocomplete,
  TextField,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MerchantAndalan from 'assets/merchant-andalan.svg';
import MerchantDepo from 'assets/merchant-deposit.svg';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
// import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PhoneIcon from '@mui/icons-material/Phone';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MenuList from 'components/MenuList';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import FormLabel from 'components/FormLabel';
import Table from 'components/Table';
import { HeadCells } from 'components/Table/types';
import moment from 'moment';

export default function MercheantsDetails() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<(string | number)[]>([]);
  const headCells: HeadCells<any>[] = [
    {
      id: 'Date',
      label: 'Date',
      format: (value) => moment().format('DD MMM YYYY'),
    },
    {
      id: 'Type',
      label: 'Type',
      format: (value) => `#${value.rank}`,
    },
    {
      id: 'Reference',
      label: 'Reference',
    },
    {
      id: 'Amount',
      enableSort: true,
      label: 'Amount',
    },
    {
      id: 'Action',
      label: 'Action',
      format: (value) => (
        <MenuList menu={[]}>
          <IconButton>
            <MoreVert />
          </IconButton>
        </MenuList>
      ),
    },
  ];
  return (
    <Box p="20px" bgcolor="#F5F7FA">
      <Stack spacing={2}>
        <Card>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack>
              <Stack direction="row" alignItems="center">
                <IconButton onClick={() => navigate(-1)}>
                  <ArrowBack />
                </IconButton>
                <Typography variant="h3" fontWeight={600}>
                  Merchant Info
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Card>
      </Stack>
      <AccordionOnDetails defaultOpen title="Merchant Info">
        <Card>
          <Box p="10px">
            <Stack direction="row" alignItems="center" gap="10px">
              <Typography variant="h3" fontWeight="bold">
                LP - 03 Toko Joni Tahu Tempe (Pasar Modern Paramount) Deposit
              </Typography>
              <Box component="img" src={MerchantAndalan} />
              <Box component="img" src={MerchantDepo} />
            </Stack>
            <Stack
              borderBottom="1px solid #E0E0E0"
              borderTop="1px solid #E0E0E0"
              p={2}
              my={2}
              width={['100%', '100%', '60%']}
            >
              <Grid container spacing={2}>
                <Grid item xs={6} md={2.4}>
                  <Box bgcolor="#F9EBE7" p={1}>
                    <Typography color="#8e8e8e" fontSize={14}>
                      Balance
                    </Typography>
                    <Typography variant="h3" fontWeight={600} color="red">
                      RP 190,000
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={2.4}>
                  <Box p={1}>
                    <Typography color="#8e8e8e" fontSize={14}>
                      Total Transaction
                    </Typography>
                    <Typography variant="h3" fontWeight={600}>
                      2
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={2.4}>
                  <Box p={1}>
                    <Typography color="#8e8e8e" fontSize={14}>
                      Total Disburse
                    </Typography>
                    <Typography variant="h3" fontWeight={600}>
                      2
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={2.4}>
                  <Box p={1}>
                    <Typography color="#8e8e8e" fontSize={14}>
                      Rank
                    </Typography>
                    <Typography variant="h3" fontWeight={600}>
                      #2
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={2.4}>
                  <Box p={1}>
                    <Typography color="#8e8e8e" fontSize={14}>
                      Activity Score
                    </Typography>
                    <Typography variant="h3" fontWeight={600}>
                      45/100
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Stack>
            <Grid container spacing={2} mt={2}>
              <Grid item xs={6} md={2.4}>
                <DescriptionDetail
                  title="Role Access Name"
                  icon={<FiberManualRecordIcon sx={{ color: '#008e58' }} />}
                  content="name"
                />
              </Grid>
              <Grid item xs={6} md={2.4}>
                <DescriptionDetail
                  title="Merchant ID"
                  icon={<Person2Outlined sx={{ color: '#008e58' }} />}
                  content="name"
                />
              </Grid>
              <Grid item xs={6} md={2.4}>
                <DescriptionDetail
                  title="Limit"
                  icon={<AttachMoneyIcon sx={{ color: '#008e58' }} />}
                  content="name"
                />
              </Grid>
              <Grid item xs={6} md={2.4}>
                <DescriptionDetail
                  title="Primary Account Name "
                  content="name"
                />
              </Grid>
              <Grid item xs={6} md={2.4}>
                <DescriptionDetail title="NOBU Account Name " content="name" />
              </Grid>
              <Grid item xs={6} md={2.4}>
                <DescriptionDetail
                  title="Join Date"
                  icon={<CalendarToday sx={{ color: '#008e58' }} />}
                  content="name"
                />
              </Grid>
              <Grid item xs={6} md={2.4}>
                <DescriptionDetail
                  title="Phone Number"
                  icon={<PhoneIcon sx={{ color: '#008e58' }} />}
                  content="name"
                />
              </Grid>
              <Grid item xs={6} md={2.4}>
                <DescriptionDetail title="Admin Fee" content="name" />
              </Grid>
              <Grid item xs={6} md={2.4}>
                <DescriptionDetail
                  title="Primary Account Number "
                  content="name"
                />
              </Grid>
              <Grid item xs={6} md={2.4}>
                <DescriptionDetail
                  title="NOBU Account Number "
                  content="name"
                />
              </Grid>
              <Grid item xs={6} md={2.4}>
                <DescriptionDetail
                  title="Join Date Andalan & Depo"
                  icon={<CalendarToday sx={{ color: '#008e58' }} />}
                  content="name"
                />
              </Grid>
              <Grid item xs={6} md={2.4}>
                <div />
              </Grid>
              <Grid item xs={6} md={2.4}>
                <DescriptionDetail title="Discount" content="name" />
              </Grid>
              <Grid item xs={6} md={2.4}>
                <DescriptionDetail title="Branch Office" content="name" />
              </Grid>
              <Grid item xs={6} md={2.4}>
                <DescriptionDetail title="QRIS Merchant ID" content="name" />
              </Grid>
            </Grid>
          </Box>
        </Card>
      </AccordionOnDetails>
      <AccordionOnDetails defaultOpen title="Transaction">
        <Card>
          <Box p="10px">
            <Grid container spacing={2} mb={2}>
              <Grid item xs={12} md={6}>
                <Grid
                  container
                  spacing={2}
                  component="form"
                  // onSubmit={queryInnvoice.formikParams.handleSubmit}
                >
                  <Grid item xs={12} md={5}>
                    <FormLabel text="Type">
                      <Autocomplete
                        options={[]}
                        // onBlur={() => {
                        //   formik.setFieldTouched('area');
                        // }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            name="Type"
                            placeholder="Select Type"
                            // error={
                            //   formik.touched.area && Boolean(formik.errors.area)
                            // }
                          />
                        )}
                      />
                    </FormLabel>
                  </Grid>
                  <Grid item xs={12} md={7}>
                    <FormLabel text="Range Date">
                      <Stack direction="row" gap={1} alignItems="start">
                        <DesktopDatePicker
                          // value={
                          //   queryInnvoice.formikParams.values.max_invoice_date || null
                          // }
                          value={null}
                          onChange={() => {}}
                          inputFormat="DD/MM/YYYY"
                          // onChange={(value) => {
                          //   queryInnvoice.formikParams.setFieldValue(
                          //     'max_invoice_date',
                          //     value,
                          //   );
                          // }}
                          // minDate={queryInnvoice.formikParams.values.min_invoice_date}
                          // maxDate={formik.values.max_date_created}
                          renderInput={(params) => {
                            return (
                              <TextField
                                {...params}
                                name="grade"
                                placeholder="Select Grade"
                                variant="outlined"
                                fullWidth
                              />
                            );
                          }}
                        />
                        <Box
                          minWidth="20px"
                          borderBottom="1px solid"
                          mt="20px"
                        />
                        <DesktopDatePicker
                          // value={
                          //   queryInnvoice.formikParams.values.max_invoice_date || null
                          // }
                          value={null}
                          onChange={() => {}}
                          inputFormat="DD/MM/YYYY"
                          // onChange={(value) => {
                          //   queryInnvoice.formikParams.setFieldValue(
                          //     'max_invoice_date',
                          //     value,
                          //   );
                          // }}
                          // minDate={queryInnvoice.formikParams.values.min_invoice_date}
                          // maxDate={formik.values.max_date_created}
                          renderInput={(params) => {
                            return (
                              <TextField
                                {...params}
                                name="grade"
                                placeholder="Select Grade"
                                variant="outlined"
                                fullWidth
                              />
                            );
                          }}
                        />
                      </Stack>
                    </FormLabel>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Button
                        variant="text"
                        onClick={() => {
                          // queryInnvoice.formikParams.resetForm();
                          // queryInnvoice.handleResetFilter({
                          //   whiteList: ['search'],
                          // });
                        }}
                      >
                        Reset
                      </Button>
                      <Button type="submit">Apply</Button>
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack direction="row" justifyContent="end">
                  <MenuList
                    menu={[
                      {
                        label: 'Delete 2 Items',
                        color: 'error',
                        onClick: () => {},
                      },
                    ]}
                  >
                    <Button
                      endIcon={<KeyboardArrowDown />}
                      //   variant="outlined"
                      //   onClick={showFilter.toggleModal}
                    >
                      Action
                    </Button>
                  </MenuList>
                </Stack>
              </Grid>
            </Grid>
            <Table
              headCells={headCells}
              data={[
                { rank: 1, id: 'skdldslk', 'Join Date': '2021-10-10' },
                {
                  rank: 1,
                  id: 'skdldslk',
                  'Join Date': '2021-10-10',
                },
                {
                  rank: 1,
                  id: 'skdldslk',
                  'Join Date': '2021-10-10',
                },
                { rank: 1, id: 'skdldslk', 'Join Date': '2021-10-10' },
              ]}
              selected={selected}
              setSelected={(e) => {
                setSelected(e);
              }}
              enableCheckBox
              // loading={queryInnvoice.isLoading}
              // page={queryInnvoice.data?.page || 0}
              // count={queryInnvoice.data?.count || 0}
              // totalData={queryInnvoice.data?.total || 0}
              // onChangePage={(value) => {
              //   queryInnvoice.handleChangeParams({
              //     ...queryInnvoice.params,
              //     page: value,
              //   });
              //   queryInnvoice.handleToSetSearchParams('page', value.toString());
              // }}
            />
          </Box>
        </Card>
      </AccordionOnDetails>
    </Box>
  );
}
