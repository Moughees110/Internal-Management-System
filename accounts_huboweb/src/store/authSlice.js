import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Helper function to clear auth data
const clearAuthData = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('tokenExpiry');
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/users/login`, { email, password });
      
      // Calculate token expiry (1 hour from now)
      const tokenExpiry = new Date().getTime() + 3600000; // 1 hour
      
      return {
        ...response.data,
        tokenExpiry
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const generateToken = createAsyncThunk(
  'auth/generateToken',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/tokens/generate`, { userId });
      
      // Calculate token expiry (1 hour from now)
      const tokenExpiry = new Date().getTime() + 3600000; // 1 hour
      
      return {
        ...response.data,
        tokenExpiry
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const validateToken = createAsyncThunk(
  'auth/validateToken',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');
      
      const response = await axios.get(`${API_URL}/tokens//verify-token`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      return response.data;
    } catch (error) {
      clearAuthData();
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    user: null,
    status: 'idle',
    error: null,
    isAuthenticated: false,
    tokenExpiry: null
  },
  reducers: {
    logout: (state) => {
      clearAuthData();
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.status = 'idle';
      state.error = null;
      state.tokenExpiry = null;
    },
    initializeAuth: (state) => {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      const tokenExpiry = localStorage.getItem('tokenExpiry');
      
      if (token && user && tokenExpiry) {
        const now = new Date().getTime();
        if (now < parseInt(tokenExpiry)) {
          state.token = token;
          state.user = JSON.parse(user);
          state.isAuthenticated = true;
          state.tokenExpiry = parseInt(tokenExpiry);
        } else {
          clearAuthData();
        }
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.tokenExpiry = action.payload.tokenExpiry;
        
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        localStorage.setItem('tokenExpiry', action.payload.tokenExpiry);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(generateToken.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(generateToken.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.tokenExpiry = action.payload.tokenExpiry;
        
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('tokenExpiry', action.payload.tokenExpiry);
      })
      .addCase(generateToken.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(validateToken.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(validateToken.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isAuthenticated = true;
        // Update token expiry if needed
        if (action.payload.tokenExpiry) {
          state.tokenExpiry = action.payload.tokenExpiry;
          localStorage.setItem('tokenExpiry', action.payload.tokenExpiry);
        }
      })
      .addCase(validateToken.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
        state.tokenExpiry = null;
      });
  }
});

export const { logout, initializeAuth } = authSlice.actions;
export default authSlice.reducer;