import { Database } from 'sqlite3';
import path from 'path';

export function readDataFromLogin(
  fields: string[],
  tableName: string,
  callback: (err: Error | null, row: any | null) => void,
) {
  const dbPath = path.join(__dirname, '../../../../database/login.db');
  const db = new Database(dbPath);

  const fieldsString = fields.join(', ');
  const query = `SELECT ${fieldsString} FROM ${tableName}`;
  console.log(query);

  db.get(query, (err, row) => {
    db.close();
    if (err) {
      callback(err, null);
    } else {
      callback(null, row);
    }
  });
}

// 사용 예시

// const inputId = 'id';
// const inputPassword = 'password';
// const dbId = 'adminData';
// let rufrhk = '';

// readDataFromLogin([inputId, inputPassword], dbId, (err, data) => {
//   if (err) {
//     console.error(err);
//   } else {
//     rufrhk = data.id;
//     console.log(data);
//     console.log(typeof data.id);
//     console.log(rufrhk);
//   }
// });
