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
import DialpadIcon from '@mui/icons-material/Dialpad';
import { useNavigate, useLocation } from 'react-router-dom';
import { verifyResetOtp } from '../services/api';

const Otp = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { email, isPasswordReset } = location.state || {};

  const handleChange = (e) => {
    const value = e.target.value;
    // Allow only digits and max 6 characters
    if (/^\d{0,6}$/.test(value)) {
      setOtp(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!otp || otp.length !== 6) {
      setError('Please enter the 6-digit OTP sent to your email or phone.');
      return;
    }

    try {
      setIsSubmitting(true);
      
      if (isPasswordReset) {
        // Verify OTP for password reset
        if (!email) {
          setError('Email is required for password reset.');
          return;
        }
        await verifyResetOtp(email, otp);
        // Navigate to reset password page with email and OTP
        navigate('/reset-password', { state: { email, otp } });
      } else {
        // Regular login OTP verification
        // TODO: Replace with real login OTP verification API call
        console.log('Verifying login OTP:', otp);
        // For now, simulate success and navigate to dashboard
        alert('OTP verified successfully!');
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('OTP verification error:', err);
      setError(err.message || 'Invalid OTP. Please try again.');
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
              <DialpadIcon />
            </Avatar>
            <Typography component="h1" variant="h4" sx={{ fontWeight: 700 }}>
              Enter OTP
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" align="center">
              {isPasswordReset
                ? 'We have sent a 6-digit verification code to your email for password reset'
                : 'We have sent a 6-digit verification code to your registered contact'}
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="OTP"
                  value={otp}
                  onChange={handleChange}
                  inputProps={{ maxLength: 6, inputMode: 'numeric' }}
                  helperText={error || 'Enter the 6-digit code'}
                  error={Boolean(error)}
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
              {isSubmitting ? 'Verifying...' : 'Verify OTP'}
            </Button>

            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              sx={{ mt: 2 }}
            >
              Didn't receive the code?{' '}
              <Link
                component="button"
                type="button"
                sx={{ fontWeight: 600 }}
                onClick={() => {
                  if (isPasswordReset && email) {
                    // Resend forgot password OTP
                    navigate('/forgot-password', { state: { email } });
                  } else {
                    alert('Resend OTP logic goes here');
                  }
                }}
              >
                Resend OTP
              </Link>
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              sx={{ mt: 1 }}
            >
              Wrong account?{' '}
              <Link
                component="button"
                type="button"
                sx={{ fontWeight: 600 }}
                onClick={() => navigate('/login')}
              >
                Go back to login
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Otp;


