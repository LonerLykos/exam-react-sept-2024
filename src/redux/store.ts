import {userSlice} from "./user-slice/userSlice.ts";
import {recipeSlice} from "./recipes-slice/recipesSlice.ts";
import {configureStore} from "@reduxjs/toolkit";
import {useDispatch, useSelector} from "react-redux";
import {authSlice} from "./auth-slice/authSlice.ts";

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        recipe: recipeSlice.reducer,
        auth: authSlice.reducer,
    },
});

export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>();
export const useAppSelector = useSelector.withTypes<ReturnType<typeof store.getState>>();
