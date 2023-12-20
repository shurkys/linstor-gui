'use client';
// app/inventory/ip-addresses.tsx
import { useState, useEffect } from 'react';
import DataTable from '@/components/DataTable';

export default function IPAddressesPage() {
    const [nodes, setNodes] = useState<Record<string, any>[]>([]);

    useEffect(() => {
        const fetchNodes = async () => {
            try {
                const response = await fetch('/v1/nodes');
                if (response.ok) {
                    const data = await response.json();
                    setNodes(data);
                } else {
                    console.error('Failed to fetch nodes');
                }
            } catch (error) {
                console.error('Error fetching nodes:', error);
            }
        };

        fetchNodes();
    }, []);

    const columns = [
        { label: 'Node', key: 'name' },
        { label: 'IP Address', key: 'net_interfaces.0.address' }, // Assuming the first net interface is the primary one
        { label: 'TCP Port', key: 'net_interfaces.0.satellite_port' },
        { label: 'Alias', key: 'net_interfaces.0.name' },
        { label: 'Active', key: 'net_interfaces.0.is_active' },
    ];

    return (
        <DataTable
            data={nodes}
            columns={columns}
            loading={false}
            searchColumn="name"
            addButtonLink="/inventory/ip-addresses/add"
            addButtonLabel="Add IP Address"
        />
    );
}
