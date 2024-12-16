import oracledb, { Connection } from "oracledb";
import { getDbConnection } from "./DbConnection";

interface IngredientCost {
  INGREDIENT_ID: number;
  INGREDIENT_NAME: string;
  TOTAL_QUANTITY: number;
  MEASUREMENT_UNIT: string;
  TOTAL_COST: number;
}

const createShoppingList = async (userId: number, listName: string, recipes: { id: number, quantity: number }[]) => {
  let connection: Connection | undefined;
  let shoppingListId: number = 0;

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
          p_recipes   => :recipes,
          p_shopping_list_id => :shoppingListId
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
        shoppingListId: {
          dir: oracledb.BIND_OUT, 
          type: oracledb.NUMBER,
          val: shoppingListId
        },
      }, {
      autoCommit: true,
    }
    );
    const outbinds = result.outBinds as {shoppingListId: number};
    shoppingListId = outbinds.shoppingListId;
    return shoppingListId;
  } catch (err) {
    console.error('Error al ejecutar el procedimiento:', err);
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

const fetchCalculateIngredientCostsById = async (shoppingListId: number) => {
  let connection: Connection | undefined;

  try {
    connection = await getDbConnection();

    const result = await connection.execute(
      `SELECT * FROM TABLE(CALCULATE_INGREDIENT_COSTS(:id))`,
      { id: shoppingListId },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    const ingredients: IngredientCost[] = result.rows as IngredientCost[];
    return ingredients;
  } catch (err) {
    console.error('Error al ejecutar la función:', err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error al cerrar la conexión:', err);
      }
    }
  }
}

export { createShoppingList, fetchCalculateIngredientCostsById };