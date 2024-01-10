import { Box, Typography } from '@mui/material';

interface SteperProps {
  currentStep: number;
  stepList: string[];
}

const style = {
  rootStep: {
    p: '8px 13px',
    bgcolor: '#F8F8F8',
    '.step-number': {
      fontSize: '12px',
      color: '#555555',
    },
    '.step-title': {
      color: '#303030',
      fontSize: '14px',
    },
  },
  currentStep: {
    bgcolor: 'rgba(170, 217, 199, 0.5)',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    '.step-title': {
      color: '#008E58',
      fontWeight: '700',
    },
  },
  prevStep: {
    bgcolor: 'rgba(170, 217, 199, 0.3)',
  },
};
export function SteperHeader({ currentStep, stepList }: SteperProps) {
  const styleSx = (step: number) => {
    const sx: any = [style.rootStep];

    if (step === currentStep) {
      sx.push(style.currentStep);
    }
    if (step < currentStep) {
      sx.push(style.prevStep);
    }
    return sx;
  };

  return (
    <Box overflow="hidden" display="flex" borderRadius="4px">
      {stepList?.map((val, index) => (
        <Box flex="1" sx={styleSx(index + 1)} key={index}>
          <Typography className="step-number">Step {index + 1}</Typography>
          <Typography className="step-title">{val}</Typography>
        </Box>
      ))}
    </Box>
  );
}
