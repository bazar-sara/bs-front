import { type FormHTMLAttributes, type ReactNode } from 'react';
import {
  FormProvider,
  type UseFormReturn,
} from 'react-hook-form';

type FsFormProviderProps = {
  children: ReactNode;
  formProps?: FormHTMLAttributes<HTMLFormElement>;
  methods: UseFormReturn<any, any, any>;
  name: string;
};

function FsFormProvider({
  children,
  methods,
  name,
  formProps,
}: FsFormProviderProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    formProps && formProps.onSubmit && formProps.onSubmit(event);
  };
  return (
    <FormProvider {...methods}>
      <form
        {...formProps}
        data-cy={name}
        onSubmit={handleSubmit}
        style={{ width: '100%' }}
      >
        {children}
      </form>
    </FormProvider>
  );
}

export default FsFormProvider;
