import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle,DarkThemeToggle } from 'flowbite-react';
import type { FC } from "react";
import Link from 'next/link';

export const DashboardNavbar: FC<Record<string, never>> = function () {
  return (
          <header>
            <Navbar
              fluid
              className="fixed top-0 z-30 w-full border-b border-gray-200 bg-white p-0 dark:border-gray-700 dark:bg-gray-800 sm:p-0"
            >
              <div className="w-full p-3 pr-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <NavbarBrand as={Link} href="https://flowbite-react.com">
                      <img src="/ui/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
                      <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">LP</span>
                    </NavbarBrand>
                  </div>
                  <DarkThemeToggle />
                </div>
              </div>
            </Navbar>
          </header>
)};