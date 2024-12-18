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
      type: "LISTIFY.NUMBERLIST", // tipo de dato en Oracle
      dir: oracledb.BIND_IN,
      val: ingredientIds, // arreglo de IDs
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
          val: ingredientIdsObj, 
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

  try {
    connection = await getDbConnection();

    const result = await connection.execute(
      `BEGIN
        :recipes_cursor := pk1_proyecto.get_recipes_by_user_id(:user_id);
      END;`,
      {
        user_id: userId, 
        recipes_cursor: { type: oracledb.DB_TYPE_CURSOR, dir: oracledb.BIND_OUT },
      }
    );

    const recipes = [];
    const cursor = result.outBinds as { recipes_cursor: oracledb.ResultSet<any> };
    resultSet = cursor.recipes_cursor;

    let row;
    while ((row = await resultSet.getRow())) {
      console.log(row);
      recipes.push({
        recipeId: row[0],
        recipeName: row[1],
        recipeDescription: row[2],
        ingredientName: row[3],
        measurementUnit: row[4],
        ingredientid: row[5],
      });
    }

    console.log("recetas:", recipes);
    return recipes;
  } catch (err) {
    console.error('Error al obtener recetas:', err);
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

const deleteRecipe = async (p_recipe_id: number) => {
  let connection;
  try {
    connection = await getDbConnection();
    await connection.execute(
      `BEGIN
        pk1_proyecto.delete_recipe_with_ingredients(:p_recipe_id);
      END;`,
      {
        p_recipe_id: p_recipe_id,
      },
      { autoCommit: true },
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


const updateRecipe = async (
  recipeId: number,
  recipeName: string,
  description: string,
  ingredientIds: number[]
) => {
  let connection;
  try{
    connection = await getDbConnection();
    const dbObjectClass = await connection.getDbObjectClass('LISTIFY.NUMBERLIST');
    const ingredientIdsObj = new dbObjectClass(ingredientIds);

    console.log(ingredientIdsObj);


    console.log({
      recipeId: recipeId,
      recipeName: recipeName,
      description: description,
      ingredientIds: {
        type: oracledb.DB_TYPE_OBJECT,
        dir: oracledb.BIND_IN,
        val: ingredientIdsObj, // Ahora pasas el objeto
      },
    });
    await connection.execute(
      `
      BEGIN
        update_recipe_with_ingredients(
          p_recipe_id => :recipeId,
          p_recipe_name => :recipeName,
          p_description => :description,
          p_ingredient_ids => :ingredientIds
        );
      END;
      `,
      {
      recipeId: recipeId,
      recipeName: recipeName,
      description: description,
      ingredientIds: {
        type: oracledb.DB_TYPE_OBJECT,
        dir: oracledb.BIND_IN,
        val: ingredientIdsObj, // Ahora pasas el objeto
      },
    },
      { autoCommit: true }
  );
  console.log('Receta actulizada con éxito.');
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


export { createRecipeWithIngredients, fetchRecipes, deleteRecipe, updateRecipe}