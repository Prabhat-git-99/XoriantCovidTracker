import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import Error from '../../pages/Error';

type login = {

    login: boolean 

}

const Auth = ( WrappedComponent:React.ComponentType<login> ) => {


    const ProtectedComponent = ( ) => {

        const value = useContext(AuthContext);
        console.log('Value ', value);

        let loginState = false;
        if ( value.isAuthenticated === 'LOGOUT' ) {
            loginState = false;
        }
        else if ( value.isAuthenticated === 'LOGIN' ) {
            loginState = true;
        }
        // return <WrappedComponent login={true} />
        
        if ( loginState ) {

            return <WrappedComponent login = { loginState } />
            // return <Error />
        }
        else {

            return <Error />
        }
    
    }

    return ProtectedComponent;

}

export default Auth;