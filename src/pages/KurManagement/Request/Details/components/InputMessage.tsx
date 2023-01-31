import FormLabel from 'components/FormLabel';
import { TextField, Box, Button } from '@mui/material';
import { useState } from 'react';

interface RefusalReasonProps {
  onSubmit: (reason: string) => void;
}

const RefusalReason = ({ onSubmit }: RefusalReasonProps) => {
  const [desc, setDesc] = useState<string>('');
  return (
    <div>
      <Box sx={{ padding: '24px', margin: 0 }}>
        <FormLabel text="Description">
          <TextField
            type="text"
            name="description"
            placeholder="Input refusal reason"
            value={desc}
            fullWidth
            onChange={(e) => setDesc(e.target.value)}
            onBlur={(e) => setDesc(e.target.value)}
            multiline
            rows={3}
          />
        </FormLabel>
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
        <Button disabled={!desc} onClick={() => onSubmit(desc)}>
          Submit
        </Button>
      </Box>
    </div>
  );
};

export default RefusalReason;
