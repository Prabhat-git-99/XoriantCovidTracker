import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { AuthContext, AUTH_STATE } from "./Context/AuthContext";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ByCountry from "./pages/ByCountry";
import PostForm from "./pages/PostForm";
// import Auth from "./components/Auth/Auth.js";
import Auth from "./components/Auth/Auth";
import Signin from "./components/Auth/Signin";
import Signout from "./components/Auth/Signout";
import { SummaryContext } from "./Context/SummaryContext";
import Error from "./pages/Error";
import axios from "axios";
import { SUMMARY_API } from "./config";

const App:React.FC = ( ) => {

	const [ isAuth, setAuth ] = useState( AUTH_STATE.LOGOUT );
	const [ data, setData ] = useState( [ ] );
	const fetchData = ( item:any ) => setData( item );

	useEffect( ( ) => {

		axios.get( SUMMARY_API )
		.then( res => {

			setData( res.data.Countries );
			return res;

		})
		.then( res => {
			console.log( ' APP RENRENDERS ? ');
			res.data.Countries.map( ( item:any ) => { 
				
				let fatilityRate = 0;
				let recoveryRate = 0;

				if ( item.TotalConfirmed ) {

					fatilityRate = item.TotalDeaths / item.TotalConfirmed;
					recoveryRate = item.TotalRecovered / item.TotalConfirmed;
					const rate = ( ( 1 - fatilityRate )*0.7 + ( recoveryRate )*0.3 ).toFixed( 3 ); 
					item.alarmRate = rate;

				}
				else {
					item.alarmRate = -1;					
				}

				item.TotalActiveCase = item.TotalConfirmed - item.TotalDeaths - item.TotalRecovered 
			
			} );

		})
		.catch( err => {

			console.log( err );

		} )

	}, [ ] );

	return (

		<AuthContext.Provider value = { { isAuthenticated: isAuth , setAuth } } >
		<SummaryContext.Provider value = { { country: data, fetchCountry: fetchData, isLoading: true } } >
		<Router>

			<Switch>

				<Route exact path = '/signin' component = { Signin } />

				<Route exact path = '/signout' component = { Signout } />

				<Route exact path = '/' component = { Home } />

				<Route exact path = '/dashboard' component = { Dashboard } />

				<Route exact path = '/country/:country' component = { ByCountry } />

				<Route exact path = '/post' component = { Auth( PostForm ) } />

				<Route component = { Error } />

			</Switch>

		</Router>
		</SummaryContext.Provider>
		</AuthContext.Provider>
	)

}

export default App;