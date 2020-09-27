import React, { PureComponent, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { Container, Button, Input, Card, Image } from 'semantic-ui-react';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import NumericInput from 'react-numeric-input';
import 'react-circular-progressbar/dist/styles.css';

import Tree0 from './images/tree_0.JPG';
import Tree1 from './images/tree_1.JPG';
import Tree2 from './images/tree_2.JPG';
import Tree3 from './images/tree_3.JPG';
import Tree4 from './images/tree_4.JPG';
import Tree5 from './images/tree_5.JPG';

export default class Grow extends PureComponent {
	constructor(props) {
		super(props);
		this.tick = this.tick.bind(this);
		this.startCountDown = this.startCountDown.bind(this);
		this.resetTimer = this.resetTimer.bind(this);
	}

	state = {
		timer_set: 0,
		timer_remaining: 0,
		timer_percentage: 0,
		hour_remaining: 0,
		minute_remaining: 0,
		second_remaining: 0,
		hour: 0,
		minute: 0,
		timer_started: false,

		weather: "",
		quotes: []
	};

	async componentDidMount() {
		let lat, long;
		const APIkey = "4e0f76db4876c9627498ec6fdaeb159a";
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(function(position) {
				lat = position.coords.latitude;
				long = position.coords.longitude;
			  });
		  }
		let [weatherJSON, quotesArr] = await Promise.all([
			fetch(`api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${APIkey}`),
			fetch("https://type.fit/api/quotes")
		]);
		this.setState({
			weather: weatherJSON,
			quotes: quotesArr
		});
	}

	onHourChange(event) {
		this.setState({ hour: event });
	}

	onMinuteChange(event) {
		this.setState({ minute: event });
	}

	async updateTimer(time_elapsed, username) {
		const { apiPath } = this.props;

		const res = await fetch(`${apiPath}/update_timer`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username,
				time_elapsed,
			}),
		});
		if (!res.ok) throw await res.json();

		return await res.json();
	}

	async tick() {
		const { selfUser } = this.props;
		let username = selfUser.username;
		this.setState((prevState) => {
			return { timer_remaining: prevState.timer_remaining - 1000 };
		});

		const { timer_set, timer_remaining } = this.state;

		// https://stackoverflow.com/questions/19700283/how-to-convert-time-milliseconds-to-hours-min-sec-format-in-javascript
		let minutes = Math.floor((timer_remaining / (1000 * 60)) % 60);
		let hours = Math.floor((timer_remaining / (1000 * 60 * 60)) % 24);
		let seconds = Math.floor((timer_remaining / 1000) % 60);
		hours = hours < 10 ? '0' + hours : hours;
		minutes = minutes < 10 ? '0' + minutes : minutes;
		seconds = seconds < 10 ? '0' + seconds : seconds;

		let new_timer_percentage = parseInt(
			((timer_set - timer_remaining) / timer_set) * 100
		);

		if (new_timer_percentage < 2) {
			new_timer_percentage = 1;
		}

		this.setState({
			timer_percentage: new_timer_percentage,
			hour_remaining: hours,
			minute_remaining: minutes,
			second_remaining: seconds,
		});

		if (timer_remaining <= 0) {
			clearInterval(this.intervalHandle);
			// store timer_set into db
			// send username and time elapsed

			try {
				await this.updateTimer(timer_set, username);
			} catch (err) {
				console.log(err);
			}
		}
	}

	startCountDown() {
		const { hour, minute } = this.state;
		let new_timer = hour * 3600000 + minute * 60000;
		this.setState({
			timer_set: new_timer,
			timer_remaining: new_timer,
			timer_started: true,
		});

		this.intervalHandle = setInterval(this.tick, 1000);
	}

	async resetTimer() {
		clearInterval(this.intervalHandle);
		const { selfUser } = this.props;
		let username = selfUser.username;

		const { timer_set, timer_remaining } = this.state;
		this.setState({
			timer_remaining: 0,
			timer_percentage: 0,
			hour_remaining: 0,
			minute_remaining: 0,
			second_remaining: 0,
			timer_started: false,
		});

		try {
			await this.updateTimer(timer_set - timer_remaining, username);
		} catch (err) {
			console.log(err);
		}
	}

	render() {
		const { selfUser } = this.props;
		const {
			timer_percentage,
			hour_remaining,
			minute_remaining,
			second_remaining,
			timer_started,
		} = this.state;
		// if (!selfUser) {
		// 	return <Redirect to='/' />;
		// }

		let tree;
		if (timer_percentage >= 0 && timer_percentage < 20) {
			tree = <Image size='medium' circular src={Tree0}></Image>;
		} else if (timer_percentage >= 20 && timer_percentage < 40) {
			tree = <Image size='medium' circular src={Tree1}></Image>;
		} else if (timer_percentage >= 40 && timer_percentage < 60) {
			tree = <Image size='medium' circular src={Tree2}></Image>;
		} else if (timer_percentage >= 60 && timer_percentage < 80) {
			tree = <Image size='medium' circular src={Tree3}></Image>;
		} else if (timer_percentage >= 80 && timer_percentage < 99) {
			tree = <Image size='medium' circular src={Tree4}></Image>;
		} else if (timer_percentage >= 99) {
			tree = <Image size='medium' circular src={Tree5}></Image>;
		}

		return (
			<Fragment>
				<h1>Grow</h1>

				{timer_started ? (
					<p>
						{hour_remaining}:{minute_remaining}:{second_remaining}{' '}
					</p>
				) : (
					<p>00:00:00</p>
				)}
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
				{!timer_started ? (
					<Button onClick={this.startCountDown}>Start</Button>
				) : (
					<Button disabled>Start</Button>
				)}

				{timer_started ? (
					<Button onClick={this.resetTimer}>Reset</Button>
				) : (
					<Button disabled>Reset</Button>
				)}

				<div
					style={{
						width: '500px',
						position: 'absolute',
						left: '50%',
						top: '50%',
						transform: 'translate(-50%, -50%)',
					}}
				>
					<CircularProgressbarWithChildren
						value={timer_percentage}
						strokeWidth={5}
					>
						{tree}
					</CircularProgressbarWithChildren>
				</div>
			</Fragment>
		);
	}
}
