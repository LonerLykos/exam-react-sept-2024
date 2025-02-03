import {useCheck} from "../../../hooks/useCheck.ts";
import {IUser} from "../../../models/users-model/IUser.ts";
import {Link} from "react-router-dom";
import "./RecipeDetails.scss"
import classNames from "classnames";


export const RecipeDetails = () => {

    const {recipe, users} = useCheck('recipe');

    if (!recipe) {
        return <div>
            <h2>Recipe not Found</h2>
        </div>;
    }

    const currentUser = users.filter((user) => user.id === recipe.userId);

    return (
        <div className={classNames('recipe-details-wrapper')}>
            <h2>{recipe.name} edited by {currentUser.map((user: IUser) => <span key={user.id}><Link
                to={`/users/user/${user.id}`}
                replace>{user.firstName} {user.lastName}</Link></span>)}</h2>
            <div className={classNames('info-wrapper')}>
                <img src={recipe.image} alt={recipe.name}/>
                <section>
                    <div className={classNames('tags-and-special-container')}>
                        <ul>Special info:
                            <li>Prepare time: {recipe.prepTimeMinutes} mins</li>
                            <li>Cook time: {recipe.cookTimeMinutes} mins</li>
                            <li>Servings: {recipe.servings}</li>
                            <li>Difficulty: {recipe.difficulty}</li>
                            <li>Calories Rep Serving: {recipe.caloriesPerServing}</li>
                        </ul>
                        <ul>Tags:
                            {recipe.tags.map((tag: string, index) => <li key={index}>{tag} </li>)}
                        </ul>
                    </div>
                    <div className={classNames('ingredients-container')}>
                        <ul>Ingredients:
                        {recipe.ingredients.map((ingredient: string, index) => <li
                            key={index}>{ingredient}</li>)}
                        </ul>
                    </div>
                    <div className={classNames('instructions-container')}>
                        <h3>Instruction: </h3>
                        {recipe.instructions.map((text: string, index) => <p
                            key={index}>{text}</p>)}
                    </div>
                </section>
            </div>
        </div>
    );
};
