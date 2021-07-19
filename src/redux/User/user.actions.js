import { userActionTypes } from "./user.types";

export const login = user => {
    return{
        type: userActionTypes.LOGIN,
        payload: user
    }
}

export const logout = () => {
    return{
        type: userActionTypes.LOGOUT
    }
}