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
import LockResetIcon from '@mui/icons-material/LockReset';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../services/api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [fieldError, setFieldError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (fieldError) {
      setFieldError('');
    }
  };

  const validate = () => {
    if (!email.trim()) {
      setFieldError('Email is required.');
      return false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFieldError('Please enter a valid email address.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!validate()) {
      return;
    }

    try {
      setIsSubmitting(true);
      await forgotPassword(email);
      setSuccessMessage('Password reset OTP has been sent to your email. Please check your inbox.');
      // Navigate to OTP page with email and reset flag
      setTimeout(() => {
        navigate('/otp', { state: { email, isPasswordReset: true } });
      }, 2000);
    } catch (error) {
      console.error('Forgot password error:', error);
      setErrorMessage(error.message || 'Failed to send reset OTP. Please try again.');
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
              <LockResetIcon />
            </Avatar>
            <Typography component="h1" variant="h4" sx={{ fontWeight: 700 }}>
              Forgot Password
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" align="center">
              Enter your email address and we'll send you an OTP to reset your password
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
                  value={email}
                  onChange={handleChange}
                  autoComplete="email"
                  error={Boolean(fieldError)}
                  helperText={fieldError}
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
              {isSubmitting ? 'Sending OTP...' : 'Send OTP'}
            </Button>

            {successMessage && (
              <Typography
                variant="body2"
                color="success.main"
                align="center"
                sx={{ mt: 1 }}
              >
                {successMessage}
              </Typography>
            )}

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

export default ForgotPassword;

