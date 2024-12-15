import oracledb, { Connection } from 'oracledb';

const getDbConnection : () => Promise<Connection> = async () => {
  let connection: Connection;
  console.log({
    user: process.env.NODE_ORACLEDB_USER,
    password: process.env.NODE_ORACLEDB_PASSWORD,
    connectString: process.env.NODE_ORACLEDB_CONNECTIONSTRING
  });
  try {
    connection = await oracledb.getConnection({
      user: process.env.NODE_ORACLEDB_USER,
      password: process.env.NODE_ORACLEDB_PASSWORD,
      connectString: process.env.NODE_ORACLEDB_CONNECTIONSTRING
    });

    console.log('conexion exitosa');
  } catch (err) {
    console.error('error al conectar:', err);
    throw err;
  }
  return connection;
}

const closeDbConnection = async (conn : Connection) => {
  try{
    conn.close();
  } catch(err) {
    console.log("error al cerrar la connection.", err)
  }
}

export {getDbConnection, closeDbConnection};