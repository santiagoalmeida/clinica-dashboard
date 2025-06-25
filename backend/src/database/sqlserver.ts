import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

const config = {
  user: 'SA',
  password: 'kJsaun7691',
  server: 'fov-sql-server',
  database: 'db_fov',
  port: Number(1433),
  options: {
    encrypt: false, 
    trustServerCertificate: true,
  },
};

export const dbConnection = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Conectado a SQL Server');
    return pool;
  })
  .catch(err => console.log('Error de conexión a la base de datos:', err));