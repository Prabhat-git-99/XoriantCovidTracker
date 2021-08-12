import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Bar } from 'react-chartjs-2';



const BarChart = (props) => {
    
    console.log( 'bar ', props );
    let labels = [ ];
    let values = [ ];
    props.data.map( item => {

        labels.push( item.Country );
        values.push( item[ props.filterName ] );

    } );

    const data = {

        labels: labels,
        datasets: [ { 
            label: 'My First Dataset',
            data: values,
            circumference: 360,
            radius: 200,
            backgroundColor: [
            '#41B34F','#1550C2','#6DD2C2','#3AA4DD','#99AE8B','#A278C8','#B9957C','#E1E4B9','#F6A462','#ECC467'
            ],
            borderColor: [
                'rgba(0,0,0,0.3)'
            ],
            borderWidth: 1
        } ]
    }

    const config = {
        type: 'bar',
        data: data,
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        },
      };
    


    return (
        <BarWrapper>
            <div className = 'graph-area'>
                {
                    props.data.length ? <h2>{ `Top 10 by ${props.filterName} ` }</h2> : ''
                }
                {
                    // data.map( item => {

                    //     return <h1 key = { item } >{ item }</h1>
                    // })
                    // <Doughnut data = { data } />
                    <Bar data = { data } />
                }
            </div>
        </BarWrapper>
    )
}

BarChart.propTypes = {

    data: PropTypes.any.isRequired,
    filterName: PropTypes.any.isRequired,

}

const BarWrapper = styled.div`

    .graph-area {

        text-align: center;
        margin: 1rem auto;
        max-width: 50vw;
        max-height: 90vh;
    }
    .graph-area h2 {
        margin-bottom: 2rem;
        letter-spacing: 2px;
        color: rgba( 0, 0, 0, 0.6 );
        text-transform: uppercase;
    }

`;

export default BarChart;
