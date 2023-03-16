import { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import FullscreenIcon from '@mui/icons-material/FullscreenOutlined';

export default function FullScreen() {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const listen = () => {
    if (!document.fullscreenElement) {
      setIsFullScreen(false);
    } else {
      setIsFullScreen(true);
    }
  };
  useEffect(() => {
    document.addEventListener('fullscreenchange', listen);

    return () => document.removeEventListener('fullscreenchange', listen);
  }, []);
  return (
    <IconButton
      onClick={() => {
        if (!document.fullscreenElement) {
          document.body.requestFullscreen();
        } else {
          document.exitFullscreen();
        }
      }}
    >
      {!isFullScreen ? (
        <FullscreenIcon sx={{ color: '#303030' }} />
      ) : (
        <FullscreenExitIcon sx={{ color: '#303030' }} />
      )}
    </IconButton>
  );
}
