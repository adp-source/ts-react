import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { fetchWeather } from '../redux/weatherSlice';
import { setGeo } from '../redux/userSlice';
import * as hooks from '../redux/hooks';
import Weather from './Weather';

function Home(props) {

  const dispatch = hooks.useAppDispatch();
  const userReducer = hooks.useAppSelector(state => state.userReducer);
  const weatherReducer = hooks.useAppSelector(state => state.weatherReducer);

  useEffect(() => {
    if (!userReducer.lat || !userReducer.long) {
      navigator.geolocation.getCurrentPosition((position) => {
        dispatch(setGeo({
          lat: position.coords.latitude, 
          long: position.coords.longitude
        }));
      });
    }
  }, [userReducer.lat, userReducer.long]);

  useEffect(() => {
    if (!userReducer.lat && !userReducer.lat) return;

    dispatch(fetchWeather());

  }, [userReducer.lat, userReducer.long]);

  return (
    <Container>
      {weatherReducer.isLoading ? <div>Loading</div> : 
        (<div>
          <div>
            weather
          </div>
          <div>
            <div>lat: {userReducer.lat}</div>
            <div>long: {userReducer.long}</div>
          </div>
          <div>
            <button
              onClick={() => dispatch(fetchWeather())}
            >Reload</button>
          </div>
          {weatherReducer.weather && (
            <Weather weather={weatherReducer.weather} />
          )}
        </div>)
      }
    </Container>
  )
}

export default Home;