// types.ts

export interface UserDTO {
  [key: string]: string | number;
}

export interface CommonStateTypes {
  name: string;
  data: UserDTO[];
  error: string;
  tables: string[];
  selectedTable: string;
  isFormOpen: boolean;
}

export type SetColumnsType = (columns: string[]) => void;
