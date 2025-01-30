
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IRecipes} from "../../models/recipes-model/IRecipes.ts";


type RecipeSliceType = {
    recipes: IRecipes[];
}

const initialState: RecipeSliceType = {recipes: []};

export const recipeSlice = createSlice({
    name: "recipe",
    initialState,
    reducers: {
        loadRecipes: (state, action:PayloadAction<IRecipes[]>) => {
            state.recipes = action.payload;
        }
    },
    extraReducers: builder => builder,
});

export const recipesSliceActions = {
    ...recipeSlice.actions,
}
