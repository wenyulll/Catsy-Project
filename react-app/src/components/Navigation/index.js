import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import Catsylogo from './Catsylogo.png'
import './Navigation.css';
import SearchResults from '../Search/searchResult';
import SearchBar from '../Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore, faShoppingCart, faHeart } from '@fortawesome/free-solid-svg-icons';


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

				<SearchResults />
				<input type="text" placeholder="Search..." className="search-input" />
				<button type="submit" className="search-button" onClick={handleNoFeatureSubmit}>Search</button>
			</div>
			<div className='icon-profile-container'>
				<div className="icon-container">
					{sessionUser &&
						(
							<>
								<div className="store-icon-wrapper">
									<NavLink to="/products/mystore">
										<FontAwesomeIcon icon={faStore} style={{ color: "black" }} />
									</NavLink>
								</div>
								<div className="heart-icon-wrapper">
									<NavLink to="/favorites">
										<FontAwesomeIcon icon={faHeart} style={{ color: "black" }} />
									</NavLink>
								</div>
							</>
						)}
					<div className="cart-icon-wrapper" onClick={handleNoFeatureSubmit}>
						<FontAwesomeIcon icon={faShoppingCart} style={{ color: "black" }} />
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