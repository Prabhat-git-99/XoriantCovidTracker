import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import Layout from '../components/Layout/Layout';

// import { Chart } from 'react-charts'
import { Doughnut } from 'react-chartjs-2';

// import Bar from '../components/Graphs/Bar';
import PieChart from '../components/Graphs/PieChart';
import { SummaryContext } from '../Context/SummaryContext';
import BarChart from '../components/Graphs/Bar';


const Dashboard = () => {


    // const labels = Utils.months({count: 7});
    const [ filter, setFilter ] = useState( '' );
    const [ chartType, setChartType ] = useState( 'PIE' );
    const [ labels, setLabels ] = useState<string[]>( [ ] );
    const [ data, setData ] = useState<any[]>( [ ] );
    const [ finalData, setFinalData ] = useState<any>( [ ] );
    const [ charName, setChartName ] = useState<string>( 'bar' );

    const { country, fetchCountry } = useContext( SummaryContext );

    console.log( 'countttt in da ', country );

    useEffect( ( ) => {

        console.log( 's' );

    }, [ finalData ]);
    // const 
   
    const filterHandler = ( filterName:string ) => {

        setFilter( filterName );

        setData( country.sort( function( a:any, b:any ):any {
            if ( a[filterName] < b[filterName] ) {
                return 1;
            }
            if ( a[filterName] > b[filterName] ) {
                return -1;
            }
        }));

        setFinalData( data.slice( 0 , 10 ) );
        console.log( finalData );

    }


    return (

        <DashboardWrapper>
            <Layout>
                <div>
                    <div className = 'cat-btn'>
                        <button onClick = { ( ) => filterHandler( 'TotalConfirmed' ) } >Total Confirmed</button>
                        <button onClick = { ( ) => filterHandler( 'NewConfirmed' ) }>New Confirmed</button>
                        <button onClick = { ( ) => filterHandler( 'TotalActiveCase' ) } >ActiveCase</button>
                        <button onClick = { ( ) => filterHandler( 'TotalDeaths' ) }>Total Deaths</button>
                    </div>
                    <div className = 'chart-btn'>
                        <button onClick = { ( ) => setChartType( 'BAR' ) } >Bar Chart</button>
                        <button onClick = { ( ) => setChartType( 'PIE' ) } >Pie Chart</button>
                    </div>

                    {
                        chartType === 'BAR'
                        ?
                        <BarChart data = { finalData } filterName = { filter } />
                        :
                        <PieChart data = { finalData } filterName = { filter } />
                    }
                </div>
            </Layout>
        </DashboardWrapper>
        
    );

}

const DashboardWrapper = styled.div`

    .cat-btn, .chart-btn {

        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;

    }

    .cat-btn button, .chart-btn button {

        border: 1px solid black;
        border-radius: 5px;
        background: transparent;
        padding: 8px;
        font-weight: bolder;
        font-size: 14px;
        text-transform: capitalize;
        margin: 10px 5px 10px 5px;
        cursor: pointer;

    }

    .chart-btn {

    }
`;

export default Dashboard;
