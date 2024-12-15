import { getDbConnection } from "./DbConnection";
import oracledb from 'oracledb';

const fetchIngredientes = async (token: string) => {
  let connection;
  let ingredients = [];
  try {
    connection = await getDbConnection();
    const result = await connection.execute('SELECT * FROM Ingredients');
    console.log(result);
    ingredients = result.rows || [];
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
  return ingredients;
}

const createIngredient = async () => {
  let connection;
  try {
    connection = await getDbConnection();
    const result = await connection.execute<{ output: string }>(
      `BEGIN :output := create_session(:p_email, :p_pass); commit; END;`,
      {
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

export { fetchIngredientes }