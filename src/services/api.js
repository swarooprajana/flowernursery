// Global API service for the Flower Nursery app
// Update BASE_URL to point to your backend API (e.g. "https://api.yourdomain.com")

const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';

async function request(path, { method = 'GET', body, headers = {} } = {}) {
  const url = `${BASE_URL}${path}`;

  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  let response;

  try {
    response = await fetch(url, config);
  } catch (error) {
    // Network-level error
    console.error('Network error while calling API:', error);
    throw new Error('Unable to connect to the server. Please try again later.');
  }

  let data;
  const isJson =
    response.headers &&
    response.headers.get('content-type') &&
    response.headers.get('content-type').includes('application/json');

  if (isJson) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    const message = (data && data.message) || response.statusText || 'Request failed';
    const error = new Error(message);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

export function get(path) {
  return request(path, { method: 'GET' });
}

export function post(path, body) {
  return request(path, { method: 'POST', body });
}

export function put(path, body) {
  return request(path, { method: 'PUT', body });
}

export function del(path) {
  return request(path, { method: 'DELETE' });
}

// Example: specific endpoint for user registration
export function registerUser(userData) {
  // Adjust the endpoint ("/users/register") to match your backend route
  return post('/users/register', userData);
}

// Forgot password - request OTP
export function forgotPassword(email) {
  return post('/auth/forgot-password', { email });
}

// Verify OTP for password reset
export function verifyResetOtp(email, otp) {
  return post('/auth/verify-reset-otp', { email, otp });
}

// Reset password with new password
export function resetPassword(email, otp, newPassword) {
  return post('/auth/reset-password', { email, otp, newPassword });
}


