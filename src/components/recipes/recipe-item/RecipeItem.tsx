import {IRecipes} from "../../../models/recipes-model/IRecipes.ts";
import {FC} from "react";
import {useAppDispatch} from "../../../redux/store.ts";
import {generatePath, useNavigate} from "react-router-dom";
import {recipesSliceActions} from "../../../redux/recipes-slice/recipesSlice.ts";

interface Props {
    item: IRecipes;
}

export const RecipeItem: FC<Props> = ({item}) => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const recipeDetails = () => {

        dispatch(recipesSliceActions.setSelectedRecipe(item));
        const path = generatePath('recipe/:id', {id: `${item.id}`});
        navigate(path)
    }

    const handlerFilter = (tag:string) => {
        dispatch(recipesSliceActions.setSelectedTag(tag));
        navigate(generatePath('/recipes/:tag', {tag: `${tag}`}), {replace:true})
    }

    return (
        <div>
            <h2>{item.name}</h2>
            <ul>Tags: {item.tags.map((tag:string, index:number) => <li key={index}><button onClick={() => {handlerFilter(tag)}}>{tag}</button></li>)}</ul>
            <button onClick={recipeDetails}>Info</button>
        </div>
    );
};
