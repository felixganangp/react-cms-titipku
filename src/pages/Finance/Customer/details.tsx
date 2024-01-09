import { ArrowBack } from '@mui/icons-material';
import { Box, Card, Grid, IconButton, Stack, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import AccordionOnDetails from 'components/Accordion/SubDetailsPagesWrapper';
import { useCustomerDetails } from '../hooks/useCustomer';

export default function DetailsCustomer() {
  const navigate = useNavigate();
  const { id } = useParams();
  const invoiceDetails = useCustomerDetails(id);

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
              <Typography color="#626B79">Payment Detail</Typography>
              <Stack direction="row" alignItems="center">
                <IconButton onClick={() => navigate(-1)}>
                  <ArrowBack />
                </IconButton>
                <Typography variant="titlePage">Name</Typography>
              </Stack>
            </Stack>
          </Stack>
        </Card>
        <AccordionOnDetails defaultOpen title="Basic Info">
          <Card>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={9}>
                <Grid container spacing={2}>
                  <Grid item sm={4}>
                    <Typography color="primary">Payment Date</Typography>
                    <Typography>test</Typography>
                  </Grid>
                  <Grid item sm={4}>
                    <Typography color="primary">Amount Payment</Typography>
                    <Typography>res</Typography>
                  </Grid>
                  <Grid item sm={4}>
                    <div> </div>
                  </Grid>

                  <Grid item sm={4}>
                    <Typography color="primary">Proof Image</Typography>
                    <Box
                      component="img"
                      width="100%"
                      height="242px"
                      bgcolor="#cecece"
                      borderRadius="3px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      sx={{
                        objectFit: 'contain',
                        cursor: 'pointer',
                      }}
                      onClick={() => {
                        // handleViewDetailImage(true, val.document_filepath);
                      }}
                      // src={payment.details?.proof_of_payment}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </AccordionOnDetails>
      </Stack>
    </Box>
  );
}
