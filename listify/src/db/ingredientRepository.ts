import { Ingredient } from "../Models/Ingredient";
import { getDbConnection } from "./DbConnection";
import oracledb from 'oracledb';

interface IngredientDTO {
  id: number;
  name: string;
  measurementUnit: string;
  price: number;
  quantity: number;
  client_id: number;
  last_update: Date;
}

const fetchIngredientes = async (userId: number): Promise<Ingredient[]> => {
  let connection;
  let resultSet: oracledb.ResultSet<any> | undefined;
  let ingredients: Ingredient[] = [];

  try {
    connection = await getDbConnection();

    const result = await connection.execute(
      `
      BEGIN
        :cursor := pk1_proyecto.get_ingredients_by_user_id(:p_user_id);
      END;
      `,
      {
        cursor: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR }, 
        p_user_id: userId, 
      }
    );

    const outBinds = result.outBinds as { cursor: oracledb.ResultSet<IngredientDTO> };
    resultSet = outBinds.cursor;

    let row;
    while ((row = await resultSet.getRow())) {
      console.log(row) // [ 1, 'paprika', 'g', 10, 1, 2024-12-15T23:33:29.000Z ]
      ingredients.push({
        id: row[0] ,
        name: row[1] as string,
        measurementUnit: row[2] as string,
        price: row[3],
        quantity: row[4]
        // client_id: row[4],
        // last_update: row[5],
      });
    }
  } catch (err) {
    console.error('Error al obtener ingredientes:', err);
    throw err;
  } finally {
    if (resultSet) {
      try {
        await resultSet.close();
      } catch (err) {
        console.error('Error al cerrar el cursor:', err);
      }
    }

    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error al cerrar conexión:', err);
      }
    }
  }

  return ingredients;
};

const createIngredient = async (
  name: string,
  measurementUnit: string,
  price: number,
  clientId: number, 
  quantity: number
): Promise<void> => {
  let connection;

  try {
    connection = await getDbConnection();

    await connection.execute(
      `
      BEGIN
        pk1_proyecto.SP_creacion_ingredientes(:name, :measurement_unit, :price, :quantity, :client_id);
      END;
      `,
      {
        name,
        measurement_unit: measurementUnit,
        price,
        quantity,
        client_id: clientId,
      }
    );

    console.log('Ingrediente creado con éxito.');
  } catch (err) {
    console.error('Error al crear el ingrediente:', err);
    throw err;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (closeErr) {
        console.error('Error al cerrar conexión:', closeErr);
      }
    }
  }
};

const deleteIngredient = async (id: number) => {
  let connection;
  try{
      connection = await getDbConnection();
      await connection.execute(
      `BEGIN
        pk1_proyecto.SP_eliminar_ingredientes(:id);
      END;`,
      {
        id: id,
      }
    );
  }catch (err) {
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

const updateIngredient = async (
  id: number,
  name: string,
  measurementUnit: string,
  price: number,
  quantity: number
) => {
  let connection;
  try{
    connection = await getDbConnection();
    await connection.execute(
      `
      BEGIN
        pk1_proyecto.SP_actualizar_ingredientes(:id, :name, :measurement_unit, :price, :quantity);
      END;
      `,
      {
        id,
        name,
        measurement_unit: measurementUnit,
        price,
        quantity,
      }
    );
    console.log('Ingrediente actualizado.');

  }catch (err) {
    console.error('Error al crear el ingrediente:', err);
    throw err;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (closeErr) {
        console.error('Error al cerrar conexión:', closeErr);
      }
    }
  }
};

export { fetchIngredientes, createIngredient, deleteIngredient, updateIngredient }