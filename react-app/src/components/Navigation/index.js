import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import Catsylogo from './Catsylogo.png'
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);

	const handleNoFeatureSubmit = (e) => {
		e.preventDefault();
		alert('Feature Coming soon');
	};
	return (
		<div className="navigation-container">
			<div className="logo-container">
				<NavLink exact to="/">
					<img alt='logo' className='catsy-logo' src={Catsylogo} />
				</NavLink>
			</div>
			<div className="search-container">
				<form onSubmit={handleNoFeatureSubmit}>
					<input type="text" placeholder="Search..." className="search-input" />
				</form>
				<button type="submit" className="search-button">Search</button>
			</div>
			<div className='icon-profile-container'>
				<div className="icon-container">
					<div className="store-icon-wrapper">
						<NavLink to="/products/mystore">
							<i className="fas fa-store"> </i>
						</NavLink>
					</div>
					<div className="cart-icon-wrapper" onClick={handleNoFeatureSubmit}>
						<i className="fas fa-shopping-cart"></i>
					</div>
				</div>
				<div className="profile-container">
					{isLoaded && (
						<ProfileButton user={sessionUser} />
					)}
				</div>
			</div>
		</div>
	);
}

export default Navigation;