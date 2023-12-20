// ./types/sidebar.ts
export interface SubmenuItems {
  label: string;
  link: string;
}

export interface NavItems {
  label: string;
  link: string;
  isParent: boolean;
  subMenu?: SubmenuItems[];
}

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  menus: NavItems[];
}
