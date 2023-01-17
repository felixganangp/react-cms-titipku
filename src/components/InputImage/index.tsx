/**
 *
 * InputImage
 *
 */

import React, { useRef, useState } from 'react';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import ImageCrop from '../ImageCrop';

const Image = styled.img`
  height: 170px;
  max-width: 100%;
  object-fit: cover;
`;

interface Props {
  label: string;
  width?: number;
  height?: number;
  value: Blob | string;
  type?: 'cube' | 'rectangle';
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  cropable?: boolean;
}

function InputImage({
  label,
  width,
  height,
  value,
  type,
  onChange,
  cropable,
}: Props) {
  const [imageCrop, setImageCrop] = useState<any>(false);
  const fileInputField = useRef<HTMLInputElement>(null);

  // const handleNewFileUpload = (e: React.ChangeEvent<HTMLElement>) => {
  //   const { files: newFiles } = e.target as HTMLInputElement;
  //   if (newFiles?.length) {
  //     onChange(newFiles[0]);
  //   }
  // };

  const handleNewFileUpload = (e: any) => {
    const { files: newFiles } = e.target;
    if (newFiles?.length) {
      if (cropable) {
        setImageCrop(newFiles[0]);
      } else {
        onChange(newFiles[0]);
      }
    }
  };

  const handleSaveCropedImage = (e: any) => {
    onChange(e);
  };

  const handleUploadBtnClick = () => {
    fileInputField.current?.click();
  };

  const handleSetImageCrop = (e: any) => {
    setImageCrop(e);
  };

  return (
    <div>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          borderRadius: '5px',
          padding: '10px',
          border: '1px solid #c4c4c4',
          cursor: 'pointer',
        }}
        onClick={handleUploadBtnClick}
      >
        <input
          type="file"
          ref={fileInputField}
          onChange={handleNewFileUpload}
          title=""
          value=""
          style={{ display: 'none' }}
          accept="image/png, image/jpg, image/jpeg"
          data-testid="test-input-1"
          // {...otherProps}
        />
        {value ? (
          <Image
            data-testid="test-img-1"
            src={typeof value !== 'string' ? URL.createObjectURL(value) : value}
          />
        ) : (
          <Box
            sx={{
              border: '2px dashed #c4c4c4',
              bgcolor: '#FAFAFA',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              height: '170px',
              width: type === 'cube' ? '170px' : '80%',
              padding: '10px',
            }}
          >
            <AddPhotoAlternateIcon
              sx={{ fontSize: '50px' }}
              htmlColor="#8C95A2"
            />
            <Typography
              sx={{
                textAlign: 'center',
                fontSize: '12px',
                color: '#8b95a5',
              }}
            >
              Please upload {label} with {width}x{height} Pixels
            </Typography>
          </Box>
        )}
      </Box>
      <ImageCrop
        open={Boolean(imageCrop)}
        image={imageCrop}
        setClose={handleSetImageCrop}
        onChange={handleSaveCropedImage}
      />
    </div>
  );
}

InputImage.defaultProps = {
  type: 'cube',
  cropable: false,
  width: 50,
  height: 50,
};

export default InputImage;
