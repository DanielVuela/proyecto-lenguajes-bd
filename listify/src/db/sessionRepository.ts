import { getDbConnection } from "./DbConnection";
import oracledb from 'oracledb';

const initiateSession = async (email: string, password: string) => {
  let connection;
  try {
    connection = await getDbConnection();
    const result = await connection.execute<{ output: string }>(
      `BEGIN :output := create_session(:p_email, :p_pass); commit; END;`,
      {
        p_email: email,
        p_pass: password,
        output: { dir: oracledb.BIND_OUT, type: oracledb.DB_TYPE_VARCHAR }
      }
    );
    console.log("!!!!deresult", result)
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

const logOut = async (token: string) => {
  let connection;
  try {
    connection = await getDbConnection();
    await connection.execute(
      `BEGIN
        end_session(:p_token);
      END;`,
      {
        p_token: token,
      }
    );

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

const getUserInfo = async (token: string) => {
  let connection;
  try {
    connection = await getDbConnection();

    const result = await connection.execute<{
      ID: number; 
    }>(
      `
      SELECT u.id
      FROM Users u
      JOIN Token t ON u.id = t.id_user
      WHERE t.token = :p_token
        AND t.expires_at > SYSDATE
      `,
      { p_token: token }, 
      { outFormat: oracledb.OUT_FORMAT_OBJECT } // Resultado como objetos
    );

    // Retorna el ID del usuario si existe
    if (result.rows && result.rows.length > 0) {
      return result.rows[0].ID;
    }

    return null; // Retorna null si no hay coincidencias
  } catch (err) {
    console.error('Error al obtener el usuario por token:', err);
    throw err;
  } finally {
    // Cierra la conexión
    if (connection) {
      try {
        await connection.close();
      } catch (closeErr) {
        console.error('Error al cerrar conexión:', closeErr);
      }
    }
  }
};

export { initiateSession, logOut, getUserInfo }