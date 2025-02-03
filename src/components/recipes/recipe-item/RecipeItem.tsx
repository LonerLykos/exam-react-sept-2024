import {IRecipes} from "../../../models/recipes-model/IRecipes.ts";
import {FC} from "react";
import {useAppDispatch} from "../../../redux/store.ts";
import {generatePath, useNavigate} from "react-router-dom";
import {recipesSliceActions} from "../../../redux/recipes-slice/recipesSlice.ts";
import "./RecipeItem.scss"
import classNames from "classnames";

interface Props {
    item: IRecipes;
}

export const RecipeItem: FC<Props> = ({item}) => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const recipeDetails = () => {

        dispatch(recipesSliceActions.setSelectedRecipe(item));
        const path = generatePath('/recipes/recipe/:id', {id: `${item.id}`});
        navigate(path, {replace:true})
    }

    const handlerFilter = (tag:string) => {
        dispatch(recipesSliceActions.setSelectedTag(tag));
        navigate(generatePath('/recipes/:tag', {tag: `${tag}`}), {replace:true})
    }

    return (
        <div className={classNames('recipe-item-wrapper')}>
            <img src={item.image} alt={item.name}/>
            <div className={classNames('recipe-info')}>
                <h2>{item.name}</h2>
                <ul>Tags: {item.tags.map((tag: string, index: number) => <li key={index}>
                    <button onClick={() => {
                        handlerFilter(tag)
                    }}>{tag}</button>
                </li>)}</ul>
                <button className={classNames('info')} onClick={recipeDetails}>Info</button>
            </div>
        </div>
    );
};
