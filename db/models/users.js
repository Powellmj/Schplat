exports.default =
  `
  CREATE TABLE IF NOT EXISTS users
    (
      _id UUID PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
      email varchar,
      handle varchar,
      password varchar,
      created_date TIMESTAMPTZ
    );
`