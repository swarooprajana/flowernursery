import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Avatar,
  Link,
} from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });

  const [fieldErrors, setFieldErrors] = useState({
    email: '',
    password: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const errors = {
      email: '',
      password: '',
    };

    if (!formValues.email.trim()) {
      errors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!formValues.password) {
      errors.password = 'Password is required.';
    }

    setFieldErrors(errors);
    return Object.values(errors).every((msg) => msg === '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!validate()) {
      return;
    }

    try {
      setIsSubmitting(true);
      // TODO: Replace with real login API call
      console.log('Login data:', formValues);

      // For now, simulate success and navigate to OTP page
      navigate('/otp');
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('Login failed. Please check your credentials and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f2f9ff 0%, #ffe8f3 50%, #f3ffe4 100%)',
        padding: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={6}
          sx={{
            borderRadius: 4,
            padding: 4,
            backdropFilter: 'blur(8px)',
            backgroundColor: 'rgba(255,255,255,0.9)',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mb: 3,
            }}
          >
            <Avatar
              sx={{
                bgcolor: '#2e7d32',
                width: 56,
                height: 56,
                mb: 1.5,
              }}
            >
              <LockOpenIcon />
            </Avatar>
            <Typography component="h1" variant="h4" sx={{ fontWeight: 700 }}>
              Welcome Back
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Log in to continue exploring beautiful plants
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formValues.email}
                  onChange={handleChange}
                  autoComplete="email"
                  error={Boolean(fieldErrors.email)}
                  helperText={fieldErrors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  value={formValues.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  error={Boolean(fieldErrors.password)}
                  helperText={fieldErrors.password}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isSubmitting}
              sx={{
                mt: 3,
                mb: 1,
                py: 1.4,
                textTransform: 'none',
                fontSize: '1rem',
                borderRadius: 999,
                background: 'linear-gradient(90deg, #2e7d32, #66bb6a)',
                '&:hover': {
                  background: 'linear-gradient(90deg, #1b5e20, #43a047)',
                },
              }}
            >
              {isSubmitting ? 'Logging in...' : 'Log In'}
            </Button>

            {errorMessage && (
              <Typography
                variant="body2"
                color="error"
                align="center"
                sx={{ mt: 1 }}
              >
                {errorMessage}
              </Typography>
            )}

            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              sx={{ mt: 2 }}
            >
              <Link
                component="button"
                type="button"
                sx={{ fontWeight: 600 }}
                onClick={() => navigate('/forgot-password')}
              >
                Forgot Password?
              </Link>
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              sx={{ mt: 1 }}
            >
              Don't have an account?{' '}
              <Link
                component="button"
                type="button"
                sx={{ fontWeight: 600 }}
                onClick={() => navigate('/register')}
              >
                Create one
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;


