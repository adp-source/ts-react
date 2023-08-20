import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit'
import { WeatherResponse } from '../model/types';

export interface WeatherState {
  isLoading: boolean,
  isError: boolean,
  weather: WeatherResponse | null,
}

const initialState: WeatherState = {
  isLoading: false,
  isError: false,
  weather: null,
}

export const weatherSlice = createSlice({
  name: 'weather',
  initialState: initialState,
  reducers: {
    loading: state => {
      state.isLoading = true;
    },
    success: (state, action) => {
      state.isLoading = false;
      state.weather = action.payload;
    },
    error: state => {
      state.isError = true;
      state.isLoading = false;
    }
  }
});

export const { loading, success, error } = weatherSlice.actions;

export function fetchWeather() {
  return async function (dispatch, getState) {
    dispatch(loading());

    const {userReducer: {lat, long, timezone}} = getState();

    try {
      const options = {
        method: 'GET',
        url: 'https://api.open-meteo.com/v1/forecast',
        params: {
          latitude: lat,
          longitude: long,
          hourly: ['temperature_2m'],
          daily: ['temperature_2m_min', 'temperature_2m_max'],
          temperature_unit: 'fahrenheit',
          current_weather: true,
          timezone
        },
      };
      const response = await axios.request(options);
      dispatch(success(response.data));
    } catch (err) {
      dispatch(error());
    }
  }
}

export default weatherSlice.reducer;
