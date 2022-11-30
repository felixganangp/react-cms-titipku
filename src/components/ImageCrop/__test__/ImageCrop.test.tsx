/* eslint-disable @typescript-eslint/lines-between-class-members */
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ImageCrop from '../index';

class FileReaderMock {
  DONE = FileReader.DONE;
  EMPTY = FileReader.EMPTY;
  LOADING = FileReader.LOADING;
  readyState = 0;
  error: FileReader['error'] = null;
  result: FileReader['result'] = null;
  abort = vi.fn();
  addEventListener = vi.fn();
  dispatchEvent = vi.fn();
  onabort = vi.fn();
  onerror = vi.fn();
  onload = vi.fn();
  onloadend = vi.fn();
  onloadprogress = vi.fn();
  onloadstart = vi.fn();
  onprogress = vi.fn();
  readAsArrayBuffer = vi.fn();
  readAsBinaryString = vi.fn();
  readAsDataURL = vi.fn();
  readAsText = vi.fn();
  removeEventListener = vi.fn();
}

interface FileReader {
  DONE: any;
  EMPTY: any;
  LOADING: any;
  readyState: any;
  abort: any;
  error: any;
  result: any;
  addEventListener: any;
  dispatchEvent: any;
  onabort: any;
  onerror: any;
  onload: any;
  onloadend: any;
  onloadprogress: any;
  onloadstart: any;
  onprogress: any;
  readAsArrayBuffer: any;
  readAsBinaryString: any;
  readAsDataURL: any;
  readAsText: any;
  removeEventListener: any;
}

async function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener('load', (evt) => {
      if (reader.result) {
        resolve(reader.result as string);
      }
    });
    reader.readAsDataURL(file);
  });
}

describe('ImageCrop Component', () => {
  const file = new File([new ArrayBuffer(1)], 'file.jpg');
  const fileReader = new FileReaderMock();
  const mockedUseFooContext = vi.spyOn(
    window,
    'FileReader',
  ) as jest.Mock<FileReader>;
  mockedUseFooContext.mockImplementation(() => fileReader);
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('Modal should be not shown', () => {
    render(
      <ImageCrop
        open={false}
        setClose={() => {}}
        image={new File(['test.png'], 'hello.png')}
        onChange={() => {}}
      />,
    );
    const modalImageCrop = screen.queryByText(/Crop Image/i);
    expect(modalImageCrop).toBeNull();
  });

  // it('Modal should be shown', async () => {
  //   fileReader.result = 'file content';
  //   fileReader.addEventListener.mockImplementation((_, fn) => fn());
  //   const content = await readFileAsDataURL(file);
  //   render(
  //     <ImageCrop
  //       open
  //       setClose={() => {}}
  //       image={file}
  //       onChange={() => {}}
  //     />,
  //   );
  //   expect(content).toBe('file content');
  //   expect(fileReader.readAsDataURL).toHaveBeenCalledTimes(1);
  //   expect(fileReader.readAsDataURL).toHaveBeenCalledWith(file);

  // const content = await readFileAsDataURL(file);
  // render(
  //   <ImageCrop
  //     open
  //     setClose={() => {}}
  //     image={new File(['test.png'], 'hello.png')}
  //     onChange={() => {}}
  //   />,
  // );
  // const modalImageCrop = screen.queryByText(/Crop Image/i);
  // expect(modalImageCrop).toBeInTheDocument();
  // });
});
