// DataTable.tsx
import { FC, ReactNode, useState, useEffect, useCallback } from 'react';
import { Table, Dropdown, Button } from 'flowbite-react';
import Link from 'next/link';

interface Column {
  label: string;
  key: string;
}

interface Action {
  label: string;
  onClick: (string: string) => void;
}

interface DataTableProps {
  data: Record<string, any>[]; // Изменили тип данных на Record<string, any>[]
  columns: Column[];
  actions?: Action[];
  loading?: boolean;
  searchColumn?: string; // Новое поле для указания колонки поиска
  addButtonLink?: string;
  addButtonLabel?: string;
}

const DataTable: FC<DataTableProps> = ({
  data,
  columns,
  actions,
  loading = false,
  searchColumn,
  addButtonLink,
  addButtonLabel,
}) => {
  const [filteredData, setFilteredData] = useState<Record<string, any>[]>(data);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredData(data);
      return;
    }

    const filteredResult = data.filter((row) =>
      searchColumn && row[searchColumn]
        ? row[searchColumn].toString().toLowerCase().includes(searchTerm.toLowerCase())
        : Object.values(row)
            .join(' ')
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    setFilteredData(filteredResult);
    console.log('Filtered Data:', filteredResult);
  }, [searchTerm, data, searchColumn]);

  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 rounded-lg mt-14">
        <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
          {addButtonLink && addButtonLabel && (
            <Button>
              <Link href={addButtonLink}>{addButtonLabel}</Link>
            </Button>
          )}
          {searchColumn && (
            <div>
              <label htmlFor="table-search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="table-search"
                  className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                />
              </div>
            </div>
          )}
        </div>

        <Table hoverable>
          <Table.Head>
            {columns.map((col) => (
              <Table.HeadCell key={col.key}>{col.label}</Table.HeadCell>
            ))}
            <Table.HeadCell>
              <span className="sr-only">Actions</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {filteredData.map((item) => (
              <Table.Row
                key={item[columns[0].key]} // Assuming the first column is unique
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                {columns.map((col) => (
                  <Table.Cell key={col.key} className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {col.key.includes('.') ? col.key.split('.').reduce((acc, key) => acc?.[key], item) : item[col.key]}
                  </Table.Cell>
                ))}

                {actions && (
                  <Table.Cell>
                    <Dropdown
                      label=""
                      placement="bottom"
                      dismissOnClick={false}
                      renderTrigger={() => (
                        <svg className="inline-block h-6 w-6 fill-current" viewBox="0 0 24 24">
                          <path d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z" />
                        </svg>
                      )}
                    >
                      {actions.map((action, index) => (
                        <Dropdown.Item key={index} onClick={() => action.onClick(item[columns[0].key] as string)}>
                          {action.label}
                        </Dropdown.Item>
                      ))}
                    </Dropdown>
                  </Table.Cell>
                )}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default DataTable;
