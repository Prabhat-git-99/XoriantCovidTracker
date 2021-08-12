import React, { Component, ComponentType, useState } from 'react';

type LocalAuthType = {

    login: boolean; 

}

function Auth1<P>(
    WrappedComponent: React.ComponentType<P & LocalAuthType >
) {

    console.log( 'Hiii ');
    const [ isAuth, setAuth ] = useState( false );
    setAuth( true );

    const ProtectedComponent = ( props: P ) => {

        return <WrappedComponent {...props} login={isAuth} />
    };

    return ProtectedComponent;

}

export default Auth1;