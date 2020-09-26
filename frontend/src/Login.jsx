import React, { PureComponent, Fragment } from 'react';
import { Redirect, Link } from 'react-router-dom';
import AbortController from 'abort-controller';
import {
	Segment,
	Button,
	Grid,
	Form,
	Header,
	Message,
} from 'semantic-ui-react';

export default class Login extends PureComponent {
	state = {
		loading: false,
		failed: false,
		username: '',
		password: '',
		errorMsg: '',
	};

	controller = new AbortController();

	// Verify login credentials using the given username/password combination
	async getAccount(username, password) {
		const { apiPath } = this.props;

		// Use /login API route to verify credentials
		const res = await fetch(`${apiPath}/login`, {
			signal: this.controller.signal,
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username,
				password,
			}),
		});
		if (!res.ok) {
			const errorMsg = await res.json();
			this.setState({
				errorMsg: errorMsg,
			});
			throw res.status;
		}
		return await res.json();
	}

	// This function is called when 'login' button is clicked
	async login() {
		this.setState({
			loading: true,
			failed: false,
		});

		const { setSelfUser } = this.props;

		const { username, password } = this.state;

		try {
			// Get a authentication token and user object using getAccount() function
			const { token, user } = await this.getAccount(username, password);

			// Store the token in localStorage
			localStorage.setItem('token', token);
			setSelfUser(user);
		} catch (err) {
			if (err.name !== 'AbortError') {
				// console.error('Login error: ', err);

				this.setState({
					loading: false,
					failed: true,
				});
			}
		}
	}

	onUsernameChange(event) {
		this.setState({ username: event.target.value });
	}

	onPasswordChange(event) {
		this.setState({ password: event.target.value });
	}

	componentWillUnmount() {
		this.controller.abort();
	}

	render() {
		const { selfUser } = this.props;

		// Once the user has logged in, redirect to home page
		if (selfUser) {
			return <Redirect to='/' />;
		}

		const { loading, failed, username, password, errorMsg } = this.state;

		return (
			<Fragment>
				<Grid
					textAlign='center'
					style={{ height: '80vh' }}
					verticalAlign='middle'
				>
					<Grid.Column style={{ maxWidth: 450 }}>
						<Header as='h2' color='teal' textAlign='center'>
							{/* <Image src='/logo.png' />  */}
							Sign in to your account
						</Header>
						<Form size='large'>
							<Segment stacked>
								{failed ? <p style={{ color: 'red' }}>{errorMsg.msg}</p> : null}
								<Form.Input
									autoFocus
									fluid
									icon='user'
									iconPosition='left'
									placeholder='Username'
									maxLength='32'
									value={username}
									onChange={this.onUsernameChange.bind(this)}
								/>

								<Form.Input
									fluid
									icon='lock'
									iconPosition='left'
									placeholder='Password'
									type='password'
									maxLength='256'
									value={password}
									onChange={this.onPasswordChange.bind(this)}
								/>

								<Button
									className='orange_button'
									fluid
									size='large'
									disabled={loading}
									onClick={() => this.login()}
								>
									Log In
								</Button>
							</Segment>
						</Form>
						<Message>
							<p>
								Don't have an account? &nbsp;
								<Link style={{ textDecoration: 'underline' }} to='/register'>
									Sign Up
								</Link>
							</p>
						</Message>
					</Grid.Column>
				</Grid>
			</Fragment>
		);
	}
}
