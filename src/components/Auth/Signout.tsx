import React, { useContext, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../../Context/AuthContext';


const Signout = ( ) => {

    const values:any = useContext( AuthContext );
    values.setAuth( ( ) => "LOGOUT" );

    return <Redirect to='/' />

};

export default Signout;
