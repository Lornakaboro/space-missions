import { createSlice } from '@reduxjs/toolkit';
import getMissions from './missionsThunk';

const initialState = {
  missions: [],
  loading: false,
  error: null,
  status: false,
};

const missionHandlerReducer = (state, { payload }) => ({
  ...state,
  missions: state.missions.map((mission) => (mission.id === payload
    ? { ...mission, reserved: !mission.reserved }
    : mission)),
});

const missionSlice = createSlice({
  name: 'missions',
  initialState,
  reducers: {
    missionHandler: missionHandlerReducer,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMissions.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(getMissions.fulfilled, (state, { payload }) => ({
        ...state,
        loading: false,
        missions: payload,
        error: null,
        status: true,
      }))
      .addCase(getMissions.rejected, (state, { payload }) => ({
        ...state,
        error: payload,
        loading: false,
      }));
  },
});

export const { missionHandler } = missionSlice.actions;

export default missionSlice.reducer;
