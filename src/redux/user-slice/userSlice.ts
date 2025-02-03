import {IUser} from "../../models/users-model/IUser.ts";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {allService} from "../../api/api.services.ts";
import {urls} from "../../constants/urls.ts";


type UserSliceType = {
    users: IUser[];
    selectedUser: IUser | null;
    filtredUsers: IUser[];
};

const initialState: UserSliceType = {users: [], selectedUser: null, filtredUsers: []};

const loadUsers = createAsyncThunk("loadUsers", async (_, thunkAPI) => {
    try {
        const users = await allService<IUser[]>('users', urls.users.allUsers);
        return thunkAPI.fulfillWithValue(users)
    } catch (e) {
        return thunkAPI.rejectWithValue(`Your error is: ${e}`);
    }
});

export const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setSelectedUser: (state, action: PayloadAction<IUser>) => {
            state.selectedUser = action.payload;
        },
        filtredUsers: (state, action: PayloadAction<IUser[]>) => {
            state.filtredUsers = action.payload;
        },
        clearFilteredUsers: (state) => {
            state.filtredUsers = [];
        }
    },
    extraReducers: builder => builder
        .addCase(loadUsers.fulfilled, (state, action: PayloadAction<IUser[]>) => {
            state.users = action.payload;
        })
        .addCase(loadUsers.rejected, (state, action) => {
            console.log(state);
            console.log(action);
        }),
});

export const usersSliceActions = {...userSlice.actions, loadUsers};
