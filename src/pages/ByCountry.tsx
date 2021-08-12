import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import { COUNTRY_API } from '../config';

const ByCountry = () => {

    const [ data, setData ] = useState< any >( [ ] );
    const { country } = useParams< { country: string } >( );
    const m = new Date(); 
    const dateString = m.getUTCFullYear( ) + "-" + ( m.getUTCMonth( )+ 1 ) +"-"+ m.getUTCDate( );
    const [ date, setDate ] = useState( dateString );
    

    useEffect( ( ) => { 
        console.log( 'date ', date )
        axios.get( `${ COUNTRY_API }${ country }/status/confirmed/date/${ date }` )
        .then( res => {

            console.log( 'date res ', res );
            setData( res.data );

        })
        .catch( err => {
            
            console.log( err );

        })

    }, [ date ] );

    return (
        <CountryWrapper>
        <Layout>
        <div className = 'main-area' >
            <h1 className = 'country-title' >Watching for { country } </h1>
            { 
                data.length ? 
                
                <div className = 'country-info' >
                    
                    <h2>Country: <span>{ data[0].Country }</span></h2>
                    <h2>Confirmed: <span>{ data[0].Confirmed }</span></h2>
                    <h2>Date: <span>{ data[0].Date }</span></h2>
                    <h2>Deaths: <span>{ data[0].Deaths }</span></h2>
                    <h2>Active: <span>{ data[0].Active }</span></h2>

                </div>
                
                :
                <div className = 'data-not-found' >
                    <h2>No Data For This Date</h2>
                    <h3>Choose Another Date</h3>
                </div>
            }
            <input type='date' onSelect = { ( e: React.ChangeEvent<HTMLInputElement> ) => setDate( e.target.value ) } />

        </div>
        </Layout>
        </CountryWrapper>
    )
}

const CountryWrapper = styled.div`

    .main-area {
        
        display: flex;
        /* justify-content: center; */
        flex-direction: column;
        align-items: center;
        /* min-height: 86vh; */
        margin-top: 20px;
        margin-bottom: 20px;
    
    }
    .country-title {

        text-transform: uppercase;        
        letter-spacing: 2px;
        
    }

    .country-info {

        display: flex;
        flex-direction: column;
        /* justify-content: center; */
        align-items: center;
        padding: 10px;
    }

    .country-info h2 {

        letter-spacing: 2px;

    }

    .country-info span {
        
        color: #db6464;
        font-weight: bolder;
        font-style: italic;
    }

    .data-not-found {

        margin-top: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

    }

    input {

        border: none;
        border-bottom: 1px solid black;
        padding: 10px;
        margin-top: 1rem;

    }

`;

export default ByCountry;
