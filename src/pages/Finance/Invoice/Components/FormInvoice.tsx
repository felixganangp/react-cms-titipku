import FormControl from 'components/FormLabel';
import {
  Box,
  Button,
  ButtonBase,
  FormControlLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function FormInvoice() {
  return (
    <Box component="form">
      <Box p="24px">
        <FormControl
          text="Name"
          required
          // error={touched.name && Boolean(errors.name)}
          // helperText={touched.name && errors.name && `${errors.name}`}
        >
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              value="Nornmal"
              control={<Radio />}
              label="Nornmal"
            />
            <FormControlLabel value="cash" control={<Radio />} label="Cash" />
          </RadioGroup>
        </FormControl>
        <FormControl
          text="Merchant"
          required
          // error={touched.name && Boolean(errors.name)}
          // helperText={touched.name && errors.name && `${errors.name}`}
        >
          <TextField
            disabled
            fullWidth
            placeholder="Select Merchant"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <ButtonBase>
                    <Box
                      bgcolor="primary.main"
                      p="5px"
                      borderRadius="4px"
                      display="flex"
                      alignContent="center"
                      justifyContent="center"
                    >
                      <AddIcon sx={{ color: '#fff' }} />
                    </Box>
                  </ButtonBase>
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
        <FormControl
          text="Merchant"
          required
          // error={touched.name && Boolean(errors.name)}
          // helperText={touched.name && errors.name && `${errors.name}`}
        >
          <TextField
            fullWidth
            placeholder="Insert Transfer Amount "
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Typography>Rp</Typography>
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
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
        <Button variant="text" color="error">
          Cancel
        </Button>
        <Button type="submit" color="primary">
          Submit
        </Button>
      </Box>
    </Box>
  );
}
