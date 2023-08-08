import pgp from 'pg-promise';

let db = (global)[Symbol.for('better_polling')];

if (!db) {
  db = pgp()({
    database: 'better_polling',
    host: 'localhost',
    port: 5432,
  });
  (global)[Symbol.for('better_polling')] = db;
}

export default db;
