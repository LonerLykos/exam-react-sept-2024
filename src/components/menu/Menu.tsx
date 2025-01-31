import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../redux/store.ts";
import {authSliceActions} from "../../redux/auth-slice/authSlice.ts";

export const Menu = () => {

    const dispatch = useAppDispatch();
    const userWithToken = useAppSelector((state) => state.auth.user);
    const status = useAppSelector((state) => state.auth.isAuthenticated)
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(authSliceActions.logout());
        navigate("/login");
    }

    return (
        <div>
            {status && userWithToken ? (
                <>
                    <img src={userWithToken.image} alt="userPhoto"/>
                    <ul>
                        <li>
                            <button onClick={handleLogout}>Logout</button>
                        </li>
                        <li><Link to={'/'}>Main</Link></li>
                        <li><Link to={'/users'}>Users</Link></li>
                        <li><Link to={'/recipes'}>Recipes</Link></li>
                    </ul>
                </>
            ) : (<p><Link to={'/login'}>Login</Link></p>)
            }
        </div>
    )
};
