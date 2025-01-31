import {login, LoginData} from "../../api/api.services.ts";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {loginValidator} from "../validator/login.validator.ts";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {authSliceActions} from "../../redux/auth-slice/authSlice.ts";
import {useAppDispatch, useAppSelector} from "../../redux/store.ts";

export const FormLogin = () => {
    const {handleSubmit, register, formState: {errors, isValid}, reset}
        = useForm<LoginData>({mode: 'onChange', resolver: joiResolver(loginValidator)});

    const [error, setError] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const dispatch = useAppDispatch();
    const state = useAppSelector((state) => state.auth.isAuthenticated);
    const navigate = useNavigate();

    useEffect(() => {
        if (state) {
            navigate("/");
        }
    }, [state, navigate]);

    const myHandler = async (currentData: LoginData) => {

        try {

            if (currentData.password.includes(currentData.username)) {

                const loginData: LoginData = {
                    username: currentData.username,
                    password: currentData.password,
                    expiresInMins: 1,
                };

                const userWithToken = await login(loginData);
                dispatch(authSliceActions.login(userWithToken));
                setError(false);
                setMessage('');
                reset();
            } else {
                setError(true);
                setMessage('Current user need current password');
                reset();
            }


        } catch (error) {
            console.error('Error while sending data:', error)
        }
    };


    return (

        <div>
            <h1>Sing In</h1>
            <form onSubmit={handleSubmit(myHandler)}>
                <div className='wrap-input'>
                    <label>
                        <select {...register('username')} defaultValue="">
                            <option value="" disabled>Виберіть користувача...</option>
                            <option value="emilys">Користувач 1</option>
                            <option value="avah">Користувач 2</option>
                        </select>
                    </label>

                    <p className={!errors.username ? 'hide' : 'view'}>{!errors.username ? '' : errors.username.message}</p>
                </div>
                <div className='wrap-input'>
                    <label>
                        <select {...register('password')} defaultValue="">
                            <option value="" disabled>Виберіть пароль...</option>
                            <option value="emilyspass">Пароль 1</option>
                            <option value="avahpass">Пароль 2</option>
                        </select>
                    </label>

                    <p className={!errors.password ? 'hide' : 'view'}>{!errors.password ? '' : errors.password.message}</p>
                </div>

                <button disabled={!isValid}>Login</button>

                <p className={!error ? 'hide' : 'view'}>{message}</p>
            </form>
        </div>
    );
};
