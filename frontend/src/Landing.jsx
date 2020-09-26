import React, { PureComponent, Fragment } from 'react';
import { Container, Button } from 'semantic-ui-react';

export default class Landing extends PureComponent {
	render() {
		const { selfUser } = this.props;

		return (
			<Fragment>
				<h1>Engage</h1>
				<Container>
					<p>Subheading</p>
				</Container>
			</Fragment>
		);
	}
}
