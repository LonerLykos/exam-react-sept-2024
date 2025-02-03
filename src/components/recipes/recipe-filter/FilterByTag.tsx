import {useAppSelector} from "../../../redux/store.ts";
import {RecipeItem} from "../recipe-item/RecipeItem.tsx";
import {Pagination} from "../../pagination/Pagination.tsx";
import {useEffect, useState} from "react";
import "./FiltredByTag.scss"
import classNames from "classnames";

export const FilterByTag = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const tag = useAppSelector((state) => state.recipe.selectedTag);
    const recipes = useAppSelector((state) => state.recipe.recipes);

    useEffect(() => {
        setCurrentPage(1);
    }, [tag]);

    if (!tag) {
        return null;
    }

    const filtredRecipes = recipes.filter(recipe => recipe.tags.includes(tag));

    const itemsPerPage = 2;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filtredRecipes.slice(indexOfFirstItem, indexOfLastItem);
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    return (
        <div className={classNames('filtred-info')}>
            <div className={classNames('filtred-recipes-list-wrapper')}>
                {currentItems.map((recipe) => <RecipeItem key={recipe.id} item={recipe}/>)}
            </div>
            <Pagination
                totalItems={filtredRecipes.length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </div>
    );
};
