export const ADD_TO_CART = 'shoppingCart/ADD_TO_CART';
export const DELETE_ITEM = 'shoppingCart/DELETE_ITEM';
export const LOAD_CART = 'shoppingCart/LOAD_CART';
export const CLEAR_CART = 'shoppingCart/CLEAR_CART';

export const addToCart = (item) => {
    return {
        type: ADD_TO_CART,
        payload: { item }
    };
};

export const deleteItem = (productId) => {
    return {
        type: DELETE_ITEM,
        payload: { productId }
    };
};

export const loadCart = (items) => {
    return {
        type: LOAD_CART,
        payload: { items }
    };
};

export const clearCart = (items) => {
    return {
        type: CLEAR_CART,
        payload: null
    };
};

export const addToCartThunk = (productId, quantity) => async (dispatch) => {
    try {
        const response = await fetch(`/api/shopping_cart/`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                productId,
                quantity
            })
        });

        if (response.ok) {
            const item = await response.json();
            // console.log('itemitemitemitemitemitemitemitem', item)
            dispatch(addToCart(item));
            return item;
        }
    } catch (e) {
        console.error("Error addToCart:", e);
        return e;
    }
}

export const removeFromCartThunk = (id) => async (dispatch) => {
    try {
        const response = await fetch(`/api/shopping_cart/${id}`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            const item = await response.json();
            dispatch(deleteItem(item['productId']));
            return item['productId'];
        }
    } catch (e) {
        console.error("Error removeFromCart:", e);
        return e;
    }
}

export const loadCartThunk = () => async (dispatch) => {
    try {
        const response = await fetch(`/api/shopping_cart/`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            const items = await response.json();
            // console.log('itemitemitemitemitemitemitemitem', items['shopping_cart_items'])
            dispatch(loadCart(items['shopping_cart_items']));
            return items;
        }
    } catch (e) {
        console.error("Error loadCart:", e);
        return e;
    }
}

export const clearCartThunk = () => async (dispatch) => {
    dispatch(clearCart());
}

const initialState = {
    items: {},
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART: {
            const { item } = action.payload;
            // console.log('=============', item)
            const productId = item['productId']
            return {
                ...state,
                items: {
                    ...state.items,
                    [productId]: { ...item }
                }
            };
        }
        case DELETE_ITEM: {
            const { productId } = action.payload;
            const newItems = { ...state.items };
            delete newItems[productId];
            return {
                ...state,
                items: newItems
            };
        }
        case LOAD_CART: {
            const items = {};
            for (const el of action.payload['items']) {
                items[el.id] = { ...el };
            }
            return { items: items }
        }
        case CLEAR_CART: {
            return { items: {} }
        }
        default:
            return state;
    }
};

export default cartReducer;