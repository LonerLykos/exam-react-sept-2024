import {store} from "../redux/store.ts";

export const getAuthInfo = <T>() => {
    const userInfo = store.getState();
    if (!userInfo) {
        return null;
    }
    return userInfo.auth.user as T;
}
