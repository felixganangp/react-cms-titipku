/**
 *
 * InputImage
 *
 */

import React, { useRef, useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import useToast from 'hooks/useToast';
import { useDropzone } from 'react-dropzone';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import ImageCrop from '../ImageCrop';
import { createResizedImage } from './resize';

interface ImageCustomerProps {
  imageCustomer: boolean | undefined;
}

const Image = styled.img<ImageCustomerProps>`
  height: 170px;
  width: ${(props) => (props.imageCustomer ? '170px' : '')};
  max-width: 100%;
  object-fit: cover;
  border-radius: ${(props) => (props.imageCustomer ? '50%' : '')};
`;

interface Props {
  label: string;
  width?: number;
  height?: number;
  value: Blob | string;
  type?: 'cube' | 'rectangle';
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
  cropable?: boolean;
  imageCustomer?: boolean;
}

function InputImage({
  label,
  width,
  height,
  value,
  type,
  onChange,
  cropable,
  onClear,
  imageCustomer,
}: Props) {
  const { openToast } = useToast();
  const [imageCrop, setImageCrop] = useState<any>(false);
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);
  const fileInputField = useRef<HTMLInputElement>(null);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    fileRejections,
  } = useDropzone({});

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
        setImageCrop(true);
        setImageFile(newFiles[0]);
      } else {
        try {
          createResizedImage(
            newFiles[0],
            1500,
            1500,
            'JPEG',
            90,
            0,
            (blob) => {
              onChange(blob as any);
            },
            'blob',
            400,
            400,
          );
          // Resizer.imageFileResizer(
          //   newFiles[0],
          //   1500,
          //   1500,
          //   'JPEG',
          //   90,
          //   0,
          //   (blob) => {
          //     onChange(blob as any);
          //   },
          //   'blob',
          //   400,
          //   400,
          // );
        } catch (err) {
          console.log(err);
          openToast({
            severity: 'error',
            headMsg: 'Failed to upload image',
          });
        }
        // onChange(newFiles[0]);
      }
    }
  };

  const handleSaveCropedImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };

  const handleUploadBtnClick = () => {
    fileInputField.current?.click();
  };

  const handleSetImageCrop = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageCrop(e);
  };

  return (
    <div>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '5px',
          padding: '10px',
          border: isDragActive
            ? '2px solid #008e58'
            : `${imageCustomer ? '' : '1px solid #c4c4c4'}`,
          cursor: 'pointer',
        }}
        {...getRootProps({
          onDrop: (e) => {
            e.preventDefault();
            // e.stopPropagation();
            const file = {
              target: {
                files: e.dataTransfer.files,
              },
            };
            handleNewFileUpload(file);
          },
        })}
      >
        <Box position="relative">
          {onClear && value ? (
            <Box
              onClick={onClear}
              width="18px"
              height="18px"
              position="absolute"
              color="#fff"
              bgcolor="#bf370c"
              display="flex"
              alignContent="center"
              justifyContent="center"
              borderRadius="100%"
              right="-10px"
              top="-5px"
            >
              <ClearIcon sx={{ fontSize: '13px', margin: 'auto' }} />
            </Box>
          ) : (
            false
          )}

          <Box>
            <input
              {...getInputProps()}
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
              <>
                <Image
                  imageCustomer={imageCustomer}
                  data-testid="test-img-1"
                  src={
                    typeof value !== 'string'
                      ? URL.createObjectURL(value)
                      : value
                  }
                />
                {/* <IconWrapper> */}
                {imageCustomer && (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column-reverse',
                      marginLeft: '-2.5em',
                      marginBottom: '.5em',
                    }}
                  >
                    <EditIcon
                      sx={{
                        width: '35px',
                        height: '35px',
                        backgroundColor: '#008e58',
                        borderRadius: '50%',
                        color: '#fff',
                        padding: 0.8,
                      }}
                    />
                  </Box>
                )}
                {/* </IconWrapper> */}
              </>
            ) : (
              <Box
                onClick={handleUploadBtnClick}
                sx={{
                  border: isDragActive
                    ? '2px dashed #008e58'
                    : '2px dashed #c4c4c4',
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
        </Box>
      </Box>
      <ImageCrop
        open={Boolean(imageCrop)}
        image={imageFile}
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
  imageCustomer: false,
};

export default InputImage;
