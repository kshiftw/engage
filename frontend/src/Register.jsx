import React, { PureComponent, Fragment } from 'react';
import { Redirect, Link } from 'react-router-dom';
import {
	Segment,
	Button,
	Grid,
	Form,
	Header,
	Message,
} from 'semantic-ui-react';

export default class Register extends PureComponent {
	state = {
		loading: false,
		failedUsername: false,
		failedPassword: false,
		checked: false,
		username: '',
		password: '',
		errorMessage: '',
		success: false,
	};

	controller = new AbortController();

	// Send the username, password to /register API path
	async validateAccount(username, password) {
		const { apiPath } = this.props;

		const res = await fetch(`${apiPath}/register`, {
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
		if (!res.ok) throw await res.json();

		return await res.json();
	}

	async createAccount() {
		this.setState({
			loading: true,
			failedUsername: false,
			failedPassword: false,
		});

		const { username, password } = this.state;

		// Validate username length
		if (username.length < 3 || username.length > 32) {
			this.setState({
				failedUsername: true,
				loading: false,
				errorMessage:
					'Your username must be at least 3 characters and can not be more than 32 characters.',
			});
			return;
		}

		// Validate password length
		if (password.length < 5 || password.length > 256) {
			this.setState({
				failedPassword: true,
				loading: false,
				errorMessage:
					'Your password must be at least 5 characters and can not be more than 256 characters.',
			});
			return;
		}

		try {
			await this.validateAccount(username, password);

			// If there are no errors thrown, then we have successfully registered the account
			this.setState({
				loading: false,
				failed: false,
				success: true,
			});
		} catch (err) {
			if (err.name !== 'AbortError') {
				this.setState({
					loading: false,
					failedUsername: true,
					errorMessage: err.error,
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

	handleCheckboxChange = (event) =>
		this.setState({ checked: event.target.checked });

	render() {
		const { selfUser } = this.props;

		// If the user is logged in already, redirect to main page
		if (selfUser) {
			return <Redirect to='/' />;
		}

		const {
			username,
			password,
			loading,
			failedUsername,
			failedPassword,
			errorMessage,
			success,
		} = this.state;

		return (
			<Fragment>
				<div class='login_background'></div>
				<Grid
					textAlign='center'
					style={{ height: '80vh' }}
					verticalAlign='middle'
				>
					{success ? (
						<Grid.Column style={{ maxWidth: 450 }}>
							<Header as='h2' color='teal' textAlign='center'>
								Account Registered!
							</Header>
						</Grid.Column>
					) : (
						<Grid.Column style={{ maxWidth: 450 }}>
							<Header as='h2' color='teal' textAlign='center'>
								{/* <Image src='/logo.png' />  */}
								Sign up for free!
							</Header>
							<Form size='large'>
								<Segment stacked>
									{failedUsername ? (
										<div class='ui pointing below red basic label'>
											{errorMessage}
										</div>
									) : null}
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

									{failedPassword ? (
										<div class='ui pointing below red basic label'>
											{errorMessage}
										</div>
									) : null}
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
										onClick={() => this.createAccount()}
									>
										Sign Up
									</Button>
								</Segment>
							</Form>
							<Message>
								<p>
									Already have an account? &nbsp;
									<Link style={{ textDecoration: 'underline' }} to='/login'>
										Log In
									</Link>{' '}
								</p>
							</Message>
						</Grid.Column>
					)}
				</Grid>
			</Fragment>
		);
	}
}
