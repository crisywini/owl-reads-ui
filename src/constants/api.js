// Base URL of the owl-service backend. Override with VITE_API_BASE_URL in a
// .env file when the API is not running on the default local port.
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
