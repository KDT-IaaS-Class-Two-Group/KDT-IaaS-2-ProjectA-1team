import { Database } from 'sqlite3';

export function readDataFromLogin(fields: string[], tableName: string) {
  const db = new Database('../../../../database/login.db');

  const fieldsString = fields.join(', ');
  const query = `SELECT ${fieldsString} FROM ${tableName}`;
  console.log(query);

  db.get(query, (err, row) => {
    if (err) {
      console.log(err);
    } else {
      return row;
    }
    db.close(); // db.close() should be called inside the callback to ensure it is closed after the query completes.
  });
}
