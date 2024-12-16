'use client'
import React, { useState } from 'react';
import {
  Typography,
  Card,
  CardContent,
  Grid,
  Checkbox,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Ingredient } from '../Models/Ingredient';
import { Recipe } from '../Models/Recipe';
import { IIngredientCost } from '../Models/IngredientCost';


interface ShoppingListProps {
  selectedRecipes: {
    recipe: Recipe;
    count: number; 
  }[];
  ingredientsCosts: IIngredientCost[]
}

const ShoppingList: React.FC<ShoppingListProps> = ({ selectedRecipes, ingredientsCosts }) => {
  const [selectedIngredients, setSelectedIngredients] = useState<IIngredientCost[]>([]);

  const toggleIngredientSelection = (ingredient: IIngredientCost) => {
    if (selectedIngredients.some(item => item.id === ingredient.id)) {
      setSelectedIngredients(prev => prev.filter(item => item.id !== ingredient.id));
    } else {
      setSelectedIngredients(prev => [...prev, ingredient]);
    }
  };

  const calculateTotalPrice = () => {
    return selectedIngredients.reduce((total, ingredient) => total + ingredient.totalCost * ingredient.quantity, 0);
  };

  return (
    <div>
      <Typography variant="h5">Lista de Compras</Typography>
      <Grid container spacing={2}>
        {ingredientsCosts.map((ingredient) => (
            <Grid item xs={12} sm={6} md={4} key={ingredient.id}>
              <Card style={{ backgroundColor: selectedIngredients.some(item => item.id === ingredient.id) ? 'lightgreen' : 'white' }}>
                <CardContent>
                  <Checkbox
                    checked={selectedIngredients.some(item => item.id ?? "" === ingredient.id.toString())}
                    onChange={() => toggleIngredientSelection(ingredient)}
                  />
                  <Typography variant="h6" component="span">{ingredient.name}</Typography>
                  <Typography variant="body2" component="span" style={{ marginLeft: 10 }}>
                    {`Cantidad: ${ingredient.quantity} ${ingredient.measurementUnit}`}
                  </Typography>
                  <Typography variant="body2" style={{ marginTop: 5 }}>
                    Precio total: ${ingredient.totalCost.toFixed(2)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        }
      </Grid>
      <Typography variant="h6" style={{ marginTop: 20 }}>
        Precio Total: ${calculateTotalPrice().toFixed(2)}
      </Typography>

      {/* Acordeón para las recetas planificadas */}
      <Accordion style={{ marginTop: 20 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Recetas Planificadas</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            {selectedRecipes.map(selectedRecipe => (
              <Grid item xs={12} sm={6} md={4} key={selectedRecipe.recipe.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{`${selectedRecipe.recipe.name} x ${selectedRecipe.count}`}</Typography>
                    <Typography variant="body2">
                      Precio Total: ${selectedRecipe.recipe.ingredients.reduce(
                        (total, ingredient) => total + ingredient.price * ingredient.quantity * selectedRecipe.count, 
                        0
                      ).toFixed(2)}
                    </Typography>
                    <Typography variant="body2">
                      Cantidad de Ingredientes: {selectedRecipe.recipe.ingredients.length}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default ShoppingList;
