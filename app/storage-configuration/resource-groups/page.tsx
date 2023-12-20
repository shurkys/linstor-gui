'use client';
// app/inventory/ResourceGroups/page.tsx
import { useState, useEffect } from 'react';
import DataTable from '@/components/DataTable';
//import { ResourceGroup } from '@/types/ResourceGroup';

export default function ResourceGroupsPage() {
    const [resourceGroups, setResourceGroups] = useState<Record<string, any>[]>([]);

    useEffect(() => {
        // Функция для загрузки данных с /v1/resource-groups
        const fetchResourceGroups = async () => {
            try {
                const response = await fetch('/v1/resource-groups');
                if (response.ok) {
                    const data = await response.json();
                    setResourceGroups(data);
                } else {
                    console.error('Failed to fetch resource groups');
                }
            } catch (error) {
                console.error('Error fetching resource groups:', error);
            }
        };

        fetchResourceGroups();
    }, []);

    // Определение колонок для отображения в таблице
    const columns = [
        { label: 'ResourceGroup Name', key: 'name' },
        { label: 'Place Count', key: 'select_filter.place_count' },
        { label: 'Storage Pool', key: 'select_filter.storage_pool' },
        { label: 'Replication Mode', key: 'select_filter.diskless_type' },
        { label: 'Diskless', key: 'select_filter.diskless_on_remaining' },
        { label: 'Description', key: 'props.description' },
    ];

    return (
        <DataTable
            data={resourceGroups}
            columns={columns}
            loading={false}
            searchColumn="name"
            addButtonLink="/storage-configuration/resource-groups/add"
            addButtonLabel="Add Resource Group"
        />
    );
};
