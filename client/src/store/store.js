import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

// Create the store
const store = configureStore({
  reducer: {
    auth: authReducer
  }
});

// Export the store directly (not as default)
export { store };