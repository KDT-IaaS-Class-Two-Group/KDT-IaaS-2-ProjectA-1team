// components/ButtonProps.ts
export interface AddButtonProps {
  onClick: () => void;
}

export interface SidebarProps {
  onTableClick: (tableName: string) => void;
  onAddRow: () => void;
  onAddColumn: () => void;
}

export interface TableListProps {
  onTableClick: (tableName: string) => void;
}
