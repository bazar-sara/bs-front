import { Theme, Typography, type TypographyProps } from '@mui/material';
import { useTranslations } from 'next-intl';

type I18nKeyWithValues = {
  key: string;
  values: Record<string, any>;
};
type FsTypographyProps = TypographyProps & {
  i18nKey?: string | I18nKeyWithValues;
};

const FsTypography = ({
  component = 'p',
  children,
  i18nKey = '',
  ...rest
}: FsTypographyProps) => {
  const t = useTranslations();
  let content: string;

  if (typeof i18nKey === 'string') {
    content = t(i18nKey);
  } else {
    content = t(i18nKey?.key, i18nKey?.values) as string;
  }
  return (
    <Typography component={component} {...rest}>
      {children || content}
    </Typography>
  );
};

export default FsTypography;
