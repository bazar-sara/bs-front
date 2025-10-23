'use client';
import { DataGrid, DataGridProps } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';

const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable({ ...rest }: DataGridProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <DataGrid
      initialState={{ pagination: { paginationModel } }}
      pageSizeOptions={[5, 10]}
      {...rest}
    />
  );
}
