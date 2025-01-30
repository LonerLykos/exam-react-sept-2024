import {IUser} from "../../models/users-model/IUser.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


type UserSliceType = {
    users: IUser[];
}

const initialState: UserSliceType = {users: []};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loadUsers: (state, action:PayloadAction<IUser[]>) => {
            state.users = action.payload;
        }
    },
    extraReducers: builder => builder,
});

export const usersSliceActions = {
    ...userSlice.actions,
}
