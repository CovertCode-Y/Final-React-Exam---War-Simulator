import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';

interface AttackState {
  launchedMissiles: Missile[];
}

interface Missile {
  id: string;
  type: string;
  region: string;
  status: 'launched' | 'hit' | 'intercepted';
}

interface LaunchMissileData {
  type: string;
  region: string;
}

const initialState: AttackState = {
  launchedMissiles: [],
};

export const launchMissile = createAsyncThunk(
  'attack/launchMissile',
  async (data: LaunchMissileData) => {
    const response = await apiClient.post('/missiles/launch', data);
    return response.data;
  }
);

const attackSlice = createSlice({
  name: 'attack',
  initialState,
  reducers: {
    updateMissileStatus(state, action: PayloadAction<{ id: string; status: 'hit' | 'intercepted' }>) {
      const missile = state.launchedMissiles.find(m => m.id === action.payload.id);
      if (missile) {
        missile.status = action.payload.status;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(launchMissile.fulfilled, (state, action: PayloadAction<Missile>) => {
      state.launchedMissiles.push(action.payload);
    });
  },
});

export const { updateMissileStatus } = attackSlice.actions;

export default attackSlice.reducer;
