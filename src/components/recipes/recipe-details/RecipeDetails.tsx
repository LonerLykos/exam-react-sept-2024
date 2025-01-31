import {useCheck} from "../../../hooks/useCheck.ts";
import {IUser} from "../../../models/users-model/IUser.ts";
import {Link} from "react-router-dom";


export const RecipeDetails = () => {

    const {recipe, users} = useCheck('recipe');

    if (!recipe) {
        return <div>
            <h2>Recipe not Found</h2>
        </div>;
    }

    const currentUser = users.filter((user) => user.id === recipe.userId);

    return (
        <div>
            <h2>{recipe.name}</h2>
            <img src={recipe.image} alt={recipe.name}/>
            <ul>Tags:
                {recipe.tags.map((tag: string, index) => <li key={index}>{tag} </li>)}
            </ul>
            <ul>Special info:
                <li>Prepare time: {recipe.prepTimeMinutes} mins</li>
                <li>Cook time: {recipe.cookTimeMinutes} mins</li>
                <li>Servings: {recipe.servings}</li>
                <li>Difficulty: {recipe.difficulty}</li>
                <li>Calories Rep Serving: {recipe.caloriesPerServing}</li>
            </ul>
            <div>
                <h4>Ingredients:</h4>
                {recipe.ingredients.map((ingredient: string, index) => <h5
                    key={index}>{ingredient}</h5>)}
            </div>
            <div>
                <p>Instruction: </p>
                {recipe.instructions.map((text: string, index) => <p
                    key={index}>{text}</p>)}
            </div>
            <ul>
                {currentUser.map((user: IUser) => <li key={user.id}><Link to={`/users/user/${user.id}`} replace>{user.firstName} {user.lastName} has this
                    recipe</Link></li>)}

            </ul>
        </div>
    );
};
