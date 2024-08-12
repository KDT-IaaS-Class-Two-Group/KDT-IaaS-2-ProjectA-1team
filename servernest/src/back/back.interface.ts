export interface TableSchema {
  cid: number; // 컬럼 ID
  name: string; // 컬럼 이름
  type: string; // 데이터 타입
  notnull: number; // NOT NULL 제약 조건 (0 또는 1)
  dflt_value: string | null; // 기본값
  pk: number; // PRIMARY KEY 제약 조건 (0 또는 1)
}

export interface TableData {
  schema: TableSchema[];
  data: string[][];
}

export interface LoadResponse {
  tables: {
    [tableName: string]: TableData;
  };
}

export interface SaveResponse {
  message: string;
  data?: string;
}
