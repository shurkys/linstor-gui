'use client';
// ./app/inventory/ErrorReportsPage.tsx
import { useState, useEffect } from 'react';
import DataTable from '@/components/DataTable';
import { ErrorReport } from '@/types/ErrorReport';

export default function ErrorReportsPage() {
    const [errorReports, setErrorReports] = useState<ErrorReport[]>([]);

    useEffect(() => {
        const fetchErrorReports = async () => {
            try {
                const response = await fetch('/v1/error-reports');
                if (response.ok) {
                    const data = await response.json();
                    setErrorReports(data);
                } else {
                    console.error('Failed to fetch error reports');
                }
            } catch (error) {
                console.error('Error fetching error reports:', error);
            }
        };

        fetchErrorReports();
    }, []);

    const columns = [
        { label: 'ID', key: 'node_name' },
        { label: 'Time', key: 'error_time' },
        { label: 'Message', key: 'exception_message' },
        { label: 'Action', key: 'filename' },
    ];

    return (
        <DataTable
            data={errorReports}
            columns={columns}
            loading={false}
            searchColumn="node_name"
            addButtonLink="/error-reports/add"
            addButtonLabel="Add Error Report"
        />
    );
}
