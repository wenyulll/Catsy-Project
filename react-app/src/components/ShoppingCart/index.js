import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { removeFromCartThunk, clearCartThunk } from "../../store/shoppingCart";
import {addOrderThunk, addOrderItemThunk} from "../../store/order";
import './ShoppingCart.css';

const ShoppingCart = () => {
    const cart = useSelector((state) => state.shoppingCart.items);
    const dispatch = useDispatch();
    const history =  useHistory();

    const handleDelete = async (productId) => {
        await dispatch(removeFromCartThunk(productId));
    };

    const handlePlaceOrder = async () => {
        // history.push('/order-confirmation');
        const id=await dispatch(addOrderThunk())
        for (const el in cart) {
            dispatch(addOrderItemThunk(id,cart[el].productId,cart[el].quantity))
        }
        dispatch(clearCartThunk())
        history.push(`/order/${id}`);
        
    };

    return (
        <div className="shopping-cart">
            <h2>Your Shopping Cart</h2>
            <ul>
                {Object.keys(cart).map((productId) => {
                    const item = cart[productId];
                    return (
                        <li key={productId}>
                            <div className="cart-item">
                                <div className="item-details">
                                    <h3>{item.name}</h3>
                                    <p>Price: ${item.price}</p>
                                    <p>Quantity: {item.quantity}</p>
                                </div>
                                <button
                                    className="delete-item-button"
                                    onClick={() => handleDelete(productId)}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    );
                })}
            </ul>
            {Object.keys(cart).length!==0 && (<button onClick={handlePlaceOrder} className="order-button">Place Order</button>)}
        </div>
    );
};

export default ShoppingCart;