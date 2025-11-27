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
} from '@mui/material';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { registerUser } from '../services/api';

const UserRegistration = () => {
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [fieldErrors, setFieldErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const validate = () => {
    const errors = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    };

    if (!formValues.firstName.trim()) {
      errors.firstName = 'First name is required.';
    }

    if (!formValues.lastName.trim()) {
      errors.lastName = 'Last name is required.';
    }

    if (!formValues.email.trim()) {
      errors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!formValues.password) {
      errors.password = 'Password is required.';
    } else if (formValues.password.length < 6) {
      errors.password = 'Password must be at least 6 characters.';
    }

    if (!formValues.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password.';
    } else if (formValues.password !== formValues.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
    }

    setFieldErrors(errors);

    // Return true if no errors
    return Object.values(errors).every((msg) => msg === '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const isValid = validate();
    if (!isValid) {
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await registerUser({
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        email: formValues.email,
        password: formValues.password,
      });

      console.log('User registration API response:', response);
      alert('Registration successful!');
      // Optionally reset the form
      setFormValues({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    } catch (error) {
      console.error('Error during registration:', error);
      setErrorMessage(error.message || 'Registration failed. Please try again.');
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
              <PersonAddAlt1Icon />
            </Avatar>
            <Typography component="h1" variant="h4" sx={{ fontWeight: 700 }}>
              Flower Nursery
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Create your account to start exploring beautiful plants
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={formValues.firstName}
                  onChange={handleChange}
                  autoComplete="given-name"
                  error={Boolean(fieldErrors.firstName)}
                  helperText={fieldErrors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={formValues.lastName}
                  onChange={handleChange}
                  autoComplete="family-name"
                  error={Boolean(fieldErrors.lastName)}
                  helperText={fieldErrors.lastName}
                />
              </Grid>
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
                  autoComplete="new-password"
                  error={Boolean(fieldErrors.password)}
                  helperText={fieldErrors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={formValues.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                  error={Boolean(fieldErrors.confirmPassword)}
                  helperText={fieldErrors.confirmPassword}
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
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
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
              sx={{ mt: 1.5 }}
            >
              By signing up, you agree to our Terms of Service and Privacy Policy.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default UserRegistration;


