export const SEARCH_PRODUCTS = 'SEARCH_PRODUCTS';

export const searchProducts = (products) => ({
    type: SEARCH_PRODUCTS,
    payload: products,
});

export const searchProductsThunk = (searchItem) => async dispatch => {
    try {
        const response = await fetch(`/api/search/${searchItem}`);
        const data = await response.json();
        dispatch(searchProducts(data.products)); // Assume your backend returns an object with a 'products' key
    } catch (error) {
        console.error(error);
        // Handle the error appropriately (like dispatching a failure action)
    }
};

const initialState = {
    products: [], // Now we're storing products, not posts
};


const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_PRODUCTS:
            return {
                ...state,
                products: [...action.payload],
            };
        default:
            return state;
    }
};

export default searchReducer;
