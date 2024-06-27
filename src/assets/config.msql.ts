export = {
  user: process.env.USER_DATABASE,
  password: process.env.PASSWORD_DATABASE,
  database: process.env.DATABASE_NAME,
  server: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT as string),
  pool: { max: 30, min: 0, idleTimeoutMillis: 30000 },
  options: { encrypt: false, trustServerCertificate: true },
};
