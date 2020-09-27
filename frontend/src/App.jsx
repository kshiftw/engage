import React, { PureComponent } from 'react';
import './App.css';

import profile from './images/avatar.png';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import Navbar from './Navbar';
import Landing from './Landing';
import Login from './Login';
import Profile from './Profile';
import EducationalLinks from './EducationalLinks';
import Register from './Register';
import About from './About';
import Grow from './Grow';

export default class App extends PureComponent {
	constructor(props) {
		super(props);
	}
	about = [
		{
			name: 'Mihir',
			profilePicture: profile,
			info: 'Student of Computer Science at Western University',
		},
		{
			name: 'Lenny',
			profilePicture: profile,
			info: 'Electrical Engineering at FIU',
		},
		{
			name: 'Kirk',
			profilePicture: profile,
			info: 'Computer Systems Technology student at BCIT',
		},
		{
			name: 'Israel',
			profilePicture: profile,
			info: 'Student of Computer Science at Hunter College',
		},
	];
	state = {
		// REACT_APP_API_PATH = localhost:3030 // <- use this when running in local environment to avoid building frontend
		apiPath: process.env.REACT_APP_API_PATH + '/api',

		// Use this when having backend server frontend (when deploying)
		// apiPath: '/api',

		selfUser: null,
		loadingSelf: true,
		inLobby: false,
		about: this.about,
	};

	async componentDidMount() {
		// Try to retrieve the login token
		const token = localStorage.getItem('token');
		if (!token) {
			return this.setState({
				loadingSelf: false,
			});
		}

		const { apiPath } = this.state;

		try {
			// Authenticate the token and user using API route
			const res = await fetch(`${apiPath}/users/self`, {
				headers: {
					Authorization: token,
				},
			});
			if (!res.ok) throw res.status;
			const { user } = await res.json();

			this.setState({
				selfUser: user,
				loadingSelf: false,
			});
		} catch (err) {
			console.log(err);
			this.setState({
				loadingSelf: false,
			});
		}
	}

	setSelfUser(selfUser, token) {
		this.setState({
			selfUser,
		});
	}

	render() {
		const { apiPath, selfUser, loadingSelf, about } = this.state;

		// If still loading, render a loader on the page
		if (loadingSelf) {
			return <div className='ui massive active loader' />;
		}

		const setSelfUser = this.setSelfUser.bind(this);

		return (
			<Container className='app_container'>
				<BrowserRouter>
					<Navbar selfUser={selfUser} setSelfUser={setSelfUser} />
					<Switch>
						<Route
							exact
							path='/'
							render={(props) => (
								<Landing {...props} apiPath={apiPath} selfUser={selfUser} />
							)}
						/>
						<Route
							exact
							path='/login'
							render={(props) => (
								<Login
									{...props}
									apiPath={apiPath}
									selfUser={selfUser}
									setSelfUser={setSelfUser}
								/>
							)}
						/>
						<Route
							exact
							path='/about'
							render={(props) => (
								<About
									{...props}
									apiPath={apiPath}
									selfUser={selfUser}
									about={about}
								/>
							)}
						/>
						<Route
							exact
							path='/profile'
							render={(props) => (
								<Profile {...props} apiPath={apiPath} selfUser={selfUser} />
							)}
						/>
						<Route
							exact
							path='/grow'
							render={(props) => (
								<Grow {...props} apiPath={apiPath} selfUser={selfUser} />
							)}
						/>
						<Route
							exact
							path='/EducationalLinks'
							render={(props) => (
								<EducationalLinks
									{...props}
									apiPath={apiPath}
									selfUser={selfUser}
								/>
							)}
						/>
						<Route
							exact
							path='/register'
							render={(props) => (
								<Register
									{...props}
									apiPath={apiPath}
									selfUser={selfUser}
									setSelfUser={setSelfUser}
								/>
							)}
						/>
					</Switch>
				</BrowserRouter>
			</Container>
		);
	}
}
