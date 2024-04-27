import {configureStore} from '@reduxjs/toolkit';
import CounterSlice from './features/CounterSlice';
import AuthSlice from './features/AuthSlice';

export const store = configureStore({
  reducer: {
    counter: CounterSlice,
    auth: AuthSlice,
  },
});
