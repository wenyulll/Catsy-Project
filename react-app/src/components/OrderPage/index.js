import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrdersThunk } from '../../store/order';
import { Link } from 'react-router-dom';
import './OrderPage.css';

const OrderPage = () => {
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.order.orders);

    useEffect(() => {
        dispatch(getOrdersThunk());
    }, [dispatch]);

    if (!orders) {
        return <div>Loading orders...</div>;
    }

    return (
        <div className="order-overview">
            <h2>Your Orders</h2>
            {Object.values(orders).map(order => (
                <div key={order.id} className="order-item">
                    <div className="order-details">
                        <p>Order#: {order.id}</p>
                        <p>Time: {order.date}</p>
                        <p>Item#: {order.num_of_items}</p>
                        <p>Total Price: ${order.total_price}</p>
                    </div>
                    <Link to={`/order/${order.id}`} className="view-order-link">View Order</Link>
                </div>
            ))}
        </div>
    );
};

export default OrderPage;
