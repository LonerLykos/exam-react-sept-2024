import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type RedirectState = {
    redirectTo: string | null;
};

const initialState: RedirectState = {
    redirectTo: null,
};

export const redirectSlice = createSlice({
    name: 'redirect',
    initialState,
    reducers: {
        setRedirect(state, action: PayloadAction<string>) {
            state.redirectTo = action.payload;
        },
        clearRedirect(state) {
            state.redirectTo = null;
        },
    },
});

export const redirectSliceActions = {...redirectSlice.actions};

