import {IRecipes} from "../../../models/recipes-model/IRecipes.ts";
import {Link} from "react-router-dom";
import {useCheck} from "../../../hooks/useCheck.ts";
import "./UserDetails.scss"
import classNames from "classnames";

export const UserDetails = () => {

    const {recipes, user} = useCheck('user');

    if (!user) {
        return <div>
            <h2>Recipe not Found</h2>
        </div>;
    }

    const userRecipes = recipes.filter((recipe) => recipe.userId === user.id);

    return (
        <div className={classNames('user-details-wrapper')}>
            <h2>{user.firstName} {user.lastName}</h2>
            <img src={user.image} alt={user.firstName}/>
            <p className={classNames('italic')}><span>Email:</span> {user.email}</p>
            <p className={classNames('italic')}><span>Phone:</span> {user.phone}</p>
            <p><span>Address:</span> {user.address.address}</p>
            <p><span>Birthday:</span> {user.birthDate}</p>
            <p><span>University:</span> {user.university}</p>
            <p><span>Role:</span> {user.role}</p>
            <p><span>Gender:</span> {user.gender}</p>
            {userRecipes.length > 0 ? (
                <ul>User recipes:
                    {userRecipes.map((recipe: IRecipes) => <li key={recipe.id}><Link to={`/recipes/recipe/${recipe.id}`} replace>{recipe.name}</Link></li>)}
                </ul>
            ) : (<p>Current user haven`t any recipes</p>)}

        </div>
    );
};
