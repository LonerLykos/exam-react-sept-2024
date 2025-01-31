import {combineReducers, configureStore} from '@reduxjs/toolkit';
import { userSlice } from './user-slice/userSlice.ts';
import { recipeSlice } from './recipes-slice/recipesSlice.ts';
import { authSlice } from './auth-slice/authSlice.ts';
import { persistStore, persistReducer } from 'redux-persist';
import {useDispatch, useSelector} from "react-redux";
import storageSession from 'redux-persist/lib/storage/session';
import {redirectSlice} from "./redirect-slice/redirectSlice.ts";

const persistConfig = {
    key: 'root',
    storage: storageSession,
};

const rootReducer = combineReducers({
    user: userSlice.reducer,
    recipe: recipeSlice.reducer,
    auth: authSlice.reducer,
    redirect: redirectSlice.reducer,
});


const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST'], // Ігноруємо серіалізацію для дієвих дій persist
            },
        }),
});

export const persistor = persistStore(store);

export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>();
export const useAppSelector = useSelector.withTypes<ReturnType<typeof store.getState>>();


