import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { isTypeNode } from 'typescript';

import Layout from '../components/Layout/Layout';
import EditData from '../components/Post/EditData';
import { SummaryContext } from '../Context/SummaryContext';
// import { v4 as uuidv4 } from 'uuid';

interface PostType {

    Id: string,
    Country?: string;
    NewConfirmed?: number;
    NewDeaths?: number;
    TotalConfirmed?: number;
    TotalDeaths?: number;
    CountryCode?: string;
    Slug?: string;
    TotalRecovered?: number;
    NewRecovered?: number;
    TotalActiveCase?: number;


}

interface PostType1 {

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

}

const PostForm = ( ) => {

    const postData:any = JSON.parse( localStorage.getItem( 'postData' ) || '[ ]' );

    const [ submit, setSubmit ] = useState( false );

    const [ addedByAdmin, setAddedByAdmin ] = useState( false );

    const { country, fetchCountry } = useContext( SummaryContext );

    const [ allData, setAllData ] = useState<any>( country );

    const [ edit, setEdit ] = useState<boolean>( false );

    const [ editData, setEditData ] = useState<any>( { } );


    const [ currentPage, setCurrentPage ] = useState( 0 );
    const [ totalPage, setTotalPage ] = useState( 1 );
    const [ currendData, setCurrentData ] = useState<any>( [ ] );


    console.log( 'akk ', allData );

    const [ details, setDetails ] = useState<PostType>( { 
      
        Id: '',
        Country: '',
        NewConfirmed: 0,
        NewDeaths: 0,
        TotalConfirmed: 0,
        TotalDeaths: 0,
        CountryCode: '',
        Slug: '',
        TotalRecovered: 0,
        NewRecovered: 0,
        TotalActiveCase: 0
    
    } );

    const [ data, setData ] = useState( postData );

    console.log( 'stroed data ', data );

    useEffect( ( ) => {

        setTotalPage( Math.ceil( allData.length / 10 ) );
        setCurrentData( allData.slice( 0, 10 ) );

        if ( submit ) {
            storeHandler( );
        }

    }, [ details ] );

    const submitHandler = async ( e: any, callback:any ) => {

        setSubmit( true );
        e.preventDefault( );
        setDetails( {
            Country: e.target.country.value,
            Slug: e.target.slug.value,
            NewConfirmed: e.target.newconfirmedcase.value,
            TotalConfirmed: e.target.totalconfirmedcase.value,
            NewDeaths: e.target.newdeaths.value,
            TotalDeaths: e.target.totaldeaths.value,
            Id: e.target.slug.value
        } );

    }

    const storeHandler = ( ) => {
        
        postData.push( details );
        allData.push( details );
        setData( postData );
        localStorage.setItem( 'postData', JSON.stringify( postData ) );
        setSubmit( false );
        fetchCountry( allData );

    }

    // ***********************************
    // ***********************************
    const nextPage = ( ) => {

        if ( currentPage === totalPage ) {
            
            return ;
        
        }
        
        setCurrentPage( prevState => prevState + 1 );
        setCurrentData( allData.slice( ( currentPage + 1 )*10, ( currentPage + 1 )*10 + 10 ) );

    }

    const prevPage = ( ) => {

        if ( currentPage === 0 ) {

            return;

        }
        else {

            setCurrentPage( prevState => prevState - 1 );
            setCurrentData( allData.slice( ( currentPage - 1 )*10, ( currentPage - 1 )*10 + 10 ) );        
        
        }
    }

    const editHandler = ( id:string ) => {

        let editData1 = allData.find( ( item:any ) => item.Slug === id );  
        if ( editData1 === undefined || editData1 === [ ] ) {

            editData1 = data.find( ( item:any ) => item.Slug === id );

        }      
        setEditData( editData1 );
        console.log( editData );
        console.log( 'sss ', editData1 );
        // saveData( id, { } );
        setEdit( true );

    }


    const saveData = ( id:string, dataR:any ) => {

        let i = 0;
        let found = 0;

        allData.map( ( item:any ) => {
            i += 1;
            if ( item.Slug === id ) {
                found = 1;
                item.Country = dataR.Country;
                item.Slug = dataR.Slug;
                item.NewConfirmed = dataR.NewConfirmed;
                item.TotalConfirmed = dataR.TotalConfirmed;
                item.NewDeaths = dataR.NewDeaths;
                item.TotalDeaths = dataR.TotalDeaths;
                item.TotalRecovered = dataR.TotalRecovered;
                item.TotalActiveCase = dataR.TotalConfirmed - dataR.TotalRecovered - dataR.TotalDeaths;
            
            }

        } );

        let j = 0;

        data.map( ( item:any ) => {
            j += 1;
            if ( item.Slug === id ) {
                item.Country = dataR.Country;
                item.Slug = dataR.Slug;
                item.NewConfirmed = dataR.NewConfirmed;
                item.TotalConfirmed = dataR.TotalConfirmed;
                item.NewDeaths = dataR.NewDeaths;
                item.TotalDeaths = dataR.TotalDeaths;
                item.TotalRecovered = dataR.TotalRecovered;
                item.TotalActiveCase = dataR.TotalConfirmed - dataR.TotalRecovered - dataR.TotalDeaths;
            
            }

        } );

 
        console.log( 'before ', allData );
        if ( i === country.length ) {

            console.log( 'hi' );
            console.log( allData );
            fetchCountry( allData );
        }

        if ( j === data.length ) {

            localStorage.setItem( 'postData',JSON.stringify( data ) );

        }

        setEdit( false );

    }

    const closeBtn = ( ) => {

        setEdit( false );
        console.log( edit );

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
            setCurrentData( allData.slice( ( pageNo - 1 )*10, ( pageNo - 1)*10 + 10 ) )

        }
    }
    // ***********************************
    // ***********************************
    return (
    
        <PostFormWrapper>
            <Layout>
                <div className = 'profile-container'>
                    <div className = 'post-container'>
                        <h2>Enter the New Details</h2>
                        <form className = 'post-form' onSubmit = { ( e ) => submitHandler( e, storeHandler ) }>
                            <input type = 'text' placeholder = 'country' name = 'country'  required /> 
                            <input type = 'text' placeholder = 'slug' name = 'slug'  required /> 
                            <input type = 'number' placeholder = 'newconfirmedcase' name = 'newconfirmedcase'  required /> 
                            <input type = 'number' placeholder = 'totalconfirmedcase' name = 'totalconfirmedcase'  required /> 
                            <input type = 'number' placeholder = 'newdeaths' name = 'newdeaths'  required /> 
                            <input type = 'number' placeholder = 'totaldeaths' name = 'totaldeaths'  required /> 
                            <button type = 'submit'>submit</button>
                        </form>                        
                        <hr />
                    </div>
                    <div className = 'list-container'>
                    <div className = 'ask-btn'>
                        <h3>Added By</h3>
                        <div>
                            <button onClick = { ( ) => setAddedByAdmin( prevState => true ) } >Admin</button>
                            <button onClick = { ( ) => setAddedByAdmin( prevState => false ) } >All Data</button>    
                        </div>                        
                    </div>
                        {
                            addedByAdmin ?
                            '':
                            <div>
                                
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
                            </div>
                        }

                        <table>
                        <thead>
                            <th>Country</th>
                            <th>Code</th>
                            <th>NewConfirmedCase</th>
                            <th>TotalConfirmedCase</th>
                            <th>NewDeaths</th>
                            <th>TotalDeaths</th>
                            <th>Edit</th>
                        </thead>
                        <tbody>
                        {
                            addedByAdmin ?
                            data.map( ( item:any, index:any ) => { 
                                return (
                                    <tr key = { index } >
                                        <td>{ item.Country }</td>
                                        <td>{ item.Slug }</td>
                                        <td>{ item.NewConfirmed }</td>
                                        <td>{ item.TotalConfirmed }</td>
                                        <td>{ item.NewDeaths }</td>
                                        <td>{ item.TotalDeaths }</td>
                                        <td className = 'edit-td' onClick = { ( ) => editHandler( item.Slug ) } >Edit</td>
                                    </tr>
                                )
                            } ):
                                
                                currendData.map( ( item:any, index:any ) => {

                                    return (
                                        <tr key = { index } >
                                            <td>{ item.Country }</td>
                                            <td>{ item.Slug }</td>
                                            <td>{ item.NewConfirmed }</td>
                                            <td>{ item.TotalConfirmed }</td>
                                            <td>{ item.NewDeaths }</td>
                                            <td>{ item.TotalDeaths }</td>
                                            <td className = 'edit-td' onClick = { ( ) => editHandler( item.Slug ) } >Edit</td>
                                            {/* <td>jii</td> */}
                                        </tr>
                                    )
                                } )
                            }
                        </tbody>
                        </table>

                    </div>
                    {
                        edit ?
                        <EditData data = { editData } saveFun = { saveData } closeFun = { closeBtn } />
                        :
                        ''
                    }
                </div>
            </Layout>
        </PostFormWrapper>    
    
    )

}

const PostFormWrapper = styled.div`

    .post-container {

        text-align: center;
        margin: 10px;
        text-transform: uppercase;
        letter-spacing: 2px;
        color: rgba( 0, 0, 0, 0.6 );
    }

    .action-center {

        margin-top: 1rem;
    }
    .post-form {

        display: flex;
        /* flex-direction: column; */
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        width: 50%;
        margin: 0 auto;

    }

    .post-form input {

        padding: 10px;
        margin: 10px;
        flex: 40%;
    }
    hr {
        margin-top: 20px;
    }

    .ask-btn {

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #353030;
        letter-spacing: 2px;
        text-transform: uppercase;
    
    }

    .ask-btn button {

        padding: 2px 10px;
        border: none;
        background: #6d6ddb;
        margin: 5px;
        color: white;
        font-weight: bolder;
        border-radius: 5px;
        cursor: pointer;
    }

    .post-form button {

        margin-top: 10px;
        border: 1px solid black;
        background: #87dd87;
        padding: 8px 18px;
        border-radius: 5px;
        font-weight: bolder;
        text-transform: uppercase;
        cursor: pointer;

    }

    table {

        margin: 1rem auto;
        min-width: 80vw;
        min-height: 40vh;
        border: 1px solid black;
        border-collapse: collapse;
        text-align: center;
        margin-bottom: 4rem;
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

    .edit-td {

        cursor: pointer;
        
    }

`;

export default PostForm;
