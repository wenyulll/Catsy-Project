import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import CartButton from './CartButton';
import Catsylogo from './Catsylogo.png'
import './Navigation.css';
import SearchResults from '../Search/searchResult';
import SearchBar from '../Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { loadCartThunk } from "../../store/shoppingCart";
import { searchProductsThunk } from "../../store/search";


function Navigation({ isLoaded }) {
	const dispatch = useDispatch();
	const sessionUser = useSelector(state => state.session.user);
	const cart = useSelector((state) => state.shoppingCart.items);
	const cartItemCount = Object.keys(cart).length;
	const [keyword, setKeyword] = useState('');
	const history = useHistory()

	useEffect(() => {
		if (sessionUser){
			dispatch(loadCartThunk());
		}
    }, [dispatch,sessionUser]);

	const handleNoFeatureSubmit = (e) => {
		e.preventDefault();
		alert('Feature Coming soon');
	};

	const handleSearchSubmit = (e) => {
		e.preventDefault();
		dispatch(searchProductsThunk(keyword));
		history.push('/search');
	};

	return (
		<div className="navigation-container">
			<div className="logo-container">
				<NavLink exact to="/">
					<img alt='logo' className='catsy-logo' src={Catsylogo} />
				</NavLink>
			</div>
			<div className="search-container">
				<input type="text" placeholder="Search..." className="search-input" value={keyword} 
            		onChange={(e) => setKeyword(e.target.value)} />
				<button type="submit" className="search-button" onClick={handleSearchSubmit}>Search</button>
			</div>
			<div className='icon-profile-container'>
				<div className="icon-container">
					{sessionUser &&
						(<div className="store-icon-wrapper">
							<NavLink to="/products/mystore">
								<FontAwesomeIcon icon={faStore} style={{ color: "black" }} />
							</NavLink>
						</div>)}
					<div className="cart-icon-wrapper">
						<CartButton cartItemCount={cartItemCount} />
					</div>
					<div className="order-icon-wrapper">
						<NavLink to="/orders">
                            <FontAwesomeIcon icon={faClipboardList} style={{ color: "black" }} />
                        </NavLink>
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