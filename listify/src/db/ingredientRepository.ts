import { getDbConnection } from "./DbConnection";

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

export {fetchIngredientes }