import React from 'react';
import styled from 'styled-components';

const Footer = () => {
    
    return (
        <FooterWrapper>
            <h2>Xoriant React Training</h2>
        </FooterWrapper>
    );

}

const FooterWrapper = styled.div`

    position: fixed;
    /* position: relative; */
    bottom: 0;
    width: 100vw;
    padding: 10px;
    background: #051e3b;
    color: #db6a6a;
    text-align: center;

`;

export default Footer
