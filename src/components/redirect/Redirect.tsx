import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {useAppSelector} from "../../redux/store.ts";

export const Redirect = () => {
    const navigate = useNavigate();
    const redirectTo = useAppSelector(state => state.redirect.redirectTo);

    useEffect(() => {
        if (redirectTo) {
            navigate(redirectTo);
        }
    }, [redirectTo, navigate]);

    return null;
};

