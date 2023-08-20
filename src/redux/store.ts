import { applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { configureStore } from '@reduxjs/toolkit'
import weatherReducer from './weatherSlice'
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    weatherReducer: weatherReducer,
    userReducer: userReducer
  },
  enhancers: [applyMiddleware(thunkMiddleware)]
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
