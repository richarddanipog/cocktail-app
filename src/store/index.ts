import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import { combineReducers } from 'redux';
import cocktailsReducer from './cocktails/slice';

const rootReducer = combineReducers({
  cocktailsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these redux-persist actions
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
