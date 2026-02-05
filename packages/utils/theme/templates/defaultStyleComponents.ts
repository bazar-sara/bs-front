import type { Components } from '@mui/material';
import type { Theme } from '@mui/material/styles';

const isDark = (theme: Theme) => theme.palette.mode === 'dark';

export const getDefaultStyleComponents = (theme: Theme): Components => {
  const dark = isDark(theme);
  return {
    MuiButton: {
      styleOverrides: {
        sizeLarge: {
          height: '2.625rem',
        },
        sizeMedium: {
          height: '2.25rem',
        },
        sizeSmall: {
          height: '1.91rem',
        },
        contained: {
          boxShadow: 'none',
          ':hover': {
            boxShadow: 'none',
          },
        },
        containedWarning: {
          color: '#FFFFFF',
        },
        containedSuccess: {
          ':hover': {
            background: dark ? theme.palette.success.dark : '#00722E',
          },
        },
      },
    },
    MuiSelect: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiInputLabel: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiInput: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiTextField: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiChip: {
      defaultProps: {
        size: 'small',
      },
      styleOverrides: {
        colorSuccess: dark
          ? {
              background: 'rgba(26, 216, 102, 0.22)',
              color: theme.palette.success.light,
            }
          : {
              background: '#C0FFD9',
              color: '#00722E',
            },
        colorError: dark
          ? {
              background: 'rgba(255, 62, 82, 0.22)',
              color: theme.palette.error.light,
            }
          : {
              background: '#FFC0C7',
              color: '#A50011',
            },
        colorWarning: dark
          ? {
              background: 'rgba(255, 182, 57, 0.22)',
              color: theme.palette.warning.light,
            }
          : {
              background: '#FFF5E5',
              color: '#CC8100',
            },
        colorSecondary: dark
          ? {
              background: 'rgba(188, 152, 106, 0.25)',
              color: '#E8D4BC',
            }
          : {
              background: '#F0E6D8',
              color: '#5C3D1F',
            },
      },
    },
    ...(dark && {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            backgroundColor: theme.palette.grey[100],
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: theme.palette.grey[100],
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: theme.palette.grey[200],
          },
        },
      },
    }),
  };
};
