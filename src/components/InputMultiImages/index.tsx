/**
 *
 * InputMultiImages
 *
 */
import React, { useRef, useState } from 'react';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloseIcon from '@mui/icons-material/Close';

import ImageCrop from '../ImageCrop';

const Image = styled.img`
  height: 170px;
  max-width: 100%;
  object-fit: cover;
`;

interface Props {
  values: Blob[] | string[];
  onChange: any;
  // onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  maxImage?: number;
  cropable?: boolean;
}

function InputMultiImages({ values, onChange, maxImage, cropable }: Props) {
  const [imageCrop, setImageCrop] = useState<any>(false);
  const fileInputField = useRef<HTMLInputElement>(null);

  const handleNewFileUpload = (e: any) => {
    const { files: newFiles } = e.target;
    if (newFiles.length) {
      // props.setSelectedImg([...props.selectedImg, newFiles[0]]);
      if (cropable) {
        setImageCrop(newFiles[0]);
      } else {
        onChange([...values, newFiles[0]]);
      }
    }
  };

  const handleSaveCropedImage = (e: any) => {
    onChange([...values, e]);
  };

  const handleUploadBtnClick = () => {
    fileInputField.current?.click();
  };

  const handleRemove = (index: number) => {
    const file = values;
    // if (props.edit) {
    //   file.forEach((el, i) => {
    //     if (typeof el === 'string') {
    //       if (i === index) {
    //         props.setDeletedImg([...props.deletedImg, el]);
    //       }
    //     }
    //   });
    // }
    file.splice(index, 1);
    // props.setSelectedImg([...file]);
    onChange([...file]);
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
          // backgroundColor: 'red',
        }}
      >
        <input
          type="file"
          ref={fileInputField}
          onChange={handleNewFileUpload}
          title=""
          value=""
          style={{ display: 'none' }}
          accept="image/png, image/jpg, image/jpeg"
          // {...otherProps}
        />
        {values && values.length > 0 ? (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            width="100%"
            // sx={{
            //   backgroundColor: 'yellow',
            // }}
          >
            <Box
              // ref={imageEndRef}
              sx={{
                display: 'flex',
                flexWrap: 'nowrap',
                overflowX: 'auto',
                width: '120%',
                maxWidth: '100%',
                minWidth: '100%',
                // backgroundColor: 'blue',
              }}
            >
              {values.map((val, index) => (
                <Box
                  key={`multiImages${index}`}
                  position="relative"
                  margin="10px"
                >
                  <Button
                    size="small"
                    color="error"
                    variant="contained"
                    sx={{
                      width: '20px',
                      minWidth: 'unset',
                      height: '20px',
                      borderRadius: '100%',
                      position: 'absolute',
                      top: '5px',
                      right: '5px',
                      // backgroundColor: 'black',
                    }}
                    onClick={() => handleRemove(index)}
                  >
                    <CloseIcon sx={{ fontSize: '15px' }} />
                  </Button>
                  <Image
                    src={
                      typeof val !== 'string' ? URL.createObjectURL(val) : val
                    }
                  />
                </Box>
              ))}
            </Box>
            <Button
              sx={{ maxWidth: '150px' }}
              startIcon={<AddPhotoAlternateIcon />}
              variant="outlined"
              onClick={handleUploadBtnClick}
              size="small"
              disabled={values.length === maxImage}
            >
              Add More Image
            </Button>
          </Box>
        ) : (
          // <Image
          //   src={typeof value !== 'string' ? URL.createObjectURL(value) : value}
          // />
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              height: '170px',
              padding: '10px',
            }}
          >
            <Button
              startIcon={<AddPhotoAlternateIcon />}
              variant="contained"
              onClick={handleUploadBtnClick}
            >
              Add Image
            </Button>
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

InputMultiImages.defaultProps = {
  maxImage: 5,
  cropable: false,
};

export default InputMultiImages;
