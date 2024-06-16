import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './Slides/userSide'; // Adjust path as necessary

// Define RootState
export type RootState = ReturnType<typeof rootReducer>;

// Combine reducers
const rootReducer = combineReducers({
  user: userReducer,
  // Add other reducers as needed
});

// Configure persist options
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['user'], // Blacklist 'user' reducer from being persisted (if needed)
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store instance
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'], // Ignore redux-persist actions
      },
    }),
});

// Create persistor
export const persistor = persistStore(store);
