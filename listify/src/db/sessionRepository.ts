import { getDbConnection } from "./DbConnection";
import oracledb from 'oracledb';

const initiateSession = async (email: string, password: string) => {
  let connection;
  try {
    connection = await getDbConnection();
    const result = await connection.execute<{ output: string }>(
      `BEGIN :output := create_session(:p_email, :p_pass); END;`,
      {
        p_email: email,
        p_pass: password,
        output: { dir: oracledb.BIND_OUT, type: oracledb.DB_TYPE_VARCHAR }
      }
    );
    return result?.outBinds?.output;

  } catch (err) {
    console.error('Error al conectar:', err);
    throw err;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error al cerrar conexión:', err);
        throw err;
      }
    }
  }
}

export {initiateSession }