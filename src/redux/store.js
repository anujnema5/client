import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage'
import userReducer from './userSlice'
import videoReducer from "./videoSlice";

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist';

const persisteConfig = {
    key: 'root',
    version: 1,
    storage
}

// COMBINING OUR REDUCERS
const rootReducer = combineReducers({user: userReducer, video: videoReducer});

// PERSISTING OUR REDUCER
const persistedReducer = persistReducer(persisteConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,

    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

// EXPORTING OUR PERSIST STORE
export const persistor = persistStore(store)