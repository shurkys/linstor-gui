'use client';
// ./pages/storage-configuration/resource-groups/add.tsx
import React, { useEffect, useState } from 'react';
import AddInventory from '@/components/AddInventory';
import { StoragePool } from '@/types/StoragePool';

const AddResourceGroupPage: React.FC = () => {
    const [storagePools, setStoragePools] = useState<StoragePool[]>([]);
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

    const onSubmit = async (formData: Record<string, any>) => {
        try {
            validateInput(formData);

            // Perform the API call
            const response = await fetch('/v1/resource-groups', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Resource group added successfully!', result);
                // Use the result to navigate to the details page or other actions
            } else {
                const result = await response.json();
                throw new Error(result.message || 'Failed to add resource group');
            }
        } catch (error) {
            console.error('Error submitting resource group data:', (error as Error).message);
            // Provide feedback to the user, e.g., display an error message
            throw new Error('Failed to add resource group');
        }
    };

    const validateInput = (formData: Record<string, any>) => {
        const requiredFields = ['name', 'place_count', 'storage_pool', 'description'];
        const missingFields = requiredFields.filter((field) => formData[field] === undefined);

        if (missingFields.length > 0) {
            throw new Error(`Please fill in all required fields. Missing: ${missingFields.join(', ')}`);
        }
    };

    // Убедимся, что storage_pool в defaultValues не остается undefined
    const defaultStoragePool = storagePools.length > 0 ? storagePools[0].storage_pool_name : undefined;

    return (
        <AddInventory
            title="Add Resource Group"
            fields={[
                { label: 'Name', key: 'name', type: 'text' },
                { label: 'Place Count', key: 'place_count', type: 'number' },
                { label: 'Storage Pool', key: 'storage_pool', type: 'select', options: storagePools.map(pool => pool.storage_pool_name) },
                { label: 'Description', key: 'description', type: 'text' },
            ]}
            onSubmit={onSubmit}
            defaultValues={{
                name: '',
                place_count: undefined,
                storage_pool: defaultStoragePool,
                description: '',
            }}
        />
    );
};

export default AddResourceGroupPage;