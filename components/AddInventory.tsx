// ./components/AddInventory.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Button, Label, TextInput, Select } from 'flowbite-react';

interface Field {
    label: string;
    key: string;
    type: 'text' | 'number' | 'select' | 'checkbox';
    options?: string[];
    conditions?: Record<string, string>;
    fields?: Field[]; // Добавляем вложенные поля для типа 'group'
    onChange?: (value: string) => void;
}

interface AddInventoryProps {
    title: string;
    fields: Field[];
    onSubmit: (data: Record<string, any>) => void;
    defaultValues: Record<string, any>;
}

const AddInventory: React.FC<AddInventoryProps> = ({ title, fields, onSubmit, defaultValues }) => {
    const [formData, setFormData] = useState<Record<string, any>>(defaultValues);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

        setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSelectChange = (key: string, value: any) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const handleCheckboxChange = (key: string, checked: boolean) => {
        setFormData((prev) => ({ ...prev, [key]: checked }));
    };

    const handleTextChange = (key: string, value: string) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        try {
            // validateFields(fields, formData);
            onSubmit(formData);
        } catch (error) {
            console.error('Validation error:', (error as Error).message);
        }
    };

    // const validateFields = (fields: Field[], data: Record<string, any>) => {
    //   fields.forEach((field) => {
    //     if (field.conditions && field.conditions[data[field.key]] !== undefined) {
    //       throw new Error(field.conditions[data[field.key]]);
    //     }
    //     // Добавим простую валидацию на пустые строки
    //     if (field.type === 'text' && !data[field.key]) {
    //       throw new Error(`${field.label} cannot be empty.`);
    //     }
    //   });
    // };

    return (
        <div className="p-4 sm:ml-64">
            <div className="p-4 rounded-lg mt-14 md:w-1/2">
                <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
                </div>
                <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
                    {fields.map((field) => (
                        <div key={field.key}>
                            <div className="mb-2 block">
                                <Label htmlFor={`${field.key.toLowerCase()}-input`} value={field.label} />
                            </div>
                            {field.type === 'text' && (
                                <TextInput
                                    id={`${field.key.toLowerCase()}-input`}
                                    type="text"
                                    value={formData[field.key] || ''}
                                    onChange={(e) => {
                                        handleTextChange(field.key, e.target.value);
                                        field.onChange?.(e.target.value);
                                    }}
                                />
                            )}
                            {field.type === 'number' && (
                                <TextInput
                                    id={`${field.key.toLowerCase()}-input`}
                                    type="number"
                                    min="1"
                                    max={Number.MAX_SAFE_INTEGER}
                                    value={formData[field.key] || ''}
                                    onChange={(e) => {
                                        handleTextChange(field.key, e.target.value);
                                        field.onChange?.(e.target.value);
                                    }}
                                />
                            )}
                            {field.type === 'select' && (
                                <Select
                                    id={`${field.key.toLowerCase()}-input`}
                                    value={formData[field.key]}
                                    onChange={(e) => {
                                        const selectedValue = e.target.value;
                                        handleSelectChange(field.key, selectedValue);
                                        field.onChange?.(selectedValue);
                                    }}
                                >
                                    {field.options?.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </Select>
                            )}
                            {field.type === 'checkbox' && (
                                <div>
                                    <input
                                        id={`${field.key.toLowerCase()}-input`}
                                        type="checkbox"
                                        checked={formData[field.key] || false}
                                        onChange={(e) => {
                                            handleCheckboxChange(field.key, e.target.checked);
                                            field.onChange?.(e.target.checked.toString());
                                        }}
                                    />
                                    <label htmlFor={`${field.key.toLowerCase()}-input`}>{field.label}</label>
                                </div>
                            )}
                        </div>
                    ))}
                    <div>
                        <Button type="submit">Create</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddInventory;
