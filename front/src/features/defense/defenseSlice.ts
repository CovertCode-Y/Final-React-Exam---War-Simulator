import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';

interface DefenseState {
  interceptors: Interceptor[];
  alerts: MissileAlert[];
  missilesIntercepted: string[];
}

interface Interceptor {
  type: string;
  status: 'available' | 'in-use';
}

interface MissileAlert {
  _id: string;
  type: string;
  region: string;
  timeout: number;
}

const initialState: DefenseState = {
  interceptors: [
    { type: 'Iron Dome', status: 'available' },
    { type: 'David’s Sling', status: 'available' },
    { type: 'Arrow', status: 'available' },
  ],
  alerts: [],
  missilesIntercepted: [],
};

export const interceptMissile = createAsyncThunk<
  { missileId: string; success: boolean }, 
  { missileId: string; interceptorSpeed: number } 
>(
  'defense/interceptMissile',
  async ({ missileId, interceptorSpeed }, { rejectWithValue }) => {
    try {
      const response = await apiClient.post('/missiles/intercept', { missileId, interceptorSpeed });
      return { missileId, success: response.data.success };
    } catch (error) {
      console.error("Error intercepting missile:", error);
      return rejectWithValue('Failed to intercept missile');
    }
  }
);


const defenseSlice = createSlice({
  name: 'defense',
  initialState,
  reducers: {
    addAlert(state, action: PayloadAction<MissileAlert>) {
      state.alerts.push(action.payload);
    },
    clearAlerts(state) {
      state.alerts = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(interceptMissile.fulfilled, (state, action) => {
      const { missileId, success } = action.payload;
      if (success) {
        state.missilesIntercepted.push(missileId);
        state.alerts = state.alerts.filter(alert => alert._id !== missileId);
      }
    });
  },
});

export const { addAlert, clearAlerts } = defenseSlice.actions;

export default defenseSlice.reducer;
