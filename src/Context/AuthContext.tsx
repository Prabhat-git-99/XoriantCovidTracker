import { createContext, useContext } from 'react';

export enum AUTH_STATE {

    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT"

}

export type AuthContextType = {

    isAuthenticated: AUTH_STATE;
    setAuth: ( AUTH_STATE: AUTH_STATE ) => void;

}

export const AuthContext = createContext<AuthContextType> ( { isAuthenticated: AUTH_STATE.LOGOUT, setAuth: isAuthenticated => console.log( 'in context') } );

export const useAuth = ( ) => useContext( AuthContext );