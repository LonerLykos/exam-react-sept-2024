import {Link, useLocation, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../redux/store.ts";
import {authSliceActions} from "../../redux/auth-slice/authSlice.ts";
import classNames from "classnames";
import "./Menu.scss"

export const Menu = () => {

    const dispatch = useAppDispatch();
    const userWithToken = useAppSelector((state) => state.auth.user);
    const status = useAppSelector((state) => state.auth.isAuthenticated)
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(authSliceActions.logout());
        navigate("/login");
    }

    const location = useLocation();
    const isActive = (path: string) => location.pathname === path;

    return (
        <div className={classNames('menu-wrapper', {'login': status}, {'unlogin': !status})}>
            {status && userWithToken ? (
                <>
                    <img src={userWithToken.image} alt="userPhoto"/>
                    <ul className={classNames('navigate')}>
                        <li className={classNames('pages')}>
                            <button onClick={handleLogout}>Logout</button>
                        </li>
                        <li className={classNames('pages', {'active': isActive('/')})}><Link to={'/'}>Main</Link></li>
                        <li className={classNames('pages', {'active': isActive('/users')})}><Link to={'/users'}>Users</Link></li>
                        <li className={classNames('pages', {'active': isActive('/recipes')})}><Link to={'/recipes'}>Recipes</Link></li>
                    </ul>
                </>
            ) : (<li className={classNames('pages', {'active': isActive('/login')})}><Link to={'/login'}>Login</Link></li>)
            }
        </div>
    )
};
