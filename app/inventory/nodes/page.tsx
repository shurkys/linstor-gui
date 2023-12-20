'use client';
// app/inventory/nodes/page.tsx
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DataTable from '@/components/DataTable';
import { Node } from '@/types/Node';

export default function NodesPage() {
  const router = useRouter();
  const [nodes, setNodes] = useState<Node[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/v1/nodes');
        if (!response.ok) {
          throw new Error('Failed to fetch nodes');
        }
        const data = await response.json();
        setNodes(data);
      } catch (error) {
        console.error('Error fetching nodes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const confirmDelete = (name: string) => {
    if (window.confirm('Are you sure you want to delete this node?')) {
      deleteNode(name);
    }
  };

  const deleteNode = async (name: string) => {
    try {
      const response = await fetch(`/v1/nodes/${name}`, { method: 'DELETE' });

      if (response.ok) {
        console.log('Node deleted successfully!');
        // Опционально, обновите страницу или обновите список узлов
      } else {
        console.error('Failed to delete node');
      }
    } catch (error) {
      console.error('Error deleting node:', error);
    }
  };

  const editNode = (name: string) => {
    router.push(`/inventory/nodes/edit/${name}`);
  };

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <DataTable
      data={nodes}
      columns={[
        { label: 'Name', key: 'name' },
        { label: 'IP', key: 'net_interfaces.0.address' },
        { label: 'Port', key: 'net_interfaces.0.satellite_port' },
        { label: 'Type', key: 'type' },
        { label: 'Status', key: 'connection_status' },
      ]}
      actions={[
        { label: 'View', onClick: (name) => console.log(`Viewing node with Name: ${name}`) },
        { label: 'Settings', onClick: (name) => editNode(name) }, // console.log(`Settings for node with Name: ${name}`) },
        { label: 'Delete', onClick: confirmDelete },
      ]}
      loading={isLoading}
      searchColumn="name"
      addButtonLink="/inventory/nodes/add"
      addButtonLabel="Add Node"
    />
  );
}

