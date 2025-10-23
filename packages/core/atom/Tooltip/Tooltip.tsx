import Tooltip, { type TooltipProps } from '@mui/material/Tooltip';
import { useTranslations } from 'next-intl';

export type FsTooltipProps = Omit<TooltipProps, 'title'> & {
  i18nKey: string;
};

const FsTooltip = ({ children, i18nKey, ...rest }: FsTooltipProps) => {
  const t = useTranslations();
  return (
    <Tooltip title={t(i18nKey)} {...rest}>
      {children}
    </Tooltip>
  );
};

export default FsTooltip;
