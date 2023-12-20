'use client';
// app/inventory/storage-pool/page.tsx

import { useEffect, useState } from 'react';
import StoragePool from '@/types/StoragePool';
import DataTable from '@/components/DataTable'; // Import the new component

export default function StoragePools() {
  const [storagePools, setStoragePools] = useState<StoragePool[] | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStoragePools = async () => {
      try {
        const response = await fetch('/v1/view/storage-pools');
        if (!response.ok) {
          throw new Error('Failed to fetch storage pools');
        }
        const data = await response.json();
        setStoragePools(data);
      } catch (error) {
        console.error('Error fetching storage pools:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStoragePools();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!storagePools) return <p>No profile data</p>;

  return (
    <DataTable
      data={storagePools}
      columns={[
        { label: 'Name', key: 'storage_pool_name' },
        { label: 'Node', key: 'node_name' },
        { label: 'Provider Kind', key: 'provider_kind' },
        { label: 'Free Capacity (KiB)', key: 'free_capacity' },
        { label: 'Total Capacity (KiB)', key: 'total_capacity' },
        { label: 'Disk', key: 'free_space_mgr_name' },
        { label: 'Supports Snapshots', key: 'supports_snapshots' },
      ]}
      actions={[
        {
          label: 'Edit Storage Pool',
          onClick: (name) =>
            console.log(`Edit storage pool with Name: ${name}`),
        },
        { label: 'Delete', onClick: () => console.log('Delete') },
      ]}
      loading={isLoading}
      searchColumn="name"
      addButtonLink="/inventory/storage-pools/add"
      addButtonLabel="Add Storage Pool"
    />
  );
};
