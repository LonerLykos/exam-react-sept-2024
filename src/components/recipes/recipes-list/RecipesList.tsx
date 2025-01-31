import {useAppDispatch, useAppSelector} from "../../../redux/store.ts";
import {useEffect, useState} from "react";
import {recipesSliceActions} from "../../../redux/recipes-slice/recipesSlice.ts";
import {IRecipes} from "../../../models/recipes-model/IRecipes.ts";
import {RecipeItem} from "../recipe-item/RecipeItem.tsx";
import {Pagination} from "../../pagination/Pagination.tsx";

export const RecipesList = () => {

    const dispatch = useAppDispatch();
    const recipes = useAppSelector((state) => state.recipe.recipes);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        dispatch(recipesSliceActions.loadRecipes())
    },[dispatch]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = recipes.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div>
            {currentItems.map((recipe: IRecipes) => <RecipeItem key={recipe.id} item={recipe} />)}
            <Pagination
                totalItems={recipes.length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </div>
    );
};
