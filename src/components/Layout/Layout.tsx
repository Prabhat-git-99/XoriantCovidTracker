import React, { ReactChild, ReactNode } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Footer from './Footer';
import Header from './Header';

interface Props {

    children: JSX.Element

}

const Layout: React.FunctionComponent< Props > = ( { children } ) => {
    
    return (
        <LayoutWrapper>
            <Header />
            {
                children
            }
            <Footer />
        </LayoutWrapper>
    )
}

const LayoutWrapper = styled.div`


`;

Layout.propTypes = {

    children: PropTypes.any.isRequired

}

export default Layout;
