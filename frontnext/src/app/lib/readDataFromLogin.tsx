import sqlite3 from "sqlite3";

// generic 타입을 사용하여 다양한 상황에서 사용할 수 있도록 합니다.
export function readDataFromLogin<T>(
  fields: string[],
  tableName: string
): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const db = new sqlite3.Database("../../../../database/login.db");

    // fields 배열을 컴마로 구분된 문자열로 변환
    const fieldsString = fields.join(", ");

    // 주어진 필드와 테이블명을 사용하여 SQL 쿼리를 만듭니다.
    const query = `SELECT ${fieldsString} FROM ${tableName}`;

    db.get(query, (err, row) => {
      if (err) {
        reject(err); // 오류가 발생하면 Promise를 reject 합니다.
      } else {
        resolve(row as T); // 성공적으로 데이터를 읽으면 Promise를 resolve 합니다.
      }
    });

    db.close(); // 데이터베이스 연결을 닫습니다.
  });
}
