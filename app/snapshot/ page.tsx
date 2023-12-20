'use client';
// app/inventory/SnapshotsPage.tsx
import { useState, useEffect } from 'react';
import DataTable from '@/components/DataTable';

export default function SnapshotsPage() {
    const [snapshots, setSnapshots] = useState<Record<string, any>[]>([]);

    useEffect(() => {
        const fetchSnapshots = async () => {
            try {
                const response = await fetch('/v1/view/snapshots');
                if (response.ok) {
                    const data = await response.json();
                    setSnapshots(data);
                } else {
                    console.error('Failed to fetch snapshots');
                }
            } catch (error) {
                console.error('Error fetching snapshots:', error);
            }
        };

        fetchSnapshots();
    }, []);

    const columns = [
        { label: 'Resource Name', key: 'resource_name' },
        { label: 'Snapshot Name', key: 'name' },
        { label: 'Node Names', key: "snapshots.map(node => node.node_name).join(', ')" },
        { label: 'Volumes', key: "volume_definitions.map(volume => volume.volume_number).join(', ')" },
        { label: 'Created', key: "snapshots.map(snapshot => new Date(snapshot.create_timestamp).toLocaleString()).join(', ')" },
        { label: 'State', key: 'flags' }, // Assuming 'flags' represent the state
    ];

    return (
        <DataTable
            data={snapshots}
            columns={columns}
            loading={false}
            searchColumn="name"
            addButtonLink="/inventory/snapshots/add"
            addButtonLabel="Add Snapshot"
        />
    );
}
