import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);

	const handleSearchSubmit = (e) => {
		e.preventDefault();
		alert('Coming soon');
	};
	return (
		<ul>
			<li>
				<NavLink exact to="/">Home</NavLink>
			</li>
			<li>
				<form onSubmit={handleSearchSubmit}>
					<input type="text" placeholder="Search..." />
					<button type="submit">Search</button>
				</form>
			</li>
			<li className="store-icon">
				<i className="fas fa-store"> </i>
				<span className="store">Store Manager</span>
			</li>
			{isLoaded && (
				<li>
					<ProfileButton user={sessionUser} />
				</li>
			)}
		</ul>
	);
}

export default Navigation;