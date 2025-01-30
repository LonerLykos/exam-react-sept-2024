import axios from 'axios';
import {retriveLocalStorage} from "./helper.ts";
import {IUserInfoWithTokens} from "../models/user-with-token-model/IUserInfoWithToken.ts";
import {IUser} from "../models/users-model/IUser.ts";
import {IResponse} from "../models/response-model/IResponse.ts";
import {ITokenPair} from "../models/token-model/ITokenPair.ts";
import {IRecipes} from "../models/recipes-model/IRecipes.ts";

export type LoginData = {
    username: string;
    password: string;
    expiresInMins: number
}

const axiosInstance = axios.create({
    baseURL: 'https://dummyjson.com/auth',
    headers: {}
});

axiosInstance.interceptors.request.use((requestObject) => {

    if (requestObject.method?.toUpperCase() === 'GET') {

        requestObject.headers.Authorization = 'Bearer ' + retriveLocalStorage<IUserInfoWithTokens>('user').accessToken
    }
    return requestObject;

})

export const login = async ({username, password, expiresInMins}: LoginData): Promise<IUserInfoWithTokens> => {

    const {data: userWithTokens} = await axiosInstance.post<IUserInfoWithTokens>('/login', {
        username,
        password,
        expiresInMins
    });

    localStorage.setItem('user', JSON.stringify(userWithTokens));

    return userWithTokens;
}

export const loadAuthUsers = async (): Promise<IUser[]> => {

    const {data: {users}} = await axiosInstance.get<IResponse & { users: IUser[] }>('/users');

    return users
}

export const loadAuthRecipes = async (): Promise<IRecipes[]> => {

    const {data: {posts}} = await axiosInstance.get<IResponse & { posts: IRecipes[] }>('/recipes');

    return posts
}

export const refresh = async () => {

    const iUserWithTokens = retriveLocalStorage<IUserInfoWithTokens>('user');

    const {data: {accessToken, refreshToken}} = await axiosInstance.post<ITokenPair>('/refresh', {
        refreshToken: iUserWithTokens.refreshToken,
        expiresInMin: 30
    });

    iUserWithTokens.accessToken = accessToken;
    iUserWithTokens.refreshToken = refreshToken;

    localStorage.setItem('user', JSON.stringify(iUserWithTokens));


}
