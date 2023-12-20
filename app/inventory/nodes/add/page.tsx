'use client';
// ./app/inventory/nodes/add.tsx
import React from 'react';
import AddInventory from '@/components/AddInventory';
import { NodeType, SatelliteEncryptionType } from '@/types/Node';

export default function AddNodePage() {
  const onSubmit = async (data: Record<string, any>) => {
    try {
      validateInput(data);

      // Perform the API call
      const response = await fetch('/v1/nodes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.nodeName,
          type: data.nodeType,
          net_interfaces: [
            {
              name: data.interfaceName,
              address: data.interfaceAddress,
              satellite_port: parseInt(data.interfacePort),
              satellite_encryption_type: data.interfaceEncryptionType,
              is_active: data.isActive,
              uuid: '',
            },
          ],
        }),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.ret_code === 0) {
          console.log('Node added successfully!');
          const newNodeId = result.obj_refs.additionalProp1;
          // Optionally, you can navigate to the node details page or any other page
          // router.push(`/inventory/nodes/${newNodeId}`);
        } else {
          throw new Error(result.details || 'Failed to add node');
        }
      } else {
        throw new Error('Failed to add node');
      }
    } catch (error) {
      console.error('Error submitting node data:', (error as Error).message);
    }
  };

  const validateInput = (data: Record<string, any>) => {
    if (!data.nodeName || !data.nodeType || !data.interfaceName || !data.interfaceAddress || !data.interfacePort) {
      throw new Error('Please fill in all required fields.');
    }
  };

  return (
    <AddInventory
      title="Add Node"
      fields={[
        { label: 'Node Name', key: 'nodeName', type: 'text' },
        { label: 'Node Type', key: 'nodeType', type: 'select', options: Object.values(NodeType) },
        { label: 'Interface Name', key: 'interfaceName', type: 'text' },
        { label: 'Interface Address', key: 'interfaceAddress', type: 'text' },
        { label: 'Interface Port', key: 'interfacePort', type: 'text' },
        {
          label: 'Interface Encryption Type',
          key: 'interfaceEncryptionType',
          type: 'select',
          options: Object.values(SatelliteEncryptionType),
        },
        { label: 'Is Active', key: 'isActive', type: 'checkbox' },
      ]}
      onSubmit={onSubmit}
      defaultValues={{
        nodeName: 'test',
        nodeType: NodeType.Satellite,
        interfaceName: 'default',
        interfaceAddress: '127.0.0.1',
        interfacePort: '3366',
        interfaceEncryptionType: SatelliteEncryptionType.Plain,
        isActive: true,
      }}
    />
  );
}