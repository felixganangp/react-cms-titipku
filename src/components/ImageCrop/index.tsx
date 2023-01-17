import React from 'react';
import AvatarEditor from 'react-avatar-editor';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';

import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import RotateRightIcon from '@mui/icons-material/RotateRight';

import Modal from 'components/Modal';

interface Props {
  open: boolean;
  image: File;
  setClose: any;
  onChange: any;
  width?: number;
  height?: number;
  title?: string;
}

interface State {
  zoom: any;
  rotate: any;
}

class ImageCrop extends React.Component<Props, State> {
  // eslint-disable-next-line react/sort-comp
  constructor(props: Props) {
    super(props);
    this.state = {
      zoom: 50,
      rotate: 0,
    };
  }

  // eslint-disable-next-line react/no-unused-class-component-methods
  private editor: any;

  componentDidUpdate(prevProps: any) {
    if (prevProps.image !== this.props.image) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ rotate: 0 });
    }
  }

  /* eslint no-return-assign: "error" */
  /* eslint-disable react/no-unused-class-component-methods */
  setEditorRef = (editor: any) => (this.editor = editor);

  onClickSave = () => {
    if (this.editor) {
      const canvas = this.editor.getImage().toDataURL();
      this.props.onChange(this.dataURLtoFile(canvas));
      this.setState({ zoom: 50 });
      this.props.setClose();
    }
  };

  dataURLtoFile = (dataurl: any) => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    // eslint-disable-next-line no-plusplus
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], this.props.image.name, { type: mime });
  };

  onRotata = () => {
    const { rotate } = this.state;
    if (rotate !== 360) {
      this.setState({ rotate: rotate + 90 });
    } else {
      this.setState({ rotate: 90 });
    }
  };

  render() {
    const {
      open,
      setClose,
      image,
      title = '',
      height = 250,
      width = 250,
    } = this.props;
    const { zoom, rotate } = this.state;

    return (
      <Modal
        title={`Crop ${title || ''} Image`}
        onClose={() => setClose()}
        open={open}
        width="auto"
        padding="0px"
        data-testid="test-modal-1"
      >
        <div>
          <Box position="relative">
            <AvatarEditor
              ref={this.setEditorRef}
              image={image}
              width={width}
              height={height}
              border={20}
              color={[0, 0, 0, 0.6]} // RGBA
              scale={(zoom * 2) / 100}
              rotate={rotate}
            />
            <Button
              // color=""
              size="small"
              onClick={this.onRotata}
              variant="contained"
              startIcon={<RotateRightIcon />}
              sx={{
                minWidth: '40px',
                minHeight: '40px',
                '.MuiButton-startIcon': {
                  margin: 0,
                },
                position: 'absolute',
                bottom: '5px',
                right: '5px',
              }}
            />
          </Box>
          <Box p="10px 20px">
            <Box m="20px 10px">
              <Stack
                spacing={2}
                direction="row"
                sx={{ mb: 1 }}
                alignItems="center"
              >
                <ZoomOutIcon />
                <Slider
                  track={false}
                  aria-label="Volume"
                  value={zoom}
                  onChange={(_, e) => {
                    this.setState({ zoom: e });
                  }}
                  // color="red"
                />
                <ZoomInIcon />
              </Stack>
            </Box>
            <Box
              sx={{
                justifyContent: 'flex-end',
                display: 'flex',
                gap: '10px',
                marginTop: '40px',
              }}
            >
              <Button
                color="error"
                size="small"
                onClick={() => {
                  this.setState({ zoom: 50 });
                  setClose();
                }}
              >
                Cancel
              </Button>
              <Button
                size="small"
                variant="contained"
                type="submit"
                onClick={this.onClickSave}
              >
                Save
              </Button>
            </Box>
          </Box>
        </div>
      </Modal>
    );
  }
}

export default ImageCrop;
