import {IRecipes} from "../../../models/recipes-model/IRecipes.ts";
import {Link} from "react-router-dom";
import {useCheck} from "../../../hooks/useCheck.ts";

export const UserDetails = () => {

    const {recipes, user} = useCheck('user');

    if (!user) {
        return <div>
            <h2>Recipe not Found</h2>
        </div>;
    }

    const userRecipes = recipes.filter((recipe) => recipe.userId === user.id);

    return (
        <div>
            <h2>{user.firstName} {user.lastName}</h2>
            <img src={user.image} alt={user.firstName}/>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>Address: {user.address.address}</p>
            <p>Birthday: {user.birthDate}</p>
            <p>University: {user.university}</p>
            <p>Role: {user.role}</p>
            <p>Gender: {user.gender}</p>
            {userRecipes.length > 0 ? (
                <ul>User recipes:
                    {userRecipes.map((recipe: IRecipes) => <li key={recipe.id}><Link to={`/recipes/recipe/${recipe.id}`} replace>{recipe.name}</Link></li>)}
                </ul>
            ) : (<p>Current user haven`t any recipes</p>)}

        </div>
    );
};
