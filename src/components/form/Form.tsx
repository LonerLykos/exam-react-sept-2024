import {login, LoginData} from "../../api/api.services.ts";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {loginValidator} from "../validator/login.validator.ts";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {authSliceActions} from "../../redux/auth-slice/authSlice.ts";
import {useAppDispatch, useAppSelector} from "../../redux/store.ts";
import classNames from "classnames";
import "./Form.scss"

export const FormLogin = () => {
    const {handleSubmit, register, formState: {isValid}, reset}
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

        } catch {
            setError(true);
            setMessage('Incorrect login or password');
            reset();
        }
    };


    return (

        <div className={classNames('form-wrapper')}>
            <h1>Sing In</h1>
            <form onSubmit={handleSubmit(myHandler)}>

                <label>
                    <select {...register('username')} defaultValue="">
                        <option value="" disabled>Choose user...</option>
                        <option value="emilys">User 1</option>
                        <option value="avah">User 2</option>
                    </select>
                </label>

                <label>
                    <select {...register('password')} defaultValue="">
                        <option value="" disabled>Choose pass...</option>
                        <option value="emilyspass">Password 1</option>
                        <option value="avahpass">Password 2</option>
                    </select>
                </label>

                <button disabled={!isValid} className={classNames({'disable': !isValid}, {'active': isValid})}>Login</button>

                <p className={!error ? 'hide' : 'view'}>{message}</p>
            </form>
        </div>
    );
};
