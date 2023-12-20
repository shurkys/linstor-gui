'use client';
// app/storage-configuration/ResourcesPage.tsx
import { useState, useEffect } from 'react';
import DataTable from '@/components/DataTable';

export default function ResourcesPage() {
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
        { label: 'Name', key: 'name' },
        { label: 'Node', key: 'node_name' },
        { label: 'Port', key: 'layer_object.resource_name_suffix' },
        { label: 'Usage Status', key: 'state.in_use' },
        { label: 'Connect Status', key: 'layer_object.children.0.connected' },
        { label: 'State', key: 'volumes.0.state.disk_state' },
        { label: 'Create Time', key: 'create_timestamp' },
    ];

    return (
        <DataTable
            data={resources}
            columns={columns}
            loading={false}
            searchColumn="name"
            addButtonLink="/storage-configuration/resource/add"
            addButtonLabel="Add Resource"
        />
    );
}
