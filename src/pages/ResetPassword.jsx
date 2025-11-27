import React, { useState, useEffect } from 'react';
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
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { useNavigate, useLocation } from 'react-router-dom';
import { resetPassword } from '../services/api';

const ResetPassword = () => {
  const [formValues, setFormValues] = useState({
    password: '',
    confirmPassword: '',
  });

  const [fieldErrors, setFieldErrors] = useState({
    password: '',
    confirmPassword: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { email, otp } = location.state || {};

  useEffect(() => {
    // Redirect if email or OTP is missing
    if (!email || !otp) {
      navigate('/forgot-password');
    }
  }, [email, otp, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validate = () => {
    const errors = {
      password: '',
      confirmPassword: '',
    };

    if (!formValues.password) {
      errors.password = 'Password is required.';
    } else if (formValues.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long.';
    }

    if (!formValues.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password.';
    } else if (formValues.password !== formValues.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
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
      await resetPassword(email, otp, formValues.password);
      alert('Password reset successful! Please login with your new password.');
      navigate('/login');
    } catch (error) {
      console.error('Reset password error:', error);
      setErrorMessage(error.message || 'Failed to reset password. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!email || !otp) {
    return null; // Will redirect in useEffect
  }

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
              <VpnKeyIcon />
            </Avatar>
            <Typography component="h1" variant="h4" sx={{ fontWeight: 700 }}>
              Reset Password
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" align="center">
              Enter your new password below
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="New Password"
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
                  label="Confirm New Password"
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
              {isSubmitting ? 'Resetting Password...' : 'Reset Password'}
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
              Remember your password?{' '}
              <Link
                component="button"
                type="button"
                sx={{ fontWeight: 600 }}
                onClick={() => navigate('/login')}
              >
                Back to Login
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ResetPassword;

