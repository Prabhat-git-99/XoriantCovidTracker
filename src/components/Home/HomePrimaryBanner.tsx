import React from "react";
import styled from "styled-components";

import Banner from '../../images/covid19.jpeg';


const HomePrimaryBanner = ( ) => {

    return (

      <HomePrimaryBannerWrapper >
            <div className = 'banner-area'>
                <h2 className = 'primary-title banner-title'>
                    Covid-19 Tracker Xoriant React Training
                </h2>
            </div>
      </HomePrimaryBannerWrapper>  

    );

};

const HomePrimaryBannerWrapper = styled.div`

    .banner-area {
        /* background: ${props => `url(${Banner}) no-repeat top center`}; */
        background: url(${Banner}) no-repeat fixed center/cover, linear-gradient( #b62e2e19, #e0484819 );
        width: 100vw;
        height: 40vh;
        position: relative;
    }

    .banner-title {

        background: white;
        padding: 10px;
        border-radius: 5px;
        border: 5px solid #d84c4c; 
        color: #d84c4c;
        text-transform: uppercase;
        font-weight: bolder;
        letter-spacing: 2px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

`;

export default HomePrimaryBanner;

