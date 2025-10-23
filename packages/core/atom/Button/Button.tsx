import { Button, CircularProgress, type ButtonProps } from '@mui/material';
import { FsTooltip, type FsTooltipProps } from '../Tooltip';
import { useTranslations } from 'next-intl';

type FsButtonProps = ButtonProps & {
  i18nKey?: string;
  loading?: boolean;
  tooltipProps?: Omit<FsTooltipProps, 'children'>;
};

const FsButtonTemplate = ({
  i18nKey = '',
  children,
  loading,
  disabled,
  startIcon,
  endIcon,
  sx,
  ...rest
}: Omit<FsButtonProps, 'tooltipProps'>) => {
  const t = useTranslations();

  return (
    <Button
      disabled={disabled || loading}
      startIcon={!loading ? startIcon : undefined}
      endIcon={!loading ? endIcon : undefined}
      sx={{ textTransform: 'none', ...sx }}
      {...rest}
    >
      {loading ? (
        <CircularProgress color="inherit" size={'1.5em'} />
      ) : (
        <>
          {children}
          {t(i18nKey)}
        </>
      )}
    </Button>
  );
};

const FsButton = ({ tooltipProps, ...rest }: FsButtonProps) => {
  return tooltipProps ? (
    <FsTooltip {...tooltipProps}>
      <FsButtonTemplate {...rest} />
    </FsTooltip>
  ) : (
    <FsButtonTemplate {...rest} />
  );
};

export default FsButton;
