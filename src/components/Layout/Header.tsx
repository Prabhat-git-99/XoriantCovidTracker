import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../../Context/AuthContext';

const Header = () => {


    const values = useContext( AuthContext );


    return (
    
        <HeaderWrapper>
            <div className = 'nav-wrapper'>
                <div className = 'nav-links' >
                    <ul>
                        <li>
                            <NavLink to = '/' >Home</NavLink>
                        </li>
                        <li>
                            <NavLink to = '/dashboard' >Dashboard</NavLink>
                        </li>
                        {
                            values.isAuthenticated === 'LOGIN' ?
                            <li>
                            <NavLink to = '/post' >Profile</NavLink>
                            </li>
                            :
                            ''
                        }
                        
                    </ul>
                </div>
                <div className = 'login-section'>
                    <ul>
                        <li>
                            {
                                values.isAuthenticated === 'LOGOUT' ?
                                <NavLink to = '/signin' >Signin</NavLink>
                                :
                                <NavLink to = '/signout' >Signout</NavLink>
                            }
                        </li>
                    </ul>
                </div>
            </div>
        </HeaderWrapper>
    )
}

const HeaderWrapper = styled.div`

    .nav-wrapper {

        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        background: #051e3b;
        /* background: #d84c4c; */
        border-bottom: 2px solid #d84c4c;
        
    }

    .nav-links {

        padding: 10px;

    }

    ul {

        display: flex;

    }

    li {

        padding: 5px;
        text-transform: uppercase;
        font-size: 18px;
        font-weight: bolder;
        color: #ec7272;
        /* color: #a74f4f; */
    }

    .login-section {

        padding: 10px;

    }

`;

export default Header;
