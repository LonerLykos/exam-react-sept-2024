import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IUserInfoWithTokens} from "../../models/user-with-token-model/IUserInfoWithToken.ts";

type AuthSliceType = {
    isAuthenticated: boolean;
    user: IUserInfoWithTokens | null;
}

const initState:AuthSliceType = {isAuthenticated: false, user: null};

export const authSlice = createSlice({
    name: 'auth',
    initialState: initState,
    reducers: {
        login(state, action:PayloadAction<IUserInfoWithTokens>) {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        logout(state) {
            state.isAuthenticated = false;
            state.user = null;
        }
    },
});

export const authSliceActions = {
    ...authSlice.actions,
};

