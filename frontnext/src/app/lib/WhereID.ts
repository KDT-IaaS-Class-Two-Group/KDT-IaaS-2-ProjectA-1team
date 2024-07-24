import { Database } from 'sqlite3';
import path from 'path';

export function WhereID(
  readID: string,
  callback: (err: Error | null, row: any | null) => void,
) {
  const dbPath = path.join(__dirname, '../../../../database/login.db');
  const db = new Database(dbPath);

  const query = `SELECT EXISTS(SELECT 1 FROM adminData WHERE id = ?) AS result`;
  console.log(query);

  db.get(query, [readID], (err, row) => {
    db.close();
    if (err) {
      callback(err, null);
    } else {
      callback(null, row);
    }
  });
}
