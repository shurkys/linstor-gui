'use client';
// app/storage-configuration/VolumesPage.tsx
import { useState, useEffect } from 'react';
import DataTable from '@/components/DataTable';

export default function VolumesPage() {
    const [resources, setResources] = useState<Record<string, any>[]>([]);

    useEffect(() => {
        const fetchResources = async () => {
            try {
                const response = await fetch('/v1/view/resources');
                if (response.ok) {
                    const data = await response.json();
                    setResources(data);
                } else {
                    console.error('Failed to fetch resources');
                }
            } catch (error) {
                console.error('Error fetching resources:', error);
            }
        };

        fetchResources();
    }, []);

    const columns = [
        { label: 'Resource', key: 'name' },
        { label: 'Node', key: 'node_name' },
        { label: 'Storage Pool', key: 'volumes.0.storage_pool_name' },
        { label: 'Device Name', key: 'volumes.0.device_path' },
        { label: 'Allocated', key: 'volumes.0.allocated_size_kib' },
        { label: 'In Use', key: 'state.in_use' },
        { label: 'State', key: 'volumes.0.state.disk_state' },
    ];

    return (
        <DataTable
            data={resources}
            columns={columns}
            loading={false}
            searchColumn="name"
            addButtonLink="/storage-configuration/volume/add"
            addButtonLabel="Add Volume"
        />
    );
}
