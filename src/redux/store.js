import {combineReducers, configureStore} from '@reduxjs/toolkit';
import CounterSlice from './features/CounterSlice';
import AuthSlice from './features/AuthSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';
import ProductsSlice from './features/ProductsSlice';

const reducers = combineReducers({
  counter: CounterSlice,
  auth: AuthSlice,
  products: ProductsSlice,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whiteList: ['auth', 'counter'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}),
});

const persistor = persistStore(store);

export {store, persistor};
