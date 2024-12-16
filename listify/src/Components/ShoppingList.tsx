'use client'
import React, { useState } from 'react';
import {
  Typography,
  Card,
  CardContent,
  Grid,
  Checkbox,
} from '@mui/material';
import { IIngredientCost } from '../Models/IngredientCost';


interface ShoppingListProps {
  ingredientsCosts: IIngredientCost[]
}

const ShoppingList: React.FC<ShoppingListProps> = ({ ingredientsCosts }) => {
  const [selectedIngredients, setSelectedIngredients] = useState<IIngredientCost[]>([]);

  const toggleIngredientSelection = (ingredient: IIngredientCost) => {
    if (selectedIngredients.some(item => item.id === ingredient.id)) {
      setSelectedIngredients(prev => prev.filter(item => item.id !== ingredient.id));
    } else {
      setSelectedIngredients(prev => [...prev, ingredient]);
    }
  };

  const calculateTotalPrice = () => {
    return selectedIngredients.reduce((total, ingredient) => total + ingredient.totalCost, 0);
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
                    checked={selectedIngredients.some(item => item.id === ingredient.id)}
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

    </div>
  );
};

export default ShoppingList;
