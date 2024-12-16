import oracledb from 'oracledb';
import { getDbConnection } from './DbConnection'; 
/**
 * Función para crear una receta con ingredientes.
 * @param recipeName Nombre de la receta.
 * @param description Descripción de la receta.
 * @param clientId ID del cliente que crea la receta.
 * @param ingredientIds Array de IDs de ingredientes.
 */
const createRecipeWithIngredients = async (
  recipeName: string,
  description: string,
  clientId: number,
  ingredientIds: number[]
): Promise<void> => {
  let connection;

  console.log({
    recipeName: recipeName,
    description: description,
    clientId: clientId,
    ingredientIds: {
      type: "LISTIFY.NUMBERLIST", // Tipo de dato en Oracle
      dir: oracledb.BIND_IN,
      val: ingredientIds, // El arreglo de IDs
    },
  });

  try {
    connection = await getDbConnection();

    const dbObjectClass = await connection.getDbObjectClass('LISTIFY.NUMBERLIST');
  const ingredientIdsObj = new dbObjectClass(ingredientIds);
    await connection.execute(
      `
      BEGIN
        create_recipe_with_ingredients(
          p_recipe_name => :recipeName,
          p_description => :description,
          p_client_id => :clientId,
          p_ingredient_ids => :ingredientIds
        );
      END;
      `,
      {
        recipeName: recipeName,
        description: description,
        clientId: clientId,
        ingredientIds: {
          type: oracledb.DB_TYPE_OBJECT,
          dir: oracledb.BIND_IN,
          val: ingredientIdsObj, // Ahora pasas el objeto
        },
      },
      { autoCommit: true }
    );

    console.log('Receta creada con éxito.');
  } catch (err) {
    console.error('Error al crear la receta con ingredientes:', err);
    throw err;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error al cerrar la conexión:', err);
      }
    }
  }
};

const fetchRecipes = async (userId: number): Promise<any[]> => {
  let connection;
  let resultSet: oracledb.ResultSet<any> | undefined;
  let recipes: any[] = [];

  try {
    // Obtener la conexión a la base de datos
    connection = await getDbConnection();

    // Llamada al procedimiento almacenado
    const result = await connection.execute(
      `
      BEGIN
        :cursor := get_ingredients_by_user_id(:p_user_id);
      END;
      `,
      {
        cursor: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR }, // Parámetro de salida
        p_user_id: userId, // Parámetro de entrada
      }
    );

    // Aserción de tipo para result.outBinds
    const outBinds = result.outBinds as { cursor: oracledb.ResultSet<any> };
    resultSet = outBinds.cursor;

    // Leer las filas del cursor
    let row;
    while ((row = await resultSet.getRow())) {
      console.log(row) // [ 1, 'paprika', 'g', 10, 1, 2024-12-15T23:33:29.000Z ]
      recipes.push({
        id: row[0] ,
        name: row[1] as string,
        measurementUnit: row[2] as string,
        price: row[3],
        quantity: 1
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

  return recipes;
};


export {createRecipeWithIngredients, fetchRecipes}