import { Typography, type TypographyProps } from '@mui/material';
import { useTranslations } from 'next-intl';

type I18nKeyWithValues = {
  key: string;
  values: Record<string, string | number>;
};
type FsTypographyProps = TypographyProps & {
  i18nKey?: string | I18nKeyWithValues;
};

const FsTypography = ({
  children,
  i18nKey = '',
  component = 'p',
  variant,
  color = 'text.primary',
  ...rest
}: FsTypographyProps) => {
  const t = useTranslations();
  let content: string;

  if (typeof i18nKey === 'string') {
    content = t(i18nKey);
  } else {
    content = t(
      i18nKey?.key,
      i18nKey?.values as Record<string, string>
    ) as string;
  }

  return (
    <Typography component={component} variant={variant} color={color} {...rest}>
      {children ?? content}
    </Typography>
  );
};

export default FsTypography;
