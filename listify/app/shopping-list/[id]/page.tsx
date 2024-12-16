import React from 'react';
import { Container } from '@mui/material';
import ShoppingList from '@/src/Components/ShoppingList';
import { Recipe } from '@/src/Models/Recipe';
import { fetchCalculateIngredientCostsById } from '@/src/db/shoppingListRepository';
import { IIngredientCost } from '@/src/Models/IngredientCost';
import { fetchRecipes } from '@/src/db/recipeRepository';


const RecipesPage: React.FC<{ params: any }> = async ({ params }) => {
  const { id } = params;
  const ingredientesCostData = await fetchCalculateIngredientCostsById(Number(id));
  const parsedIngredientesCosts: IIngredientCost[] = ingredientesCostData?.map<IIngredientCost>(data => ({
    id: data.INGREDIENT_ID,
    name: data.INGREDIENT_NAME,
    measurementUnit: data.MEASUREMENT_UNIT,
    quantity: data.TOTAL_QUANTITY,
    totalCost: data.TOTAL_COST,
  })) ?? [];
  
  return (
    <Container>
      <ShoppingList ingredientsCosts={parsedIngredientesCosts} />
    </Container>
  );
};

export default RecipesPage;