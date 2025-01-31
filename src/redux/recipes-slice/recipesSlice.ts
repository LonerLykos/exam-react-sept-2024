import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IRecipes} from "../../models/recipes-model/IRecipes.ts";
import {allService} from "../../api/api.services.ts";
import {urls} from "../../constants/urls.ts";


type RecipeSliceType = {
    recipes: IRecipes[];
    selectedRecipe: IRecipes | null;
    selectedTag: string | null;
};

const initialState: RecipeSliceType = {recipes: [], selectedRecipe: null, selectedTag: null};

const loadRecipes = createAsyncThunk("loadRecipes", async (_, thunkAPI) => {
    try {
        const recipes = await allService<IRecipes[]>('recipes', urls.recipes.allrecipes);
        return thunkAPI.fulfillWithValue(recipes);
    } catch (e) {
        return thunkAPI.rejectWithValue(`Your error is: ${e}`);
    }
});

export const recipeSlice = createSlice({
    name: "recipe",
    initialState: initialState,
    reducers: {
        setSelectedRecipe: (state, action: PayloadAction<IRecipes>) => {
            state.selectedRecipe = action.payload;
        },
        setSelectedTag: (state, action: PayloadAction<string>) => {
            state.selectedTag = action.payload;
        }
    },
    extraReducers: builder => builder
        .addCase(loadRecipes.fulfilled, (state, action: PayloadAction<IRecipes[]>) => {
            state.recipes = action.payload;
        })
        .addCase(loadRecipes.rejected, (state, action) => {
            console.log(state);
            console.log(action);
        }),
});

export const recipesSliceActions = {...recipeSlice.actions, loadRecipes};
