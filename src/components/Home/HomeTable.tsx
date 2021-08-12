import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import axios from 'axios';

import { SUMMARY_API, COUNTRY_API } from '../../config';
import Layout from '../Layout/Layout';
import { SummaryContext } from '../../Context/SummaryContext';
import { count } from 'console';

type ItemProps = {

    Country: string;
    NewConfirmed: number;
    NewDeaths: number;
    TotalConfirmed: number;
    TotalDeaths: number;
    CountryCode: string;
    Slug: string;
    TotalRecovered: number;
    NewRecovered: number;
    TotalActiveCase: number;
    alarmRate: number;

}


const HomeTable = ( ) => {

    const [ summary, setSummary ] = useState<any>( [ ] );
    const [ currendData, setCurrentData ] = useState<any>( [ ] );
    const [ filter, setFilter ] = useState( ' ' );

    const [ currentPage, setCurrentPage ] = useState( 0 );
    const [ totalPage, setTotalPage ] = useState( 1 );

    const { country, fetchCountry } = useContext( SummaryContext );

    console.log( 'countttt ', country );

    const perPage = 10;


    useEffect( ( ) => {

        setSummary( country );
        setTotalPage( Math.ceil( country.length / 10 ) );
        fetchCountry( country );
        setCurrentData( country.slice( 0, 10 ) );
        

    }, [ country ] );

    const nextPage = ( ) => {

        if ( currentPage === totalPage ) {
            
            return ;
        
        }
        
        setCurrentPage( prevState => prevState + 1 );
        setCurrentData( summary.slice( ( currentPage + 1 )*10, ( currentPage + 1 )*10 + 10 ) );

    }

    const prevPage = ( ) => {

        if ( currentPage === 0 ) {

            return;

        }
        else {

            setCurrentPage( prevState => prevState - 1 );
            setCurrentData( summary.slice( ( currentPage - 1 )*10, ( currentPage - 1 )*10 + 10 ) );        
        
        }
    }

    const particularPage = ( pageNo:any ) => {

        if ( pageNo < 0 ) {
            
            return;

        }
        else if ( pageNo > totalPage ) {

            return;

        }
        else {

            setCurrentPage( pageNo - 1 );
            setCurrentData( summary.slice( ( pageNo - 1 )*10, ( pageNo - 1)*10 + 10 ) )

        }
    }

    const filterHandler = ( filterName:string ) => {

        setFilter( filterName );

        console.log ( summary )

        setSummary( summary.sort( function( a:any, b:any ):any {
            if ( a[filterName] < b[filterName] ) {
                return 1;
            }
            if ( a[filterName] > b[filterName] ) {
                return -1;
            }
        }));

        setCurrentData( summary.slice( currentPage*10, currentPage*10 + 10 ) );

    }

    const searchFun = ( e:any ) => {

        const res = summary.filter( ( item:any ) =>
            JSON.stringify( item ).toLowerCase( ).includes( e.target.value.toLowerCase( ) )
        )
        console.log( res );
        setCurrentData( res.slice( 0, 10 ) );

    }

    return (

        <HomeTableWrapper>

                <div className = 'home-container'>
                        <div className = 'search-area'>
                            <h2>Search Country</h2>
                            <input type = 'text' onChange = { ( e ) => { searchFun( e ) } } />
                        </div>
                
                        <select className = 'select-filter' onChange = { ( e ) => filterHandler( e.target.value ) } >
                            <option value = 'NewConfirmed' >New Confirmed</option>
                            <option value = 'NewDeaths' >New Deaths</option>
                            <option value = 'TotalConfirmed' >Total Confirmed</option>
                            <option value = 'TotalDeaths' >Total Deaths</option>
                            <option value = 'TotalActiveCase'>Total Active</option>
                            <option value = 'alarmRate'>Effective Country</option>
                        </select>
                    <div className = 'action-center'>
                        <div className = 'button-container' >
                            <button className='prim prev' onClick = { prevPage } >Prev</button>
                            
                            <select className='prim part' onChange = { ( event ) => particularPage( event.target.value ) }  >
                                {
                                    [...Array( totalPage )].map( ( item, index ) => {

                                        return (
                                            <option key = { index + 1 } value = { index + 1 } >{ index + 1 }</option>
                                        )
                                    })
                                }
                            </select>

                            <button className='prim next' onClick = { nextPage } >Next</button>
                        </div>
                        <h3 className='page-value'>Page { currentPage + 1 } </h3>

                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>country</th>
                                <th>Code</th>
                                <th>NewConfirmed</th>
                                <th>NewDeaths</th>
                                <th>TotalConfirmed</th>
                                <th>TotalDeaths</th>
                                <th>NewRecovere</th>
                                <th>TotalRecovered</th>
                                <th>Active</th>
                                <th>Rating</th>
                                <th>
                                    View
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            currendData.map( ( item: ItemProps, index:any ) => {
                                // item.TotalActiveCase = item.TotalConfirmed - item.TotalDeaths - item.TotalRecovered;
                                // console.log( 'se ', currendData );
                                return (

                                    <tr key = { index } >
                                        <td>{ item.Country }</td>
                                        <td>{ item.CountryCode }</td>
                                        <td>{ item.NewConfirmed }</td>
                                        <td>{ item.NewDeaths }</td>
                                        <td>{ item.TotalConfirmed }</td>
                                        <td>{ item.TotalDeaths }</td>
                                        <td>{ item.NewRecovered }</td>
                                        <td>{ item.TotalRecovered }</td>
                                        <td>{ item.TotalActiveCase }</td>
                                        <td>{ item.alarmRate }</td>
                                        <td>
                                            <Link to = {`/country/${ item.Slug }`} >view</Link>
                                        </td>
                                    </tr>
                                
                                )
                            })
                        }
                        </tbody>
                    </table>
                    
                </div>
        
        </HomeTableWrapper>
    
    )

}

const HomeTableWrapper = styled.div`

    .home-container {
        margin-top: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 5rem;
    }

    .select-filter {

        border: none;
        border-bottom: 1px solid #4b0404;
        width: 30%;
        text-align: center;
        padding: 10px;
        margin: 20px;
        font-weight: bolder;
        font-size: 14px;
        text-transform: uppercase;
        outline: none;
        color: #f39671;
        letter-spacing: 2px;
    }

    .page-value {

        margin: 10px;
        color: #3c2b6e;
    }

    .action-center {
        text-align: center;
    }

    .prim {
        /* border: 1px solid green; */
        border-radius: 2px;
        border: none;
        padding: 5px 15px;
        background: none;
        font-weight: bolder;
        margin: 0 10px;
        background: #424c69;
        color: white;
    }

    table {
        min-width: 80vw;
        min-height: 40vh;
        border: 1px solid black;
        border-collapse: collapse;
        text-align: center;
        margin-bottom: 20px;
    }

    table tr {
        border-collapse: collapse;
        border: 1px solid black;
    }
    
    table td {
        border-collapse: collapse;
        border: 1px solid black;
        padding: 5px;
        font-size: 13px;
        font-weight: bolder;
        color: rgba(0,0,0,0.7);
        letter-spacing: 2px;
    }

    tr:nth-child(2n) {
        background: #eeba90;
        background: #71b3d1;
    }

    th {
        font-size: 12px;
        text-transform: capitalize;
        padding: 8px 0;
    }

    td:nth-child(1) {
        /* background: #282836; */
        color: #000000;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 2px;
    }

    .search-area {

        font-size: 14px;
        font-weight: bolder;
        text-transform: uppercase;
        letter-spacing: 2px;
        color: rgba( 0, 0, 0, 0.5);

    }

    .search-area input {

        border: none;
        border-bottom: 1px solid black;
        background: transparent;
        padding: 5px;
        outline: none;
        width: 100%;

    }
   
    /* thead  */
`;

export default HomeTable;
