'use client';

import { Toaster } from 'sonner';

const FsToaster = () => {
  return (
    <Toaster
      visibleToasts={4}
      toastOptions={{
        closeButton: true,
      }}
    />
  );
};

export default FsToaster;
