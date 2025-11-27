import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Box,
} from '@mui/material';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import { useNavigate } from 'react-router-dom';

const plants = [
  {
    id: 1,
    name: 'Rose',
    description: 'Classic, fragrant blooms perfect for any garden.',
    image:
      'https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 2,
    name: 'Lavender',
    description: 'Soothing scent and beautiful purple flowers.',
    image:
      'https://images.pexels.com/photos/46216/lavender-flowers-purple-flowers-46216.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 3,
    name: 'Succulent Mix',
    description: 'Low-maintenance plants ideal for busy plant lovers.',
    image:
      'https://images.pexels.com/photos/569966/pexels-photo-569966.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 4,
    name: 'Peace Lily',
    description: 'Elegant indoor plant that purifies the air.',
    image:
      'https://images.pexels.com/photos/569966/pexels-photo-569966.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any auth state or tokens here in the future
    navigate('/login', { replace: true });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f2f9ff 0%, #ffe8f3 50%, #f3ffe4 100%)',
      }}
    >
      <AppBar
        position="static"
        elevation={0}
        sx={{ background: 'linear-gradient(90deg, #2e7d32, #66bb6a)' }}
      >
        <Toolbar>
          <LocalFloristIcon sx={{ mr: 1 }} />
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
            Flower Nursery
          </Typography>
          <Button
            color="inherit"
            variant="outlined"
            onClick={handleLogout}
            sx={{
              textTransform: 'none',
              borderRadius: 999,
              borderColor: 'rgba(255,255,255,0.8)',
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>
          Browse Plants
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
          Discover our curated collection of beautiful plants for your home and garden.
        </Typography>

        <Grid container spacing={3}>
          {plants.map((plant) => (
            <Grid item xs={12} sm={6} md={3} key={plant.id}>
              <Card
                sx={{
                  borderRadius: 3,
                  overflow: 'hidden',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                }}
              >
                <CardMedia
                  component="img"
                  height="160"
                  image={plant.image}
                  alt={plant.name}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {plant.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {plant.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ px: 2, pb: 2 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      textTransform: 'none',
                      borderRadius: 999,
                      background: 'linear-gradient(90deg, #2e7d32, #66bb6a)',
                      '&:hover': {
                        background: 'linear-gradient(90deg, #1b5e20, #43a047)',
                      },
                    }}
                  >
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;


