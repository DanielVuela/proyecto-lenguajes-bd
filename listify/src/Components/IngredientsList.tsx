"use client";

import React, { useState } from 'react';
import {
  Button,
  TextField,
  Grid2 as Grid,
  Typography,
  Snackbar,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton,
  Card,
  CardContent,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

interface Ingredient {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  price: number;
}

const pancakeIngredients: Ingredient[] = [
  { id: 1, name: 'Harina de trigo', quantity: 1, unit: 'taza', price: 1.00 },
  { id: 2, name: 'Leche', quantity: 1, unit: 'taza', price: 0.50 },
  { id: 3, name: 'Huevo', quantity: 1, unit: 'unidad', price: 0.20 },
  { id: 4, name: 'Azúcar', quantity: 2, unit: 'cucharadas', price: 0.10 },
  { id: 5, name: 'Polvo de hornear', quantity: 2, unit: 'cucharaditas', price: 0.05 },
  { id: 6, name: 'Sal', quantity: 1, unit: 'pizca', price: 0.01 },
  { id: 7, name: 'Mantequilla derretida', quantity: 2, unit: 'cucharadas', price: 0.15 },
];

const IngredientCRUD: React.FC = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>(pancakeIngredients);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState<number | ''>('');
  const [unit, setUnit] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [successMessage, setSuccessMessage] = useState(false);
  const [editMode, setEditMode] = useState<boolean[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null); // Para manejar la edición

  const units = ['kg', 'g', 'L', 'mL', 'unidad', 'paquete', 'botella', 'lata'];

  const handleAddIngredient = () => {
    if (name && quantity && unit && price) {
      const newIngredient: Ingredient = {
        id: Date.now(), // Usamos un timestamp como ID
        name,
        quantity: Number(quantity),
        unit,
        price: Number(price),
      };
      setIngredients([...ingredients, newIngredient]);
      setSuccessMessage(true);
      resetForm();
    } else {
      alert('Por favor, completa todos los campos.');
    }
  };

  const handleEditIngredient = (index: number) => {
    setCurrentIndex(index);
    const updatedEditMode = [...editMode];
    updatedEditMode[index] = true;
    setEditMode(updatedEditMode);
    // Cargar los valores en los campos
    setName(ingredients[index].name);
    setQuantity(ingredients[index].quantity);
    setUnit(ingredients[index].unit);
    setPrice(ingredients[index].price);
  };

  const handleUpdateIngredient = (index: number) => {
    if (name && quantity && unit && price) {
      const updatedIngredients = ingredients.map((ingredient, idx) => {
        if (idx === index) {
          return {
            ...ingredient,
            name,
            quantity: Number(quantity),
            unit,
            price: Number(price),
          };
        }
        return ingredient;
      });
      setIngredients(updatedIngredients);
      setSuccessMessage(true);
      resetForm();
    } else {
      alert('Por favor, completa todos los campos.');
    }
    setEditMode(prev => prev.map((_, idx) => idx === index ? false : _)); // Desactivar modo edición
  };

  const handleDeleteIngredient = (id: number) => {
    const updatedIngredients = ingredients.filter((ingredient) => ingredient.id !== id);
    setIngredients(updatedIngredients);
    setSuccessMessage(true);
  };

  const resetForm = () => {
    setName('');
    setQuantity('');
    setUnit('');
    setPrice('');
    setCurrentIndex(null);
  };

  const handleClose = () => {
    setSuccessMessage(false);
  };

  return (
    <div>
      <Typography variant="h6">Gestión de Ingredientes</Typography>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Button variant="contained" onClick={handleAddIngredient}>
            Crear Ingrediente
          </Button>
        </Grid>
      </Grid>
      <Snackbar
        open={successMessage}
        autoHideDuration={3000}
        onClose={handleClose}
        message={currentIndex !== null ? "Ingrediente actualizado con éxito" : "Ingrediente añadido con éxito"}
      />
      <Typography variant="h6" style={{ marginTop: '20px' }}>
        Ingredientes Añadidos:
      </Typography>
      <Grid container spacing={2}>
        {ingredients.map((ingredient, index) => (
          <Grid size={12} key={ingredient.id}>
            <Card variant="outlined" style={{ width: '100%', marginBottom: '16px' }}>
              <CardContent>
                {editMode[index] ? (
                  <>



                    <TextField
                      fullWidth
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      label="Nombre"
                      style={{ marginBottom: 10 }}
                    />

                    <Grid container spacing={2} style={{ marginBottom: 10 }}>
                      <Grid size={8}>
                        <TextField
                          type="number"
                          fullWidth
                          value={quantity}
                          onChange={(e) => setQuantity(Number(e.target.value))}
                          label="Cantidad"
                        />
                      </Grid>
                      <Grid size={4}>
                        <FormControl fullWidth>
                          <InputLabel>Unidad</InputLabel>
                          <Select
                            value={unit}
                            onChange={(e) => setUnit(e.target.value)}
                          >
                            {units.map((unitOption) => (
                              <MenuItem key={unitOption} value={unitOption}>
                                {unitOption}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>

                    <TextField
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      label="Precio"
                      style={{ marginBottom: 10 }}
                    />


                    <IconButton onClick={() => handleUpdateIngredient(index)} color="primary">
                      <SaveIcon />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <Typography variant="body2">
                      {ingredient.quantity} {ingredient.unit} de {ingredient.name} a ${ingredient.price}
                      <IconButton onClick={() => handleEditIngredient(index)} color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteIngredient(ingredient.id)} color="secondary">
                        <DeleteIcon />
                      </IconButton>
                    </Typography>

                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default IngredientCRUD;