export = {
  user: process.env.USER_DATABASE,
  password: process.env.PASSWORD_DATABASE,
  database: process.env.DATABASE_NAME,
  server: process.env.DATABASE_HOST,
  pool: { max: 30, min: 1, idleTimeoutMillis: 30000 },
  options: { encrypt: false, trustServerCertificate: true },
};
