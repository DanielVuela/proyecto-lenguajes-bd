import oracledb, { Connection, getConnection } from "oracledb";
import { getDbConnection } from "./DbConnection";

async function createShoppingList(userId: number, listName: string, recipes: { id: number, quantity: number }[]) {
  let connection: Connection | undefined;

  try {
    connection = await getDbConnection();

    const RecipeQuantityType = await connection.getDbObjectClass('LISTIFY.RECIPEQUANTITY'); // Tipo de objeto base
    const RecipeQuantityListType = await connection.getDbObjectClass('LISTIFY.RECIPEQUANTITYLIST'); // Tipo de tabla

    const recipeInstances = recipes.map((r) => {
      const recipeInstance = new RecipeQuantityType();
      recipeInstance.RECIPE_ID = r.id; 
      recipeInstance.QUANTITY = r.quantity;
      return recipeInstance;
    });

    const result = await connection.execute(
      `BEGIN
        create_shopping_list(
          p_list_name => :listName,
          p_client_id => :clientId,
          p_recipes   => :recipes
        );
      END;`,
      {
        listName: listName,
        clientId: userId,
        recipes: {
          type: RecipeQuantityListType, // Tipo de tabla
          dir: oracledb.BIND_IN,
          val: recipeInstances,
        },
      }, {
      autoCommit: true,
    }
    );

    console.log('Procedimiento ejecutado con éxito:', result);
  } catch (err) {
    console.error('Error al ejecutar el procedimiento:', err);
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

export { createShoppingList };