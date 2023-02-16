const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.run(
  `
  CREATE TABLE contacts (
    [contact_id] INTEGER PRIMARY KEY AUTOINCREMENT,
    [first_name] TEXT NOT NULL,
    [last_name] TEXT NOT NULL,
    [email] TEXT NOT NULL UNIQUE,
    [phone] TEXT NOT NULL UNIQUE
  );
`,
  () => {
    db.run(
      `
    INSERT INTO contacts(first_name, last_name, email, phone)
    VALUES
      ('Roelof", 'Jooste", 'roelof.jooste@takealot.com', TRUE)
      ('Marius", 'Vorster', 'marius.vorster@takealot.com', FALSE)
      ('Todd", 'Atterbury', 'todd.atterbury@takealot.com', TRUE);
  `,
      () => {
        db.all('SELECT * FROM contacts', (err, row) => {
          console.log(row);
          db.close();
        });
      }
    );
  }
);

// db.serialize(() => {
//   db.run(
//     `
//     CREATE TABLE contacts (
//       contact_id INTEGER PRIMARY KEY AUTOINCREMENT,
//       first_name TEXT NOT NULL,
//       last_name TEXT NOT NULL,
//       email TEXT NOT NULL UNIQUE,
//       phone TEXT NOT NULL UNIQUE
//     );
//   `
//   );

//   db.run(
//     `
//     INSERT INTO contacts(first_name, last_name, email, phone)
//     VALUES
//       ("Roelof", "Jooste", "roelof.jooste@takealot.com", TRUE)
//       ("Marius", "Vorster", "marius.vorster@takealot.com", FALSE)
//       ("Todd", "Atterbury", "todd.atterbury@takealot.com", TRUE);
//   `
//   );

//   db.each('SELECT * FROM contacts', (err, row) => {
//     console.log(row);
//   });
// });

module.exports = {
  db,
};
