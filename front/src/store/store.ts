import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import defenseReducer from '../features/defense/defenseSlice';
import attackReducer from '../features/attack/attackSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    defense: defenseReducer,
    attack: attackReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 
