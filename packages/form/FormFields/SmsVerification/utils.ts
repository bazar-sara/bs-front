import { type UseFormSetValue, type UseFormGetValues } from 'react-hook-form';

export const handleChange =
  (options: {
    index: number;
    setValue: UseFormSetValue<any>;
    numInputs: number;
    refs: React.MutableRefObject<(HTMLInputElement | null)[]>;
    name: string;
  }) =>
  (event: React.ChangeEvent<HTMLInputElement>) => {
    const { index, setValue, numInputs, refs, name } = options;
    const value = event.target.value.replace(/\D/g, '');
    setValue(`${name}[${index}]`, value);

    if (value && index < numInputs - 1) {
      refs.current[index + 1]?.focus();
    }
  };

export const handleKeyDown =
  (options: {
    index: number;
    getValues: UseFormGetValues<any>;
    setValue: UseFormSetValue<any>;
    refs: React.MutableRefObject<(HTMLInputElement | null)[]>;
    name: string;
  }) =>
  (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { index, getValues, setValue, refs, name } = options;
    if (event.key === 'Backspace' && !getValues(`${name}[${index}]`)) {
      if (index > 0) {
        setValue(`${name}[${index - 1}]`, '');
        refs.current[index - 1]?.focus();
      }
    }
  };

export const handlePaste =
  (options: {
    numInputs: number;
    setValue: UseFormSetValue<any>;
    refs: React.MutableRefObject<(HTMLInputElement | null)[]>;
    name: string;
  }) =>
  (event: React.ClipboardEvent<HTMLInputElement>) => {
    const { numInputs, setValue, refs, name } = options;
    event.preventDefault();
    const pasteData = event.clipboardData
      .getData('text')
      .slice(0, numInputs)
      .replace(/\D/g, '');
    pasteData.split('').forEach((char, idx) => {
      setValue(`${name}[${idx}]`, char);
    });

    // Focus the last input
    const lastInputIndex = Math.min(pasteData.length, numInputs) - 1;
    refs.current[lastInputIndex]?.focus();
  };
