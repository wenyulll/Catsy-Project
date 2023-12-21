import React from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './CartButton.css';

const CartButton = ({ cartItemCount }) => {
    const history = useHistory();

    const jumpToCart = () => {
        history.push('/shopping_cart');
    };

    return (
        <div className="cart-icon-wrapper" onClick={jumpToCart}>
            <FontAwesomeIcon icon={faShoppingCart} style={{ color: "black" }} />
            {cartItemCount > 0 && (
                <span className="cart-item-count">{cartItemCount}</span>
            )}
        </div>
    );
};

export default CartButton;