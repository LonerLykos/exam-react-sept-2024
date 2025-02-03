import {useAppDispatch, useAppSelector} from "../../redux/store.ts";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {searchValidator} from "../validator/search.validator.ts";
import {generatePath, useLocation, useNavigate} from "react-router-dom";
import {usersSliceActions} from "../../redux/user-slice/userSlice.ts";
import {recipesSliceActions} from "../../redux/recipes-slice/recipesSlice.ts";
import {IRecipes} from "../../models/recipes-model/IRecipes.ts";
import {IUser} from "../../models/users-model/IUser.ts";
import "./Search.scss"
import classNames from "classnames";
import {useEffect} from "react";

interface ISearchData {
    searching: string;
}


export const Search = () => {

    const {handleSubmit, register, formState: {errors}, watch, setValue, reset}
        = useForm<ISearchData>({mode: 'onChange', resolver: joiResolver(searchValidator)});

    const dispatch = useAppDispatch();
    const {pathname} = useLocation();
    const navigate = useNavigate();
    const users = useAppSelector((state) => state.user.users);
    const recipes = useAppSelector((state) => state.recipe.recipes);
    const searchValue = watch("searching", "")
    const filterUser = useAppSelector((state) => state.user.filtredUsers);
    const filterRecipes = useAppSelector((state) => state.recipe.filtredRecipes);

    const handleSearch = (searchingData: ISearchData) => {
        const params = searchingData.searching.trim();

        if (params.length === 0) {
            dispatch(recipesSliceActions.clearFilteredRecipes());
            dispatch(usersSliceActions.clearFilteredUsers());
            return;
        }
        switch (pathname) {
            case "/users":
                if (params.length > 0) {
                    if ((+params) && (+params) > 0) {
                        const filtredUser = users.filter(user => user.id.toString().includes(params));
                        dispatch(usersSliceActions.filtredUsers(filtredUser));
                    } else {
                        const filtredUser = users.filter(user => user.firstName.includes(params));
                        dispatch(usersSliceActions.filtredUsers(filtredUser));
                    }
                }
                break

            case "/recipes":
                if (params.length > 0) {
                    if ((+params) && (+params) > 0) {
                        const filtredRecipes = recipes.filter(recipe => recipe.id.toString().includes(params));
                        dispatch(recipesSliceActions.filtredRecipes(filtredRecipes));

                    } else {
                        const filtredRecipes = recipes.filter(recipe => recipe.name.includes(params));
                        dispatch(recipesSliceActions.filtredRecipes(filtredRecipes));
                    }
                }
                break
        }
    };

    useEffect(() => {
        handleSearch({searching: searchValue});
    }, [searchValue]);

    const handleBlur = () => {

        setTimeout(() => {
            setValue("searching", "");
            reset();
        }, 200);
    };

    const handleChoise = (type: string, item: IRecipes | IUser) => {
        if (type === 'user') {
            dispatch(usersSliceActions.setSelectedUser(item as IUser));
            dispatch(usersSliceActions.clearFilteredUsers());
            navigate(generatePath('/users/user/:id', {id: `${item.id}`}));
        } else {
            dispatch(recipesSliceActions.setSelectedRecipe(item as IRecipes));
            dispatch(recipesSliceActions.clearFilteredRecipes());
            navigate(generatePath('/recipes/recipe/:id', {id: `${item.id}`}));
        }
    };

    return (
        <>
            {(pathname === "/users" || pathname === "/recipes") && (
                <div className={classNames('form-wrapper')}>
                    <h3>Search</h3>
                    <form className={classNames('form-search')} onChange={handleSubmit(handleSearch)}
                          onBlur={handleBlur}>
                        <label>
                            <input type="text" {...register('searching')}/>
                        </label>
                        <p className={!errors.searching ? 'hide' : 'view'}>{!errors.searching ? '' : errors.searching.message}</p>
                    </form>
                    <div className={classNames({'find-list': (filterUser.length > 0 || filterRecipes.length > 0) })}>
                        {pathname === "/users" && filterUser.length > 0 && (
                            <ul>
                                {filterUser.map(user => (
                                    <li key={user.id}>
                                        <button onClick={() => handleChoise('user', user)}>
                                            {user.firstName} {user.lastName} with id: {user.id}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}

                        {pathname === "/recipes" && filterRecipes.length > 0 && (
                            <ul>
                                {filterRecipes.map(recipe => (
                                    <li key={recipe.id}>
                                        <button onClick={() => handleChoise('recipe', recipe)}>
                                            {recipe.name} with id: {recipe.id}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};
