import React from 'react';
import HomePrimaryBanner from '../components/Home/HomePrimaryBanner';
import HomeTable from '../components/Home/HomeTable';
import Layout from '../components/Layout/Layout';

const Home = ( props:any ) => {

    console.log( props );

    return (
    
        <Layout>
            <div>
                <HomePrimaryBanner />
                <HomeTable />
            </div>
        </Layout>
    )
}

export default Home;
