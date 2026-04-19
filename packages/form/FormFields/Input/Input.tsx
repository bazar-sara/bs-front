import ErrorMessage from '../../ErrorMessage';
import {
  Box,
  InputAdornment,
  TextField,
  type SxProps,
  type Theme,
  type TextFieldProps,
} from '@mui/material';
import {
  Controller,
  useFormContext,
  type ControllerProps,
} from 'react-hook-form';
import { useExtractErrorInfo } from '../../useExtractErrorInfo';
import { inputOnChange, inputValue } from './utils';
import { useTranslations } from 'next-intl';
import { FsIconButton } from '@fs/core';
import ClearIcon from '@mui/icons-material/Clear';

/** Default outlined field look shared by FsInput and other MUI TextFields that should match. */
export const fsOutlinedInputRootSx: SxProps<Theme> = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 1.5,
    bgcolor: 'background.paper',
  },
};

export type FsInputProps = Omit<
  TextFieldProps,
  'label' | 'name' | 'inputProps'
> & {
  i18nKey: string;
  name: string;
  defaultValue?: string | number;
  rules?: ControllerProps['rules'];
  onlyNumbers?: boolean;
  maxLength?: number;
  inputProps?: Omit<TextFieldProps['inputProps'], 'min' | 'max'>;
  separator?: boolean;
  clearButton?: boolean;
};

const FsInput = ({
  name,
  i18nKey,
  defaultValue,
  rules,
  onlyNumbers,
  maxLength,
  clearButton = true,
  separator = true,
  ...rest
}: FsInputProps) => {
  const { sx: sxProp, InputProps: userInputProps, ...textFieldRest } = rest;
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const t = useTranslations();
  const { errorI18nKey } = useExtractErrorInfo(errors, name);

  const mergedSx: SxProps<Theme> = [
    fsOutlinedInputRootSx,
    ...(sxProp ? (Array.isArray(sxProp) ? sxProp : [sxProp]) : []),
  ];

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue || ''}
      rules={rules}
      render={({ field }) => (
        <Box>
          <TextField
            {...field}
            label={t(i18nKey)}
            fullWidth
            sx={mergedSx}
            {...textFieldRest}
            value={inputValue(field, onlyNumbers, separator)}
            onChange={(e) => inputOnChange(e, onlyNumbers, field, maxLength)}
            InputProps={{
              ...userInputProps,
              endAdornment: (
                <>
                  {userInputProps?.endAdornment}
                  {clearButton && field.value ? (
                    <InputAdornment position="end">
                      <FsIconButton
                        size="small"
                        edge="end"
                        onClick={() => field.onChange(undefined)}
                        aria-label="clear"
                      >
                        <ClearIcon fontSize="small" />
                      </FsIconButton>
                    </InputAdornment>
                  ) : null}
                </>
              ),
            }}
          />
          <ErrorMessage i18nKey={errorI18nKey} />
        </Box>
      )}
    />
  );
};

export default FsInput;
