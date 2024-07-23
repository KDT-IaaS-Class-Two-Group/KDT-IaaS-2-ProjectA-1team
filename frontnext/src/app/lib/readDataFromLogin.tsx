import { Database } from 'sqlite3';

export function readDataFromLogin(
  fields: string[],
  tableName: string,
  callback: (err: Error | null, row?: any) => void,
) {
  const db = new Database('../../../../database/login.db');

  const fieldsString = fields.join(', ');
  const query = `SELECT ${fieldsString} FROM ${tableName}`;
  console.log(query);

  db.get(query, (err, row) => {
    if (err) {
      callback(err);
    } else {
      callback(null, row);
    }
    db.close(); // db.close() should be called inside the callback to ensure it is closed after the query completes.
  });
}

// Example usage of readDataFromLogin function
readDataFromLogin(['id', 'password'], 'adminData', (err, row) => {
  if (err) {
    console.error('Error reading data from adminData table:', err);
  } else {
    console.log('Admin Data:', row);
  }
});
