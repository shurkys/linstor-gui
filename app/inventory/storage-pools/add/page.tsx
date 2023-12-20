'use client';
// ./app/inventory/storage-pools/add.tsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AddInventory from '@/components/AddInventory';
import { ProviderKind } from '@/types/StoragePool';
import { Node } from '@/types/Node';

interface DynamicField {
  label: string;
  key: string;
  type: 'text';
}

export default function AddStoragePool() {
  const router = useRouter();
  const [selectedNode, setSelectedNode] = useState<string>('');
  const [nodes, setNodes] = useState<Node[]>([]);
  const [providerKind, setProviderKind] = useState<ProviderKind>(ProviderKind.LVM_THIN);
  const [dynamicFields, setDynamicFields] = useState<DynamicField[]>([]);
  const [formData, setFormData] = useState<Record<string, any>>({});

  useEffect(() => {
    fetchNodes();
  }, []);

  useEffect(() => {
    if (nodes.length > 0) {
      setSelectedNode(nodes[0].name);
    }
  }, [nodes]);

  useEffect(() => {
    updateDynamicFields();
  }, [providerKind]);

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

  const handleSelectChange = (key: string, value: string) => {
    switch (key) {
      case 'selectedNode':
        setSelectedNode(value);  // Обновим выбранный узел в state
        break;
      case 'providerKind':
        setProviderKind(value as ProviderKind);
        break;
      default:
        break;
    }
  };

  const handleDynamicFieldChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const onSubmit = async (data: Record<string, any>) => {
    //data.selectedNode = selectedNode;
    console.log("onSubmit data:", data);
    console.log("onSubmit node_name:", selectedNode);

    // Перед валидацией убедимся, что значение selectedNode из стейта добавлено в data
    data.selectedNode = selectedNode;

    console.log('selectedNode in state:', selectedNode);
    console.log('data.selectedNode in onSubmit:', data.selectedNode);

    validateInput(data);

    try {
      const payload = {
        storage_pool_name: data.storagePoolName,
        node_name: selectedNode,
        provider_kind: providerKind,
        props: { ...data, ...formData },
      };

      const response = await fetch(`/v1/nodes/${selectedNode}/storage-pools`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log('Storage pool created successfully!');
        router.push(`/inventory/storage-pools`);
      } else {
        const responseData = await response.json();
        throw new Error(responseData.message || 'Failed to create storage pool');
      }
    } catch (error) {
      console.error('Error creating storage pool:', (error as Error).message);
      throw new Error('Failed to create storage pool');
    }
  };

  const validateInput = (data: Record<string, any>) => {
    const requiredFields = ['selectedNode', 'storagePoolName', 'providerKind'];
    const missingFields = requiredFields.filter((field) => !data[field]);

    if (missingFields.length > 0) {
      throw new Error(`Please fill in all required fields. Missing: ${missingFields.join(', ')}`);
    }
  };

  const updateDynamicFields = () => {
    const fields: DynamicField[] = [];

    switch (providerKind) {
      case ProviderKind.EBS_TARGET:
      case ProviderKind.EBS_INIT:
        fields.push({ label: 'EBS Remote Name', key: 'ebsRemoteName', type: 'text' });
        break;

      case ProviderKind.FILE:
      case ProviderKind.FILE_THIN:
        fields.push({ label: 'File Directory', key: 'fileDirectory', type: 'text' });
        break;

      case ProviderKind.LVM:
        fields.push({ label: 'LVM VG', key: 'lvmVg', type: 'text' });
        break;

      case ProviderKind.LVM_THIN:
        fields.push({ label: 'LVM VG', key: 'lvmVg', type: 'text' });
        fields.push({ label: 'Thin Pool', key: 'thinPool', type: 'text' });
        break;

      case ProviderKind.OPENFLEX_TARGET:
        fields.push({ label: 'OpenFlex Pool Index', key: 'openFlexPoolIndex', type: 'text' });
        break;

      case ProviderKind.SPDK:
        fields.push({ label: 'SPDK Logical Volume Store', key: 'spdkLogicalVolumeStore', type: 'text' });
        break;

      case ProviderKind.ZFS:
      case ProviderKind.ZFS_THIN:
        fields.push({ label: 'ZFS Pool', key: 'zfsPool', type: 'text' });
        break;

      default:
        break;
    }

    setDynamicFields(fields);
  };

  return (
    <AddInventory
      title="Add Storage Pool"
      fields={[
        { label: 'Select Node', key: 'selectedNode', type: 'select', options: nodes.map(node => node.name), onChange: (value: string) => handleSelectChange('selectedNode', value) },
        { label: 'Storage Pool Name', key: 'storagePoolName', type: 'text' },
        { label: 'Provider Kind', key: 'providerKind', type: 'select', options: Object.values(ProviderKind), onChange: (value: string) => handleSelectChange('providerKind', value) },
        ...dynamicFields.map((field) => ({
          label: field.label,
          key: field.key,
          type: field.type,
          onChange: (value: string) => handleDynamicFieldChange(field.key, value),
        })),
      ]}
      onSubmit={onSubmit}
      defaultValues={{
        selectedNode: nodes.length > 0 ? nodes[0].name : '', // Убедимся, что selectedNode установлен при первоначальной загрузке
        storagePoolName: '',
        providerKind: ProviderKind.LVM_THIN,
        lvmVg: '',
        thinPool: '',
      }}
    />
  );
}
