'use client'
import Link from 'next/link';
import { List, ListItem, ListItemText } from '@mui/material';
import theme from '../theme';

const Navbar: React.FC = () => {
  return (
    <nav style={{ width: '200px', height: '100vh', backgroundColor: theme.palette.primary.main, padding: '20px' }}>
      <List>
        <ListItem component={Link} href="/ingredients">
          <ListItemText primary="Ingredientes" />
        </ListItem>
        <ListItem component={Link} href="/recipes">
          <ListItemText primary="Recetas" />
        </ListItem>
        <ListItem component={Link} href="/recipe-selection">
          <ListItemText primary="Lista de Compras" />
        </ListItem>
        <ListItem component={Link} href="/logout">
          <ListItemText primary="Log Out" />
        </ListItem>
      </List>
    </nav>
  );
};

export default Navbar;
