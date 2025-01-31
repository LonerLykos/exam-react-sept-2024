import {useAppSelector} from "../../redux/store.ts";
import {RecipeItem} from "../recipes/recipe-item/RecipeItem.tsx";

export const FilterByTag = () => {

    const tag = useAppSelector((state) => state.recipe.selectedTag);
    const recipes = useAppSelector((state) => state.recipe.recipes);
    if (!tag) {
        return null;
    }
    const filtredRecipes = recipes.filter(recipe => recipe.tags.includes(tag));

    return (
        <div>
            {filtredRecipes.map((recipe) => <RecipeItem key={recipe.id} item={recipe}/>)}
        </div>
    );
};
