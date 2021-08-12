import React, { useState } from 'react';
import styled from 'styled-components';

const EditData = ( props:any ) => {


    console.log( 'EditData: ', props );
    const [ country, setCountry ] = useState<string>( props.data.Country ? props.data.Country : '' );
    const [ slug, setSlug ] = useState<string>( props.data.Slug ? props.data.Slug : '' );
    const [ newConfirmed, setNewConfirmed ] = useState<number>( props.data.NewConfirmed ? props.data.NewConfirmed : 0 );
    const [ totalConfirmed, setTotalConfirmed ] = useState<number>( props.data.TotalConfirmed ? props.data.TotalConfirmed : 0 );
    const [ newDeaths, setNewDeaths ] = useState<number>( props.data.NewDeaths ? props.data.NewDeaths : 0 );
    const [ totalDeaths, setTotalDeaths ] = useState<number>( props.data.TotalDeaths ? props.data.TotalDeaths : 0 );
    const [ totalRecovered, setTotalRecovered ] = useState<number>( props.data.TotalRecovered ? props.data.TotalRecovered : 0 );
    const [ activeCase, setActiveCase ] = useState<number>( totalConfirmed - totalDeaths - totalRecovered );

    const submitHandler = ( e:any ) => {

        const subData = {

            Country: country,
            Slug: slug,
            NewConfirmed: newConfirmed,
            TotalConfirmed: totalConfirmed,
            NewDeaths: newDeaths,
            TotalDeaths: totalDeaths,
            TotalRecovered: totalRecovered,

        }
        e.preventDefault( );
        props.saveFun( props.data.Slug, subData );

    }

    return (

        <EditDataWrapper>
            <div className = 'edit-form-container'>
                <div className = 'close-btn' >
                    <span onClick = { props.closeFun } >Close</span>
                </div>
            <form className = 'edit-form' onSubmit = { submitHandler }>
                <label>
                    Country: 
                    <input type = 'text' name = 'country' value = { country } onChange = { ( e ) => setCountry( e.target.value )} required />
                </label>
                <label>
                    Slug:
                    <input type = 'text' name = 'slug' value = { slug } onChange = { ( e ) => setSlug( e.target.value )} required />
                </label>
                <label>
                    New Confirmed:
                    <input type = 'number' name = 'newconfirmed' value = { newConfirmed } onChange = { ( e ) => setNewConfirmed( parseInt(e.target.value) )} required />
                </label>
                <label>
                    Total Confirmed:
                    <input type = 'number' name = 'totalconfirmed' value = { totalConfirmed } onChange = { ( e ) => setTotalConfirmed( parseInt(e.target.value) )} required />
                </label>
                <label>
                    New Deaths:
                    <input type = 'number' name = 'newdeaths' value = { newDeaths } onChange = { ( e ) => setNewDeaths( parseInt(e.target.value) )} required />                    
                </label>
                <label>
                    Total Deaths:
                    <input type = 'number' name = 'totaldeaths' value = { totalDeaths } onChange = { ( e ) => setTotalDeaths( parseInt(e.target.value) )} required />
                </label>
                <label>
                    Total Recovered:
                    <input type = 'number' name = 'totalrecovered' value = { totalRecovered } onChange = { ( e ) => setTotalRecovered( parseInt(e.target.value) )} required />
                </label>
                {/* <input type = 'number' name = 'country' placeholder = 'country' required /> */}
                <button type = 'submit' >save</button>

            </form>
            </div>
        </EditDataWrapper>
    
    )
}

const EditDataWrapper = styled.div`

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate( -50%, -50% );
    /* max-width: 50vw; */
    /* max-height: 50vh; */


    .edit-form {
        
        display: flex;
        flex-wrap: wrap;
        /* justify-content: center; */
        align-items: center;
        justify-content: baseline;
        padding: 10px;
        background: #a59999;
        box-shadow: 1px 1px 8px 1px rgba( 0, 0, 0, 0.4);
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;

    }

    .edit-form input {

        /* flex: 50%; */
        padding: 10px;
        margin: 5px;
        border: none;
        background: transparent;
        border-bottom: 1px solid black;
        outline: none;

    }

    .edit-form button {

        padding: 10px 15px;
        font-size: 14px;
        font-weight: bolder;
        border-radius: 5px;
        background: #85ee85;
        cursor: pointer;


    }

    .close-btn {

        width: 100%;
        background: #9b1b1b;
        
    }

    .close-btn span {
        
        color: white;
        padding: 3px 5px;
        position: relative;
        float: right;
        text-transform: uppercase;
        cursor: pointer;

    }

`;

export default EditData;
