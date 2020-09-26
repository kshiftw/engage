import React, { PureComponent, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { Card } from 'semantic-ui-react';

export default class Profile extends PureComponent {
	constructor(props) {
		super(props);

		const { selfUser } = this.props;

		this.state = {
			username: selfUser.username,
			totalTime: 0,
			level: 0,
		};
	}

	async componentDidMount() {
		const { selfUser, apiPath } = this.props;
		try {
			const res = await fetch(
				`${apiPath}/profile?username=${selfUser.username}`
			);
			const { user } = await res.json();
			this.setState({
				totalTime: user.totalTime,
				level: user.level,
			});
		} catch (err) {
			console.log('error', err);
		}
	}

	render() {
		const { selfUser } = this.props;
		const { username, totalTime, level } = this.state;

		if (!selfUser) {
			return <Redirect to='/' />;
		}

		return (
			<Fragment>
				<div class='profile_background'></div>
				<h1>Profile Page</h1>
				<Card>
					<Card.Content>
						<Card.Header textAlign={'center'}>{username}</Card.Header>
					</Card.Content>
					<Card.Content>
						<Card.Description>Total Time Studied: {totalTime}</Card.Description>
						<Card.Description>Level: {level}</Card.Description>
					</Card.Content>
				</Card>
			</Fragment>
		);
	}
}
