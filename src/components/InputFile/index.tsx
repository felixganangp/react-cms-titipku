import { CloudUpload } from '@mui/icons-material';
import { Button } from '@mui/material';
import React, { useRef } from 'react';
import { useDropzone } from 'react-dropzone';

export default function InputFile({
  accept,
  onChange,
  value,
}: {
  accept?: string;
  value: File | null;
  onChange: (file: File) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    fileRejections,
  } = useDropzone({});

  const handleUploadBtnClick = () => {
    if (ref.current) {
      ref.current.click();
    }
  };
  return (
    <div
      {...getRootProps({
        onClick: handleUploadBtnClick,
        onDrop: (e) => {
          e.preventDefault();
          if (e.dataTransfer.files[0]) onChange(e.dataTransfer.files[0]);
        },
      })}
    >
      <input
        {...getInputProps()}
        ref={ref}
        type="file"
        accept={
          accept ||
          'application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,'
        }
        hidden
        title=""
        value=""
        onChange={(e) => {
          // @ts-ignore
          if (e.target.files[0]) {
            // @ts-ignore
            onChange(e.target.files[0]);
          }
        }}
      />
      <Button
        // onClick={() => {
        //   handleUploadBtnClick();
        // }}
        startIcon={<CloudUpload />}
        variant={isDragActive ? 'contained' : 'outlined'}
      >
        {/* @ts-ignore */}
        {value?.name || 'Choose File'}
      </Button>
    </div>
  );
}
