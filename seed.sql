CREATE TABLE contacts (
      contact_id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      contact_me INTEGER NOT NULL UNIQUE
    );

INSERT INTO contacts(first_name, last_name, email, phone) 
VALUES 
  ("Roelof", "Jooste", "roelof.jooste@takealot.com", TRUE)
  ("Marius", "Vorster", "marius.vorster@takealot.com", FALSE)
  ("Todd", "Atterbury", "todd.atterbury@takealot.com", TRUE);
  