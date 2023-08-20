import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment-timezone';

export interface UserState {
  lat: number | null,
  long: number | null,
  timezone: string | null,
}

const initialState: UserState = {
  lat: null,
  long: null,
  timezone: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setGeo: (state, action) => {
      const {lat, long} = action.payload;

      state.lat = lat;
      state.long = long;
      state.timezone = moment.tz.guess();
    }
  }
});

export const { setGeo } = userSlice.actions;

export default userSlice.reducer;