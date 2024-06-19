import { Box, Button, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { SteperHeader } from '../../Customer/Components/SteperHeader';
import useUserMerchant from '../hooks/useUserMerchant';

export default function FormUserMerchant({
  id,
  handleClose,
  openModal,
}: {
  id?: string | number;
  handleClose: (isSubmited: boolean) => void;
  openModal?: boolean;
}) {
  const [step, setStep] = useState<number>(1);

  const formik = useUserMerchant({
    id,
    handleClose,
  });

  const backButton = () => {
    switch (step) {
      case 1:
        return {
          label: 'Cancel',
          onClick: () => {
            handleClose(false);
            // confirmCancelModal.on();
          },
        };
      default:
        return {
          label: 'Back',
          onClick: () => setStep(step - 1),
        };
    }
  };

  const nextButton = () => {
    switch (step) {
      case 1:
        return {
          label: 'Next',
          onClick: () => setStep(step + 1),
          disabled: Boolean(formik.errors.user_idir),
        };
      case 2:
        return {
          label: 'Submit',
          onClick: () => {
            // console.log(formik.errors);
            // onCancelRef.current = true;
            formik.handleSubmit();
          },
          disabled: Boolean(formik.errors.user_idir),
        };
      default:
        return {
          label: 'Next',
          onClick: () => setStep(step + 1),
        };
    }
  };

  useEffect(() => {
    const element = document.getElementById('to');

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, [step]);

  useEffect(() => {
    if (!openModal) {
      formik.resetForm();
    }
  }, [openModal]);
  return (
    <Box p="24px">
      <div id="top" />
      <SteperHeader currentStep={step} stepList={['Basic Info', 'IDIR']} />
      <Box mt={2} />
      <Stack direction="row" justifyContent="end" spacing={1}>
        <Button variant="text" color="error" onClick={backButton().onClick}>
          {backButton().label}
        </Button>
        <Button
          type="submit"
          color="primary"
          disabled={nextButton()?.disabled}
          onClick={nextButton().onClick}
        >
          {nextButton().label}
        </Button>
      </Stack>
    </Box>
  );
}
