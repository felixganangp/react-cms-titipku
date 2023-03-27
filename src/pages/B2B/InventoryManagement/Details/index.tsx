import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, Box, Typography, Button, Grid } from '@mui/material';
import Table from 'components/Table';

import BackIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { CardContainer, GradingColor, StatusColor } from '../inventory.styled';

export default function InvoiceDetail() {
  const navigate = useNavigate();
  const headCell = [
    {
      id: 'Editor',
      label: 'Editor',
      align: 'left',
    },
    {
      id: 'Editor',
      label: 'Editor',
      align: 'left',
    },
  ];
  return (
    <Box p="20px" bgcolor="#f8f8f8">
      <CardContainer>
        <Box p="30px 16px">
          <Stack
            direction="row"
            alignItems="start"
            justifyContent="space-between"
          >
            <Stack direction="row" alignItems="center" spacing="16px">
              <Box
                component="img"
                src="https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//90/MTA-70146323/ayam_potong_segar_ayam_potong_frozen_food_full01_4e8623f5.jpg"
                alt="ayam"
                width="54px"
                height="54px"
                borderRadius="100%"
                sx={{ objectFit: 'cover' }}
              />
              <Box>
                <Typography color="#000000" fontSize="24px" fontWeight="600">
                  Sayap Ayam
                </Typography>
                <Button
                  variant="text"
                  startIcon={<BackIcon />}
                  onClick={() => navigate(-1)}
                >
                  See all List
                </Button>
              </Box>
            </Stack>
            <Button size="large" endIcon={<ArrowForwardIosIcon />}>
              Edit
            </Button>
          </Stack>

          <Grid container mt="20px" mx="10px    ">
            <Grid item xs={4} lg={2.4}>
              <Typography fontSize="14px" color="#0661ae">
                Product Name (SKU)
              </Typography>
              <Typography fontSize="14px">Sayap Ayam</Typography>
            </Grid>
            <Grid item xs={4} lg={2.4}>
              <Typography fontSize="14px" color="#0661ae">
                Grade
              </Typography>
              <GradingColor grade={1}>Grade A</GradingColor>
            </Grid>
            <Grid item xs={4} lg={2.4}>
              <Typography fontSize="14px" color="#0661ae">
                Category
              </Typography>
              <Typography fontSize="14px">Daging, Ikan & Telur</Typography>
            </Grid>
            <Grid item xs={4} lg={2.4}>
              <Typography fontSize="14px" color="#0661ae">
                Weight
              </Typography>
              <Typography fontSize="14px">1289 Kg</Typography>
            </Grid>
            <Grid item xs={4} lg={2.4}>
              <Typography fontSize="14px" color="#0661ae">
                Status
              </Typography>
              <StatusColor status={5}>Tersedia</StatusColor>
            </Grid>
          </Grid>
        </Box>
      </CardContainer>
      <Box my="10px" />
      <CardContainer>
        <Box p="16px">
          <Table data={[]} bgHeader="#cde3f6" headCells={headCell} />
        </Box>
      </CardContainer>
    </Box>
  );
}
