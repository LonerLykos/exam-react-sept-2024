import {useRoutes} from "react-router-dom";
import {lazy, Suspense} from "react";
import {AppRoutes} from "./constants.ts";
import UserDetailsPage from "../pages/UserDetailsPage.tsx";
import {RecipeDetails} from "../components/recipes/recipe-details/RecipeDetails.tsx";
import {FilterPage} from "../pages/FilterPage.tsx";

const Main = lazy(() => import ('../pages/MainPage.tsx'));
const Login = lazy(() => import ('../pages/LoginPage.tsx'));
const Users = lazy(() => import ('../pages/UsersPage.tsx'));
const Recipes = lazy(() => import ('../pages/RecipesPage.tsx'));


export const RoutesComponent = () => useRoutes([
    {
        element: (
            <Suspense fallback={<div>Loading...</div>}>
                <Main/>
            </Suspense>
        ),
        path: AppRoutes.root,
        index: true
    },
    {
        element: (
            <Suspense fallback={<div>Loading...</div>}>
                <Login/>
            </Suspense>
        ),
        path: AppRoutes.login,
    },
    {
        element: (
            <Suspense fallback={<div>Loading...</div>}>
                <Users/>
            </Suspense>
        ),
        path: AppRoutes.users,
    },
    {
        element: (
            <UserDetailsPage/>
        ),
        path: AppRoutes.userDetails
    },
    {
        element: (
            <Suspense fallback={<div>Loading...</div>}>
                <Recipes/>
            </Suspense>
        ),
        path: AppRoutes.recipes,
    },
    {
        element: (
            <RecipeDetails/>
        ),
        path: AppRoutes.recipeDetails
    },
    {
        element: (
            <FilterPage/>
        ),
        path:AppRoutes.filter
    }
]);
