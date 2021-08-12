import React, { useContext, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { MOBILE, PASSWORD } from '../../config';
import { AuthContext } from '../../Context/AuthContext';


const Signin = () => {

    const [ login, setLogin ] = useState<string>( "LOGOUT" );

    const [ mobile, setMobile ] = useState<string>( '' );
    const [ password, setPassword ] = useState<string>( '' );

    const history = useHistory( );

    const values:any = useContext( AuthContext );
    console.log( values );

    if ( login === "LOGIN" ) {
        
        return <Redirect to='/' />
    }    

    const signinHandler = ( ) => {

        values.setAuth( ( ) => "LOGIN" );
        setLogin( values.isAuthenticated );

    }

    const signoutHandler = ( ) => {

        values.setAuth( ( ) => "LOGOUT" );
        setLogin( values.isAuthenticated );

    }

    const submitHandle = ( e: any ) => {

        e.preventDefault();
        
        if ( mobile === MOBILE && password === PASSWORD ) {

            signinHandler( );
        
        }
        else {

            alert( 'Invalid Credentials!' );

        }

    }

    return (

        <SigninWrapper>
            
            <div className = 'form-container'>
                <form onSubmit = { ( e ) => submitHandle( e ) } className = 'signin-form' >

                    <input type = 'text' className = 'input-mob' onChange = { ( e ) => setMobile( e.target.value ) } placeholder = 'mobile' />
                    <input type = 'password' className = 'input-pass' placeholder = 'password' onChange = { ( e ) => setPassword( e.target.value ) } />
                    <button type = 'submit' >signin</button>
                    {/* <button onClick = { ( ) => signoutHandler( ) } >signout</button> */}
                </form>
            </div>

           
        </SigninWrapper>
    
    );
}

const SigninWrapper = styled.div`

    .form-container {

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 50%;
        margin: 5rem auto;
    
    }

    form {

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        box-shadow: 1px 1px 10px 1px rgba(0,0,0,0.3);
        padding: 20px;
        border-radius: 10px;
        background: #9bc7eb;
    
    }

    .signin-form input {

        border: none;
        background: transparent;
        border-bottom: 1px solid black;
        outline: none;
        padding: 10px;
        font-size: 16px;
        color: #000000;
        margin: 20px;

    }

    .signin-form button {

        border: none;
        border-radius: 5px;
        outline: none;
        padding: 10px;
        font-size: 14px;
        font-weight: bold;
        color: #7a361b;
        background: #84fc84;
        text-transform: uppercase;

    }

`;

export default Signin;
