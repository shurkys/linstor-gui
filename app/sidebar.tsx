import { Sidebar } from "flowbite-react";
import type { FC } from "react";
import Link from 'next/link';

export const DashboardSidebar: FC = function () {
return (

  <Sidebar
    aria-label="Sidebar multi-level dropdown"
    className="fixed inset-y-0 left-0 z-20 mt-16 flex h-full shrink-0 flex-col border-r border-gray-200 duration-75 dark:border-gray-700 lg:flex hidden"
  >
    <Sidebar.Items>
      <Sidebar.ItemGroup>
        <Sidebar.Item as={Link} href="/" >
          Dashboard
        </Sidebar.Item>
        <Sidebar.Collapse label="Inventory">
          <Sidebar.Item as={Link} href="/inventory/nodes">Nodes</Sidebar.Item>
          <Sidebar.Item as={Link} href="/inventory/storage-pools">Storage Pools</Sidebar.Item>
          <Sidebar.Item as={Link} href="/inventory/ip-addresses">IP Addresses</Sidebar.Item>
        </Sidebar.Collapse>
        <Sidebar.Collapse label="Storage Configuration">
          <Sidebar.Item as={Link} href="/storage-configuration/resource-groups">Resource Groups</Sidebar.Item>
          <Sidebar.Item as={Link} href="/storage-configuration/resource-definition">Resource Definition</Sidebar.Item>
          <Sidebar.Item as={Link} href="/storage-configuration/resources">Resources</Sidebar.Item>
          <Sidebar.Item as={Link} href="/storage-configuration/volumes">Volumes</Sidebar.Item>
        </Sidebar.Collapse>
        <Sidebar.Item as={Link} href="/snapshot">Snapshot</Sidebar.Item>
        <Sidebar.Item as={Link} href="/error-reports">Error Reports</Sidebar.Item>
        <Sidebar.Item as={Link} href="/settings">Settings</Sidebar.Item>
        <Sidebar.Item as={Link} href="/users">Users</Sidebar.Item>
      </Sidebar.ItemGroup>
    </Sidebar.Items>
  </Sidebar>
  );
};