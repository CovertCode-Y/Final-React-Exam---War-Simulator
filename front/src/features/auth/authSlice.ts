import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';
import { RootState } from '../../store/store';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string;
}

interface User {
  id: string;
  username: string;
  role: 'defender' | 'attack';
  organization: string;
  region?: string;
}

interface LoginData {
  username: string;
  password: string;
}

interface RegisterData extends LoginData {
  organization: string;
  region?: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: '',
};

export const loginUser = createAsyncThunk<AuthResponse, LoginData>(
  'auth/loginUser',
  async (data: LoginData) => {
    const response = await apiClient.post<AuthResponse>('/auth/login', data);
    return response.data;
  }
);

export const registerUser = createAsyncThunk<AuthResponse, RegisterData>(
  'auth/registerUser',
  async (data: RegisterData) => {
    const response = await apiClient.post<AuthResponse>('/auth/register', data);
    return response.data;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.token = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      });
  },
});

export const { logout } = authSlice.actions;

export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
