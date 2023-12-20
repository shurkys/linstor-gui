'use client';
// ./pages/inventory/nodes/edit.tsx
import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useSearchParams } from 'next/navigation'; // Используем новый хук для query параметров
import { Node } from '@/types/Node'; // Путь к вашему файлу с интерфейсами (Node и другие)

interface EditNodeProps {
  nodeName: string;
}

const EditNode: React.FC = () => {
  const searchParams = useSearchParams();
  const nodeName = searchParams.get('nodeName') as string;

  useEffect(() => {
    // Ваш код, который использует nodeName
    console.log(nodeName);
  }, [nodeName]);

  const [node, setNode] = useState<Node | null>(null);
  const [newNodeName, setNewNodeName] = useState('');
  const [newNodeType, setNewNodeType] = useState('');

  useEffect(() => {
    // Fetch node data based on the nodeName parameter
    // Replace the following fetch with your actual API call to get node data
    fetch(`/v1/nodes/${nodeName}`)
      .then((response) => response.json())
      .then((data) => setNode(data))
      .catch((error) => console.error('Error fetching node data:', error));
  }, [nodeName]);

  useEffect(() => {
    // Populate form fields with existing node data
    if (node) {
      setNewNodeName(node.name);
      setNewNodeType(node.type);
      // Set other form fields as needed
    }
  }, [node]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    // Update the corresponding state based on the input name
    switch (name) {
      case 'newNodeName':
        setNewNodeName(value);
        break;
      case 'newNodeType':
        setNewNodeType(value);
        break;
      // Handle other input fields as needed
      default:
        break;
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // Perform the API call to update the node
      const response = await fetch(`/v1/nodes/${nodeName}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newNodeName,
          type: newNodeType,
          // Include other updated fields as needed
        }),
      });

      if (response.ok) {
        console.log('Node updated successfully!');
        // Optionally, you can navigate to the node details page or any other page
        // Note: Ensure you have the appropriate navigation logic
      } else {
        console.error('Failed to update node');
      }
    } catch (error) {
      console.error('Error updating node:', error);
    }
  };

  if (!node) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 rounded-lg mt-14 md:w-1/2">
        <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Edit Node</h3>
        </div>
        <form onSubmit={handleSubmit}>
          {/* Render form fields based on your node data structure */}
          <div className="md:flex md:items-center mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white md:w-1/3">
              Node Name:
            </label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 md:w-2/3"
              name="newNodeName"
              value={newNodeName}
              onChange={handleInputChange}
            />
          </div>
          <div className="md:flex md:items-center mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white md:w-1/3">
              Node Type:
            </label>
            {/* Render a select input with options based on your node types */}
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 md:w-2/3"
              name="newNodeType"
              value={newNodeType}
              onChange={handleInputChange}
            >
              <option value="Controller">Controller</option>
              <option value="Satellite">Satellite</option>
              {/* Add other node types as needed */}
            </select>
          </div>
          {/* Add other form fields as needed */}
          <div className="md:flex md:items-center mb-6">
            <button type="submit">Update Node</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNode;
