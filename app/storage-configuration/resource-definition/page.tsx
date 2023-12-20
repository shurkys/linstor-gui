'use client';
// storage-configuration/resource-definitions.tsx
import React, { useEffect, useState } from 'react';
import DataTable from '@/components/DataTable';

const ResourceDefinitionsPage: React.FC = () => {
    const [resourceDefinitions, setResourceDefinitions] = useState<Record<string, any>[]>([]);

    useEffect(() => {
        // Функция для загрузки данных с /v1/resource-definitions
        const fetchResourceDefinitions = async () => {
            try {
                const response = await fetch('/v1/resource-definitions');
                if (response.ok) {
                    const data = await response.json();
                    setResourceDefinitions(data);
                } else {
                    console.error('Failed to fetch resource definitions');
                }
            } catch (error) {
                console.error('Error fetching resource definitions:', error);
            }
        };

        fetchResourceDefinitions();
    }, []);

    // Определение колонок для отображения в таблице
    const columns = [
        { label: 'Name', key: 'name' },
        { label: 'ResourceGroup Name', key: 'resource_group_name' },
        { label: 'Size', key: 'volume_definitions.0.size_kib' },
        { label: 'Port', key: 'drbd_port' },
        { label: 'State', key: 'state' }, // Предполагается, что у вас есть поле "state" в ваших данных
    ];

    return (
        <DataTable
            data={resourceDefinitions}
            columns={columns}
            loading={false}
            searchColumn="name"
            addButtonLink="/storage-configuration/resource-definition/add"
            addButtonLabel="Add Resource Definition"
        />
    );
};

export default ResourceDefinitionsPage;
