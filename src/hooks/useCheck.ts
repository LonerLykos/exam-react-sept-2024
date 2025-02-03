import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../redux/store.ts";
import {useEffect} from "react";
import {recipesSliceActions} from "../redux/recipes-slice/recipesSlice.ts";
import {usersSliceActions} from "../redux/user-slice/userSlice.ts";
import {IRecipes} from "../models/recipes-model/IRecipes.ts";
import {IUser} from "../models/users-model/IUser.ts";

export const useCheck = (item: string): {
    recipe: IRecipes | null,
    user: IUser | null,
    recipes: IRecipes[],
    users: IUser[]
} => {
    const {id} = useParams();
    const dispatch = useAppDispatch();
    const recipe = useAppSelector((state) => state.recipe.selectedRecipe);
    const recipes = useAppSelector((state) => state.recipe.recipes)
    const user = useAppSelector((state) => state.user.selectedUser);
    const users = useAppSelector((state) => state.user.users)

    if (recipes.length === 0) {
        dispatch(recipesSliceActions.loadRecipes())
    }

    if (users.length === 0) {
        dispatch(usersSliceActions.loadUsers())
    }

    useEffect(() => {

        if (item === 'recipe' && id) {
            const currentId: number = +id;
            if (!recipe || recipe.id !== (currentId)) {
                const currentRecipe = recipes.find((current) => current.id === currentId);
                if (currentRecipe) {
                    dispatch(recipesSliceActions.setSelectedRecipe(currentRecipe));
                } else {
                    dispatch(recipesSliceActions.loadRecipes());
                }
            }

        } else if (item === 'user' && id) {
            const currentId: number = +id;
            if (!user || user.id !== (currentId)) {
                const currentUser = users.find((current) => current.id === currentId);
                if (currentUser) {
                    dispatch(usersSliceActions.setSelectedUser(currentUser));
                } else {
                    dispatch(usersSliceActions.loadUsers());
                }
            }

        }
    }, [id, dispatch, users, user, recipes, recipe, item]);

    return {recipe, user, recipes, users};
};