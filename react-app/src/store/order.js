export const GET_ORDERS = 'order/GET_ORDERS';
export const ADD_ORDER = 'order/ADD_ORDER';
export const ADD_ORDER_ITEM = 'order/ADD_ORDER_ITEM';
export const GET_ORDER_DETAIL = 'order/GET_ORDER_DETAIL';

export const getOrders = (orders) => ({
    type: GET_ORDERS,
    payload: orders
});

export const addOrder = (order) => ({
    type: ADD_ORDER,
    payload: order
});

export const addOrderItem = (orderItem) => ({
    type: ADD_ORDER_ITEM,
    payload: orderItem
});

export const getOrderDetail = (order) => ({
    type: GET_ORDER_DETAIL,
    payload: order
});

// Thunk to get all orders for the current user
export const getOrdersThunk = () => async (dispatch) => {
    const response = await fetch(`/api/order/`, {
        headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
        const orders = await response.json();
        dispatch(getOrders(orders));
    }
};

// Thunk to add a new order
export const addOrderThunk = () => async (dispatch) => {
    const response = await fetch(`/api/order/`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
        const order = await response.json();
        dispatch(addOrder(order));
        return order.id
    }
};

// Thunk to add a new item to an order
export const addOrderItemThunk = (id, productId, quantity) => async (dispatch) => {
    const response = await fetch(`/api/order/${id}`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity })
    });
    if (response.ok) {
        const orderItem = await response.json();
        dispatch(addOrderItem(orderItem));
    }
};

export const getOrderDetailThunk = (id) => async (dispatch) => {
    const response = await fetch(`/api/order/${id}`, {
        headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
        const order = await response.json();
        console.log('orderorderorderorder',order)
        dispatch(getOrderDetail(order));
    }
};

const initialState = {
    orders: {},
    currentOrder: null,
    currentOrderItems: {}
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDERS:
            return {
                ...state,
                orders: action.payload
            };
        case ADD_ORDER:
            return {
                ...state,
                currentOrder: action.payload
            };
        case ADD_ORDER_ITEM:
            return {
                ...state,
                currentOrderItems: {
                    ...state.currentOrderItems,
                    [action.payload.id]: {...action.payload}
                }
            };
        case GET_ORDER_DETAIL:
            return {
                ...state,
                currentOrder: {...action.payload},
                currentOrderItems: {...action.payload.items}
            }
        default:
            return state;
    }
};

export default orderReducer;

