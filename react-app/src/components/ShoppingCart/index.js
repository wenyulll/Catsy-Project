import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { removeFromCartThunk } from "../../store/shoppingCart";
import { addOrderThunk, addOrderItemThunk } from "../../store/order";
import './ShoppingCart.css';

const ShoppingCart = () => {
    const cart = useSelector((state) => state.shoppingCart.items);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleDelete = async (productId) => {

        let itemId = null;
        for (let id in cart) {
            // console.log('id', cart[id].productId)
            if (cart[id].productId == productId) {
                itemId = cart[id].id;
                break;
            }
        }
        // console.log(itemId)
        // console.log(cart)
        // console.log(productId)
        await dispatch(removeFromCartThunk(itemId));
    };

    const handlePlaceOrder = async () => {
        // history.push('/order-confirmation');
        const id = await dispatch(addOrderThunk())
        console.log('id', id)
        console.log('cart', cart)
        for (const el in cart) {
            console.log('el', el)
            await dispatch(addOrderItemThunk(id, cart[el].productId, cart[el].quantity))
        }
        for (const el in cart) {
            console.log('el', el)
            dispatch(removeFromCartThunk(cart[el].id))
        }
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
            {Object.keys(cart).length !== 0 && (<button onClick={handlePlaceOrder} className="order-button">Place Order</button>)}
        </div>
    );
};

export default ShoppingCart;
