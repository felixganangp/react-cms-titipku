import { CloudUpload } from '@mui/icons-material';
import { Button } from '@mui/material';
import React, { useEffect, useRef } from 'react';
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
    acceptedFiles,
  } = useDropzone({});

  const handleUploadBtnClick = () => {
    if (ref.current) {
      ref.current.click();
    }
  };
  useEffect(() => {
    if (acceptedFiles.length > 0) {
      onChange(acceptedFiles[0]);
    }
  }, [acceptedFiles, isDragReject, fileRejections]);

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
        {typeof value === 'string'
          ? // @ts-ignore
            `${value.slice(0, 20)} ...`
          : value?.name || 'Choose File'}
      </Button>
    </div>
  );
}
