import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../redux/store.ts";
import {useEffect} from "react";
import {authSliceActions} from "../../redux/auth-slice/authSlice.ts";


export const Menu = () => {

    const dispatch = useAppDispatch();
    const userWithToken = useAppSelector((state) => state.auth.user);
    const status = useAppSelector((state) => state.auth.isAuthenticated)
    const navigate = useNavigate();

    useEffect(() => {
        const authStatus = sessionStorage.getItem("isAuthenticated") === "true";
        const userData = JSON.parse(sessionStorage.getItem("userWithToken") || "{}");
        if (authStatus) {
            dispatch(authSliceActions.login(userData));
        } else {
            dispatch(authSliceActions.logout());
        }
    }, [dispatch]);


    return (
        <div>
            {status && userWithToken ? (
                <>
                    <img src={userWithToken.image} alt="userPhoto"/>
                    <ul>
                        <li>
                            <button onClick={() => {
                                sessionStorage.removeItem("isAuthenticated");
                                sessionStorage.removeItem("userWithToken");
                                dispatch(authSliceActions.logout());
                                navigate("/");
                            }}>
                                Logout
                            </button>
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
