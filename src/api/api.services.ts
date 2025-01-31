import axios from 'axios';
import {getAuthInfo} from "./helper.ts";
import {IUserInfoWithTokens} from "../models/user-with-token-model/IUserInfoWithToken.ts";
import {IResponse} from "../models/response-model/IResponse.ts";
import {ITokenPair} from "../models/token-model/ITokenPair.ts";
import {store} from "../redux/store.ts";
import {authSliceActions} from "../redux/auth-slice/authSlice.ts";
import {baseUrl} from "../constants/urls.ts";
import {redirectSliceActions} from "../redux/redirect-slice/redirectSlice.ts";

export type LoginData = {
    username: string;
    password: string;
    expiresInMins: number
};



const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {}
});

export const login = async ({username, password, expiresInMins}: LoginData): Promise<IUserInfoWithTokens> => {

    const {data: userWithTokens} = await axiosInstance.post<IUserInfoWithTokens>('/login', {
        username,
        password,
        expiresInMins
    });

    return userWithTokens;
};

axiosInstance.interceptors.request.use((requestObject) => {
    const status = getAuthInfo<IUserInfoWithTokens>();
    if(status) {
        const token = status.accessToken
        if (requestObject.method?.toUpperCase() === 'GET') {
            requestObject.headers.Authorization = 'Bearer ' + token;
        }
    }
    return requestObject;
});

axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                await refresh();
                const iUserWithTokens = getAuthInfo<IUserInfoWithTokens>();
                if (iUserWithTokens) {
                    originalRequest.headers['Authorization'] = 'Bearer ' + iUserWithTokens.accessToken;
                }
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                store.dispatch(redirectSliceActions.setRedirect('/login'));
                store.dispatch(authSliceActions.logout());
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);


export const allService = async <T, >(key: string, url: string) => {

    const {data} = await axiosInstance.get<IResponse<T>>(url);

    return data[key] as T;
};

export const refresh = async () => {

    const iUserWithTokens = getAuthInfo<IUserInfoWithTokens>();

    if (!iUserWithTokens) {
        throw new Error('No authenication information');
    }

    const {data: {accessToken, refreshToken}} = await axiosInstance.post<ITokenPair>('/refresh', {
        refreshToken: iUserWithTokens.refreshToken,
        expiresInMin: 30
    });

    store.dispatch(authSliceActions.updateTokens({accessToken, refreshToken}));
};


