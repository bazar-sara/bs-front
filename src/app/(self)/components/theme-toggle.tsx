'use client';
import { IconButton, Tooltip } from '@mui/material';
import {
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
} from '@mui/icons-material';
import { useFsTheme } from '@fs/utils';

const ThemeToggle = () => {
  const { mode, setMode } = useFsTheme();

  const handleToggleMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  return (
    <Tooltip
      title={mode === 'light' ? 'تغییر به حالت تاریک' : 'تغییر به حالت روشن'}
    >
      <IconButton
        onClick={handleToggleMode}
        sx={{
          color: 'inherit',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'scale(1.1)',
          },
        }}
      >
        {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;
