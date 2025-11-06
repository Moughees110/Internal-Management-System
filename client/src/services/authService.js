import { loginUser, generateToken, validateToken } from '../store/authSlice';
import { store } from '../store/store';

export const authenticateUser = async (email, password) => {
  try {
    const loginResult = await store.dispatch(loginUser({ email, password }));

    if (loginUser.rejected.match(loginResult)) {
      throw new Error(loginResult.payload || 'Login failed');
    }

    const user = loginResult.payload?.user;
    const token = loginResult.payload?.token;

    if (!user || !token) {
      throw new Error('Invalid server response');
    }

    const tokenResult = await store.dispatch(generateToken(user.id));
    if (generateToken.rejected.match(tokenResult)) {
      throw new Error(tokenResult.payload || 'Token generation failed');
    }

    return true;
  } catch (error) {
    console.error('Authentication error:', error);
    return false;
  }
};

export const verifyAuth = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return false;

    const result = await store.dispatch(validateToken());
    return validateToken.fulfilled.match(result);
  } catch (error) {
    console.error('Auth verification error:', error);
    return false;
  }
};