import React, { PureComponent, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

export default class Navbar extends PureComponent {
	state = { activeItem: 'home' };
	handleItemClick = (e, { name }) => this.setState({ activeItem: name });

	render() {
		const { activeItem } = this.state;

		const { selfUser, setSelfUser } = this.props;

		return (
			<div>
				<Menu
					tabular
					// style={{ fontSize: '120%' }}
					className='navbar_items'
				>
					<Menu.Item
						as={NavLink}
						exact
						to='/'
						name='home'
						active={activeItem === 'home'}
						onClick={this.handleItemClick}
						className='navbar_logo'
					>
						Engage
					</Menu.Item>

					<Menu.Menu position='right'>
						<Menu.Item
							as={NavLink}
							exact
							to='/about'
							name='about'
							active={activeItem === 'about'}
							onClick={this.handleItemClick}
						>
							About
						</Menu.Item>
						{!selfUser ? (
							<Menu.Item
								as={NavLink}
								exact
								to='/grow'
								name='grow'
								active={activeItem === 'grow'}
								onClick={this.handleItemClick}
							>
								Grow
							</Menu.Item>
						) : null}
						{selfUser ? (
							<Menu.Item
								as={NavLink}
								exact
								to='/profile'
								name='profile'
								active={activeItem === 'profile'}
								onClick={this.handleItemClick}
							>
								Profile
							</Menu.Item>
						) : null}
						{selfUser ? (
							<Menu.Item
								name='logout'
								active={activeItem === 'logout'}
								onClick={() => {
									setSelfUser(null);
									localStorage.removeItem('token');
								}}
							>
								Log Out
							</Menu.Item>
						) : (
							<Fragment>
								<Menu.Item
									as={NavLink}
									exact
									to='/register'
									name='register'
									active={activeItem === 'register'}
									onClick={this.handleItemClick}
									style={{ marginRight: '.5em' }}
								>
									Sign Up
								</Menu.Item>

								<Menu.Item
									as={NavLink}
									exact
									to='/login'
									name='login'
									active={activeItem === 'login'}
									onClick={this.handleItemClick}
								>
									Log In
								</Menu.Item>
							</Fragment>
						)}
					</Menu.Menu>
				</Menu>
			</div>
		);
	}
}
