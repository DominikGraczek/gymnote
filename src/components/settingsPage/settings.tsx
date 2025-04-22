import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Paper, 
  Typography, 
  Button, 
  Box,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';

const Settings: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Settings
        </Typography>

        <List>
          <ListItem>
            <ListItemText 
              primary="Account" 
              secondary="Manage your account settings" 
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText 
              primary="Notifications" 
              secondary="Configure notification preferences" 
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText 
              primary="Privacy" 
              secondary="Manage your privacy settings" 
            />
          </ListItem>
          <Divider />
        </List>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <Button 
            variant="contained" 
            color="error"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Settings;
