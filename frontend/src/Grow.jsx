import React, { PureComponent, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { Container, Button, Input } from 'semantic-ui-react';
import { CircularProgressbar } from 'react-circular-progressbar';
import NumericInput from 'react-numeric-input';
import Countdown from 'react-countdown';
import 'react-circular-progressbar/dist/styles.css';

export default class Grow extends PureComponent {
	constructor(props) {
		super(props);
	}

	state = {
		timer: 0,
		timer_percentage: 0,
		hour: 0,
		minute: 0,
	};

	onHourChange(event) {
		this.setState({ hour: event });
	}

	onMinuteChange(event) {
		this.setState({ minute: event });
	}

	onCountdownChange(event) {
		const { timer } = this.state;
		let time_left = event.total;
		let new_timer_percentage = parseInt(((timer - time_left) / timer) * 100);
		this.setState({
			timer_percentage: new_timer_percentage,
		});
	}

	onStart() {
		console.log('in start');
		const { hour, minute } = this.state;
		let new_timer = hour * 3600000 + minute * 60000;
		this.setState({
			timer: new_timer,
		});
	}

	render() {
		const { selfUser } = this.props;
		const { timer, timer_percentage } = this.state;
		// if (!selfUser) {
		// 	return <Redirect to='/' />;
		// }
		return (
			<Fragment>
				<h1>Grow</h1>
				<Countdown
					date={Date.now() + timer}
					onTick={this.onCountdownChange.bind(this)}
				/>
				<p>
					{timer}
					{timer_percentage}
				</p>
				<p>
					Hours &nbsp;
					<NumericInput
						min={0}
						max={24}
						placeholder={0}
						size={3}
						onChange={this.onHourChange.bind(this)}
					/>
					&nbsp;&nbsp;&nbsp;&nbsp; Minutes &nbsp;
					<NumericInput
						min={0}
						max={60}
						placeholder={0}
						size={3}
						onChange={this.onMinuteChange.bind(this)}
					/>
				</p>
				<p></p>
				<Button onClick={this.onStart.bind(this)}>Start</Button>
				<div style={{ width: '500px' }}>
					<CircularProgressbar
						value={timer_percentage}
						strokeWidth={5}
					></CircularProgressbar>
				</div>
				<Container>
					<p></p>
				</Container>
			</Fragment>
		);
	}
}
