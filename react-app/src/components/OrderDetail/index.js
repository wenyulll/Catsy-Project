import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetailThunk } from "../../store/order";
import { useParams } from 'react-router-dom';
import './OrderDetail.css';

const OrderDetail = () => {
    const { orderId } = useParams();
    const order = useSelector((state) => state.order);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOrderDetailThunk(orderId));
    }, [dispatch, orderId]);

    if (!order.currentOrder) {
        return null
    }


    return (
        <div className="order-detail">
            <h2>Order Detail - Order #{orderId}</h2>
            <p className="order-timestamp" >{order.currentOrder.date}</p>
            <ul>
                {Object.keys(order.currentOrderItems).map((productId) => {
                    const item = order.currentOrderItems[productId];
                    return (
                        <li key={productId}>
                            <div className="order-item">
                                <div className="item-details">
                                    <h3>{item.productName}</h3>
                                    <p>Price: ${item.price}</p>
                                    <p>Quantity: {item.quantity}</p>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
            <div className="order-summary">
                <p>Total Items: {order.currentOrder.num_of_items}</p>
                <p>Total Price: ${order.currentOrder.total_price.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default OrderDetail;
